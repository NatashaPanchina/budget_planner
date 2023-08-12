import { styled } from '@mui/material';
import React from 'react';

const Tooltip = styled('div')((props) => ({
  padding: props.theme.spacing(3),
  display: 'flex',
  alignItems: 'center',
  background: props.theme.colors.background.primary,
  border: `1px solid ${props.theme.colors.border.item}`,
  borderRadius: props.theme.borderRadius,
  fontSize: '0.875rem',
}));

const TooltipSvg = styled('svg')((props) => ({
  marginRight: props.theme.spacing(1.5),
}));

const TooltipValue = styled('span')((props) => ({
  fontWeight: 700,
  marginLeft: props.theme.spacing(1.5),
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
          fill={`url(#${id.replaceAll(' ', '_')})`}
        ></circle>
      </TooltipSvg>
      {id}:<TooltipValue>{formattedValue}</TooltipValue>
    </Tooltip>
  );
}
