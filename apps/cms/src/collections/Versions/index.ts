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
    {
      name: "categories",
      label: "Categories",
      type: "select",
      hasMany: true,
      options: [
        { label: "Culture", value: "culture" },
        { label: "Education", value: "education" },
        { label: "Employment", value: "employment" },
        { label: "Family", value: "family" },
        { label: "Financial", value: "financial" },
        { label: "Health", value: "health" },
        { label: "Housing", value: "housing" },
        { label: "Legal", value: "legal" },
        { label: "Personal", value: "personal" },
        { label: "Social", value: "social" },
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
        },
        {
          name: "long",
          label: "Long",
          type: "textarea",
        },
      ],
    },
    {
      name: "applications",
      type: "blocks",
      admin: {
        description: "Add applications for this service",
      },
      blocks: [
        {
          slug: "form",
          fields: [
            {
              name: "label",
              label: "Label",
              type: "text",
            },
            {
              name: "description",
              label: "Description",
              type: "text",
            },
            {
              name: "apiKey",
              label: "API Key",
              type: "text",
            },
            {
              name: "formId",
              label: "Form ID",
              type: "text",
            },
            {
              name: "url",
              label: "Form Server Url",
              type: "text",
              required: false,
              validate: validateUrl,
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
            },
            {
              name: "description",
              label: "Description",
              type: "text",
            },
            {
              name: "url",
              label: "Url",
              type: "text",
              validate: validateUrl,
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
            },
            {
              name: "description",
              label: "Description",
              type: "text",
            },
            {
              name: "method",
              label: "HTTP Method",
              type: "select",
              options: ["GET", "POST"],
            },
            {
              name: "url",
              label: "Url",
              type: "text",
              validate: validateUrl,
            },
          ],
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
      },
      fields: [
        {
          name: "address",
          label: "Addresses",
          type: "array",
          fields: [
            { name: "label", label: "Label", type: "text", required: true },
            { name: "description", label: "Description", type: "text" },
            {
              name: "addressOne",
              label: "Address Line 1",
              type: "text",
              required: true,
            },
            { name: "addressTwo", label: "Address Line 2", type: "text" },
            { name: "city", label: "City", type: "text", required: true },
            {
              name: "province",
              label: "Province",
              type: "text",
              required: true,
            },
            { name: "country", label: "Country", type: "text", required: true },
          ],
        },
        {
          name: "email",
          label: "Emails",
          type: "array",
          fields: [
            { name: "label", label: "Label", type: "text", required: true },
            { name: "description", label: "Description", type: "text" },
            { name: "value", label: "Email", type: "email", required: true },
          ],
        },
        {
          name: "fax",
          label: "Faxes",
          type: "array",
          fields: [
            { name: "label", label: "Label", type: "text", required: true },
            { name: "description", label: "Description", type: "text" },
            {
              name: "value",
              label: "Fax Number",
              type: "text",
              required: true,
              validate: validateE164,
            },
          ],
        },
        {
          name: "phone",
          label: "Phones",
          type: "array",
          fields: [
            { name: "label", label: "Label", type: "text", required: true },
            { name: "description", label: "Description", type: "text" },
            {
              name: "value",
              label: "Phone Number",
              type: "text",
              required: true,
              validate: validateE164,
            },
          ],
        },
        {
          name: "web",
          label: "Websites",
          type: "array",
          fields: [
            { name: "label", label: "Label", type: "text", required: true },
            { name: "description", label: "Description", type: "text" },
            {
              name: "value",
              label: "URL",
              type: "text",
              required: true,
              validate: validateUrl,
            },
          ],
        },
      ],
    },
    {
      label: "Content",
      type: "group",
      admin: {
        description: "Add detailed information about the service.",
      },
      fields: [
        {
          name: "content",
          label: "",
          type: "richText",
        },
      ],
    },
    // {
    //   name: "phone",
    //   label: "Phones",
    //   type: "array",
    //   fields: [
    //     { name: "label", label: "Label", type: "text", required: true },
    //     { name: "description", label: "Description", type: "text" },
    //     {
    //       name: "value",
    //       label: "Phone Number",
    //       type: "text",
    //       required: true,
    //       validate: validateE164,
    //     },
    //   ],
    // },
    {
      name: "faq",
      label: "Frequently Asked Questions",
      type: "array",
      admin: {
        description: "Provide quick solutions to commonly asked questions.",
      },
      fields: [
        { name: "question", label: "Question", type: "text" },
        { name: "answer", label: "Answer", type: "textarea" },
      ],
    },
    {
      name: "resources",
      label: "Resources",
      type: "array",
      admin: {
        description:
          "Add resources which can provide more detailed information about the service.",
      },
      fields: [
        { name: "label", label: "Label", type: "text" },
        { name: "url", label: "Url", type: "text", validate: validateUrl },
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
};

export default Versions;
