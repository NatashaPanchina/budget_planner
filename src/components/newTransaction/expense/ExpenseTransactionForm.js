import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { dinero, toDecimal } from 'dinero.js';
import dayjs from 'dayjs';
import {
  renderCategories,
  renderAccounts,
  renderCurrencies,
} from '../../transactions/utils';
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
  AmountFieldsContainer,
  CurrencyInputField,
  NumberInputField,
  InfoDialog,
} from '../../../theme/global.js';
import { InputAdornment } from '@mui/material';
import { currencies, names } from '../../../utils/constants/currencies.js';
import { doneEventClick } from './utils/index.js';
import AddCategory from '../../categories/addCategory/AddCategory.js';
import AddAccount from '../../accounts/addAccount/AddAccount.js';

function ExpenseTransactionForm({
  mainCurrency,
  categories,
  accounts,
  addNewTransaction,
  editAccount,
  setOpenDialog,
}) {
  const dispatch = useDispatch();

  const { t } = useTranslation();
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [filteredAccounts, setFilteredAccounts] = useState([]);
  const transactionType = 'expense';
  const [category, setCategory] = useState('');
  const [account, setAccount] = useState('');
  const [currency, setCurrency] = useState(mainCurrency);
  const [amount, setAmount] = useState(
    toDecimal(dinero({ amount: 0, currency: currencies[currency] })),
  );
  const [date, setDate] = useState(dayjs(new Date()));
  const [notes, setNotes] = useState('');
  const [tags, setTags] = useState([]);
  const [openCategoryDialog, setOpenCategoryDialog] = useState(false);
  const [openAccountDialog, setOpenAccountDialog] = useState(false);

  useEffect(() => {
    setFilteredAccounts(accounts);
    setFilteredCategories(categories);
    if (categories.length) setCategory(categories[0].id);
    if (accounts.length) setAccount(accounts[0].id);
  }, [accounts, categories]);

  return (
    <>
      <AmountFieldsContainer>
        <CurrencyInputField
          margin="normal"
          required
          select
          fullWidth
          label={t('NEW_TRANSACTION.CURRENCY')}
          value={currency}
          onChange={(event) => setCurrency(event.target.value)}
        >
          {renderCurrencies(names)}
        </CurrencyInputField>
        <NumberInputField
          margin="normal"
          required
          label={t('NEW_TRANSACTION.AMOUNT')}
          name="numberformat"
          value={amount}
          onChange={(event) => setAmount(event.target.value)}
          inputProps={{ currency }}
          InputProps={{
            inputComponent: NumericFormatCustom,
          }}
        />
      </AmountFieldsContainer>
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
          <SelectHeaderButton>
            <AddButtonSvg
              onClick={() => setOpenCategoryDialog(true)}
              as={PlusIcon}
            />
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
          <SelectHeaderButton>
            <AddButtonSvg
              onClick={() => setOpenAccountDialog(true)}
              as={PlusIcon}
            />
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
          onClick={() => {
            doneEventClick(
              currency,
              amount,
              transactionType,
              category,
              account,
              date,
              notes,
              tags,
              filteredAccounts,
              dispatch,
              addNewTransaction,
              editAccount,
              mainCurrency,
            );
            setOpenDialog(false);
          }}
        >
          <ButtonSvg as={DoneIcon} />
          <ButtonTitle>{t('NEW_TRANSACTION.DONE')}</ButtonTitle>
        </DoneButton>
        <CancelButton onClick={() => setOpenDialog(false)}>
          <ButtonSvg as={CancelIcon} />
          <ButtonTitle>{t('NEW_TRANSACTION.CANCEL')}</ButtonTitle>
        </CancelButton>
      </AddFormButtonsContainer>
      <InfoDialog
        open={openCategoryDialog}
        onClose={() => setOpenCategoryDialog(false)}
      >
        <AddCategory setOpenDialog={setOpenCategoryDialog} />
      </InfoDialog>
      <InfoDialog
        open={openAccountDialog}
        onClose={() => setOpenAccountDialog(false)}
      >
        <AddAccount
          categories={categories}
          setOpenDialog={setOpenAccountDialog}
        />
      </InfoDialog>
    </>
  );
}

ExpenseTransactionForm.propTypes = {
  mainCurrency: PropTypes.string,
  categories: PropTypes.array,
  accounts: PropTypes.array,
  addNewTransaction: PropTypes.func,
  editAccount: PropTypes.func,
  setOpenDialog: PropTypes.func,
};

export default ExpenseTransactionForm;
