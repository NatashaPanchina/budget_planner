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
import { ReactComponent as CancelSearchIcon } from '../../../assets/icons/shared/cancelSearch.svg';
import { useTranslation } from 'react-i18next';
import { NumericFormatCustom } from '../../../utils/format/cash';
import { updateAccountsFilters } from '../../../actions/Actions';
import { useDispatch, useSelector } from 'react-redux';
import { FlexContainer } from '../Accounts.styled';
import CurrenciesList from './utils/currencies/CurrenciesList';

const AmountContainer = styled('div')(() => ({
  maxWidth: 150,
}));

const FirstAmountContainer = styled(AmountContainer)((props) => ({
  marginRight: props.theme.spacing(4),
}));

function AllFilters({ setOpenFilters }) {
  const dispatch = useDispatch();
  const filters = useSelector((state) => state.accounts.filters);
  const { t } = useTranslation();
  const currencies = ['USD', 'EUR', 'RUB', 'KZT'];
  const [sortType, setSortType] = useState(filters.sort);
  const [type, setType] = useState(filters.type);
  const [currencyTypes, setCurrencyTypes] = useState(filters.currencies);
  const [fromBalance, setFromBalance] = useState(filters.balance.from);
  const [toBalance, setToBalance] = useState(filters.balance.to);
  const [notes, setNotes] = useState(filters.notes);

  return (
    <AllFiltersContainer>
      <AllFiltersHeader>
        {t('ACCOUNTS_FILTERS.ALL_FILTERS')}
        <ResetButton
          onClick={() => {
            setSortType('By date');
            setType('All');
            setCurrencyTypes(null);
            setFromBalance(null);
            setToBalance(null);
            setNotes('All');
          }}
        >
          {t('ACCOUNTS_FILTERS.RESET_FILTERS')}
        </ResetButton>
      </AllFiltersHeader>
      <FilterContainer>
        <AllFiltersTitle>{t('ACCOUNTS_FILTERS.SORT')}</AllFiltersTitle>
        <RadioGroup
          value={sortType}
          onChange={(event) => setSortType(event.target.value)}
        >
          <LabelContainer
            value="By date"
            control={<RadioContainer />}
            label={t('ACCOUNTS_FILTERS.BY_DATE')}
          />
          <LabelContainer
            value="By adding"
            control={<RadioContainer />}
            label={t('ACCOUNTS_FILTERS.BY_ADDING')}
          />
        </RadioGroup>
      </FilterContainer>
      <FilterContainer>{t('ACCOUNTS_FILTERS.DATE')}</FilterContainer>
      <FilterContainer>
        <AllFiltersTitle>{t('ACCOUNTS_FILTERS.TYPE')}</AllFiltersTitle>
        <RadioGroup
          value={type}
          onChange={(event) => setType(event.target.value)}
        >
          <LabelContainer
            value="All"
            control={<RadioContainer />}
            label={t('ACCOUNTS_FILTERS.ALL')}
          />
          <LabelContainer
            value="card"
            control={<RadioContainer />}
            label={t('ACCOUNTS_FILTERS.CARD')}
          />
          <LabelContainer
            value="cash"
            control={<RadioContainer />}
            label={t('ACCOUNTS_FILTERS.CASH')}
          />
        </RadioGroup>
      </FilterContainer>
      <FilterContainer>
        <AllFiltersTitle>{t('ACCOUNTS_FILTERS.CURRENCY')}</AllFiltersTitle>
        {currencies.length > 5 ? (
          <FilterSearch
            placeholder={t('ACCOUNTS_FILTERS.CURRENCY_SEARCH')}
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
        <AllFiltersTitle>{t('ACCOUNTS_FILTERS.BALANCE')}</AllFiltersTitle>
        <FlexContainer>
          <FirstAmountContainer>
            <TextInputField
              margin="normal"
              required
              name="numberformat"
              label={t('ACCOUNTS_FILTERS.FROM')}
              onChange={(event) => {
                const value = event.target.value;
                if (value === 0) {
                  setFromBalance(value);
                } else {
                  value ? setFromBalance(value) : setFromBalance(null);
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
              label={t('ACCOUNTS_FILTERS.TO')}
              onChange={(event) => {
                const value = event.target.value;
                value ? setToBalance(value) : setToBalance(null);
              }}
              value={toBalance}
              InputProps={{
                inputComponent: NumericFormatCustom,
              }}
            />
          </AmountContainer>
        </FlexContainer>
      </FilterContainer>
      <FilterContainer>
        <AllFiltersTitle>{t('ACCOUNTS_FILTERS.NOTES')}</AllFiltersTitle>
        <RadioGroup
          value={notes}
          onChange={(event) => setNotes(event.target.value)}
        >
          <LabelContainer
            value="All"
            control={<RadioContainer />}
            label={t('ACCOUNTS_FILTERS.ALL')}
          />
          <LabelContainer
            value="true"
            control={<RadioContainer />}
            label={t('ACCOUNTS_FILTERS.WITH_NOTES')}
          />
          <LabelContainer
            value="false"
            control={<RadioContainer />}
            label={t('ACCOUNTS_FILTERS.WITHOUT_NOTES')}
          />
        </RadioGroup>
      </FilterContainer>
      <ShowButton
        onClick={() => {
          dispatch(
            updateAccountsFilters({
              sort: sortType,
              type,
              currencies: currencyTypes,
              balance: { from: fromBalance, to: toBalance },
              notes,
            }),
          );
          setOpenFilters(false);
        }}
      >
        {t('ACCOUNTS_FILTERS.SHOW')}
      </ShowButton>
    </AllFiltersContainer>
  );
}

AllFilters.propTypes = {
  setOpenFilters: PropTypes.func,
};

export default AllFilters;
