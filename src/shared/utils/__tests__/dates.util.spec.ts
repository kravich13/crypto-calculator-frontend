import { getLocaleDate } from '../dates.util';

describe('dates util getLocaleDate', () => {
  it('should return a formatted date in English (en) locale', () => {
    const timestamp = 1678901234567;
    const language = 'en';
    const result = getLocaleDate(timestamp, language);

    expect(result).toBe('3/15/2023');
  });

  it('should return a formatted date in Ukrainian (uk) locale', () => {
    const timestamp = 1678901234567; // Example timestamp in milliseconds
    const language = 'uk';
    const result = getLocaleDate(timestamp, language);

    expect(result).toBe('15.03.2023');
  });
});
