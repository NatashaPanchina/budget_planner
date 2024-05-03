export function createPeriod(date) {
  if (!date) return null;
  switch (date.during) {
    case 'week':
      return weekPeriod(date);
    case 'month':
      return monthPeriod(date);
    case 'year':
      return yearPeriod(date);
    default:
      return [];
  }
}

function weekPeriod() {
  return [];
}

function monthPeriod(date) {
  const month = date.from.getMonth() + 1;
  const year = date.from.getFullYear();
  const currentMonth = new Date();
  const nextMonth = new Date();
  nextMonth.setMonth(currentMonth.getMonth() + 1);
  nextMonth.setDate(0);
  return [
    {
      from: date.from,
      to: new Date(month + '/7/' + year),
    },
    {
      from: new Date(month + '/8/' + year),
      to: new Date(month + '/14/' + year),
    },
    {
      from: new Date(month + '/15/' + year),
      to: new Date(month + '/21/' + year),
    },
    {
      from: new Date(month + '/22/' + year),
      to: new Date(month + `/${nextMonth.getDate()}/` + year),
    },
  ];
}

function yearPeriod(date) {
  const year = date.from.getFullYear();
  return [
    {
      from: date.from,
      to: new Date('1/31/' + year),
    },
    {
      from: new Date('2/1/' + year),
      to: new Date('2/' + (isLeapYear(year) ? '29/' : '28/') + year),
    },
    {
      from: new Date('3/1/' + year),
      to: new Date('3/31/' + year),
    },
    {
      from: new Date('4/1/' + year),
      to: new Date('4/30/' + year),
    },
    {
      from: new Date('5/1/' + year),
      to: new Date('5/31/' + year),
    },
    {
      from: new Date('6/1/' + year),
      to: new Date('6/30/' + year),
    },
    {
      from: new Date('7/1/' + year),
      to: new Date('7/31/' + year),
    },
    {
      from: new Date('8/1/' + year),
      to: new Date('8/31/' + year),
    },
    {
      from: new Date('9/1/' + year),
      to: new Date('9/30/' + year),
    },
    {
      from: new Date('10/1/' + year),
      to: new Date('10/31/' + year),
    },
    {
      from: new Date('11/1/' + year),
      to: new Date('11/30/' + year),
    },
    {
      from: new Date('12/1/' + year),
      to: new Date('12/31/' + year),
    },
  ];
}

//проверка на високосный год
function isLeapYear(year) {
  if (year % 4 === 0 && year % 100 !== 0 && year % 400 === 0) {
    return true;
  }
  return false;
}
