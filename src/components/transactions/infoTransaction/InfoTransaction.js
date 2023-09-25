import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { dinero, toSnapshot, toDecimal, subtract, add } from 'dinero.js';
import { USD } from '@dinero.js/currencies';

import {
  fetchCategoriesData,
  fetchAccountsData,
  fetchTransactionsData,
  editTransaction,
  editAccount,
} from '../../../actions/Actions.js';
import { idbAddItem } from '../../../indexedDB/IndexedDB.js';
import { dineroFromFloat } from '../../../utils/format/cash';
import { renderCategories, renderAccounts } from '../utils';

import { ReactComponent as DoneIcon } from '../../../assets/icons/shared/checkMark.svg';
import { ReactComponent as CancelIcon } from '../../../assets/icons/shared/cancel.svg';
import { ReactComponent as BackIcon } from '../../../assets/icons/shared/back.svg';
import { ReactComponent as PlusIcon } from '../../../assets/icons/shared/plus.svg';
import { ReactComponent as SearchIcon } from '../../../assets/icons/shared/search.svg';
import { ReactComponent as CancelSearchIcon } from '../../../assets/icons/shared/cancelSearch.svg';

import { pages } from '../../../utils/constants/pages.js';
import {
  AddButtonSvg,
  AddContainer,
  AddFormButtonsContainer,
  AddFormHeader,
  BackLink,
  BackLinkSvg,
  ButtonSvg,
  ButtonTitle,
  CancelButton,
  CancelSearchSvg,
  DateField,
  DoneButton,
  MobHeaderTitle,
  SearchField,
  SelectHeader,
  SelectHeaderButton,
  TextInputField,
} from '../../../theme/global.js';
import { Back, BackSvg } from '../../newTransaction/NewTransaction.styled.js';
import { Grid, InputAdornment } from '@mui/material';

import dayjs from 'dayjs';
import { NumericFormatCustom } from '../../../utils/format/cash';
import { toStringDate } from '../../../utils/format/date/index.js';

function createNewBalance(prevTransaction, newTransaction, accounts) {
  const prevAccount = accounts.find(
    (account) => account.id === prevTransaction.account,
  );
  const newAccount = accounts.find(
    (account) => account.id === newTransaction.account,
  );

  switch (newTransaction.transactionType) {
    case 'income':
      //если это один и тот же счет
      if (prevAccount === newAccount) {
        const prevAccountBalance = subtract(
          dinero(prevAccount.balance),
          dinero(prevTransaction.amount),
        );
        return {
          prevAccountBalance: toSnapshot(prevAccountBalance),
          newAccountBalance: toSnapshot(
            add(prevAccountBalance, dinero(newTransaction.amount)),
          ),
        };
      } else {
        return {
          prevAccountBalance: toSnapshot(
            subtract(
              dinero(prevAccount.balance),
              dinero(prevTransaction.amount),
            ),
          ),
          newAccountBalance: toSnapshot(
            add(dinero(newAccount.balance), dinero(newTransaction.amount)),
          ),
        };
      }
    case 'expense':
      if (prevAccount === newAccount) {
        const prevAccountBalance = add(
          dinero(prevAccount.balance),
          dinero(prevTransaction.amount),
        );
        return {
          prevAccountBalance: toSnapshot(prevAccountBalance),
          newAccountBalance: toSnapshot(
            subtract(prevAccountBalance, dinero(newTransaction.amount)),
          ),
        };
      } else {
        return {
          prevAccountBalance: toSnapshot(
            add(dinero(prevAccount.balance), dinero(prevTransaction.amount)),
          ),
          newAccountBalance: toSnapshot(
            subtract(dinero(newAccount.balance), dinero(newTransaction.amount)),
          ),
        };
      }
    default:
      return {
        prevAccountBalance: prevAccount.balance,
        newAccountBalance: newAccount.balance,
      };
  }
}

