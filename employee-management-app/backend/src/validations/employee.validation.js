import Joi from "joi";
import mongoose from "mongoose";

import {
  emailRegex,
  phoneRegex,
  pinCodeRegex
} from "../utils/regex.js";
import { errorMessages } from "../utils/errorMessages.js";
import { fields } from "../utils/fields.js";
import { GENDER } from "../constants.js";

const objectIdValidator = (field) =>
  Joi.string()
    .custom((value, helpers) => {
      if (!mongoose.Types.ObjectId.isValid(value)) {
        return helpers.error("any.invalid");
      }
      return value;
    })
    .messages({
      "any.invalid": errorMessages.OBJECT_ID_INVALID(fields),
      "string.base": errorMessages.TYPE(fields, "string"),
      "string.empty": errorMessages.REQUIRED(fields),
    });

export const employeeValidationSchema = Joi.object({
  profilePic: Joi.string()
    .uri()
    .allow("")
    .optional(),

  name: Joi.string()
    .min(3)
    .max(50)
    .required()
    .messages({
      "string.base": errorMessages.TYPE(fields.name, "string"),
      "string.empty": errorMessages.REQUIRED(fields.name),
      "string.min": errorMessages.MIN_LENGTH(fields.name, 3),
      "string.max": errorMessages.MAX_LENGTH(fields.name, 50),
      "any.required": errorMessages.REQUIRED(fields.name),
    }),

  email: Joi.string()
    .trim()
    .lowercase()
    .pattern(emailRegex)
    .required()
    .messages({
      "string.base": errorMessages.TYPE(fields.email, "string"),
      "string.empty": errorMessages.REQUIRED(fields.email),
      "string.pattern.base": errorMessages.EMAIL_INVALID,
      "any.required": errorMessages.REQUIRED(fields.email),
    }),

  phone: Joi.string()
    .pattern(phoneRegex)
    .required()
    .messages({
      "string.base": errorMessages.TYPE(fields.phone, "string"),
      "string.empty": errorMessages.REQUIRED(fields.phone),
      "string.pattern.base": errorMessages.PHONE_INVALID,
      "any.required": errorMessages.REQUIRED(fields.phone),
    }),

  gender: Joi.string()
    .uppercase()
    .valid(...GENDER)
    .required()
    .messages({
      "string.base": errorMessages.TYPE(fields.gender, "string"),
      "any.only": `Invalid ${fields.gender}`,
      "string.empty": errorMessages.REQUIRED(fields.gender),
      "any.required": errorMessages.REQUIRED(fields.gender),
    }),

  department: objectIdValidator(fields.department)
    .required(),

  state: objectIdValidator(fields.state)
    .required(),

  city: objectIdValidator(fields.city)
    .required(),
    
  pincode: Joi.string()
    .trim()
    .pattern(pinCodeRegex)
    .required()
    .messages({
      "string.base": errorMessages.TYPE(fields.pincode, "string"),
      "string.empty": errorMessages.REQUIRED(fields.pincode),
      "string.pattern.base": errorMessages.PINCODE_INVALID,
      "any.required": errorMessages.REQUIRED(fields.pincode),
    }),

  address: Joi.string()
    .trim()
    .min(3)
    .max(200)
    .required()
    .messages({
      "string.base": errorMessages.TYPE(fields.address, "string"),
      "string.empty": errorMessages.REQUIRED(fields.address),
      "string.min": errorMessages.MIN_LENGTH(fields.address, 3),
      "string.max": errorMessages.MAX_LENGTH(fields.address, 200),
      "any.required": errorMessages.REQUIRED(fields.address),
    }),

  isPermanent: Joi.boolean()
    .default(false),
});
