import { createLineData } from './line';
import { createBarData } from './bar';
import { createPieData } from './pie';
import { createTableData } from './table';

export function createData(data, chartType, mainCurrency) {
  switch (chartType) {
    case 'line':
      return createLineData(data, mainCurrency);
    case 'bar':
      return createBarData(data, mainCurrency);
    case 'pie':
      return createPieData(data, mainCurrency);
    case 'table':
      return createTableData(data, mainCurrency);
    default:
      return [];
  }
}
