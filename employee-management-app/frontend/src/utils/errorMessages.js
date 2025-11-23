export const errorMessages = {
  REQUIRED: (field) => `${field} is required`,
  STRING_BASE: (field) => `${field} must be a string.`,
  MIN_LENGTH: (field, min) => `${field} must be at least ${min} characters`,
  MAX_LENGTH: (field, max) => `${field} must be at most ${max} characters`,

  TYPE: (field, type) => `${field} must be a ${type}.`,
  ENUM: (field) => `${field} has an invalid value`,

  EMAIL_INVALID: "Email must be a valid email address",
  PASSWORD_INVALID: "Password must include at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character",

  PHONE_INVALID: "Phone must be 10 digits",
  PINCODE_INVALID: "Pincode must be 6 digits",
};
