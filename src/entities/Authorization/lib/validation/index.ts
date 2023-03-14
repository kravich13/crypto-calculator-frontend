import { EMAIL_CODE_MAX, EMAIL_CODE_MIN } from '@cc/shared/const';
import validator from 'validator';

export const emailValidation = {
  required: true,
  validate: (value: string) => validator.isEmail(value) || 'The email is incorrect.',
};

export const logInPasswordValidation = {
  required: true,
  validate: (value: string) => !validator.isEmpty(value) || 'Cannot be empty.',
};

export const passwordValidation = {
  required: true,
  validate: (value: string) =>
    validator.matches(value, /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{8,256}/) ||
    'Must be at least 8 characters long, including uppercase and lowercase letters and one number.',
};

export const emailCodeValidation = {
  required: true,
  validate: (value: string) =>
    (validator.isNumeric(value) &&
      Number(value) >= EMAIL_CODE_MIN &&
      Number(value) <= EMAIL_CODE_MAX) ||
    `Number range from ${EMAIL_CODE_MIN} to ${EMAIL_CODE_MAX}.`,
};
