import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { NumericFormat } from 'react-number-format';
import { dinero, toDecimal } from 'dinero.js';
import { names, symbols } from '../../constants/currencies';

export const getFormatProps = (currency) => {
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
        placeholder: '0',
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
  if (!dineroObject || !currency) return '0.00';

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
  if (!number || !currency) return '0.00';

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
      return '0.00';
  }
};

export const dineroFromFloat = ({ amount: float, currency, scale }) => {
  if (!currency) return null;

  const factor = currency.base ** currency.exponent || scale;
  const amount = Math.round(float * factor);

  return dinero({ amount, currency, scale });
};

export const isCashCorrect = (cash) => {
  if (!cash) return false;
  const numberCash = Number(cash);
  if (!numberCash) return false;
  if (numberCash <= 0) return false;
  return true;
};
