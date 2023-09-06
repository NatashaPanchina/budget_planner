import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { v4 as uuidv4 } from 'uuid';
import { dinero, toSnapshot, toDecimal, subtract } from 'dinero.js';
import { USD } from '@dinero.js/currencies';
import dayjs from 'dayjs';
import { idbAddItem } from '../../../indexedDB/IndexedDB.js';
import { pages } from '../../../utils/constants/pages';
import { dineroFromFloat } from '../../../utils/format/cash';
import { renderCategories, renderAccounts } from '../../transactions/utils';
import { NumericFormatCustom } from '../../../utils/format/cash';
import { ReactComponent as DoneIcon } from '../../../assets/icons/shared/done.svg';
import { ReactComponent as CancelIcon } from '../../../assets/icons/shared/cancel.svg';
import { ReactComponent as CancelSearchIcon } from '../../../assets/icons/shared/cancelSearch.svg';
import { ReactComponent as PlusIcon } from '../../../assets/icons/shared/plus.svg';
import { ReactComponent as SearchIcon } from '../../../assets/icons/shared/search.svg';
import {
  AddButtonSvg,
  AddFormButtonsContainer,
  CancelButton,
  DoneButton,
  ButtonSvg,
  ButtonTitle,
  TextInputField,
  DateField,
  SelectHeader,
  SearchField,
  CancelSearchSvg,
  SelectHeaderButton,
} from '../../../theme/global.js';
import { InputAdornment } from '@mui/material';

function ExpenseTransactionForm({
  categories,
  accounts,
  addNewTransaction,
  editAccount,
}) {
  const dispatch = useDispatch();

  const { t } = useTranslation();
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [filteredAccounts, setFilteredAccounts] = useState([]);
  const transactionType = 'expense';
  const [category, setCategory] = useState('');
  const [account, setAccount] = useState('');
  const [amount, setAmount] = useState(
    toDecimal(dinero({ amount: 0, currency: USD })),
  );
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState('');
  const [tags, setTags] = useState([]);

  useEffect(() => {
    setFilteredAccounts(accounts);
    setFilteredCategories(categories);
    if (categories.length) setCategory(categories[0].id);
    if (accounts.length) setAccount(accounts[0].id);
  }, [accounts, categories]);

  return (
    <>
      <TextInputField
        margin="normal"
        required
        select
        label={t('NEW_TRANSACTION.CATEGORY')}
        value={category}
        onChange={(event) => setCategory(event.target.value)}
      >
        <SelectHeader>
          {t('NEW_TRANSACTION.AVAILABLE_CATEGORIES')}
          <SelectHeaderButton to={pages.categories.add[transactionType]}>
            <AddButtonSvg as={PlusIcon} />
          </SelectHeaderButton>
        </SelectHeader>
        <SearchField
          placeholder={t('NEW_TRANSACTION.SEARCH_CATEGORY')}
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
        label={t('NEW_TRANSACTION.ACCOUNT')}
        value={account}
        onChange={(event) => setAccount(event.target.value)}
      >
        <SelectHeader>
          {t('NEW_TRANSACTION.AVAILABLE_ACCOUNTS')}
          <SelectHeaderButton to={pages.accounts.add.card}>
            <AddButtonSvg as={PlusIcon} />
          </SelectHeaderButton>
        </SelectHeader>
        <SearchField
          placeholder={t('NEW_TRANSACTION.SEARCH_ACCOUNTS')}
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
        {renderAccounts(filteredAccounts, t)}
      </TextInputField>
      <TextInputField
        margin="normal"
        required
        label={t('NEW_TRANSACTION.AMOUNT')}
        name="numberformat"
        value={amount}
        onChange={(event) => setAmount(event.target.value)}
        InputProps={{
          inputComponent: NumericFormatCustom,
        }}
      />
      <DateField
        required
        label={t('NEW_TRANSACTION.DATE')}
        defaultValue={dayjs(date)}
        onChange={(value) => setDate(value)}
      />
      <TextInputField
        margin="normal"
        multiline
        label={t('NEW_TRANSACTION.NOTES')}
        placeholder="Tap here to make some notes"
        defaultValue={notes}
        onChange={(event) => setNotes(event.target.value)}
      />
      <TextInputField
        margin="normal"
        multiline
        label={t('NEW_TRANSACTION.TAGS')}
        onChange={(event) => setTags(event.target.value)}
      />
      <AddFormButtonsContainer>
        <DoneButton
          to={`${pages.transactions[`${transactionType}s`]}/all`}
          onClick={() => {
            const newTransaction = {
              id: uuidv4(),
              transactionType,
              category,
              account,
              amount: toSnapshot(
                dineroFromFloat({ amount, currency: USD, scale: 2 }),
              ),
              date: date.toISOString(),
              notes,
              tags,
            };
            dispatch(addNewTransaction(newTransaction));
            idbAddItem(newTransaction, 'transactions');
            const transactionAccount = filteredAccounts.find(
              (filteredAccount) => filteredAccount.id === account,
            );
            const previousBalance = dinero(transactionAccount.balance);
            const newBalance = toSnapshot(
              subtract(
                previousBalance,
                dineroFromFloat({ amount, currency: USD, scale: 2 }),
              ),
            );
            dispatch(
              editAccount(transactionAccount.id, {
                ...transactionAccount,
                balance: newBalance,
              }),
            );
            idbAddItem(
              { ...transactionAccount, balance: newBalance },
              'accounts',
            );
          }}
        >
          <ButtonSvg as={DoneIcon} />
          <ButtonTitle>{t('NEW_TRANSACTION.DONE')}</ButtonTitle>
        </DoneButton>
        <CancelButton to={`${pages.transactions[`${transactionType}s`]}/all`}>
          <ButtonSvg as={CancelIcon} />
          <ButtonTitle>{t('NEW_TRANSACTION.CANCEL')}</ButtonTitle>
        </CancelButton>
      </AddFormButtonsContainer>
    </>
  );
}

ExpenseTransactionForm.propTypes = {
  categories: PropTypes.array,
  accounts: PropTypes.array,
  addNewTransaction: PropTypes.func,
  editAccount: PropTypes.func,
};

export default ExpenseTransactionForm;
