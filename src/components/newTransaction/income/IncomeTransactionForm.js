import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { v4 as uuidv4 } from 'uuid';
import { dinero, toSnapshot, toDecimal, add } from 'dinero.js';
import { USD } from '@dinero.js/currencies';
import { idbAddItem } from '../../../indexedDB/IndexedDB.js';
import {
  NumericFormatCustom,
  dineroFromFloat,
} from '../../../utils/format/cash';
import { renderCategories, renderAccounts } from '../../transactions/utils';
import { ReactComponent as DoneIcon } from '../../../assets/icons/shared/checkMark.svg';
import { ReactComponent as CancelIcon } from '../../../assets/icons/shared/cancel.svg';
import { ReactComponent as PlusIcon } from '../../../assets/icons/shared/plus.svg';
import { ReactComponent as SearchIcon } from '../../../assets/icons/shared/search.svg';
import { ReactComponent as CancelSearchIcon } from '../../../assets/icons/shared/cancelSearch.svg';
import { pages } from '../../../utils/constants/pages.js';
import {
  AddButtonSvg,
  AddFormButtonsContainer,
  ButtonSvg,
  ButtonTitle,
  CancelButton,
  CancelSearchSvg,
  DateField,
  DoneButton,
  SearchField,
  SelectHeader,
  SelectHeaderButton,
  TextInputField,
} from '../../../theme/global.js';
import dayjs from 'dayjs';
import { InputAdornment } from '@mui/material';
import { toStringDate } from '../../../utils/format/date/index.js';

function IncomeTransactionForm({
  categories,
  accounts,
  addNewTransaction,
  editAccount,
}) {
  const dispatch = useDispatch();

  const { t } = useTranslation();
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [filteredAccounts, setFilteredAccounts] = useState([]);

  const transactionType = 'income';
  const [category, setCategory] = useState('');
  const [account, setAccount] = useState('');
  const [amount, setAmount] = useState(
    toDecimal(dinero({ amount: 0, currency: USD })),
  );
  const [date, setDate] = useState(dayjs(new Date()));
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
        value={date}
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
            const newAmount = dineroFromFloat({
              amount,
              currency: USD,
              scale: 2,
            });
            const newTransaction = {
              id: uuidv4(),
              transactionType,
              category,
              account,
              amount: toSnapshot(newAmount),
              formatAmount: toDecimal(newAmount),
              date: toStringDate(new Date(date.format())),
              notes,
              tags,
            };
            dispatch(addNewTransaction(newTransaction));
            idbAddItem(newTransaction, 'transactions');
            const transactionAccount = filteredAccounts.find(
              (filteredAccount) => filteredAccount.id === account,
            );
            const previousBalance = dinero(transactionAccount.balance);
            const newBalance = toSnapshot(add(previousBalance, newAmount));
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

IncomeTransactionForm.propTypes = {
  categories: PropTypes.array,
  accounts: PropTypes.array,
  addNewTransaction: PropTypes.func,
  editAccount: PropTypes.func,
};

export default IncomeTransactionForm;
