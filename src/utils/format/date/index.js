export const dateFormatter = new Intl.DateTimeFormat('en-US');

export const pad = (number) => {
  return number < 10 ? `0${number}` : number;
};

export const toStringDate = (date) => {
  return `${pad(date.getMonth() + 1)}/${pad(
    date.getDate(),
  )}/${date.getFullYear()}`;
};

export const getCurrentMonth = () => {
  const to = new Date();
  let firstDay = new Date();
  firstDay.setDate(1);
  const from = firstDay;
  return {
    from,
    to,
    during: 'month',
  };
};

export const convertPeriod = (date, during, language) => {
  const locale = getLanguageLocale(language);

  if (!date) return null;

  switch (during) {
    case 'week':
      return date.getDate();
    case 'month':
      return date.toLocaleString(locale, { month: 'long' });
    case 'year':
      return date.getFullYear();
    default:
      return '';
  }
};

export const getLanguageLocale = (language) => {
  switch (language) {
    case 'EN':
      return 'en-US';
    case 'RU':
      return 'ru-RU';
    default:
      return 'en-US';
  }
};
