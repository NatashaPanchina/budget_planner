import { ResponsiveLine } from "@nivo/line";

import { createData } from "../utils/charts";
import Legends from "../legends/Legends";
import { renderTooltip } from "../utils/tooltip";

export default function LineChart({
  transactions,
  categories,
  chartFilter,
  isDetailed,
  date,
}) {
  let commonData = createData(
    { transactions, categories, chartFilter, isDetailed, date },
    "line"
  );
  return (
    <div className="line_chart_container">
      <div className="chart">
        <ResponsiveLine
          data={commonData}
          colors={{ datum: "color[1]" }}
          margin={{ top: 10, right: 50, bottom: 50, left: 80 }}
          xScale={{ type: "point" }}
          enablePoints={false}
          axisLeft={{
            format: (value) => `${Number(value).toLocaleString("en-US")}`,
          }}
          axisBottom={{
            orient: "bottom",
            tickSize: 5,
            tickPadding: 10,
            tickRotation: 0,
            legend: "date",
            legendOffset: 40,
            legendPosition: "middle",
          }}
          lineWidth={2}
          useMesh={true}
          tooltip={({
            point: {
              serieId,
              data: { yFormatted },
            },
          }) =>
            renderTooltip(
              serieId,
              `$ ${Number(yFormatted).toLocaleString("en-US", {
                minimumFractionDigits: 2,
              })}`
            )
          }
        />
      </div>
      <Legends data={commonData} chartType="line" />
    </div>
  );
}
