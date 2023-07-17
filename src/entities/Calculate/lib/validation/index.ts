import validator from 'validator';
import { ISelectedInvestCoin } from '../../types';

type TranslationType = (key: string) => string;

export const mounthlyValidation = (t: TranslationType) => ({
  required: true,
  validate: (value: string) => {
    const isValidNumber = validator.isInt(value) && Number(value) >= 20 && Number(value) <= 1000000;
    return isValidNumber || t('cc.feature.periodAndAmount.monthlyInput.errorMessage');
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
