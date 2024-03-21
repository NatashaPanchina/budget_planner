import React from 'react';
import PropTypes from 'prop-types';
import { CheckboxContainer, LabelContainer } from '../../../../../theme/global';

function CurrenciesList({ currencies, currencyTypes, setCurrencyTypes }) {
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
}

CurrenciesList.propTypes = {
  currencies: PropTypes.array,
  currencyTypes: PropTypes.object,
  setCurrencyTypes: PropTypes.func,
};

export default CurrenciesList;
