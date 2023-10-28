import { idbAddItem, idbGetItem } from '../../indexedDB/IndexedDB';
import { names } from '../constants/currencies';
import { accessKey } from '../constants/rates';

const fetchRate = async (date) => {
  const result = await idbGetItem(date, 'rates');
  if (result) {
    return result;
  } else {
    const response = await fetch(
      `http://apilayer.net/api/historical?access_key=${accessKey}&date=${date}&currencies=EUR,RUB,KZT&source=USD&format=1`,
    );
    const rates = await response.json();
    return {
      date,
      rates,
    };
  }
};

export const getRate = async (date, currency) => {
  const result = await fetchRate(date);
  if (!result) {
    return 1;
  }
  idbAddItem(result, 'rates');
  const rate = result.rates.quotes[`USD${currency}`];
  if (!rate) {
    return 1;
  }
  return rate;
};

export const convertCash = async (date, amount, from, to) => {
  if (from === to) return amount;
  const fromRate = await getRate(date, from);
  const toRate = await getRate(date, to);
  let result = amount / fromRate;
  if (to === names.USD) return result;
  result = result * toRate;
  return result;
};
