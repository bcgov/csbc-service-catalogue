import { TextFieldValidation } from "payload";

export const validateUrl: TextFieldValidation = (value) => {
  if (!value) return true;
  try {
    new URL(value);
    return true;
  } catch {
    return "Please enter a valid URL";
  }
};
