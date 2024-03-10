import React from 'react';
import { CheckboxContainer, LabelContainer } from '../../../../theme/global';

export const renderCurrencies = (
  currencies,
  currencyTypes,
  setCurrencyTypes,
) => {
  return currencies.map((currency, index) => {
    return (
      <div key={index}>
        <LabelContainer
          label={currency}
          control={
            <CheckboxContainer
              checked={
                currencyTypes
                  ? currencyTypes[currency]
                    ? currencyTypes[currency]
                    : false
                  : false
              }
              onChange={(event) => {
                setCurrencyTypes({
                  ...currencyTypes,
                  [currency]: event.target.checked,
                });
              }}
            />
          }
        />
      </div>
    );
  });
};
