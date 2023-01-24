import { DateTime } from 'luxon';
import validator from 'validator';
import { IAddedCoin } from '../components/calculateYield';
import { MIN_INVEST_DATE } from '../constants';

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
    (validator.isNumeric(value) && Number(value) >= 100000 && Number(value) <= 999999) ||
    'Number range from 100000 to 999999.',
};

export const mounthlyValidation = {
  required: true,
  validate: (value: string) => {
    const isValidNumber = validator.isInt(value) && Number(value) >= 1 && Number(value) <= 1000000;
    return isValidNumber || 'Value must be an integer and be between 1 and 1000000.';
  },
};

export const startDateValidation = {
  required: true,
  validate: (value: string) => {
    const inputDate = DateTime.fromFormat(value, 'y-LL-dd');
    const minDate = DateTime.fromFormat(MIN_INVEST_DATE, 'y-LL-dd');

    const isValidDate =
      inputDate.toMillis() >= minDate.toMillis() &&
      inputDate.toMillis() <= DateTime.now().toMillis();

    return (
      isValidDate ||
      `Date must be between 01/01/2023 and today (${DateTime.now().toFormat('LL/d/y')}).`
    );
  },
};

export const addedCoinsValidation = {
  required: true,
  minLength: 1,
  maxLength: 10,
  validate: (addedCoins: IAddedCoin[]) => {
    const totalPercent = addedCoins.reduce((acc, { percent }) => acc + Number(percent) || 0, 0);
    return !Boolean(totalPercent >= 100.1 || totalPercent <= 99.9);
  },
};
