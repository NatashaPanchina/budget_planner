import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { NumericFormat } from 'react-number-format';
import { v4 as uuidv4 } from 'uuid';

import { dinero, toSnapshot, toDecimal, add } from 'dinero.js';
import { USD } from '@dinero.js/currencies';

import { idbAddItem } from '../../../indexedDB/IndexedDB.js';
import { dineroFromFloat } from '../../../utils/format/cash';
import {
  renderSelectedCategory,
  renderCategories,
  renderAccounts,
  renderSelectedAccount,
} from '../../transactions/utils';
import {
  hideElement,
  useOutsideClick,
} from '../../../hooks/useOutsideClick.js';

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
  DoneButton,
  FieldDescription,
  FieldInput,
  FormField,
  FormFieldsContainer,
  Search,
  SearchImg,
  SearchInput,
} from '../../../theme/global.js';
import {
  AccountsList,
  AddAccount,
  CategoriesList,
  NumericInput,
} from '../NewTransaction.styled.js';

function IncomeTransactionForm({
  categories,
  accounts,
  addNewTransaction,
  editAccount,
}) {
  const dispatch = useDispatch();

  const { t } = useTranslation();
  const [activeItem, setActiveItem] = useState('');
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [filteredAccounts, setFilteredAccounts] = useState([]);

  const transactionType = 'income';
  const [category, setCategory] = useState();
  const [account, setAccount] = useState();
  const [amount, setAmount] = useState(
    toDecimal(dinero({ amount: 0, currency: USD })),
  );
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState('');
  const [tags] = useState([]);

  const categoriesRef = useOutsideClick(hideElement);
  const accountsRef = useOutsideClick(hideElement);

  useEffect(() => {
    setFilteredAccounts(accounts);
    setFilteredCategories(categories);
    if (categories.length) setCategory(categories[0].id);
    if (accounts.length) setAccount(accounts[0].id);
  }, [accounts, categories]);

  return (
    <FormFieldsContainer>
      <FormField
        $isActive={activeItem === '1'}
        $formType={transactionType}
        onClick={() => setActiveItem('1')}
      >
        <FieldDescription>{t('NEW_TRANSACTION.CATEGORY')}</FieldDescription>
        <div
          onClick={(event) => {
            setActiveItem('1');
            categoriesRef.current.classList.toggle('none');
            accountsRef.current.classList.add('none');
            event.stopPropagation();
          }}
        >
          {category ? (
            renderSelectedCategory(category, filteredCategories)
          ) : (
            <AddButton to={pages.categories.add[transactionType]}>
              <AddButtonSvg as={PlusIcon} />
              {t('NEW_TRANSACTION.ADD_CATEGORY')}
            </AddButton>
          )}
        </div>
      </FormField>
      <CategoriesList ref={categoriesRef} className="none">
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
        <FieldDescription>{t('NEW_TRANSACTION.CASH')}</FieldDescription>
        <div
          onClick={(event) => {
            setActiveItem('2');
            accountsRef.current.classList.toggle('none');
            categoriesRef.current.classList.add('none');
            event.stopPropagation();
          }}
        >
          {account ? (
            renderSelectedAccount(account, filteredAccounts)
          ) : (
            <Link to={pages.cash.add.card}>
              <PlusIcon />
              {t('NEW_TRANSACTION.ADD_CASH')}
            </Link>
          )}
        </div>
      </FormField>
      <AccountsList ref={accountsRef} className="none">
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
        {renderAccounts(filteredAccounts, setAccount, accountsRef, t)}
      </AccountsList>
      <FormField
        $isActive={activeItem === '3'}
        $formType={transactionType}
        onClick={() => setActiveItem('3')}
      >
        <FieldDescription>{t('NEW_TRANSACTION.AMOUNT')}</FieldDescription>
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
        <FieldDescription>{t('NEW_TRANSACTION.DATE')}</FieldDescription>
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
        <FieldDescription>{t('NEW_TRANSACTION.NOTES')}</FieldDescription>
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
        <FieldDescription>{t('NEW_TRANSACTION.TAGS')}</FieldDescription>
        <FieldInput type="text"></FieldInput>
      </FormField>
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
    </FormFieldsContainer>
  );
}

IncomeTransactionForm.propTypes = {
  categories: PropTypes.array,
  accounts: PropTypes.array,
  addNewTransaction: PropTypes.func,
  editAccount: PropTypes.func,
};

export default IncomeTransactionForm;
