import React from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { createLocaleTransactions } from '../utils/index.js';
import Slider from './Slider.js';

import { ReactComponent as ExpenseIcon } from '../../../assets/icons/shared/expense.svg';
import { ReactComponent as IncomeIcon } from '../../../assets/icons/shared/income.svg';
import { ReactComponent as TransferIcon } from '../../../assets/icons/shared/transfers.svg';

import {
  CountInfo,
  CountTransactionsBlock,
  CountTransactionsContainer,
  CountTransactionsSvg,
  MoreInfoContainer,
  MoreInfoHeader,
} from '../Transactions.styled.js';

function AccountsSlider({ transactions, accounts }) {
  const { t } = useTranslation();

  const notArchivedAccounts = accounts.filter(
    (account) => account.archived === false,
  );
  const { filterType, filterAccount } = useParams();

  const filteredTransactions =
    filterAccount === 'all'
      ? transactions
      : transactions.filter(
          (transaction) => transaction.account === filterAccount,
        );
  const allTransactions = filteredTransactions.length;
  const expensesTransactions = filteredTransactions.filter(
    (transaction) => transaction.transactionType === 'expense',
  ).length;
  const incomesTransactions = filteredTransactions.filter(
    (transaction) => transaction.transactionType === 'income',
  ).length;
  const transfersTransactions =
    allTransactions - (expensesTransactions + incomesTransactions);

  return (
    <MoreInfoContainer>
      <MoreInfoHeader>{t('TRANSACTIONS.CURRENT_CASH')}</MoreInfoHeader>
      <Slider
        filterType={filterType}
        notArchivedAccounts={notArchivedAccounts}
      />
      <CountTransactionsContainer>
        {t('TRANSACTIONS.TOTAL')}
        <CountInfo $countType="total">
          {allTransactions}{' '}
          {t(createLocaleTransactions('TRANSACTIONS', allTransactions))}
        </CountInfo>
        <CountTransactionsBlock>
          <CountTransactionsSvg as={ExpenseIcon} />
          <div>
            {t('TRANSACTIONS.FILTER_EXPENSES')}
            <CountInfo $countType="expense">
              {expensesTransactions}{' '}
              {t(
                createLocaleTransactions('TRANSACTIONS', expensesTransactions),
              )}
            </CountInfo>
          </div>
        </CountTransactionsBlock>
        <CountTransactionsBlock>
          <CountTransactionsSvg as={IncomeIcon} />
          <div>
            {t('TRANSACTIONS.FILTER_INCOMES')}
            <CountInfo $countType="income">
              {incomesTransactions}{' '}
              {t(createLocaleTransactions('TRANSACTIONS', incomesTransactions))}
            </CountInfo>
          </div>
        </CountTransactionsBlock>
        <CountTransactionsBlock>
          <CountTransactionsSvg as={TransferIcon} />
          <div>
            {t('TRANSACTIONS.FILTER_TRANSFERS')}
            <CountInfo $countType="transfer">
              {transfersTransactions}{' '}
              {t(
                createLocaleTransactions('TRANSACTIONS', transfersTransactions),
              )}
            </CountInfo>
          </div>
        </CountTransactionsBlock>
      </CountTransactionsContainer>
    </MoreInfoContainer>
  );
}

AccountsSlider.propTypes = {
  transactions: PropTypes.array,
  accounts: PropTypes.array,
};

export default AccountsSlider;
