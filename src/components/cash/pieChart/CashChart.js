import React from "react";
import { dinero, toDecimal, add } from "dinero.js";
import { USD } from "@dinero.js/currencies";
import { ResponsivePie } from "@nivo/pie";
import { linearGradientDef } from "@nivo/core";

import CashChartLegends from "./CashChartLegends.js";
import {
  formatDineroOutput,
  formatNumberOutput,
} from "../../../utils/format/cash";

export function renderTooltip(id, formattedValue) {
  return (
    <div
      style={{
        padding: 12,
        display: "flex",
        alignItems: "center",
        background: "#fff",
        border: "1px solid #F0F0F0",
        borderRadius: "5px",
        fontSize: "14px",
      }}
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ marginRight: "5px" }}
      >
        <circle
          cx="10"
          cy="10"
          r="10"
          fill={`url(#${id.replaceAll(" ", "_")})`}
        ></circle>
      </svg>
      {id}:
      <span style={{ fontWeight: 700, marginLeft: "5px" }}>
        {formattedValue}
      </span>
    </div>
  );
}

//имена градиентов не работают с пробелами
function renderGradientDefs(accounts) {
  return accounts.map((account) => {
    return linearGradientDef(
      account.description.replaceAll(" ", ""),
      [
        { offset: 0, color: account.color[0] },
        { offset: 100, color: account.color[1] },
      ],
      {
        gradientTransform: "rotate(-45 0.5 0.5)",
      }
    );
  });
}

function renderMatchs(accounts) {
  return accounts.map((account) => {
    return {
      match: { id: account.description },
      id: account.description.replaceAll(" ", ""),
    };
  });
}

const CenteredMetric =
  (totalBalance) =>
  ({ centerX, centerY, innerRadius }) => {
    return (
      <React.Fragment>
        <text
          x={centerX}
          y={centerY}
          textAnchor="middle"
          alignmentBaseline="middle"
        >
          {formatDineroOutput(totalBalance, "USD")}
        </text>
      </React.Fragment>
    );
  };

export default function CashChart({ data }) {
  const accounts = data.map((account) => {
    return {
      ...account,
      balance: toDecimal(dinero(account.balance)),
    };
  });

  let totalBalance = data.reduce(
    (sum, account) => add(sum, dinero(account.balance)),
    dinero({ amount: 0, currency: USD })
  );

  return (
    <div id="accounts_pieChart">
      <ResponsivePie
        data={accounts}
        colors={{ datum: "data.color[0]" }}
        value="balance"
        valueFormat={(value) => formatNumberOutput(value, "USD")}
        id="description"
        margin={{
          top: 10,
          right: 10,
          bottom: 10,
          left: 10,
        }}
        innerRadius={0.65}
        padAngle={0.7}
        cornerRadius={3}
        enableArcLinkLabels={false}
        activeOuterRadiusOffset={7}
        enableArcLabels={false}
        sortByValue={true}
        defs={renderGradientDefs(data)}
        fill={renderMatchs(data)}
        tooltip={({ datum: { id, formattedValue, color } }) =>
          renderTooltip(id, formattedValue, color)
        }
        layers={[
          "arcs",
          "arcLabels",
          "arcLinkLabels",
          "legends",
          CenteredMetric(totalBalance),
        ]}
      />
      <div id="legends_container">
        <CashChartLegends
          data={accounts}
          totalBalance={toDecimal(totalBalance)}
        />
      </div>
    </div>
  );
}
