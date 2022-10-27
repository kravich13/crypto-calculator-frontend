import validator from 'validator';

export const emailValidation = {
  required: true,
  validate: (value: string) => validator.isEmail(value) || 'The email is incorrect.',
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
    (validator.isNumeric(value) && Number(value) >= 100000 && Number(value) <= 999999) ||
    'Number range from 100000 to 999999.',
};
