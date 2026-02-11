import { CollectionBeforeDeleteHook } from "payload";

export const deleteRelatedDocs: CollectionBeforeDeleteHook = async ({
  id,
  req,
}) => {
  await req.payload.delete({
    collection: "versions",
    where: { service: { equals: id } },
    req,
  });

  await req.payload.delete({
    collection: "contributors",
    where: { service: { equals: id } },
    req,
  });
};
