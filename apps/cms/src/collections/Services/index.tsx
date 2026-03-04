import { CollectionConfig } from "payload";

import { createInitialVersionAndOwner } from "./hooks/afterChange.hook";
import { generateSlug } from "./hooks/beforeChange.hook";
import { deleteRelatedDocs } from "./hooks/beforeDelete.hook";

const Services: CollectionConfig = {
  slug: "services",
  admin: {
    defaultColumns: ["name", "organizationId", "createdAt", "updatedAt"],
    useAsTitle: "name",
  },
  hooks: {
    afterChange: [createInitialVersionAndOwner],
    beforeChange: [generateSlug],
    beforeDelete: [deleteRelatedDocs],
  },
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: "General Details",
          fields: [
            {
              name: "name",
              label: "Name",
              type: "text",
              required: true,
              localized: true,
            },
            {
              name: "slug",
              label: "Slug",
              type: "text",
              unique: true,
              admin: {
                readOnly: true,
                condition: (data) => !!data?.id,
              },
              access: {
                update: () => false,
              },
            },
            {
              name: "description",
              label: "Internal Description",
              type: "textarea",
              admin: {
                description: "This field is not visible to end users.",
              },
            },
            {
              name: "organizationId",
              label: "Primary Organization",
              type: "text",
              admin: {
                components: {
                  Field:
                    "./src/components/fields/OrganizationSelect.tsx#OrganizationSelect",
                  Cell: "./src/components/fields/OrganizationCell.tsx#OrganizationCell",
                },
              },
            },
            {
              name: "supportingOrganizationIds",
              label: "Supporting organizations",
              type: "text",
              admin: {
                components: {
                  Field:
                    "./src/components/fields/OrganizationSelect.tsx#OrganizationSelect",
                  Cell: "./src/components/fields/OrganizationCell.tsx#OrganizationCell",
                },
              },
              hasMany: true,
            },
            {
              name: "publishedVersion",
              label: "Published Version",
              type: "relationship",
              relationTo: "versions",
              admin: {
                readOnly: true,
                condition: (data) => !!data?.id,
                hidden: true,
              },
            },
            {
              name: "versions",
              label: "Versions",
              type: "join",
              collection: "versions",
              on: "service",
              admin: {
                allowCreate: true,
                condition: (data) => !!data?.id,
              },
            },
          ],
        },
        {
          label: "Settings",
          fields: [
            {
              name: "settings",
              label: "",
              type: "group",
              fields: [
                {
                  name: "contributors",
                  label: "Contributors",
                  type: "join",
                  collection: "contributors",
                  on: "service",
                  admin: {
                    condition: (data) => !!data?.id,
                    defaultColumns: ["user", "role", "createdAt"],
                  },
                },
                {
                  name: "consent",
                  labels: {
                    singular: "Consent Document",
                    plural: "Consent Documents",
                  },
                  type: "array",
                  admin: {
                    description:
                      "Add Consent Documents by ID. Visit the Consent Manager to identify the Consent Document.",
                    components: {
                      RowLabel:
                        "./src/components/fields/ConsentRowLabel.tsx#ConsentRowLabel",
                    },
                  },
                  fields: [
                    {
                      name: "documentId",
                      label: "Document ID",
                      type: "text",
                      required: true,
                      admin: {
                        components: {
                          Field:
                            "./src/components/fields/ConsentDocumentField.tsx#ConsentDocumentField",
                        },
                      },
                    },
                  ],
                },
                {
                  name: "delegate",
                  label: "Delegates",
                  type: "group",
                  admin: {
                    hideGutter: true,
                    hidden: true,
                  },
                  fields: [
                    {
                      name: "access",
                      label: "Delegate Access",
                      type: "checkbox",
                      admin: {
                        description:
                          "When enabled, applicants can authorize a delegate to help manage this service.",
                      },
                      defaultValue: true,
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};

export default Services;
