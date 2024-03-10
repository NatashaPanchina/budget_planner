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

export const sortByAdding = (data) => {
  if (!data) return [];
  return data
    .slice()
    .sort((a, b) =>
      a.creationDate < b.creationDate
        ? 1
        : a.creationDate > b.creationDate
        ? -1
        : 0,
    );
};

export const sortByAlphabet = (data) => {
  if (!data) return [];
  return data
    .slice()
    .sort((a, b) =>
      a.description > b.description
        ? 1
        : a.description < b.description
        ? -1
        : 0,
    );
};
