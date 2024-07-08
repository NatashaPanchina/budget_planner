import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { dinero, toDecimal } from 'dinero.js';
import { ReactComponent as DoneIcon } from '../../../assets/icons/shared/checkMark.svg';
import { ReactComponent as CancelIcon } from '../../../assets/icons/shared/cancel.svg';
import { ReactComponent as DeleteIcon } from '../../../assets/icons/shared/hoverDelete.svg';
import {
  AddFormButtonsContainer,
  AmountFieldsContainer,
  ArchiveButton,
  ArchiveButtonSvg,
  ButtonSvg,
  ButtonTitle,
  CancelButton,
  DateField,
  DoneButton,
  FilterTooltip,
  HeaderDialog,
  InfoContainer,
  InfoDialog,
  NumberInputField,
  TextInputField,
} from '../../../theme/global.js';
import { Dialog } from '@mui/material';
import dayjs from 'dayjs';
import {
  NumericFormatCustom,
  formatDineroOutput,
  isCashCorrect,
} from '../../../utils/format/cash/index.js';
import { currencies, names } from '../../../utils/constants/currencies.js';
import { doneEventHandler } from './utils/index.js';
import AddCategory from '../../categories/addCategory/AddCategory.js';
import AddAccount from '../../accounts/addAccount/AddAccount.js';
import { deleteClick } from '../list/utils/index.js';
import DeleteAlert from '../../alerts/DeleteAlert.js';
import CurrenciesItems from '../utils/currencies/CurrenciesItems.js';
import CategoriesItems from '../utils/categories/CategoriesItems.js';
import AccountsItems from '../utils/accounts/AccountsItems.js';
import { isDateCorrect } from '../../../utils/format/date/index.js';

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
    toDecimal(dinero({ amount: 1000, currency: currencies[currency] })),
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
  const isCash = isCashCorrect(amount);
  const isDate = isDateCorrect(date);
  const isCategory = Boolean(filteredCategories.length);
  const isAccount = Boolean(notArchivedAccounts.length);

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
    <InfoContainer>
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
        <CurrenciesItems
          names={names}
          currency={currency}
          setCurrency={setCurrency}
        />
        <NumberInputField
          error={!isCash}
          helperText={isCash ? '' : t('NEW_TRANSACTION.AMOUNT_GREATER_ZERO')}
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
      <CategoriesItems
        categories={filteredCategories}
        category={category}
        setCategory={setCategory}
        setOpenCategoryDialog={setOpenCategoryDialog}
      />
      <AccountsItems
        accounts={notArchivedAccounts}
        account={account}
        setAccount={setAccount}
        setOpenAccountDialog={setOpenAccountDialog}
      />
      <DateField
        slotProps={{
          textField: {
            helperText: isDate ? '' : t('NEW_TRANSACTION.DATE_CANT_BE_MORE'),
          },
        }}
        $isError={!isDate}
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
            if (!isCash || !isDate || !isAccount || !isCategory) return;
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
    </InfoContainer>
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
