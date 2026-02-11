import { getPayload } from "payload";
import config from "@payload-config";
import { NextRequest, NextResponse } from "next/server";
import { mapService, ServiceDoc } from "../mapService";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const payload = await getPayload({ config });

  const result = await payload.find({
    collection: "services",
    where: {
      slug: { equals: slug },
      publishedVersion: { exists: true },
    },
    limit: 1,
    depth: 0,
    overrideAccess: true,
  });

  const service = result.docs[0];
  if (!service) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const versionResult = await payload.findByID({
    collection: "versions",
    id: service.publishedVersion as string,
    depth: 0,
    overrideAccess: true,
  });

  if (!versionResult) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(
    mapService({
      ...service,
      publishedVersion: versionResult,
    } as ServiceDoc),
  );
}