const doneEventHandler = (
  clickedTransaction,
  id,
  transactionType,
  category,
  account,
  amount,
  dateObj,
  notes,
  tags,
  prevTransaction,
  editTransaction,
  editAccount,
  accounts,
  dispatch,
) => {
  const newAmount = dineroFromFloat({ amount, currency: USD, scale: 2 });
  const date = toStringDate(new Date(dateObj.format()));

  const newTransaction = {
    id,
    transactionType,
    category,
    account,
    amount: toSnapshot(newAmount),
    formatAmount: toDecimal(newAmount),
    date,
    notes,
    tags,
  };
  dispatch(editTransaction(clickedTransaction, newTransaction));
  idbAddItem(newTransaction, 'transactions');

  const balance = createNewBalance(prevTransaction, newTransaction, accounts);

  const prevTransactionAccount = accounts.find(
    (account) => account.id === prevTransaction.account,
  );
  dispatch(
    editAccount({
      ...prevTransactionAccount,
      balance: balance.prevAccountBalance,
    }),
  );
  idbAddItem(
    { ...prevTransactionAccount, balance: balance.prevAccountBalance },
    'accounts',
  );

  const newTransactionAccount = accounts.find(
    (account) => account.id === newTransaction.account,
  );
  dispatch(
    editAccount({
      ...newTransactionAccount,
      balance: balance.newAccountBalance,
    }),
  );
  idbAddItem(
    { ...newTransactionAccount, balance: balance.newAccountBalance },
    'accounts',
  );
};

