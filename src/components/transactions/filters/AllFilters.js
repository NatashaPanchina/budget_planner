import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  AllFiltersContainer,
  AllFiltersHeader,
  AllFiltersTitle,
  CancelSearchSvg,
  FilterContainer,
  FilterSearch,
  FilterSection,
  LabelContainer,
  RadioContainer,
  ResetButton,
  ShowButton,
  TextInputField,
} from '../../../theme/global';
import { RadioGroup, styled } from '@mui/material';
import { FlexContainer } from '../Transactions.styled';
import { ReactComponent as CancelSearchIcon } from '../../../assets/icons/shared/cancelSearch.svg';
import { useTranslation } from 'react-i18next';
import { NumericFormatCustom } from '../../../utils/format/cash';
import { updateTransactionsFilters } from '../../../actions/Actions';
import { useDispatch, useSelector } from 'react-redux';
import CurrenciesList from './utils/currencies/CurrenciesList';
import CategorieList from './utils/categories/CategoriesList';
import AccountsList from './utils/accounts/AccountsList';

const AmountContainer = styled('div')((props) => ({
  maxWidth: 150,
  color: props.theme.colors.text.primary,
}));

const FirstAmountContainer = styled(AmountContainer)((props) => ({
  marginRight: props.theme.spacing(4),
}));

