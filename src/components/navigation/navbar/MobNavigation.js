import React from 'react';
import PropTypes from 'prop-types';
import {
  MobileExpenseLink,
  MobileIncomeLink,
  MobileLinkSvg,
  MobileTransferLink,
} from './Navigation.styled';

import { ReactComponent as ExpenseIcon } from '../../../assets/icons/navigation/mobExpense.svg';
import { ReactComponent as IncomeIcon } from '../../../assets/icons/navigation/mobIncome.svg';
import { ReactComponent as TransferIcon } from '../../../assets/icons/navigation/mobTransfer.svg';
import { Backdrop } from '@mui/material';

function MobNavigation({ setTransactionType, setOpenDialog }) {
  return (
    <>
      <Backdrop open={true} />
      <MobileTransferLink
        onClick={() => {
          setTransactionType('transfer');
          setOpenDialog(true);
        }}
      >
        <MobileLinkSvg as={TransferIcon} />
      </MobileTransferLink>
      <MobileExpenseLink
        onClick={() => {
          setTransactionType('expense');
          setOpenDialog(true);
        }}
      >
        <MobileLinkSvg as={ExpenseIcon} />
      </MobileExpenseLink>
      <MobileIncomeLink
        onClick={() => {
          setTransactionType('income');
          setOpenDialog(true);
        }}
      >
        <MobileLinkSvg as={IncomeIcon} />
      </MobileIncomeLink>
    </>
  );
}

MobNavigation.propTypes = {
  setTransactionType: PropTypes.func,
  setOpenDialog: PropTypes.func,
};

export default MobNavigation;
