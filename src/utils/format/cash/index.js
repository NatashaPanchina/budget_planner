import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { NumericFormat } from 'react-number-format';
import { dinero, toDecimal } from 'dinero.js';
import { names, symbols } from '../../constants/currencies';

const getFormatProps = (currency) => {
  switch (currency) {
    case names.USD:
      return {
        thousandSeparator: ',',
        decimalSeparator: '.',
        prefix: `${symbols.USD} `,
        placeholder: '0.00',
      };
    case names.EUR:
      return {
        thousandSeparator: ',',
        decimalSeparator: '.',
        prefix: `${symbols.EUR} `,
        placeholder: '0.00',
      };
    case names.RUB:
      return {
        thousandSeparator: ' ',
        decimalSeparator: ',',
        suffix: ` ${symbols.RUB}`,
        placeholder: '0,00',
      };
    case names.KZT:
      return {
        thousandSeparator: ' ',
        decimalSeparator: ',',
        suffix: ` ${symbols.KZT}`,
        placeholder: '0,00',
      };
    default:
      return {
        thousandSeparator: ',',
        decimalSeparator: '.',
        prefix: `${symbols.USD} `,
        placeholder: '0.00',
      };
  }
};

export const NumericFormatCustom = forwardRef(
  function NumericFormatCustom(props, ref) {
    const { onChange, currency, ...other } = props;

    return (
      <NumericFormat
        {...other}
        getInputRef={ref}
        {...getFormatProps(currency)}
        decimalScale={2}
        allowNegative={false}
        onValueChange={(values) => {
          onChange({ target: { name: props.name, value: values.floatValue } });
        }}
      />
    );
  },
);

NumericFormatCustom.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  currency: PropTypes.string,
};

export const formatDineroOutput = (dineroObject, currency) => {
  switch (currency) {
    case names.USD:
      return toDecimal(dineroObject, ({ value }) => {
        return Number(value).toLocaleString('en-US', {
          style: 'currency',
          currency: currency,
        });
      });
    case names.EUR:
      return toDecimal(dineroObject, ({ value }) => {
        return Number(value).toLocaleString('en-IN', {
          style: 'currency',
          currency: currency,
        });
      });
    case names.RUB:
      return toDecimal(dineroObject, ({ value }) => {
        return Number(value).toLocaleString('ru-RU', {
          style: 'currency',
          currency: currency,
        });
      });
    case names.KZT:
      return toDecimal(dineroObject, ({ value }) => {
        return Number(value).toLocaleString('kk-KZ', {
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
    case names.USD:
      return Number(number).toLocaleString('en-US', {
        style: 'currency',
        currency: currency,
      });
    case names.EUR:
      return Number(number).toLocaleString('en-IN', {
        style: 'currency',
        currency: currency,
      });
    case names.RUB:
      return Number(number).toLocaleString('ru-RU', {
        style: 'currency',
        currency: currency,
      });
    case names.KZT:
      return Number(number).toLocaleString('kk-KZ', {
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