function AllFilters({ accounts, categories, setOpenFilters }) {
  const dispatch = useDispatch();
  const filters = useSelector((state) => state.transactions.filters);
  const { t } = useTranslation();
  const notArchivedAccounts = accounts.filter((account) => !account.archived);
  const notArchivedCategories = categories.filter(
    (category) => !category.archived,
  );
  const currencies = ['USD', 'EUR', 'RUB', 'KZT'];
  const [sortType, setSortType] = useState(filters.sort);
  const [type, setType] = useState(filters.type);
  const [accountTypes, setAccountTypes] = useState(filters.accounts);
  const [categoryTypes, setCategoryTypes] = useState(filters.categories);
  const [currencyTypes, setCurrencyTypes] = useState(filters.currencies);
  const [fromAmount, setFromAmount] = useState(filters.amount.from);
  const [toAmount, setToAmount] = useState(filters.amount.to);
  const [notes, setNotes] = useState(filters.notes);

  return (
    <AllFiltersContainer>
      <AllFiltersHeader>
        {t('TRANSACTIONS_FILTERS.ALL_FILTERS')}
        <ResetButton
          onClick={() => {
            setSortType('By date');
            setType('All');
            setAccountTypes(null);
            setCategoryTypes(null);
            setCurrencyTypes(null);
            setFromAmount(null);
            setToAmount(null);
            setNotes('All');
          }}
        >
          {t('TRANSACTIONS_FILTERS.RESET_FILTERS')}
        </ResetButton>
      </AllFiltersHeader>
      <FilterContainer>
        <AllFiltersTitle>{t('TRANSACTIONS_FILTERS.SORT')}</AllFiltersTitle>
        <RadioGroup
          value={sortType}
          onChange={(event) => setSortType(event.target.value)}
        >
          <LabelContainer
            value="By date"
            control={<RadioContainer />}
            label={t('TRANSACTIONS_FILTERS.BY_DATE')}
          />
          <LabelContainer
            value="By adding"
            control={<RadioContainer />}
            label={t('TRANSACTIONS_FILTERS.BY_ADDING')}
          />
        </RadioGroup>
      </FilterContainer>
      <FilterContainer>{t('TRANSACTIONS_FILTERS.DATE')}</FilterContainer>
      <FilterContainer>
        <AllFiltersTitle>{t('TRANSACTIONS_FILTERS.TYPE')}</AllFiltersTitle>
        <RadioGroup
          value={type}
          onChange={(event) => setType(event.target.value)}
        >
          <LabelContainer
            value="All"
            control={<RadioContainer />}
            label={t('TRANSACTIONS_FILTERS.ALL')}
          />
          <LabelContainer
            value="expense"
            control={<RadioContainer />}
            label={t('TRANSACTIONS_FILTERS.EXPENSE')}
          />
          <LabelContainer
            value="income"
            control={<RadioContainer />}
            label={t('TRANSACTIONS_FILTERS.INCOME')}
          />
        </RadioGroup>
      </FilterContainer>
      <FilterContainer>
        <AllFiltersTitle>{t('TRANSACTIONS_FILTERS.ACCOUNT')}</AllFiltersTitle>
        {notArchivedAccounts.length > 5 ? (
          <FilterSearch
            placeholder={t('TRANSACTIONS_FILTERS.ACCOUNT_SEARCH')}
            value=""
            InputProps={{
              endAdornment: <CancelSearchSvg as={CancelSearchIcon} />,
            }}
            autoComplete="off"
          />
        ) : (
          <div></div>
        )}
        <FilterSection>
          <AccountsList
            accounts={notArchivedAccounts}
            accountTypes={accountTypes}
            setAccountTypes={setAccountTypes}
          />
        </FilterSection>
      </FilterContainer>
      <FilterContainer>
        <AllFiltersTitle>{t('TRANSACTIONS_FILTERS.CATEGORY')}</AllFiltersTitle>
        {notArchivedCategories.length > 5 ? (
          <FilterSearch
            placeholder={t('TRANSACTIONS_FILTERS.CATEGORY_SEARCH')}
            value=""
            InputProps={{
              endAdornment: <CancelSearchSvg as={CancelSearchIcon} />,
            }}
            autoComplete="off"
          />
        ) : (
          <div></div>
        )}
        <FilterSection>
          <CategorieList
            categories={notArchivedCategories}
            categoryTypes={categoryTypes}
            setCategoryTypes={setCategoryTypes}
          />
        </FilterSection>
      </FilterContainer>
      <FilterContainer>
        <AllFiltersTitle>{t('TRANSACTIONS_FILTERS.CURRENCY')}</AllFiltersTitle>
        {currencies.length > 5 ? (
          <FilterSearch
            placeholder={t('TRANSACTIONS_FILTERS.CURRENCY_SEARCH')}
            value=""
            InputProps={{
              endAdornment: <CancelSearchSvg as={CancelSearchIcon} />,
            }}
            autoComplete="off"
          />
        ) : (
          <div></div>
        )}
        <FilterSection>
          <CurrenciesList
            currencies={currencies}
            currencyTypes={currencyTypes}
            setCurrencyTypes={setCurrencyTypes}
          />
        </FilterSection>
      </FilterContainer>
      <FilterContainer>
        <AllFiltersTitle>{t('TRANSACTIONS_FILTERS.AMOUNT')}</AllFiltersTitle>
        <FlexContainer>
          <FirstAmountContainer>
            <TextInputField
              margin="normal"
              required
              name="numberformat"
              label={t('TRANSACTIONS_FILTERS.FROM')}
              onChange={(event) => {
                const value = event.target.value;
                if (value === 0) {
                  setFromAmount(value);
                } else {
                  value ? setFromAmount(value) : setFromAmount(null);
                }
              }}
              InputProps={{
                inputComponent: NumericFormatCustom,
              }}
            />
          </FirstAmountContainer>
          <AmountContainer>
            <TextInputField
              margin="normal"
              required
              name="numberformat"
              label={t('TRANSACTIONS_FILTERS.TO')}
              onChange={(event) => {
                const value = event.target.value;
                value ? setToAmount(value) : setToAmount(null);
              }}
              value={toAmount}
              InputProps={{
                inputComponent: NumericFormatCustom,
              }}
            />
          </AmountContainer>
        </FlexContainer>
      </FilterContainer>
      <FilterContainer>
        <AllFiltersTitle>{t('TRANSACTIONS_FILTERS.NOTES')}</AllFiltersTitle>
        <RadioGroup
          value={notes}
          onChange={(event) => setNotes(event.target.value)}
        >
          <LabelContainer
            value="All"
            control={<RadioContainer />}
            label={t('TRANSACTIONS_FILTERS.ALL')}
          />
          <LabelContainer
            value="true"
            control={<RadioContainer />}
            label={t('TRANSACTIONS_FILTERS.WITH_NOTES')}
          />
          <LabelContainer
            value="false"
            control={<RadioContainer />}
            label={t('TRANSACTIONS_FILTERS.WITHOUT_NOTES')}
          />
        </RadioGroup>
      </FilterContainer>
      <ShowButton
        onClick={() => {
          dispatch(
            updateTransactionsFilters({
              date: filters.date,
              sort: sortType,
              type,
              accounts: accountTypes,
              categories: categoryTypes,
              currencies: currencyTypes,
              amount: { from: fromAmount, to: toAmount },
              notes,
            }),
          );
          setOpenFilters(false);
        }}
      >
        {t('TRANSACTIONS_FILTERS.SHOW')}
      </ShowButton>
    </AllFiltersContainer>
  );
}

AllFilters.propTypes = {
  accounts: PropTypes.array,
  categories: PropTypes.array,
  setOpenFilters: PropTypes.func,
};

export default AllFilters;