export default function InfoTransaction() {
  const transactions = useSelector((state) => state.transactions);
  const accounts = useSelector((state) => state.accounts);
  const categories = useSelector((state) => state.categories);
  const dispatch = useDispatch();

  const { t } = useTranslation();

  const clickedTransaction = useParams().transactionId;

  let [id, setId] = useState('');
  const [transactionType, setTransactionType] = useState('expense');
  const [category, setCategory] = useState('');
  const [account, setAccount] = useState('');
  const [amount, setAmount] = useState(
    toDecimal(dinero({ amount: 0, currency: USD })),
  );
  const [date, setDate] = useState(dayjs(new Date()));
  const [notes, setNotes] = useState();
  const [tags, setTags] = useState([]);

  const [transactionsData, setTransactionsData] = useState([]);
  const [categoriesData, setCategoriesData] = useState([]);
  const [accountsData, setAccountsData] = useState([]);

  const notArchivedCategories = categoriesData.filter(
      (category) => category.archived === false,
    ),
    notArchivedAccounts = accountsData.filter(
      (account) => account.archived === false,
    );
  const filteredCategories = notArchivedCategories.filter(
    (category) => category.type === transactionType,
  );
  const infoTransaction = transactionsData.find(
    (transaction) => transaction.id === clickedTransaction,
  );

  useEffect(() => {
    dispatch(fetchCategoriesData());
    dispatch(fetchAccountsData());
    dispatch(fetchTransactionsData());
  }, [dispatch]);

  useEffect(() => {
    if (transactions.status === 'succeeded') {
      setTransactionsData(transactions.transactions);

      const infoTransaction = transactions.transactions.find(
        (transaction) => transaction.id === clickedTransaction,
      );

      if (!infoTransaction) return;

      setId(infoTransaction.id);
      setTransactionType(infoTransaction.transactionType);
      setCategory(infoTransaction.category);
      setAccount(infoTransaction.account);
      setAmount(toDecimal(dinero(infoTransaction.amount)));
      setDate(dayjs(new Date(infoTransaction.date)));
      setNotes(infoTransaction.notes);
      setTags(infoTransaction.tags);
    }
  }, [transactions.status, transactions.transactions, clickedTransaction]);

  useEffect(() => {
    if (categories.status === 'succeeded') {
      setCategoriesData(categories.categories);
    }
  }, [categories.status, categories.categories]);

  useEffect(() => {
    if (accounts.status === 'succeeded') {
      setAccountsData(accounts.accounts);
    }
  }, [accounts.status, accounts.accounts]);

  return accounts.status === 'loading' ||
    categories.status === 'loading' ||
    transactions.status === 'loading' ? (
    <div>Loading</div>
  ) : (
    <Grid item xs={12}>
      <AddContainer>
        <AddFormHeader>
          <BackLink
            to={`${pages.transactions[`${transactionType}s`]}/${account}`}
          >
            <BackLinkSvg as={BackIcon} />
          </BackLink>
          {t('INFO_TRANSACTION.TITLE')}
        </AddFormHeader>
        <Back to={`${pages.transactions[`${transactionType}s`]}/${account}`}>
          <BackSvg as={BackIcon} />
        </Back>
        <MobHeaderTitle $titleType={transactionType}>
          {t('INFO_TRANSACTION.TITLE')}
        </MobHeaderTitle>
        <TextInputField
          margin="normal"
          required
          label={t('INFO_TRANSACTION.TYPE')}
          value={t(`INFO_TRANSACTION.${transactionType.toUpperCase()}`)}
          InputProps={{
            readOnly: true,
          }}
        />
        <TextInputField
          margin="normal"
          required
          select
          label={t('INFO_TRANSACTION.CATEGORY')}
          value={category}
          onChange={(event) => setCategory(event.target.value)}
        >
          <SelectHeader>
            {t('INFO_TRANSACTION.AVAILABLE_CATEGORIES')}
            <SelectHeaderButton to={pages.categories.add[transactionType]}>
              <AddButtonSvg as={PlusIcon} />
            </SelectHeaderButton>
          </SelectHeader>
          <SearchField
            placeholder={t('INFO_TRANSACTION.SEARCH_CATEGORY')}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <CancelSearchSvg as={CancelSearchIcon} />
                </InputAdornment>
              ),
            }}
          />
          {renderCategories(filteredCategories)}
        </TextInputField>
        <TextInputField
          margin="normal"
          required
          select
          label={t('INFO_TRANSACTION.ACCOUNT')}
          value={account}
          onChange={(event) => setAccount(event.target.value)}
        >
          <SelectHeader>
            {t('INFO_TRANSACTION.AVAILABLE_ACCOUNTS')}
            <SelectHeaderButton to={pages.accounts.add.card}>
              <AddButtonSvg as={PlusIcon} />
            </SelectHeaderButton>
          </SelectHeader>
          <SearchField
            placeholder={t('INFO_TRANSACTION.SEARCH_ACCOUNT')}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <CancelSearchSvg as={CancelSearchIcon} />
                </InputAdornment>
              ),
            }}
          />
          {renderAccounts(notArchivedAccounts, t)}
        </TextInputField>
        <TextInputField
          margin="normal"
          required
          label={t('INFO_TRANSACTION.AMOUNT')}
          name="numberformat"
          value={amount}
          onChange={(event) => setAmount(event.target.value)}
          InputProps={{
            inputComponent: NumericFormatCustom,
          }}
        />
        <DateField
          required
          label={t('INFO_TRANSACTION.DATE')}
          value={date}
          onChange={(value) => setDate(value)}
        />
        <TextInputField
          margin="normal"
          multiline
          label={t('INFO_TRANSACTION.NOTES')}
          placeholder="Tap here to make some notes"
          defaultValue={notes}
          onChange={(event) => setNotes(event.target.value)}
        />
        <TextInputField
          margin="normal"
          multiline
          label={t('INFO_TRANSACTION.TAGS')}
          onChange={(event) => setTags(event.target.value)}
        />
        <AddFormButtonsContainer>
          <DoneButton
            to={`${pages.transactions[`${transactionType}s`]}/${account}`}
            onClick={() =>
              doneEventHandler(
                clickedTransaction,
                id,
                transactionType,
                category,
                account,
                amount,
                date,
                notes,
                tags,
                infoTransaction,
                editTransaction,
                editAccount,
                accountsData,
                dispatch,
              )
            }
          >
            <ButtonSvg as={DoneIcon} />
            <ButtonTitle>{t('NEW_TRANSACTION.DONE')}</ButtonTitle>
          </DoneButton>
          <CancelButton
            to={`${pages.transactions[`${transactionType}s`]}/${account}`}
          >
            <ButtonSvg as={CancelIcon} />
            <ButtonTitle>{t('NEW_TRANSACTION.CANCEL')}</ButtonTitle>
          </CancelButton>
        </AddFormButtonsContainer>
      </AddContainer>
    </Grid>
  );
}
