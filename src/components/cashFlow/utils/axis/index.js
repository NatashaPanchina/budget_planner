export const formatAxisAmount = (value) => {
  const amount = Number(value);
  if (amount < 1000) return amount;
  if (amount >= 1000000000) return Math.floor(amount / 1000000) + 'b';
  if (amount >= 1000000) return Math.floor(amount / 1000000) + 'm';
  if ((amount / 100) % 10 == 0) return Math.floor(amount / 1000) + 'k';
  else return Math.floor(amount / 100) / 10.0 + 'k';
};
