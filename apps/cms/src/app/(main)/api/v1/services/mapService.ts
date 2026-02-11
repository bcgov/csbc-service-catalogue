interface VersionDoc {
  id: string;
  version: number;
  applications: unknown;
  categories: unknown;
  description: unknown;
  contactMethods: unknown;
  content: unknown;
  faq: unknown;
  resources: unknown;
  publishedAt: string;
  updatedAt: string;
  createdAt: string;
}

export interface ServiceDoc {
  id: string;
  organizationId: string;
  name: string;
  slug: string;
  publishedVersion: VersionDoc | string | null;
  settings: unknown;
}

export function mapService(service: ServiceDoc) {
  const version = service.publishedVersion as VersionDoc;
  return {
    id: service.id,
    organizationId: service.organizationId,
    versionId: version.id,
    name: service.name,
    slug: service.slug,
    version: version.version,
    applications: version.applications,
    categories: version.categories,
    description: version.description,
    contactMethods: version.contactMethods,
    content: version.content,
    faq: version.faq,
    resources: version.resources,
    publishedAt: version.publishedAt,
    updatedAt: version.updatedAt,
    createdAt: version.createdAt,
    settings: service.settings,
  };
}
