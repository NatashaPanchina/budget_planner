import { styled } from '@mui/material';
import PropTypes from 'prop-types';
import { toDecimal } from 'dinero.js';
import React from 'react';

const TooltipContainer = styled('div')((props) => ({
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

function Tooltip({ id, formattedValue, value, totalAmount }) {
  return (
    <TooltipContainer>
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
          fill={`url(#${id.replaceAll(/[ ()]/g, '_')})`}
        ></circle>
      </TooltipSvg>
      {id}:<TooltipValue>{formattedValue}</TooltipValue>
      {value && totalAmount
        ? ` (${((value * 100) / toDecimal(totalAmount)).toFixed(2)}%)`
        : ''}
    </TooltipContainer>
  );
}

Tooltip.propTypes = {
  id: PropTypes.string,
  formattedValue: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  totalAmount: PropTypes.object,
};

export default Tooltip;
