import React from 'react';
import { CheckboxContainer, LabelContainer } from '../../../../theme/global';

export const renderAccounts = (accounts, accountTypes, setAccountTypes) => {
  return accounts.map((account) => {
    const description = account.description;
    const id = account.id;
    return (
      <div key={id}>
        <LabelContainer
          label={description}
          control={
            <CheckboxContainer
              checked={
                accountTypes
                  ? accountTypes[description]
                    ? accountTypes[description].checked
                    : false
                  : false
              }
              onChange={(event) => {
                setAccountTypes({
                  ...accountTypes,
                  [description]: {
                    id,
                    checked: event.target.checked,
                  },
                });
              }}
            />
          }
        />
      </div>
    );
  });
};

export const renderCategories = (
  categories,
  categoryTypes,
  setCategoryTypes,
) => {
  return categories.map((category) => {
    const description = category.description;
    const id = category.id;
    return (
      <div key={id}>
        <LabelContainer
          label={description}
          control={
            <CheckboxContainer
              checked={
                categoryTypes
                  ? categoryTypes[description]
                    ? categoryTypes[description].checked
                    : false
                  : false
              }
              onChange={(event) => {
                setCategoryTypes({
                  ...categoryTypes,
                  [description]: {
                    id,
                    checked: event.target.checked,
                  },
                });
              }}
            />
          }
        />
      </div>
    );
  });
};

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
