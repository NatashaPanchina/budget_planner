import { toStringDate } from '../date';

export const filterQuery = (query) => {
  //delete spaces from the start and the end
  const data = query.replaceAll(/^ +/g, '').replaceAll(/ +$/g, '');
  let result = data;

  //check if query is a date
  // 6/ or 6-
  if (/^\d{1,2}[/-]$/.test(data)) {
    // -> 6/
    result = result.replace(/-/, '/');
    // 6/ -> 06/
    result = result.replace(/^(\d{1}\/)/, '0$1');
    return result;
  }
  //11/1 or 11-1
  if (/^\d{1,2}[/-]\d{1,2}$/.test(data)) {
    // -> 11/1
    result = result.replace(/-/, '/');
    //11/1 -> 11/01
    result = result.replace(/^(\d{1}\/)/, '0$1');
    result = result.replace(/\/(\d{1})$/, '/0$1');
    return result;
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
    //add 0 to the end if amount is like 0.1
    result = /\d+\.\d{1}$/.test(result) ? `${result}0` : result;
    return result;
  }
  return data;
};
