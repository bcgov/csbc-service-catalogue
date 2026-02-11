import { TextFieldValidation } from "payload";

export const validateE164: TextFieldValidation = (value) => {
  if (!value) return true;
  if (/^\+[1-9]\d{1,14}$/.test(value)) return true;
  return "Please enter a valid E.164 phone number (e.g. +12505551234)";
};
