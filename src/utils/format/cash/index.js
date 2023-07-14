import { dinero, toDecimal } from 'dinero.js';

export const formatDineroOutput = (dineroObject, currency) => {
  switch (currency) {
    case 'USD':
      return toDecimal(dineroObject, ({ value }) => {
        return Number(value).toLocaleString('en-US', {
          style: 'currency',
          currency: currency,
        });
      });
    default:
      return '0.00';
  }
};

export const formatNumberOutput = (number, currency) => {
  switch (currency) {
    case 'USD':
      return Number(number).toLocaleString('en-US', {
        style: 'currency',
        currency: currency,
      });
    default:
      return 0;
  }
};

export const dineroFromFloat = ({ amount: float, currency, scale }) => {
  const factor = currency.base ** currency.exponent || scale;
  const amount = Math.round(float * factor);

  return dinero({ amount, currency, scale });
};
