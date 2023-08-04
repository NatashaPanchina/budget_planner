import React from 'react';
import {
  MobileExpenseLink,
  MobileIncomeLink,
  MobileLinkSvg,
  MobileNavigationBackground,
  MobileTransferLink,
} from './Navigation.styled';
import { pages } from '../../../utils/constants/pages';

import { ReactComponent as ExpenseIcon } from '../../../assets/icons/navigation/mobExpense.svg';
import { ReactComponent as IncomeIcon } from '../../../assets/icons/navigation/mobIncome.svg';
import { ReactComponent as TransferIcon } from '../../../assets/icons/navigation/mobTransfer.svg';

export default function MobNavigation() {
  return (
    <>
      <MobileNavigationBackground></MobileNavigationBackground>
      <MobileTransferLink to={`${pages.newTransaction.transfer}/all`}>
        <MobileLinkSvg as={TransferIcon} />
      </MobileTransferLink>
      <MobileExpenseLink to={`${pages.newTransaction.expense}/all`}>
        <MobileLinkSvg as={ExpenseIcon} />
      </MobileExpenseLink>
      <MobileIncomeLink to={`${pages.newTransaction.income}/all`}>
        <MobileLinkSvg as={IncomeIcon} />
      </MobileIncomeLink>
    </>
  );
}
