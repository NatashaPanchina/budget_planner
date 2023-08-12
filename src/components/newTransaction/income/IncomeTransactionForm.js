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
import { ReactComponent as CancelIcon } from '../../../assets/icons/shared/delete.svg';
import { ReactComponent as PlusIcon } from '../../../assets/icons/shared/plus.svg';
import searchIcon from '../../../assets/icons/shared/search.svg';
import { pages } from '../../../utils/constants/pages.js';
import {
  AddButton,
  AddButtonSvg,
  AddFormButtonsContainer,
  ButtonSvg,
  ButtonTitle,
  CancelButton,
  DateField,
  DoneButton,
  Search,
  SearchImg,
  SearchInput,
  TextInputField,
} from '../../../theme/global.js';
import { AddAccount } from '../NewTransaction.styled.js';
import dayjs from 'dayjs';

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
        $type={transactionType}
        margin="normal"
        required
        select
        label={t('NEW_TRANSACTION.CATEGORY')}
        value={category}
        onChange={(event) => setCategory(event.target.value)}
      >
        <Search>
          <SearchInput
            type="text"
            placeholder={t('NEW_TRANSACTION.SEARCH_CATEGORY')}
          ></SearchInput>
          <SearchImg src={searchIcon} alt="search" />
        </Search>
        <AddButton to={pages.categories.add[transactionType]}>
          <AddButtonSvg as={PlusIcon} />
          {t('NEW_TRANSACTION.ADD_CATEGORY')}
        </AddButton>
        {renderCategories(filteredCategories)}
      </TextInputField>
      <TextInputField
        $type={transactionType}
        margin="normal"
        required
        select
        label={t('NEW_TRANSACTION.CASH')}
        value={account}
        onChange={(event) => setAccount(event.target.value)}
      >
        <Search>
          <SearchInput
            type="text"
            placeholder={t('NEW_TRANSACTION.SEARCH_CASH')}
          ></SearchInput>
          <SearchImg src={searchIcon} alt="search" />
        </Search>
        <AddAccount to={pages.cash.add.card}>
          <AddButtonSvg as={PlusIcon} />
          {t('NEW_TRANSACTION.ADD_CASH')}
        </AddAccount>
        {renderAccounts(filteredAccounts, t)}
      </TextInputField>
      <TextInputField
        $type={transactionType}
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
        $type={transactionType}
        required
        label={t('NEW_TRANSACTION.DATE')}
        defaultValue={dayjs(date)}
        onChange={(value) => setDate(value)}
      />
      <TextInputField
        $type={transactionType}
        margin="normal"
        multiline
        label={t('NEW_TRANSACTION.NOTES')}
        placeholder="Tap here to make some notes"
        defaultValue={notes}
        onChange={(event) => setNotes(event.target.value)}
      />
      <TextInputField
        $type={transactionType}
        margin="normal"
        multiline
        label={t('NEW_TRANSACTION.TAGS')}
        onChange={(event) => setTags(event.target.value)}
      />
      <AddFormButtonsContainer>
        <DoneButton
          $buttonType={transactionType}
          to={`${pages.transactions[`${transactionType}s`]}/${account}`}
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
              add(
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
        <CancelButton
          to={`${pages.transactions[`${transactionType}s`]}/${account}`}
        >
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
