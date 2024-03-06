import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { dinero, toDecimal } from 'dinero.js';

import {
  renderCategories,
  renderAccounts,
  renderCurrencies,
} from '../utils/index.js';

import { ReactComponent as DoneIcon } from '../../../assets/icons/shared/checkMark.svg';
import { ReactComponent as CancelIcon } from '../../../assets/icons/shared/cancel.svg';
import { ReactComponent as PlusIcon } from '../../../assets/icons/shared/plus.svg';
import { ReactComponent as SearchIcon } from '../../../assets/icons/shared/search.svg';
import { ReactComponent as CancelSearchIcon } from '../../../assets/icons/shared/cancelSearch.svg';
import { ReactComponent as DeleteIcon } from '../../../assets/icons/shared/hoverDelete.svg';

import {
  AddButtonSvg,
  AddFormButtonsContainer,
  AmountFieldsContainer,
  ArchiveButton,
  ArchiveButtonSvg,
  ButtonSvg,
  ButtonTitle,
  CancelButton,
  CancelSearchSvg,
  CurrencyInputField,
  DateField,
  DoneButton,
  FilterTooltip,
  HeaderDialog,
  InfoDialog,
  NumberInputField,
  SearchField,
  SelectHeader,
  SelectHeaderButton,
  TextInputField,
} from '../../../theme/global.js';
import { Dialog, InputAdornment } from '@mui/material';

import dayjs from 'dayjs';
import {
  NumericFormatCustom,
  formatDineroOutput,
} from '../../../utils/format/cash/index.js';
import { currencies, names } from '../../../utils/constants/currencies.js';
import { doneEventHandler } from './utils/index.js';
import AddCategory from '../../categories/addCategory/AddCategory.js';
import AddAccount from '../../accounts/addAccount/AddAccount.js';
import { deleteClick } from '../list/utils/index.js';
import DeleteAlert from '../../alerts/DeleteAlert.js';

function InfoTransaction({
  clickedTransaction,
  transactions,
  accounts,
  categories,
  setOpenDialog,
}) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const header = useSelector((state) => state.header);
  const mainCurrency = header.profile ? header.profile.currency : names.USD;
  const [transaction, setTransaction] = useState(null);
  const [id, setId] = useState('');
  const [creationDate, setCreationDate] = useState(Date.now());
  const [transactionType, setTransactionType] = useState('expense');
  const [category, setCategory] = useState('');
  const [account, setAccount] = useState('');
  const [currency, setCurrency] = useState(names.USD);
  const [amount, setAmount] = useState(
    toDecimal(dinero({ amount: 0, currency: currencies[currency] })),
  );
  const [date, setDate] = useState(dayjs(new Date()));
  const [notes, setNotes] = useState('');
  const [tags, setTags] = useState([]);
  const [openCategoryDialog, setOpenCategoryDialog] = useState(false);
  const [openAccountDialog, setOpenAccountDialog] = useState(false);
  const [openDelAlert, setOpenDelAlert] = useState(false);
  const deleteCallback = () => {
    setOpenDialog(false);
    deleteClick(transaction, accounts, dispatch, mainCurrency);
  };

  const notArchivedCategories = categories.filter(
      (category) => category.archived === false,
    ),
    notArchivedAccounts = accounts.filter(
      (account) => account.archived === false,
    );
  const filteredCategories = notArchivedCategories.filter(
    (category) => category.type === transactionType,
  );
  const infoTransaction = transactions.find(
    (transaction) => transaction.id === clickedTransaction,
  );

  useEffect(() => {
    const selectedTransaction = transactions.find(
      (item) => item.id === clickedTransaction,
    );
    const amount = selectedTransaction.amount;
    if (!selectedTransaction) return;
    setTransaction(selectedTransaction);
    setId(selectedTransaction.id);
    setCreationDate(selectedTransaction.creationDate);
    setTransactionType(selectedTransaction.transactionType);
    setCategory(selectedTransaction.category);
    setAccount(selectedTransaction.account);
    setCurrency(amount.currency.code);
    setAmount(formatDineroOutput(dinero(amount), amount.currency.code));
    setDate(dayjs(new Date(selectedTransaction.date)));
    setNotes(selectedTransaction.notes);
    setTags(selectedTransaction.tags);
  }, [clickedTransaction]);

  return (
    <>
      <HeaderDialog>
        {t('INFO_TRANSACTION.TITLE')}
        <FilterTooltip title={t('TRANSACTIONS.DELETE')} arrow>
          <ArchiveButton
            onClick={() => {
              setOpenDelAlert(true);
            }}
          >
            <ArchiveButtonSvg as={DeleteIcon} />
          </ArchiveButton>
        </FilterTooltip>
      </HeaderDialog>
      <AmountFieldsContainer>
        <CurrencyInputField
          margin="normal"
          required
          select
          fullWidth
          label={t('INFO_TRANSACTION.CURRENCY')}
          value={currency}
          onChange={(event) => setCurrency(event.target.value)}
        >
          {renderCurrencies(names)}
        </CurrencyInputField>
        <NumberInputField
          margin="normal"
          required
          label={t('INFO_TRANSACTION.AMOUNT')}
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
          <SelectHeaderButton>
            <AddButtonSvg
              onClick={() => setOpenCategoryDialog(true)}
              as={PlusIcon}
            />
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
          <SelectHeaderButton>
            <AddButtonSvg
              onClick={() => setOpenAccountDialog(true)}
              as={PlusIcon}
            />
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
          onClick={() => {
            doneEventHandler(
              clickedTransaction,
              id,
              creationDate,
              transactionType,
              category,
              account,
              currency,
              amount,
              date,
              notes,
              tags,
              infoTransaction,
              accounts,
              dispatch,
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
      <Dialog open={openDelAlert} onClose={() => setOpenDelAlert(false)}>
        <DeleteAlert
          setOpen={setOpenDelAlert}
          deleteCallback={deleteCallback}
        />
      </Dialog>
    </>
  );
}

InfoTransaction.propTypes = {
  clickedTransaction: PropTypes.string,
  transactions: PropTypes.array,
  accounts: PropTypes.array,
  categories: PropTypes.array,
  setOpenDialog: PropTypes.func,
};

export default InfoTransaction;
