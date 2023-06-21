import React from "react";
import { ResponsiveBar } from "@nivo/bar";
import { linearGradientDef } from "@nivo/core";

function renderTooltip(id, formattedValue) {
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
          fill={`url(#${id.replaceAll(" ", "_")}Gradient)`}
        ></circle>
      </svg>
      {id}:
      <span style={{ fontWeight: 700, marginLeft: "5px" }}>
        {formattedValue}
      </span>
    </div>
  );
}

function renderGradients() {
  return [
    linearGradientDef(
      "allGradient",
      [
        { offset: 0, color: "#D38BFF" },
        { offset: 100, color: "#6D73FF" },
      ],
      {
        gradientTransform: "rotate(-45 0.5 0.5)",
      }
    ),
    linearGradientDef(
      "expenseGradient",
      [
        { offset: 0, color: "#F862A1" },
        { offset: 100, color: "#F4395B" },
      ],
      {
        gradientTransform: "rotate(-45 0.5 0.5)",
      }
    ),
    linearGradientDef(
      "incomeGradient",
      [
        { offset: 0, color: "#B3FF53" },
        { offset: 100, color: "#6EBD0A" },
      ],
      {
        gradientTransform: "rotate(-45 0.5 0.5)",
      }
    ),
  ];
}

function renderMatchs() {
  return [
    {
      match: { id: "all" },
      id: "allGradient",
    },
    {
      match: { id: "expense" },
      id: "expenseGradient",
    },
    {
      match: { id: "income" },
      id: "incomeGradient",
    },
  ];
}

export default function CategoriesBar({ data }) {
  return (
    <div className="categories_barChart">
      <ResponsiveBar
        margin={{
          top: 20,
          right: 0,
          bottom: 0,
          left: 0,
        }}
        data={data}
        keys={["all", "expense", "income"]}
        indexBy="type"
        colors={({ id, data }) => String(data[`${id}Color`])}
        padding={0.2}
        defs={renderGradients()}
        fill={renderMatchs()}
        enableLabel={false}
        enableGridY={false}
        valueScale={{ type: "linear" }}
        indexScale={{ type: "band", round: true }}
        axisBottom={null}
        axisLeft={null}
        tooltip={({ id, value, color }) => renderTooltip(id, value, color)}
      />
    </div>
  );
}
