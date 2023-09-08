import { toStringDate } from '../date';

export const filterQuery = (query, accounts, categories) => {
  //delete spaces from the start and the end
  const data = query.replaceAll(/^ +/g, '').replaceAll(/ +$/g, '');
  let result = data;

  //check if query is a date
  //1.11.2023
  if (/^\d{1,2}\.\d{1,2}\.\d{4}$/.test(data)) {
    //1.11.2023 -> 11/1/2023
    result = result.replace(/(\d{1,2})\.(\d{1,2})\.(\d{4})/, '$2/$1/$3');
    //is valid date
    if (!isNaN(Date.parse(result))) {
      result = toStringDate(new Date(result));
      return result;
    }
  }
  //11/1/2023 or 11-1-2023
  if (/^\d{1,2}[-/]\d{1,2}[-/]\d{4}$/.test(data)) {
    //is valid date
    if (!isNaN(Date.parse(data))) {
      result = toStringDate(new Date(data));
      return result;
    }
  }

  //check if query is a currency number
  // 1 => true
  // 1.00 => true
  // $1 => true
  // $1000 => true
  // 0.1 => true
  // 1,000.00 => true
  // $1,000,000 => true
  // 5678 => true
  if (/^\$?(([1-9](\d*|\d{0,2}(,\d{3})*))|0)(\.\d{1,2})?$/.test(data)) {
    //delete $ ,
    result = data.replace('$', '').replace(',', '');
    //if there is no . add 00 to the end
    result = /^\d+$/.test(result) ? `${result}00` : result;
    //add 0 to the end if amount is like 0.1
    // delete .
    result = /\d+\.\d{1}$/.test(result)
      ? `${result}0`.replace('.', '')
      : result.replace('.', '');
    //delete 0 from the start
    result = result.replace(/^0+/, '');
    return Number(result);
  }

  //check if query is account's or category's description
  result = accounts.find((account) => account.description === data);
  if (result) return result.id;

  result = categories.find((category) => category.description === data);
  if (result) return result.id;

  return data;
};
