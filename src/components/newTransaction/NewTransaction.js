import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import {
  fetchCategoriesData,
  fetchAccountsData,
  addNewTransaction,
  editAccount,
} from '../../actions/Actions';
import ExpenseTransactionForm from './expense/ExpenseTransactionForm';
import IncomeTransactionForm from './income/IncomeTransactionForm';

import { ReactComponent as ExpenseIcon } from '../../assets/icons/shared/newExpense.svg';
import { ReactComponent as IncomeIcon } from '../../assets/icons/shared/newIncome.svg';
import { ReactComponent as TransferIcon } from '../../assets/icons/shared/newTransfer.svg';
import { ReactComponent as BackIcon } from '../../assets/icons/shared/back.svg';

import TransferTransactionForm from './transfer/TransferTransactionForm';
import { pages } from '../../utils/constants/pages';
import { Grid } from '@mui/material';
import {
  Back,
  BackSvg,
  HeaderSvg,
  HeaderTitleLink,
} from './NewTransaction.styled';
import {
  AddContainer,
  AddFormHeader,
  MobHeaderTitle,
} from '../../theme/global';
import { getMobileTitle } from './utils';
import Loading from '../loading/Loading';
import { names } from '../../utils/constants/currencies';

function renderTransactionForm(
  mainCurrency,
  transactionType,
  categories,
  accounts,
  addNewTransaction,
  editAccount,
) {
  switch (transactionType) {
    case 'expense':
      return (
        <ExpenseTransactionForm
          mainCurrency={mainCurrency}
          categories={categories}
          accounts={accounts}
          addNewTransaction={addNewTransaction}
          editAccount={editAccount}
        />
      );
    case 'income':
      return (
        <IncomeTransactionForm
          categories={categories}
          accounts={accounts}
          addNewTransaction={addNewTransaction}
          editAccount={editAccount}
        />
      );
    case 'transfer':
      return <TransferTransactionForm accounts={accounts} />;
    default:
      return (
        <ExpenseTransactionForm
          categories={categories}
          accounts={accounts}
          addNewTransaction={addNewTransaction}
          editAccount={editAccount}
        />
      );
  }
}

export default function NewTransaction() {
  const categories = useSelector((state) => state.categories);
  const accounts = useSelector((state) => state.accounts);
  const header = useSelector((state) => state.header);
  const dispatch = useDispatch();

  const { t } = useTranslation();
  const { transactionType, transactionAccount } = useParams();
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [filteredAccounts, setFilteredAccounts] = useState([]);
  const [mainCurrency, setMainCurrency] = useState(names.USD);

  useEffect(() => {
    dispatch(fetchCategoriesData());
    dispatch(fetchAccountsData());
  }, [dispatch]);

  useEffect(() => {
    if (categories.status === 'succeeded') {
      const filteredCategories = categories.categories.filter(
        (category) =>
          category.type === transactionType && category.archived === false,
      );
      setFilteredCategories(filteredCategories);
    }
  }, [categories.status, categories.categories, transactionType]);

  useEffect(() => {
    if (accounts.status === 'succeeded') {
      const notArchivedAccounts = accounts.accounts.filter(
        (account) => account.archived === false,
      );
      setFilteredAccounts(notArchivedAccounts);
    }
  }, [accounts.status, accounts.accounts]);

  useEffect(() => {
    if (header.status === 'succeeded') {
      if (!header.profile) {
        setMainCurrency(header.profile.currency);
      }
    }
  }, [header.status, header.profile]);

  return (
    <Grid item xs={12}>
      <AddContainer>
        <AddFormHeader>
          <HeaderTitleLink
            $linkType="expense"
            to={`${pages.newTransaction.expense}/${transactionAccount}`}
          >
            <HeaderSvg as={ExpenseIcon} />
            {t('NEW_TRANSACTION.TITLE.EXPENSE')}
          </HeaderTitleLink>
          <HeaderTitleLink
            $linkType="income"
            to={`${pages.newTransaction.income}/${transactionAccount}`}
          >
            <HeaderSvg as={IncomeIcon} />
            {t('NEW_TRANSACTION.TITLE.INCOME')}
          </HeaderTitleLink>
          <HeaderTitleLink
            $linkType="transfer"
            to={`${pages.newTransaction.transfer}/${transactionAccount}`}
          >
            <HeaderSvg as={TransferIcon} />
            {t('NEW_TRANSACTION.TITLE.TRANSFER')}
          </HeaderTitleLink>
        </AddFormHeader>
        <Back to={`${pages.transactions[`${transactionType}s`]}/all`}>
          <BackSvg as={BackIcon} />
        </Back>
        <MobHeaderTitle>{getMobileTitle(transactionType, t)}</MobHeaderTitle>
        {header.status === 'loading' ||
        accounts.status === 'loading' ||
        categories.status === 'loading' ? (
          <Loading />
        ) : (
          renderTransactionForm(
            mainCurrency,
            transactionType,
            filteredCategories,
            filteredAccounts,
            addNewTransaction,
            editAccount,
          )
        )}
      </AddContainer>
    </Grid>
  );
}
