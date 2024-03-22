export const sliceData = (data, size) => {
  const dataSize = size ? size : 5;
  if (!data) return data;
  if (data.length < dataSize) return data;
  return data.slice(0, dataSize);
};
