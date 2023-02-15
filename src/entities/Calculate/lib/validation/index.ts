import { DateTime } from 'luxon';
import validator from 'validator';
import { ISelectedInvestCoin } from '../../types';
import { INPUT_FORMAT_DATE, MIN_INVEST_DATE } from '../const';

export const mounthlyValidation = {
  required: true,
  validate: (value: string) => {
    const isValidNumber = validator.isInt(value) && Number(value) >= 20 && Number(value) <= 1000000;
    return isValidNumber || 'Value must be an integer and be between 20 and 1000000.';
  },
} as any;

export const startDateValidation = {
  required: true,
  validate: (value: string) => {
    const inputDate = DateTime.fromFormat(value, INPUT_FORMAT_DATE);
    const minDate = DateTime.fromFormat(MIN_INVEST_DATE, INPUT_FORMAT_DATE);

    const isValidDate =
      inputDate.toMillis() >= minDate.toMillis() &&
      inputDate.toMillis() <= DateTime.now().toMillis();

    return (
      isValidDate ||
      `Date must be between 01/01/2023 and today (${DateTime.now().toFormat('LL/dd/y')}).`
    );
  },
};

export const addedCoinsValidation = {
  required: true,
  minLength: 1,
  maxLength: 10,
  validate: (addedCoins: ISelectedInvestCoin[]) => {
    const totalPercent = addedCoins.reduce((acc, { percent }) => acc + Number(percent) || 0, 0);
    return !Boolean(totalPercent >= 100.1 || totalPercent <= 99.9);
  },
};
