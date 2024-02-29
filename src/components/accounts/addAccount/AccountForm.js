import React from 'react';
import PropTypes from 'prop-types';
import CashForm from './CashForm.js';
import CardForm from './CardForm.js';

function AccountForm({ categories, setOpenDialog, type }) {
  switch (type) {
    case 'card':
      return <CardForm categories={categories} setOpenDialog={setOpenDialog} />;
    case 'cash':
      return <CashForm categories={categories} setOpenDialog={setOpenDialog} />;
    default:
      return <CardForm categories={categories} setOpenDialog={setOpenDialog} />;
  }
}

AccountForm.propTypes = {
  categories: PropTypes.array,
  setOpenDialog: PropTypes.func,
  type: PropTypes.string,
};

export default AccountForm;
