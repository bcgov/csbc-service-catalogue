import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import path from "path";
import { buildConfig } from "payload";
import sharp from "sharp";
import { fileURLToPath } from "url";
import Contributors from "./src/collections/Contributors";
import Services from "./src/collections/Services";
import Users from "./src/collections/Users";
import Versions from "./src/collections/Versions";
import { keycloakPlugin } from "./src/plugins/keycloak/keycloak.plugin";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  localization: {
    locales: [
      { label: "English", code: "en" },
      { label: "Français", code: "fr" },
    ],
    defaultLocale: "en",
    fallback: true,
  },
  editor: lexicalEditor(),
  admin: {
    components: {
      afterLogin: [
        "./src/plugins/keycloak/components/keycloak-login-button.component.tsx#KeycloakLoginButton",
      ],
    },
    importMap: {
      baseDir: path.resolve(dirname),
    },
    user: Users.slug,
  },
  collections: [Users, Services, Versions, Contributors],
  db: postgresAdapter({
    allowIDOnCreate: true,
    idType: "uuid",
    pool: {
      connectionString: process.env.DATABASE_URI || "",
    },
  }),
  plugins: [keycloakPlugin],
  secret: process.env.PAYLOAD_SECRET || "",
  sharp,
});
