import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { NumericFormat } from 'react-number-format';

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
import {
  renderSelectedCategory,
  renderCategories,
  renderAccounts,
  renderSelectedAccount,
} from '../utils';
import {
  hideElement,
  useOutsideClick,
} from '../../../hooks/useOutsideClick.js';

import { ReactComponent as DoneIcon } from '../../../assets/icons/shared/checkMark.svg';
import { ReactComponent as CancelIcon } from '../../../assets/icons/shared/delete.svg';
import { ReactComponent as BackIcon } from '../../../assets/icons/shared/back.svg';
import { ReactComponent as PlusIcon } from '../../../assets/icons/shared/plus.svg';
import searchIcon from '../../../assets/icons/shared/search.svg';

import { pages } from '../../../utils/constants/pages.js';
import {
  AddButton,
  AddButtonSvg,
  AddContainer,
  AddFormButtonsContainer,
  AddFormHeader,
  BackLink,
  BackLinkSvg,
  ButtonSvg,
  ButtonTitle,
  CancelButton,
  DoneButton,
  FieldDescription,
  FieldInput,
  FormField,
  FormFieldsContainer,
  MobHeaderTitle,
  Search,
  SearchImg,
  SearchInput,
} from '../../../theme/global.js';
import {
  AccountsList,
  Back,
  BackSvg,
  CategoriesList,
  NumericInput,
} from '../../newTransaction/NewTransaction.styled.js';
import { Grid } from '@mui/material';

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
  date,
  notes,
  tags,
  prevTransaction,
  editTransaction,
  editAccount,
  accounts,
  dispatch,
) => {
  const newAmount = dineroFromFloat({ amount, currency: USD, scale: 2 });
  const newTransaction = {
    id,
    transactionType,
    category,
    account,
    amount: toSnapshot(newAmount),
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
  const [activeItem, setActiveItem] = useState('');

  const clickedTransaction = useParams().transactionId;

  let [id, setId] = useState('');
  const [transactionType, setTransactionType] = useState('expense');
  const [category, setCategory] = useState();
  const [account, setAccount] = useState();
  const [amount, setAmount] = useState(
    toDecimal(dinero({ amount: 0, currency: USD })),
  );
  const [date, setDate] = useState(new Date());
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

  const categoriesRef = useOutsideClick(hideElement);
  const accountsRef = useOutsideClick(hideElement);

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
      setDate(new Date(infoTransaction.date));
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
        <FormFieldsContainer>
          <FormField
            $isActive={activeItem === '1'}
            $formType={transactionType}
            onClick={() => setActiveItem('1')}
          >
            <FieldDescription>
              {t('INFO_TRANSACTION.CATEGORY')}
            </FieldDescription>
            <div
              onClick={(event) => {
                setActiveItem('1');
                categoriesRef.current.classList.toggle('none');
                accountsRef.current.classList.add('none');
                event.stopPropagation();
              }}
            >
              {renderSelectedCategory(category, categoriesData)}
            </div>
          </FormField>
          <CategoriesList ref={categoriesRef} className="none">
            <Search>
              <SearchInput
                type="text"
                placeholder={t('INFO_TRANSACTION.SEARCH_CATEGORY')}
              ></SearchInput>
              <SearchImg src={searchIcon} alt="search" />
            </Search>
            <AddButton to={pages.categories.add[transactionType]}>
              <AddButtonSvg as={PlusIcon} />
              {t('INFO_TRANSACTION.ADD_CATEGORY')}
            </AddButton>
            {renderCategories(
              filteredCategories,
              category,
              setCategory,
              categoriesRef,
            )}
          </CategoriesList>
          <FormField
            $isActive={activeItem === '2'}
            $formType={transactionType}
            onClick={() => setActiveItem('2')}
          >
            <FieldDescription>{t('INFO_TRANSACTION.CASH')}</FieldDescription>
            <div
              onClick={(event) => {
                setActiveItem('2');
                accountsRef.current.classList.toggle('none');
                categoriesRef.current.classList.add('none');
                event.stopPropagation();
              }}
            >
              {renderSelectedAccount(account, accountsData)}
            </div>
          </FormField>
          <AccountsList ref={accountsRef} className="none">
            <Search>
              <SearchInput
                type="text"
                placeholder={t('INFO_TRANSACTION.SEARCH_CASH')}
              ></SearchInput>
              <SearchImg src={searchIcon} alt="search" />
            </Search>
            <AddButton to={pages.cash.add.card}>
              <AddButtonSvg as={PlusIcon} />
              {t('INFO_TRANSACTION.ADD_CASH')}
            </AddButton>
            {renderAccounts(notArchivedAccounts, setAccount, accountsRef, t)}
          </AccountsList>
          <FormField
            $isActive={activeItem === '3'}
            $formType={transactionType}
            onClick={() => setActiveItem('3')}
          >
            <FieldDescription>{t('INFO_TRANSACTION.AMOUNT')}</FieldDescription>
            $
            <NumericFormat
              customInput={NumericInput}
              thousandSeparator=","
              decimalSeparator="."
              decimalScale={2}
              allowNegative={false}
              placeholder="0.00"
              onValueChange={(values) => setAmount(values.floatValue)}
              value={amount}
            />
          </FormField>
          <FormField
            $isActive={activeItem === '4'}
            $formType={transactionType}
            onClick={() => setActiveItem('4')}
          >
            <FieldDescription>{t('INFO_TRANSACTION.DATE')}</FieldDescription>
            <FieldInput
              type="date"
              onChange={(event) => setDate(new Date(event.target.value))}
            ></FieldInput>
          </FormField>
          <FormField
            $isActive={activeItem === '5'}
            $formType={transactionType}
            onClick={() => setActiveItem('5')}
          >
            <FieldDescription>{t('INFO_TRANSACTION.NOTES')}</FieldDescription>
            <FieldInput
              type="text"
              onChange={(event) => setNotes(event.target.value)}
              defaultValue={notes}
            ></FieldInput>
          </FormField>
          <FormField
            $isActive={activeItem === '6'}
            $formType={transactionType}
            onClick={() => setActiveItem('6')}
          >
            <FieldDescription>{t('INFO_TRANSACTION.TAGS')}</FieldDescription>
            <FieldInput type="text"></FieldInput>
          </FormField>
          <AddFormButtonsContainer>
            <DoneButton
              $buttonType={transactionType}
              to={`${pages.transactions[`${transactionType}s`]}/${account}`}
              onClick={() =>
                doneEventHandler(
                  clickedTransaction,
                  id,
                  transactionType,
                  category,
                  account,
                  amount,
                  date.toISOString(),
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
        </FormFieldsContainer>
      </AddContainer>
    </Grid>
  );
}
