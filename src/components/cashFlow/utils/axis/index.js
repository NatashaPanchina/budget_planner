const isPositive = (number) => {
  return number >= 0;
};

export const formatAxisAmount = (value) => {
  const number = Number(value);
  const amount = Math.abs(number);
  const isPositiveNum = isPositive(number);

  if (amount < 1000) return isPositiveNum ? amount : -amount;
  if (amount >= 1000000000)
    return isPositiveNum
      ? `${Math.floor(amount / 1000000)}b`
      : `-${Math.floor(amount / 1000000)}b`;
  if (amount >= 1000000)
    return isPositiveNum
      ? `${Math.floor(amount / 1000000)}m`
      : `-${Math.floor(amount / 1000000)}m`;
  if ((amount / 100) % 10 == 0)
    return isPositiveNum
      ? `${Math.floor(amount / 1000)}k`
      : `-${Math.floor(amount / 1000)}k`;
  else
    return isPositiveNum
      ? `${Math.floor(amount / 100) / 10.0}k`
      : `-${Math.floor(amount / 100) / 10.0}k`;
};
