import type { Version, Service } from "../../../../../../payload-types";

export type ServiceDoc = Omit<Service, "publishedVersion"> & {
  publishedVersion: Version | string | null;
};

export function mapService(service: ServiceDoc) {
  const version = service.publishedVersion as Version;
  return {
    id: service.id,
    organizationId: service.organizationId,
    versionId: version.id,
    name: service.name,
    slug: service.slug,
    application: version.application,
    categories: version.categories,
    description: version.description,
    contactMethods: version.resources?.contactMethods,
    content: version.content,
    faq: version.faq,
    resources: version.resources,
    publishedAt: version.publishedAt,
    updatedAt: version.updatedAt,
    createdAt: version.createdAt,
    settings: service.settings,
  };
}
