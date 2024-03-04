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
  ExpenseCountSvg,
  IncomeCountSvg,
  TransferCountSvg,
  MoreInfoContainer,
  MoreInfoHeader,
  TotalCountTransactions,
} from '../Transactions.styled.js';
import { Grid } from '@mui/material';

function AccountsSlider({ mainCurrency, transactions, accounts }) {
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
      <Grid item xs={12} sm={5} md={12}>
        <MoreInfoHeader>{t('TRANSACTIONS.CURRENT_ACCOUNT')}</MoreInfoHeader>
        <Slider
          mainCurrency={mainCurrency}
          filterType={filterType}
          notArchivedAccounts={notArchivedAccounts}
        />
      </Grid>
      <Grid item xs={12} sm={7} md={12}>
        <CountTransactionsContainer>
          <TotalCountTransactions>
            <div>
              {t('TRANSACTIONS.TOTAL')}
              <CountInfo $countType="total">
                {allTransactions}{' '}
                {t(createLocaleTransactions('TRANSACTIONS', allTransactions))}
              </CountInfo>
            </div>
          </TotalCountTransactions>
          <CountTransactionsBlock>
            <ExpenseCountSvg as={ExpenseIcon} />
            <div>
              {t('TRANSACTIONS.FILTER_EXPENSES')}
              <CountInfo $countType="expense">
                {expensesTransactions}{' '}
                {t(
                  createLocaleTransactions(
                    'TRANSACTIONS',
                    expensesTransactions,
                  ),
                )}
              </CountInfo>
            </div>
          </CountTransactionsBlock>
          <CountTransactionsBlock>
            <IncomeCountSvg as={IncomeIcon} />
            <div>
              {t('TRANSACTIONS.FILTER_INCOMES')}
              <CountInfo $countType="income">
                {incomesTransactions}{' '}
                {t(
                  createLocaleTransactions('TRANSACTIONS', incomesTransactions),
                )}
              </CountInfo>
            </div>
          </CountTransactionsBlock>
          <CountTransactionsBlock>
            <TransferCountSvg as={TransferIcon} />
            <div>
              {t('TRANSACTIONS.FILTER_TRANSFERS')}
              <CountInfo $countType="transfer">
                {transfersTransactions}{' '}
                {t(
                  createLocaleTransactions(
                    'TRANSACTIONS',
                    transfersTransactions,
                  ),
                )}
              </CountInfo>
            </div>
          </CountTransactionsBlock>
        </CountTransactionsContainer>
      </Grid>
    </MoreInfoContainer>
  );
}

AccountsSlider.propTypes = {
  mainCurrency: PropTypes.string,
  transactions: PropTypes.array,
  accounts: PropTypes.array,
};

export default AccountsSlider;
