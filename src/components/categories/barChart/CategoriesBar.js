import React from "react";
import { useTranslation } from "react-i18next";

import { ResponsiveBar } from "@nivo/bar";
import { linearGradientDef } from "@nivo/core";

import { styled } from "styled-components";

const BarChartContainer = styled.div(() => ({
  width: "80%",
  height: "40%",
  marginLeft: "auto",
  marginRight: "auto",
}));

const Tooltip = styled.div((props) => ({
  padding: 12,
  display: "flex",
  alignItems: "center",
  background: props.theme.colors.background.primary,
  border: `1px solid ${props.theme.colors.border.item}`,
  borderRadius: "5px",
  fontSize: "14px",
}));

const TooltipSvg = styled.svg(() => ({
  marginRight: "5px",
}));

const TooltipValue = styled.span(() => ({
  fontWeight: 700,
  marginLeft: "5px",
}));

function renderTooltip(id, formattedValue) {
  return (
    <Tooltip>
      <TooltipSvg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="10"
          cy="10"
          r="10"
          fill={`url(#${id.replaceAll(" ", "_")}Gradient)`}
        ></circle>
      </TooltipSvg>
      {id}:<TooltipValue>{formattedValue}</TooltipValue>
    </Tooltip>
  );
}

function renderGradients(keys) {
  if (!keys) return;

  return [
    linearGradientDef(
      `${keys[0]}Gradient`,
      [
        { offset: 0, color: "#D38BFF" },
        { offset: 100, color: "#6D73FF" },
      ],
      {
        gradientTransform: "rotate(-45 0.5 0.5)",
      }
    ),
    linearGradientDef(
      `${keys[1]}Gradient`,
      [
        { offset: 0, color: "#F862A1" },
        { offset: 100, color: "#F4395B" },
      ],
      {
        gradientTransform: "rotate(-45 0.5 0.5)",
      }
    ),
    linearGradientDef(
      `${keys[2]}Gradient`,
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

function renderMatchs(keys) {
  if (!keys) return [];

  return [
    {
      match: { id: keys[0] },
      id: `${keys[0]}Gradient`,
    },
    {
      match: { id: keys[1] },
      id: `${keys[1]}Gradient`,
    },
    {
      match: { id: keys[2] },
      id: `${keys[2]}Gradient`,
    },
  ];
}

export default function CategoriesBar({ data }) {
  const { t } = useTranslation();

  const keys = [
    t("CATEGORIES.ALL"),
    t("CATEGORIES.EXPENSES"),
    t("CATEGORIES.INCOMES"),
  ];

  return (
    <BarChartContainer>
      <ResponsiveBar
        margin={{
          top: 20,
          right: 0,
          bottom: 0,
          left: 0,
        }}
        data={data}
        keys={keys}
        indexBy="type"
        colors={({ id, data }) => String(data[`${id}Color`])}
        padding={0.2}
        defs={renderGradients(keys)}
        fill={renderMatchs(keys)}
        enableLabel={false}
        enableGridY={false}
        valueScale={{ type: "linear" }}
        indexScale={{ type: "band", round: true }}
        axisBottom={null}
        axisLeft={null}
        tooltip={({ id, value, color }) => renderTooltip(id, value, color)}
      />
    </BarChartContainer>
  );
}
