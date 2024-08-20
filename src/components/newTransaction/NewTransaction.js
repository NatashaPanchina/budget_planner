import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { fetchCategoriesData, fetchAccountsData } from '../../actions/Actions';
import ExpenseTransactionForm from './expense/ExpenseTransactionForm';
import IncomeTransactionForm from './income/IncomeTransactionForm';

import TransferTransactionForm from './transfer/TransferTransactionForm';
import { Header, HeaderTitleLink, TitleSpan } from './NewTransaction.styled';
import Loading from '../loading/Loading';
import { names } from '../../utils/constants/currencies';

function renderTransactionForm(
  mainCurrency,
  transactionType,
  categories,
  accounts,
  setOpenDialog,
) {
  switch (transactionType) {
    case 'expense':
      return (
        <ExpenseTransactionForm
          mainCurrency={mainCurrency}
          categories={categories}
          accounts={accounts}
          setOpenDialog={setOpenDialog}
        />
      );
    case 'income':
      return (
        <IncomeTransactionForm
          mainCurrency={mainCurrency}
          categories={categories}
          accounts={accounts}
          setOpenDialog={setOpenDialog}
        />
      );
    case 'transfer':
      return (
        <TransferTransactionForm
          accounts={accounts}
          setOpenDialog={setOpenDialog}
        />
      );
    default:
      return (
        <ExpenseTransactionForm
          mainCurrency={mainCurrency}
          categories={categories}
          accounts={accounts}
          setOpenDialog={setOpenDialog}
        />
      );
  }
}

function NewTransaction({ setOpenDialog, type }) {
  const categories = useSelector((state) => state.categories);
  const accounts = useSelector((state) => state.accounts);
  const header = useSelector((state) => state.header);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [transactionType, setTransactionType] = useState(
    type ? type : 'expense',
  );
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [filteredAccounts, setFilteredAccounts] = useState([]);
  const [mainCurrency, setMainCurrency] = useState(names.USD);

  useEffect(() => {
    dispatch(fetchCategoriesData());
    dispatch(fetchAccountsData());
  }, []);

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
        return;
      }
      setMainCurrency(header.profile.currency);
    }
  }, [header.status, header.profile]);

  return (
    <>
      <Header>
        <HeaderTitleLink
          $linkType="expense"
          $isActive={transactionType === 'expense'}
          onClick={() => setTransactionType('expense')}
        >
          <TitleSpan>{t('NEW_TRANSACTION.TITLE.NEW')}</TitleSpan>
          {t('NEW_TRANSACTION.TITLE.EXPENSE')}
        </HeaderTitleLink>
        <HeaderTitleLink
          $linkType="income"
          $isActive={transactionType === 'income'}
          onClick={() => setTransactionType('income')}
        >
          <TitleSpan>{t('NEW_TRANSACTION.TITLE.NEW')}</TitleSpan>
          {t('NEW_TRANSACTION.TITLE.INCOME')}
        </HeaderTitleLink>
        <HeaderTitleLink
          $linkType="transfer"
          $isActive={transactionType === 'transfer'}
          onClick={() => setTransactionType('transfer')}
        >
          <TitleSpan>{t('NEW_TRANSACTION.TITLE.NEW')}</TitleSpan>
          {t('NEW_TRANSACTION.TITLE.TRANSFER')}
        </HeaderTitleLink>
      </Header>
      {/* <MobHeaderTitle>{getMobileTitle(transactionType, t)}</MobHeaderTitle> */}
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
          setOpenDialog,
        )
      )}
    </>
  );
}

NewTransaction.propTypes = {
  type: PropTypes.string,
  setOpenDialog: PropTypes.func,
};

export default NewTransaction;
