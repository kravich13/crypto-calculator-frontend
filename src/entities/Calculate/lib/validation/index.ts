import { DateTime } from 'luxon';
import validator from 'validator';
import { ISelectedInvestCoin } from '../../types';
import { INPUT_FORMAT_DATE, MIN_INVEST_DATE } from '../const';

type TranslationType = (key: string) => string;

export const mounthlyValidation = (t: TranslationType) => ({
  required: true,
  validate: (value: string) => {
    const isValidNumber = validator.isInt(value) && Number(value) >= 20 && Number(value) <= 1000000;
    return isValidNumber || t('cc.page.periodAndAmount.monthlyInput.errorMessage');
  },
});

export const startDateValidation = (t: TranslationType) => ({
  required: true,
  validate: (value: string) => {
    const inputDate = DateTime.fromFormat(value, INPUT_FORMAT_DATE);
    const minDate = DateTime.fromFormat(MIN_INVEST_DATE, INPUT_FORMAT_DATE);

    const yesterdayDate = DateTime.now().minus({ day: 1 });

    const isValidDate =
      inputDate.toMillis() >= minDate.toMillis() &&
      inputDate.toMillis() <= yesterdayDate.toMillis();

    return (
      isValidDate ||
      `${t('cc.page.periodAndAmount.startDateInput.errorMessage')} (${yesterdayDate.toFormat(
        'LL/dd/y'
      )}).`
    );
  },
});

export const endDateValidation = (
  startDate: DateTime,
  todayDate: DateTime,
  t: TranslationType
) => ({
  required: true,
  validate: (value: string) => {
    const inputDate = DateTime.fromFormat(value, INPUT_FORMAT_DATE);

    const greaterStart = inputDate.toMillis() > startDate.toMillis();
    const equalOrLessToday = inputDate.toMillis() <= todayDate.toMillis();

    const isValidDate = greaterStart && equalOrLessToday;

    let validateText = '';

    if (!greaterStart) {
      validateText = t('cc.page.periodAndAmount.endDateInput.firstErrorMessage');
    } else if (!equalOrLessToday) {
      validateText = t('cc.page.periodAndAmount.endDateInput.secondErrorMessage');
    }

    return isValidDate || validateText;
  },
});

export const addedCoinsValidation = {
  required: true,
  minLength: 1,
  maxLength: 10,
  validate: (addedCoins: ISelectedInvestCoin[]) => {
    const totalPercent = addedCoins.reduce((acc, { percent }) => acc + Number(percent) || 0, 0);
    return !Boolean(totalPercent >= 100.1 || totalPercent <= 99.9);
  },
};
