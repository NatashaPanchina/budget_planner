import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { NumericFormatCustom, isCashCorrect } from '../../../utils/format/cash';
import { ReactComponent as DoneIcon } from '../../../assets/icons/shared/checkMark.svg';
import { ReactComponent as CancelIcon } from '../../../assets/icons/shared/cancel.svg';
import {
  AddFormButtonsContainer,
  AmountFieldsContainer,
  ButtonSvg,
  ButtonTitle,
  CancelButton,
  DateField,
  DoneButton,
  InfoDialog,
  NumberInputField,
  TextInputField,
} from '../../../theme/global.js';
import dayjs from 'dayjs';
import { names } from '../../../utils/constants/currencies.js';
import AddAccount from '../../accounts/addAccount/AddAccount.js';
import AddCategory from '../../categories/addCategory/AddCategory.js';
import { doneEventClick } from './utils/index.js';
import CurrenciesItems from '../../transactions/utils/currencies/CurrenciesItems.js';
import CategoriesItems from '../../transactions/utils/categories/CategoriesItems.js';
import AccountsItems from '../../transactions/utils/accounts/AccountsItems.js';
import { isDateCorrect } from '../../../utils/format/date/index.js';

function IncomeTransactionForm({
  mainCurrency,
  categories,
  accounts,
  setOpenDialog,
}) {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [filteredAccounts, setFilteredAccounts] = useState([]);
  const transactionType = 'income';
  const [category, setCategory] = useState('');
  const [account, setAccount] = useState('');
  const [currency, setCurrency] = useState(mainCurrency);
  const [amount, setAmount] = useState('0');
  const [date, setDate] = useState(dayjs(new Date()));
  const [notes, setNotes] = useState('');
  const [tags, setTags] = useState([]);
  const [openCategoryDialog, setOpenCategoryDialog] = useState(false);
  const [openAccountDialog, setOpenAccountDialog] = useState(false);

  const [isDisplayCorrect, setIsDisplayCorrect] = useState(false);
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
          error={isDisplayCorrect && !isCash}
          helperText={
            isDisplayCorrect && !isCash
              ? t('NEW_TRANSACTION.AMOUNT_GREATER_ZERO')
              : ''
          }
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
          autoFocus
        />
      </AmountFieldsContainer>
      <CategoriesItems
        categories={filteredCategories}
        category={category}
        setCategory={setCategory}
        setOpenCategoryDialog={setOpenCategoryDialog}
        isDisplayCorrect={isDisplayCorrect}
      />
      <AccountsItems
        accounts={filteredAccounts}
        account={account}
        setAccount={setAccount}
        setOpenAccountDialog={setOpenAccountDialog}
        isDisplayCorrect={isDisplayCorrect}
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
            setIsDisplayCorrect(true);
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
        <AddCategory
          setOpenDialog={setOpenCategoryDialog}
          type={transactionType}
        />
      </InfoDialog>
      <InfoDialog
        open={openAccountDialog}
        onClose={() => setOpenAccountDialog(false)}
      >
        <AddAccount
          accounts={accounts}
          categories={categories}
          setOpenDialog={setOpenAccountDialog}
        />
      </InfoDialog>
    </>
  );
}

IncomeTransactionForm.propTypes = {
  mainCurrency: PropTypes.string,
  categories: PropTypes.array,
  accounts: PropTypes.array,
  setOpenDialog: PropTypes.func,
};

export default IncomeTransactionForm;
