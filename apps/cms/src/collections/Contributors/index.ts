import { CollectionConfig } from "payload";
import { generateId } from "../hooks/generateId.hook";

const Contributors: CollectionConfig = {
  slug: "contributors",
  admin: {
    defaultColumns: ["user", "service", "role", "createdAt"],
    hidden: true,
  },
  fields: [
    {
      name: "id",
      type: "text",
      admin: { hidden: true },
      hooks: {
        beforeValidate: [generateId],
      },
    },
    {
      name: "service",
      label: "Service",
      type: "relationship",
      relationTo: "services",
      required: true,
    },
    {
      name: "user",
      label: "User",
      type: "relationship",
      relationTo: "users",
      required: true,
    },
    {
      name: "role",
      label: "Role",
      type: "select",
      required: true,
      defaultValue: "viewer",
      options: [
        {
          label: "Owner",
          value: "owner",
        },
        {
          label: "Editor",
          value: "editor",
        },
        {
          label: "Viewer",
          value: "viewer",
        },
      ],
    },
  ],
};

export default Contributors;
