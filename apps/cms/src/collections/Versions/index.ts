import { CollectionConfig } from "payload";

import { validateE164 } from "../hooks/validateE164.hook";
import { validateUrl } from "../hooks/validateUrl.hook";
import { assignVersionNumber, deriveStatus } from "./hooks/beforeChange.hooks";

const Versions: CollectionConfig = {
  slug: "versions",
  admin: {
    components: {
      edit: {
        beforeDocumentControls: [
          "./src/components/VersionBadge.tsx#VersionBadge",
          "./src/components/StatusBadge.tsx#StatusBadge",
          "./src/components/ArchiveButton.tsx#ArchiveButton",
          "./src/components/PublishButton.tsx#PublishButton",
          "./src/components/EditButton.tsx#EditButton",
        ],
        editMenuItems: [
          "./src/components/CreateNewVersionMenuItem.tsx#CreateNewVersionMenuItem",
        ],
      },
    },

    defaultColumns: [
      "service",
      "version",
      "status",
      "publishedAt",
      "archivedAt",
      "createdAt",
      "updatedAt",
    ],
    hidden: true,
  },
  hooks: {
    beforeChange: [assignVersionNumber, deriveStatus],
  },
  fields: [
    {
      name: "formLock",
      type: "ui",
      admin: {
        components: {
          Field: "./src/components/FormLock.tsx#FormLock",
        },
      },
    },
    {
      type: "tabs",
      tabs: [
        {
          label: "General Details",
          fields: [
            {
              label: "Categories",
              type: "group",
              admin: {
                description:
                  "Select all categories which apply to this service.",
              },
              fields: [
                {
                  name: "categories",
                  label: "",
                  type: "select",
                  admin: {
                    placeholder: "Select categories",
                  },
                  hasMany: true,
                  localized: true,
                  options: [
                    {
                      label: {
                        en: "Culture",
                      },
                      value: "culture",
                    },
                    {
                      label: {
                        en: "Education",
                      },
                      value: "education",
                    },
                    {
                      label: {
                        en: "Employment",
                      },
                      value: "employment",
                    },
                    {
                      label: {
                        en: "Family",
                      },
                      value: "family",
                    },
                    {
                      label: {
                        en: "Financial",
                      },
                      value: "financial",
                    },
                    {
                      label: {
                        en: "Health",
                      },
                      value: "health",
                    },
                    {
                      label: {
                        en: "Housing",
                      },
                      value: "housing",
                    },
                    {
                      label: {
                        en: "Legal",
                      },
                      value: "legal",
                    },
                    {
                      label: {
                        en: "Personal",
                      },
                      value: "personal",
                    },
                    {
                      label: {
                        en: "Social",
                      },
                      value: "social",
                    },
                  ],
                },
              ],
            },
            {
              name: "description",
              label: "Description",
              type: "group",
              fields: [
                {
                  name: "short",
                  label: "Short",
                  type: "text",
                  localized: true,
                },
                {
                  name: "long",
                  label: "Long",
                  type: "textarea",
                  localized: true,
                },
              ],
            },
            {
              label: "Service Details",
              type: "group",
              admin: {
                description: "Add detailed information about the service.",
              },
              fields: [
                {
                  name: "content",
                  type: "richText",
                  localized: true,
                },
              ],
            },
            {
              name: "application",
              label: "Application",
              type: "group",
              admin: {
                description: "Connect an application to this service.",
              },
              fields: [
                {
                  name: "description",
                  label: "Description",
                  type: "richText",
                  localized: true,
                },
                {
                  name: "applications",
                  label: "Application Type",
                  type: "blocks",
                  blocks: [
                    {
                      slug: "form",
                      fields: [
                        {
                          name: "online",
                          label: "Online Application",
                          type: "array",
                          admin: {
                            description:
                              "If applicable, add a downloadable application.",
                          },
                          defaultValue: {
                            label: null,
                            description: null,
                            apiKey: null,
                            formId: null,
                            url: null,
                          },
                          fields: [
                            {
                              name: "label",
                              label: "Label",
                              type: "text",
                              localized: true,
                            },
                            {
                              name: "description",
                              label: "Description",
                              type: "text",
                              localized: true,
                            },
                            {
                              name: "apiKey",
                              label: "API Key",
                              type: "text",
                              localized: true,
                            },
                            {
                              name: "formId",
                              label: "Form ID",
                              type: "text",
                              localized: true,
                            },
                            {
                              name: "url",
                              label: "Form Server URL",
                              type: "text",
                              required: false,
                              validate: validateUrl,
                              localized: true,
                            },
                          ],
                          maxRows: 1,
                        },
                        {
                          name: "download",
                          label: "Download & Submit Application",
                          type: "array",
                          admin: {
                            description:
                              "If applicable, add a downloadable application.",
                          },
                          fields: [
                            {
                              label: "Download & submit details",
                              type: "collapsible",
                              fields: [
                                {
                                  name: "label",
                                  label: "Label",
                                  type: "text",
                                  localized: true,
                                },
                                {
                                  name: "description",
                                  label: "Description",
                                  type: "text",
                                  localized: true,
                                },
                                {
                                  name: "url",
                                  label: "Form URL",
                                  type: "text",
                                  required: false,
                                  validate: validateUrl,
                                  localized: true,
                                },
                              ],
                            },
                          ],
                          maxRows: 1,
                        },
                      ],
                    },
                    {
                      slug: "link",
                      fields: [
                        {
                          name: "label",
                          label: "Label",
                          type: "text",
                          localized: true,
                        },
                        {
                          name: "description",
                          label: "Description",
                          type: "text",
                          localized: true,
                        },
                        {
                          name: "url",
                          label: "Url",
                          type: "text",
                          validate: validateUrl,
                          localized: true,
                        },
                      ],
                    },
                    {
                      slug: "workflow",
                      fields: [
                        {
                          name: "label",
                          label: "Label",
                          type: "text",
                          localized: true,
                        },
                        {
                          name: "description",
                          label: "Description",
                          type: "text",
                          localized: true,
                        },
                        {
                          name: "method",
                          label: "HTTP Method",
                          type: "select",
                          options: ["GET", "POST"],
                          localized: true,
                        },
                        {
                          name: "url",
                          label: "Url",
                          type: "text",
                          validate: validateUrl,
                          localized: true,
                        },
                      ],
                    },
                  ],
                  maxRows: 1,
                },
              ],
            },
          ],
        },
        {
          name: "eligibilityCriteria",
          label: "Eligibility Criteria",
          admin: {
            description:
              "Details you provide here will help users find your service.",
          },
          fields: [
            {
              name: "age",
              label: "Age",
              type: "group",
              admin: {
                description:
                  "If the service has any age requirements, add them below.",
              },
              fields: [
                {
                  name: "description",
                  label: "Description",
                  type: "text",
                  localized: true,
                },
                {
                  name: "values",
                  label: "",
                  type: "group",
                  admin: {
                    hideGutter: true,
                  },
                  fields: [
                    {
                      type: "row",
                      fields: [
                        {
                          name: "min",
                          label: "Minimum age",
                          type: "number",
                        },
                        {
                          name: "max",
                          label: "Maximum age",
                          type: "number",
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              name: "employment",
              label: "Employment Status",
              type: "group",
              admin: {
                description:
                  "If the service has any employment requirements, add them below.",
              },
              fields: [
                {
                  name: "description",
                  label: "Description",
                  type: "text",
                  localized: true,
                },
                {
                  name: "values",
                  label: "Applicable Values",
                  type: "select",
                  admin: {
                    description:
                      "Select all values which apply to this service.",
                  },
                  hasMany: true,
                  localized: true,
                  options: [
                    {
                      label: "Employed (Full Time)",
                      value: "employed-full-time",
                    },
                    {
                      label: "Employed (Part Time)",
                      value: "employed-part-time",
                    },
                    { label: "Self-employed", value: "self-employed" },
                    { label: "Unemployed", value: "unemployed" },
                  ],
                },
              ],
            },
            {
              name: "housing",
              label: "Shelter Status",
              type: "group",
              admin: {
                description:
                  "If the service has any shelter requirements, add them below.",
              },
              fields: [
                {
                  name: "description",
                  label: "Description",
                  type: "text",
                  localized: true,
                },
                {
                  name: "values",
                  label: "Applicable Values",
                  type: "select",
                  admin: {
                    description:
                      "Select all values which apply to this service.",
                  },
                  hasMany: true,
                  localized: true,
                  options: [
                    { label: "Home Owner", value: "home-owner" },
                    { label: "Renter", value: "renter" },
                    {
                      label: "Living in subisidized housing",
                      value: "subsidized-housing",
                    },
                    {
                      label: "Staying in temporary accommodation",
                      value: "temporary-accommodation",
                    },
                    { label: "Unhoused", value: "unhoused" },
                  ],
                },
              ],
            },
            {
              name: "income",
              label: "Income level",
              type: "group",
              admin: {
                description:
                  "If the service has any income level requirements, add them below.",
              },
              fields: [
                {
                  name: "description",
                  label: "Description",
                  type: "text",
                  localized: true,
                },
                {
                  name: "household",
                  label: "Household",
                  type: "group",
                  admin: {
                    hideGutter: true,
                  },
                  fields: [
                    {
                      type: "row",
                      fields: [
                        {
                          name: "min",
                          label: "Minimum household income",
                          type: "number",
                        },
                        {
                          name: "max",
                          label: "Maximum household income",
                          type: "number",
                        },
                      ],
                    },
                  ],
                },
                {
                  name: "personal",
                  label: "Personal",
                  type: "group",
                  admin: {
                    hideGutter: true,
                  },
                  fields: [
                    {
                      type: "row",
                      fields: [
                        {
                          name: "min",
                          label: "Minimum personal income",
                          type: "number",
                        },
                        {
                          name: "max",
                          label: "Maximum personal income",
                          type: "number",
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              name: "relationship",
              label: "Relationship Status",
              type: "group",
              admin: {
                description:
                  "If the service has any relationship requirements, add them below",
              },
              fields: [
                {
                  name: "description",
                  label: "Description",
                  type: "text",
                  localized: true,
                },
                {
                  name: "values",
                  label: "Applicable Values",
                  type: "select",
                  admin: {
                    description:
                      "Select all values which apply to this service.",
                  },
                  hasMany: true,
                  localized: true,
                  options: [
                    { label: "Married", value: "married" },
                    { label: "Common-law", value: "common-law" },
                    { label: "Separated", value: "separated" },
                    { label: "Divorced", value: "divorced" },
                    { label: "Single", value: "single" },
                  ],
                },
              ],
            },
            {
              name: "residency",
              label: "Residency Status",
              type: "group",
              admin: {
                description:
                  "If the service has any residency requirements, add them below.",
              },
              fields: [
                {
                  name: "description",
                  label: "Description",
                  type: "text",
                  localized: true,
                },
                {
                  name: "values",
                  label: "Applicable Values",
                  type: "select",
                  admin: {
                    description:
                      "Select all values which apply to this service.",
                  },
                  hasMany: true,
                  options: [
                    { label: "Citizen", value: "citizen" },
                    {
                      label: "Permanent Resident",
                      value: "permanent-resident",
                    },
                    { label: "Work Permit", value: "work-permit" },
                    { label: "Student Permit", value: "student-permit" },
                    {
                      label: "Temporary Resident",
                      value: "temporary-resident",
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: "Additional Details",
          fields: [
            {
              name: "faq",
              label: "Frequently Asked Questions",
              type: "array",
              admin: {
                description:
                  "Provide quick solutions to commonly asked questions.",
              },
              fields: [
                {
                  name: "question",
                  label: "Question",
                  type: "text",
                  localized: true,
                },
                {
                  name: "answer",
                  label: "Answer",
                  type: "textarea",
                  localized: true,
                },
              ],
            },
            {
              name: "resources",
              label: "Resources",
              type: "group",
              admin: {
                description:
                  "Add resources which can provide more detailed information about the service.",
              },
              fields: [
                {
                  name: "applicationSupport",
                  label: "Application support",
                  type: "array",
                  fields: [
                    {
                      name: "label",
                      label: "Label",
                      type: "text",
                      required: true,
                      localized: true,
                    },
                    {
                      name: "description",
                      label: "Description",
                      type: "text",
                      localized: true,
                    },
                    {
                      name: "value",
                      label: "URL",
                      type: "text",
                      required: true,
                      validate: validateUrl,
                      localized: true,
                    },
                  ],
                },
                {
                  name: "contactMethods",
                  label: "Contact Methods",
                  type: "group",
                  admin: {
                    description:
                      "Add contact methods for users to communicate about the service.",
                    hideGutter: true,
                  },
                  fields: [
                    {
                      name: "address",
                      label: "Addresses",
                      type: "array",
                      fields: [
                        {
                          name: "label",
                          label: "Label",
                          type: "text",
                          required: true,
                          localized: true,
                        },
                        {
                          name: "description",
                          label: "Description",
                          type: "text",
                          localized: true,
                        },
                        {
                          name: "addressOne",
                          label: "Address Line 1",
                          type: "text",
                          required: true,
                          localized: true,
                        },
                        {
                          name: "addressTwo",
                          label: "Address Line 2",
                          type: "text",
                          localized: true,
                        },
                        {
                          name: "city",
                          label: "City",
                          type: "text",
                          required: true,
                          localized: true,
                        },
                        {
                          name: "province",
                          label: "Province",
                          type: "text",
                          required: true,
                          localized: true,
                        },
                        {
                          name: "country",
                          label: "Country",
                          type: "text",
                          required: true,
                          localized: true,
                        },
                      ],
                    },
                    {
                      name: "email",
                      label: "Emails",
                      type: "array",
                      fields: [
                        {
                          name: "label",
                          label: "Label",
                          type: "text",
                          required: true,
                          localized: true,
                        },
                        {
                          name: "description",
                          label: "Description",
                          type: "text",
                          localized: true,
                        },
                        {
                          name: "value",
                          label: "Email",
                          type: "email",
                          required: true,
                          localized: true,
                        },
                      ],
                    },
                    {
                      name: "fax",
                      label: "Faxes",
                      type: "array",
                      fields: [
                        {
                          name: "label",
                          label: "Label",
                          type: "text",
                          required: true,
                          localized: true,
                        },
                        {
                          name: "description",
                          label: "Description",
                          type: "text",
                          localized: true,
                        },
                        {
                          name: "value",
                          label: "Fax Number",
                          type: "text",
                          required: true,
                          validate: validateE164,
                          localized: true,
                        },
                      ],
                    },
                    {
                      name: "phone",
                      label: "Phones",
                      type: "array",
                      fields: [
                        {
                          name: "label",
                          label: "Label",
                          type: "text",
                          required: true,
                          localized: true,
                        },
                        {
                          name: "description",
                          label: "Description",
                          type: "text",
                          localized: true,
                        },
                        {
                          name: "value",
                          label: "Phone Number",
                          type: "text",
                          required: true,
                          validate: validateE164,
                          localized: true,
                        },
                      ],
                    },
                    {
                      name: "web",
                      label: "Websites",
                      type: "array",
                      fields: [
                        {
                          name: "label",
                          label: "Label",
                          type: "text",
                          required: true,
                          localized: true,
                        },
                        {
                          name: "description",
                          label: "Description",
                          type: "text",
                          localized: true,
                        },
                        {
                          name: "value",
                          label: "URL",
                          type: "text",
                          required: true,
                          validate: validateUrl,
                          localized: true,
                        },
                      ],
                    },
                  ],
                },
                {
                  name: "legal",
                  label: "Legal Information",
                  type: "array",
                  fields: [
                    {
                      name: "label",
                      label: "Label",
                      type: "text",
                      required: true,
                      localized: true,
                    },
                    {
                      name: "value",
                      label: "URL",
                      type: "text",
                      required: true,
                      validate: validateUrl,
                      localized: true,
                    },
                  ],
                },
                {
                  name: "otherServices",
                  label: "Other Services",
                  admin: {
                    description: "",
                    hideGutter: true,
                  },
                  type: "group",
                  fields: [
                    {
                      name: "recommendedServices",
                      type: "relationship",
                      relationTo: "services",
                      hasMany: true,
                      admin: {
                        components: {
                          Field:
                            "./src/components/fields/ServiceRelationshipSelect.tsx#ServiceRelationshipSelect",
                        },
                      },
                    },
                    {
                      name: "relatedServices",
                      type: "relationship",
                      relationTo: "services",
                      hasMany: true,
                      admin: {
                        components: {
                          Field:
                            "./src/components/fields/ServiceRelationshipSelect.tsx#ServiceRelationshipSelect",
                        },
                      },
                    },
                  ],
                },
                {
                  name: "recommendedReading",
                  type: "array",
                  admin: {
                    description: "",
                  },
                  fields: [
                    {
                      name: "label",
                      label: "Label",
                      type: "text",
                      localized: true,
                    },
                    {
                      name: "url",
                      label: "Url",
                      type: "text",
                      validate: validateUrl,
                      localized: true,
                    },
                  ],
                },
              ],
            },
            {
              name: "publishedAt",
              label: "Published At",
              type: "date",
              admin: {
                hidden: true,
              },
            },
            {
              name: "archivedAt",
              label: "Archived At",
              type: "date",
              admin: {
                hidden: true,
              },
            },
          ],
        },
      ],
    },
    {
      name: "service",
      label: "Service",
      type: "relationship",
      relationTo: "services",
      required: true,
      admin: {
        hidden: true,
      },
    },
    {
      name: "status",
      label: "Status",
      type: "select",
      options: [
        { label: "Draft", value: "draft" },
        { label: "Published", value: "published" },
        { label: "Archived", value: "archived" },
      ],
      defaultValue: "draft",
      admin: {
        hidden: true,
      },
    },
    {
      name: "version",
      label: "Version",
      type: "number",
      admin: {
        hidden: true,
      },
    },
  ],
};

export default Versions;
