import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { readFileSync } from "fs";
import path, { resolve } from "path";
import { buildConfig, getPayload } from "payload";
import sharp from "sharp";
import { fileURLToPath } from "url";
import Contributors from "../../collections/Contributors";
import Services from "../../collections/Services";
import Users from "../../collections/Users";
import Versions from "../../collections/Versions";

// Strip hooks from collections so they don't fire during seeding
// (e.g. createInitialVersionAndOwner requires req.user which doesn't exist here)
const SeedServices = { ...Services, hooks: {} };
const SeedVersions = { ...Versions, hooks: {} };

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const configPromise = buildConfig({
  editor: lexicalEditor(),
  admin: {
    importMap: {
      baseDir: path.resolve(dirname, "../../.."),
    },
    user: Users.slug,
  },
  collections: [Users, SeedServices, SeedVersions, Contributors],
  db: postgresAdapter({
    idType: "uuid",
    pool: {
      connectionString: process.env.DATABASE_URI || "",
    },
  }),
  localization: {
    locales: [
      { label: "English", code: "en" },
      { label: "Français", code: "fr" },
    ],
    defaultLocale: "en",
    fallback: true,
  },
  secret: process.env.PAYLOAD_SECRET || "",
  sharp,
});

interface SeedData {
  services: Array<{
    organizationId: string;
    name: { en: string; fr: string };
    description: string | null;
    settings: {
      consent: Array<{ documentId: string }>;
      delegate: { access: boolean };
    };
    versions: Array<{
      en: Record<string, unknown>;
      fr: Record<string, unknown>;
    }>;
  }>;
}

const seedData = JSON.parse(
  readFileSync(
    resolve(process.cwd(), "src/scripts/seed/seed.data.json"),
    "utf-8",
  ),
) as SeedData;

/**
 * Recursively injects auto-generated `id` fields from a created document
 * into the corresponding positions of a locale update payload.
 * This ensures Payload updates existing array/block items in-place
 * rather than replacing the entire array (which would wipe other locales).
 */
function mergeIds(
  created: Record<string, unknown>,
  update: Record<string, unknown>,
): Record<string, unknown> {
  const result = { ...update };
  for (const [key, value] of Object.entries(result)) {
    const createdValue = created[key];
    if (Array.isArray(value) && Array.isArray(createdValue)) {
      result[key] = value.map((item, i) => {
        if (
          item &&
          typeof item === "object" &&
          !Array.isArray(item) &&
          createdValue[i] &&
          typeof createdValue[i] === "object" &&
          (createdValue[i] as Record<string, unknown>).id
        ) {
          return {
            ...mergeIds(
              createdValue[i] as Record<string, unknown>,
              item as Record<string, unknown>,
            ),
            id: (createdValue[i] as Record<string, unknown>).id,
          };
        }
        return item;
      });
    } else if (
      value &&
      typeof value === "object" &&
      !Array.isArray(value) &&
      createdValue &&
      typeof createdValue === "object" &&
      !Array.isArray(createdValue)
    ) {
      result[key] = mergeIds(
        createdValue as Record<string, unknown>,
        value as Record<string, unknown>,
      );
    }
  }
  return result;
}

async function seed() {
  const payload = await getPayload({ config: configPromise });

  payload.logger.info("Seeding database...");

  // --- Services ---

  const { totalDocs: existingServices } = await payload.count({
    collection: "services",
  });

  if (existingServices > 0) {
    payload.logger.info(
      `Skipping services — ${existingServices} already exist.`,
    );
  } else {
    for (const svc of seedData.services) {
      const slug = svc.name.en
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, "")
        .replace(/[\s_]+/g, "-")
        .replace(/-+/g, "-");

      const created = await payload.create({
        collection: "services",
        data: {
          organizationId: svc.organizationId,
          name: svc.name.en,
          slug,
          description: svc.description,
          settings: svc.settings,
        },
        locale: "en",
      });

      await payload.update({
        collection: "services",
        id: created.id,
        data: {
          name: svc.name.fr,
        },
        locale: "fr",
      });

      payload.logger.info(`Created service: ${svc.name.en}`);

      // --- Versions for this service ---

      for (const versionData of svc.versions) {
        const newVersion = await payload.create({
          collection: "versions",
          data: {
            service: created.id,
            ...versionData.en,
          },
          locale: "en",
        });

        // Merge auto-generated IDs from the created version into the French data
        // so Payload updates existing array/block items instead of replacing them
        const frData = mergeIds(
          newVersion as unknown as Record<string, unknown>,
          versionData.fr as Record<string, unknown>,
        );

        await payload.update({
          collection: "versions",
          id: newVersion.id,
          data: frData,
          locale: "fr",
        });

        payload.logger.info(
          `  Created version ${versionData.en.version} (${versionData.en.status})`,
        );
      }

      // Set publishedVersion on the service to the first published version
      const published = await payload.find({
        collection: "versions",
        where: {
          and: [
            { service: { equals: created.id } },
            { status: { equals: "published" } },
          ],
        },
        limit: 1,
      });

      if (published.docs.length > 0) {
        await payload.update({
          collection: "services",
          id: created.id,
          data: {
            publishedVersion: published.docs[0].id,
          },
        });
        payload.logger.info(
          `  Set publishedVersion to version ${published.docs[0].version}`,
        );
      }
    }
  }

  payload.logger.info("Seeding complete.");
  process.exit(0);
}

await seed();
