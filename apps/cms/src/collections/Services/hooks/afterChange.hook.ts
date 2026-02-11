import { CollectionAfterChangeHook } from "payload";

export const createInitialVersionAndOwner: CollectionAfterChangeHook = async ({
  doc,
  operation,
  req,
}) => {
  if (operation !== "create") return doc;

  await req.payload.create({
    collection: "versions",
    data: {
      service: doc.id,
    },
    req,
  });

  await req.payload.create({
    collection: "contributors",
    data: {
      service: doc.id,
      user: req.user!.id,
      role: "owner",
    },
    req,
  });

  return doc;
};
