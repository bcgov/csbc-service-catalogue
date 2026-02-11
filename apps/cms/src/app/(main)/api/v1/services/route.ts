import { getPayload } from "payload";
import config from "@payload-config";
import { NextRequest, NextResponse } from "next/server";
import { mapService, ServiceDoc } from "./mapService";

export async function GET(req: NextRequest) {
  const payload = await getPayload({ config });

  const url = new URL(req.url);
  const limit = Math.max(1, parseInt(url.searchParams.get("limit") ?? "10", 10) || 10);
  const page = Math.max(1, parseInt(url.searchParams.get("page") ?? "1", 10) || 1);

  const result = await payload.find({
    collection: "services",
    where: {
      publishedVersion: { exists: true },
    },
    limit,
    page,
    depth: 0,
    overrideAccess: true,
  });

  const versionIds = result.docs
    .map((doc) => doc.publishedVersion)
    .filter(Boolean) as string[];

  const versionsResult = versionIds.length > 0
    ? await payload.find({
        collection: "versions",
        where: { id: { in: versionIds } },
        limit: versionIds.length,
        depth: 0,
        overrideAccess: true,
      })
    : { docs: [] };

  const versionsById = new Map(
    versionsResult.docs.map((v) => [v.id, v]),
  );

  const docs = result.docs
    .filter((service) => versionsById.has(service.publishedVersion as string))
    .map((service) =>
      mapService({
        ...service,
        publishedVersion: versionsById.get(service.publishedVersion as string),
      } as ServiceDoc),
    );

  return NextResponse.json({
    docs,
    totalDocs: result.totalDocs,
    limit: result.limit,
    totalPages: result.totalPages,
    page: result.page,
    pagingCounter: result.pagingCounter,
    hasPrevPage: result.hasPrevPage,
    hasNextPage: result.hasNextPage,
    prevPage: result.prevPage,
    nextPage: result.nextPage,
  });
}
