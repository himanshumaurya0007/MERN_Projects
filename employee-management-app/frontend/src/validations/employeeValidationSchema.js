import * as Yup from 'yup';

import { fields } from '../utils/fields';
import { errorMessages } from '../utils/errorMessages';
import { emailRegex, phoneRegex, pinCodeRegex } from '../utils/regex';

export const employeeValidationSchema = Yup.object().shape({
    profilePic: Yup.mixed()
        .test(
            "fileType",
            "Only image files are allowed",
            (value) =>
                !value || (value && ["image/jpeg", "image/png", "image/jpg", "image/webp"].includes(value.type))
        )
        .test(
            "fileSize",
            "File size must be less than 2MB",
            (value) => !value || (value && value.size <= 2 * 1024 * 1024)
        ),

    name: Yup.string()
        .min(3, errorMessages.MIN_LENGTH(fields.name, 3))
        .max(50, errorMessages.MAX_LENGTH(fields.name, 50))
        .required(errorMessages.REQUIRED(fields.name)),

    email: Yup.string()
        .matches(emailRegex, errorMessages.EMAIL_INVALID)
        .trim()
        .lowercase()
        .required(errorMessages.REQUIRED(fields.email)),

    phone: Yup.string()
        .matches(phoneRegex, errorMessages.PHONE_INVALID)
        .required(errorMessages.REQUIRED(fields.phone)),

    gender: Yup.string()
        .oneOf(["MALE", "FEMALE", "OTHER"], `Invalid ${fields.gender}`)
        .required(errorMessages.REQUIRED(fields.gender)),

    department: Yup.string()
        .required(errorMessages.REQUIRED(fields.department)),

    state: Yup.string()
        .required(errorMessages.REQUIRED(fields.state)),

    city: Yup.string()
        .required(errorMessages.REQUIRED(fields.city)),

    pincode: Yup.string()
        .matches(pinCodeRegex, errorMessages.PINCODE_INVALID)
        .required(errorMessages.REQUIRED(fields.pincode)),

    address: Yup.string()
        .min(3, errorMessages.MIN_LENGTH(fields.address, 3))
        .max(200, errorMessages.MAX_LENGTH(fields.address, 200))
        .required(errorMessages.REQUIRED(fields.address)),

    isPermanent: Yup.boolean(),
});