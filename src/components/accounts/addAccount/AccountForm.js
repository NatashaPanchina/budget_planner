import React from 'react';
import PropTypes from 'prop-types';
import CashForm from './CashForm.js';
import CardForm from './CardForm.js';

function AccountForm({ accounts, categories, setOpenDialog, type }) {
  switch (type) {
    case 'card':
      return (
        <CardForm
          accounts={accounts}
          categories={categories}
          setOpenDialog={setOpenDialog}
        />
      );
    case 'cash':
      return (
        <CashForm
          accounts={accounts}
          categories={categories}
          setOpenDialog={setOpenDialog}
        />
      );
    default:
      return (
        <CardForm
          accounts={accounts}
          categories={categories}
          setOpenDialog={setOpenDialog}
        />
      );
  }
}

AccountForm.propTypes = {
  accounts: PropTypes.array,
  categories: PropTypes.array,
  setOpenDialog: PropTypes.func,
  type: PropTypes.string,
};

export default AccountForm;
