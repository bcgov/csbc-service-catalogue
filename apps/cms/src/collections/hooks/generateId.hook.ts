import { FieldHook } from "payload";

export const generateId: FieldHook = ({ operation, value }) =>
  operation === "create" ? crypto.randomUUID() : value;
