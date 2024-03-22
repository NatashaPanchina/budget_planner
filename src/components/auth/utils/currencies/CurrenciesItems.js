import React from 'react';
import PropTypes from 'prop-types';
import { MenuItem, TextField, styled } from '@mui/material';

const CurrencyField = styled(TextField)((props) => ({
  width: '100%',
  backgroundColor: props.theme.colors.background.primary,
  borderRadius: props.theme.borderRadius,
  '& label': {
    color: props.theme.colors.text.darker,
  },
  '& label.Mui-focused': {
    color: props.theme.colors.main.violet,
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderRadius: props.theme.borderRadius,
      border: `1px solid ${props.theme.colors.border.item}`,
    },
    '&:hover fieldset': {
      border: `1px solid ${props.theme.colors.text.darker}`,
    },
    '&.Mui-focused fieldset': {
      border: `1px solid ${props.theme.colors.main.violet}`,
    },
    '& .MuiInputBase-input': {
      color: props.theme.colors.text.primary,
      borderRadius: props.theme.borderRadius,
      backgroundColor: props.theme.colors.background.primary,
    },
    '& .MuiSelect-icon': {
      fill: props.theme.colors.main.violet,
    },
  },
}));

function CurrenciesItems({ names, currency, setCurrency }) {
  return (
    <CurrencyField
      margin="normal"
      required
      select
      fullWidth
      value={currency}
      onChange={(event) => setCurrency(event.target.value)}
    >
      {Object.values(names).map((currencyName) => (
        <MenuItem key={currencyName} value={currencyName}>
          {currencyName}
        </MenuItem>
      ))}
    </CurrencyField>
  );
}

CurrenciesItems.propTypes = {
  names: PropTypes.object,
  currency: PropTypes.string,
  setCurrency: PropTypes.func,
};

export default CurrenciesItems;
