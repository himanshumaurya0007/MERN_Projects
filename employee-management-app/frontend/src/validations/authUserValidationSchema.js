import * as Yup from 'yup';

import { fields } from '../utils/fields';
import { errorMessages } from '../utils/errorMessages';
import { emailRegex, passwordRegex } from '../utils/regex';

export const authUserValidationSchema = Yup.object().shape({
  email: Yup.string()
    .matches(emailRegex, errorMessages.EMAIL_INVALID)
    .trim()
    .lowercase()
    .required(errorMessages.REQUIRED(fields.email)),

  password: Yup.string()
    .matches(passwordRegex, errorMessages.PASSWORD_INVALID)
    .min(8, errorMessages.MIN_LENGTH(fields.password, 8))
    .max(100, errorMessages.MAX_LENGTH(fields.password, 100))
    .trim()
    .required(errorMessages.REQUIRED(fields.password)),
});