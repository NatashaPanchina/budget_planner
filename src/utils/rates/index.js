import dayjs from 'dayjs';
import { idbAddItem, idbGetItem } from '../../indexedDB/IndexedDB';
import { accessKey } from '../constants/rates';

const getPrevDate = (date) => {
  if (!date) return;
  let result = new Date(date);
  result.setDate(result.getDate() - 1);
  return dayjs(result).format('YYYY-MM-DD');
};

const fetchRate = async (date, mainCurrency) => {
  const result = await idbGetItem(date, 'rates');
  if (result) {
    return result;
  } else {
    const response = await fetch(
      `https://api.currencyapi.com/v3/historical?apikey=${accessKey}&base_currency=${mainCurrency}&date=${date}`,
    );
    const rates = await response.json();
    return {
      date,
      rates,
    };
  }
};

export const getRate = async (date, from, mainCurrency) => {
  const result = await fetchRate(date, mainCurrency);
  if (!result) {
    return 1;
  }
  await idbAddItem(result, 'rates');
  const rate = result.rates.data[from].value;
  if (!rate) {
    return 1;
  }
  return rate;
};

//there is only main currency rates in db
//so we need to check 'from' and 'to' before calc
//for example mainCurrency = 'kzt'
export const convertCash = async (date, amount, from, to, mainCurrency) => {
  const prevDate = getPrevDate(date);
  if (from === to) return amount;
  let result = amount;
  let fromRate = 1;
  let toRate = 1;
  //to === 'kzt'
  if (to === mainCurrency && from !== mainCurrency) {
    fromRate = await getRate(prevDate, from, to);
    result = amount / fromRate;
  } else if (to !== mainCurrency && from === mainCurrency) {
    //to !== 'kzt'
    toRate = await getRate(prevDate, to, from);
    result = amount * toRate;
  } else {
    //to !== 'kzt' from !== 'kzt'
    fromRate = await getRate(prevDate, from, mainCurrency);
    toRate = await getRate(prevDate, to, mainCurrency);
    result = (amount / fromRate) * toRate;
  }
  return result;
};
