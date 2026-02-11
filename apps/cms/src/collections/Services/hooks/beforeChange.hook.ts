import { CollectionBeforeChangeHook } from "payload";

export const generateSlug: CollectionBeforeChangeHook = async ({
  data,
  operation,
}) => {
  if (operation === "create" && data?.name) {
    data.slug = data.name
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_]+/g, "-")
      .replace(/-+/g, "-");
  }
  return data;
};
