export const dateFormatter = new Intl.DateTimeFormat('en-US');

export const pad = (number) => {
  return number < 10 ? `0${number}` : number;
};

export const toStringDate = (date) => {
  return `${pad(date.getMonth() + 1)}/${pad(
    date.getDate(),
  )}/${date.getFullYear()}`;
};
