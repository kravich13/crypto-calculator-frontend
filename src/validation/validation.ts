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
