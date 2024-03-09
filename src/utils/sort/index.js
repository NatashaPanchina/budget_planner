export const sortByDate = (data) => {
  if (!data) return [];
  return data.slice().sort((prev, next) => {
    const [prevMonth, prevDay, prevYear] = prev.date.split('/');
    const [nextMonth, nextDay, nextYear] = next.date.split('/');
    if (prevYear < nextYear) return 1;
    if (prevYear > nextYear) return -1;
    if (prevMonth < nextMonth) return 1;
    if (prevMonth > nextMonth) return -1;
    if (prevDay < nextDay) return 1;
    if (prevDay > nextDay) return -1;
    return 0;
  });
};
