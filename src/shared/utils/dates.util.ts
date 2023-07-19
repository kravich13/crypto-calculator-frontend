import { DateTime } from 'luxon';

export const getLocaleDate = (timestamp: number, language: string) => {
  const locale = language === 'en' ? 'en-US' : 'uk-UA';

  return DateTime.fromMillis(timestamp).setLocale(locale).toLocaleString();
};
