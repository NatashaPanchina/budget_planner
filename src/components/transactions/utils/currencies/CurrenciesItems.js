import React from 'react';
import PropTypes from 'prop-types';
import { MenuItem } from '@mui/material';
import { CurrencyInputField } from '../../../../theme/global';
import { useTranslation } from 'react-i18next';

function CurrenciesItems({ names, currency, setCurrency }) {
  const { t } = useTranslation();

  let results = [];
  for (let currencyName in names) {
    results.push(
      <MenuItem key={names[currencyName]} value={names[currencyName]}>
        {names[currencyName]}
      </MenuItem>,
    );
  }
  return (
    <CurrencyInputField
      margin="normal"
      required
      select
      fullWidth
      label={t('INFO_TRANSACTION.CURRENCY')}
      value={currency}
      onChange={(event) => setCurrency(event.target.value)}
    >
      {results}
    </CurrencyInputField>
  );
}

CurrenciesItems.propTypes = {
  names: PropTypes.object,
  currency: PropTypes.string,
  setCurrency: PropTypes.func,
};

export default CurrenciesItems;
