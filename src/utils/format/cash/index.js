import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { NumericFormat } from 'react-number-format';
import { dinero, toDecimal } from 'dinero.js';

export const NumericFormatCustom = forwardRef(
  function NumericFormatCustom(props, ref) {
    const { onChange, ...other } = props;

    return (
      <NumericFormat
        {...other}
        getInputRef={ref}
        thousandSeparator=","
        decimalSeparator="."
        decimalScale={2}
        allowNegative={false}
        placeholder="0.00"
        onValueChange={(values) => {
          onChange({ target: { name: props.name, value: values.floatValue } });
        }}
        prefix="$"
      />
    );
  },
);

NumericFormatCustom.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export const formatDineroOutput = (dineroObject, currency) => {
  switch (currency) {
    case 'USD':
      return toDecimal(dineroObject, ({ value }) => {
        return Number(value).toLocaleString('en-US', {
          style: 'currency',
          currency: currency,
        });
      });
    default:
      return '0.00';
  }
};

export const formatNumberOutput = (number, currency) => {
  switch (currency) {
    case 'USD':
      return Number(number).toLocaleString('en-US', {
        style: 'currency',
        currency: currency,
      });
    default:
      return 0;
  }
};

export const dineroFromFloat = ({ amount: float, currency, scale }) => {
  const factor = currency.base ** currency.exponent || scale;
  const amount = Math.round(float * factor);

  return dinero({ amount, currency, scale });
};
