import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { dinero, toDecimal } from 'dinero.js';
import dayjs from 'dayjs';
import { NumericFormatCustom, isCashCorrect } from '../../../utils/format/cash';
import { ReactComponent as DoneIcon } from '../../../assets/icons/shared/done.svg';
import { ReactComponent as CancelIcon } from '../../../assets/icons/shared/cancel.svg';
import {
  AddFormButtonsContainer,
  CancelButton,
  DoneButton,
  ButtonSvg,
  ButtonTitle,
  TextInputField,
  DateField,
  AmountFieldsContainer,
  NumberInputField,
  InfoDialog,
} from '../../../theme/global.js';
import { currencies, names } from '../../../utils/constants/currencies.js';
import { doneEventClick } from './utils/index.js';
import AddCategory from '../../categories/addCategory/AddCategory.js';
import AddAccount from '../../accounts/addAccount/AddAccount.js';
import CurrenciesItems from '../../transactions/utils/currencies/CurrenciesItems.js';
import AccountsItems from '../../transactions/utils/accounts/AccountsItems.js';
import CategoriesItems from '../../transactions/utils/categories/CategoriesItems.js';
import { isDateCorrect } from '../../../utils/format/date/index.js';

function ExpenseTransactionForm({
  mainCurrency,
  categories,
  accounts,
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
    toDecimal(dinero({ amount: 1000, currency: currencies[currency] })),
  );
  const [date, setDate] = useState(dayjs(new Date()));
  const [notes, setNotes] = useState('');
  const [tags, setTags] = useState([]);
  const [openCategoryDialog, setOpenCategoryDialog] = useState(false);
  const [openAccountDialog, setOpenAccountDialog] = useState(false);

  const isCash = isCashCorrect(amount);
  const isDate = isDateCorrect(date);
  const isCategory = Boolean(filteredCategories.length);
  const isAccount = Boolean(filteredAccounts.length);

  useEffect(() => {
    setFilteredAccounts(accounts);
    setFilteredCategories(categories);
    if (categories.length) setCategory(categories[0].id);
    if (accounts.length) setAccount(accounts[0].id);
  }, [accounts, categories]);

  return (
    <>
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
      <CategoriesItems
        categories={filteredCategories}
        category={category}
        setCategory={setCategory}
        setOpenCategoryDialog={setOpenCategoryDialog}
      />
      <AccountsItems
        accounts={filteredAccounts}
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
            if (!isCash || !isDate || !isAccount || !isCategory) return;
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
  setOpenDialog: PropTypes.func,
};

export default ExpenseTransactionForm;
