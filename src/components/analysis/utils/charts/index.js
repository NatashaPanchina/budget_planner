import { createLineData } from "./line";
import { createBarData } from "./bar";
import { createPieData } from "./pie";
import { createTableData } from "./table";

export function createData(data, chartType) {
  switch (chartType) {
    case "line":
      return createLineData(data);
    case "bar":
      return createBarData(data);
    case "pie":
      return createPieData(data);
    case "table":
      return createTableData(data);
    default:
      return [];
  }
}
