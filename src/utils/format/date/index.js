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

export const getLastMonth = () => {
  let from = new Date();
  from.setDate(1);
  const fromMonth = from.getMonth() - 1;
  from.setMonth(fromMonth);
  let to = new Date();
  to.setDate(0);
  return {
    from,
    to,
    during: 'month',
  };
};

export const getLastDay = () => {
  let date = new Date();
  date.setDate(date.getDate() - 1);
  return date;
};

const getStringDay = (date, locale) => {
  const currentDate = dateFormatter.format(new Date());
  const lastDate = dateFormatter.format(getLastDay());
  const inputDate = dateFormatter.format(date);

  if (currentDate === inputDate) return 'TODAY';
  if (inputDate === lastDate) return 'YESTERDAY';

  return date.toLocaleString(locale, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
};

export const convertPeriod = (date, during, language) => {
  const locale = getLanguageLocale(language);
  if (!date) return null;

  switch (during) {
    case 'day':
      return getStringDay(date, locale);
    case 'week':
      return date.getDate();
    case 'month':
      return date.toLocaleString(locale, { month: 'long' });
    case 'month_year':
      return date.toLocaleString(locale, { month: 'long', year: 'numeric' });
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

export const isDateCorrect = (date) => {
  if (!date) return false;
  const currentDate = new Date();
  if (date > currentDate) return false;
  return true;
};
