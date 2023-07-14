import React from "react";
import { styled } from "styled-components";

const Tooltip = styled.div((props) => ({
  padding: 12,
  display: "flex",
  alignItems: "center",
  background: props.theme.colors.background.primary,
  border: `1px solid ${props.theme.colors.border.item}`,
  borderRadius: props.theme.borderRadius,
  fontSize: "0.875rem",
}));

const TooltipSvg = styled.svg(() => ({
  marginRight: 6,
}));

const TooltipValue = styled.span(() => ({
  fontWeight: 700,
  marginLeft: 6,
}));

export function renderTooltip(id, formattedValue) {
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
          fill={`url(#${id.replaceAll(" ", "_")})`}
        ></circle>
      </TooltipSvg>
      {id}:<TooltipValue>{formattedValue}</TooltipValue>
    </Tooltip>
  );
}
