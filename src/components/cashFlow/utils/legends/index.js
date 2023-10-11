export function createDataLegends(data, chartType, keys) {
  switch (chartType) {
    case 'line':
      return data.map((item) => {
        return { description: item.id, color: item.color };
      });
    case 'bar':
      return createBarData(data, keys);
    case 'pie':
      return data.map((item) => {
        return {
          description: item.category.description,
          color: item.category.color,
        };
      });
    default:
      return [];
  }
}

function createBarData(data, keys) {
  let res = {};
  data.forEach((item) => (res = { ...item }));
  return keys.map((key) => {
    return { description: key, color: res[`${key}Color`] };
  });
}
