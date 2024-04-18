import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Drawer, Grid, MenuItem } from '@mui/material';
import AccountsSlider from './slider/AccountsSlider.js';
import TransactionsList from './list/TransactionsList.js';
import {
  fetchTransactionsData,
  fetchAccountsData,
  fetchCategoriesData,
  updateTransactionsFilters,
} from '../../actions/Actions';
import { ReactComponent as FilterIcon } from '../../assets/icons/shared/filter.svg';
import { ReactComponent as SortIcon } from '../../assets/icons/shared/sort.svg';
import { ReactComponent as CalendarIcon } from '../../assets/icons/shared/calendar.svg';
import { ReactComponent as AddIcon } from '../../assets/icons/shared/plus.svg';
import {
  Header,
  HeaderTitle,
  FilterSvg,
  AddButton,
  FilterButton,
  FilterTitle,
  FilterButtonsContainer,
  FilterTooltip,
  SortButtonsContainer,
  MobileFilterButton,
  ToggleMenu,
} from '../../theme/global.js';
import Loading from '../loading/Loading.js';
import { names } from '../../utils/constants/currencies.js';
import AllFilters from './filters/AllFilters.js';
import { convertPeriod } from '../../utils/format/date/index.js';

export default function Transactions() {
  const filters = useSelector((state) => state.transactions.filters);
  const header = useSelector((state) => state.header);
  const transactions = useSelector((state) => state.transactions);
  const accounts = useSelector((state) => state.accounts);
  const categories = useSelector((state) => state.categories);
  const dispatch = useDispatch();
  const mainCurrency = header.profile ? header.profile.currency : names.USD;
  const language = header.language;
  const [accountsData, setAccountsData] = useState([]);
  const [categoriesData, setCategoriesData] = useState([]);
  const [transactionsData, setTransactionsData] = useState([]);
  const { t } = useTranslation();
  const [openFilters, setOpenFilters] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const formattedDate = convertPeriod(
    filters.date.to,
    filters.date.during,
    language,
  );

  useEffect(() => {
    dispatch(fetchAccountsData());
    dispatch(fetchCategoriesData());
    dispatch(fetchTransactionsData());
  }, [dispatch]);

  useEffect(() => {
    if (accounts.status === 'succeeded') {
      setAccountsData(accounts.accounts);
    }
    if (categories.status === 'succeeded') {
      setCategoriesData(categories.categories);
    }
    if (transactions.status === 'succeeded') {
      setTransactionsData(transactions.transactions);
    }
  }, [
    accounts.status,
    categories.status,
    transactions.status,
    accounts.accounts,
    categories.categories,
    transactions.transactions,
  ]);

  return header.status === 'loading' ||
    accounts.status === 'loading' ||
    categories.status === 'loading' ||
    transactions.status === 'loading' ? (
    <Loading />
  ) : (
    <>
      <Header>
        <HeaderTitle>{t('TRANSACTIONS.TRANSACTIONS_HEADER')}</HeaderTitle>
        <FilterButtonsContainer>
          <SortButtonsContainer>
            <FilterButton onClick={() => setOpenFilters(true)}>
              <FilterSvg as={FilterIcon} />
              <FilterTitle>{t('TRANSACTIONS.FILTER_KEY')}</FilterTitle>
            </FilterButton>
            <FilterButton>
              <FilterSvg as={CalendarIcon} />
              <FilterTitle>{formattedDate}</FilterTitle>
            </FilterButton>
            <FilterButton
              onClick={(event) => {
                setAnchorEl(event.currentTarget);
              }}
            >
              <FilterSvg as={SortIcon} />
              <FilterTitle>
                {filters.sort === 'By date'
                  ? t('TRANSACTIONS_FILTERS.BY_DATE')
                  : t('TRANSACTIONS_FILTERS.BY_ADDING')}
              </FilterTitle>
            </FilterButton>
            <ToggleMenu
              anchorEl={anchorEl}
              open={open}
              onClose={() => setAnchorEl(null)}
            >
              <MenuItem
                onClick={() => {
                  setAnchorEl(null);
                  dispatch(
                    updateTransactionsFilters({ ...filters, sort: 'By date' }),
                  );
                }}
              >
                {t('TRANSACTIONS_FILTERS.BY_DATE')}
              </MenuItem>
              <MenuItem
                onClick={() => {
                  setAnchorEl(null);
                  dispatch(
                    updateTransactionsFilters({
                      ...filters,
                      sort: 'By adding',
                    }),
                  );
                }}
              >
                {t('TRANSACTIONS_FILTERS.BY_ADDING')}
              </MenuItem>
            </ToggleMenu>
          </SortButtonsContainer>
          <MobileFilterButton onClick={() => setOpenFilters(true)}>
            <FilterSvg as={FilterIcon} />
          </MobileFilterButton>
          <FilterTooltip title={t('TRANSACTIONS.NEW_TRANSACTION')} arrow>
            <AddButton>
              <FilterSvg as={AddIcon} />
              <FilterTitle>{t('TRANSACTIONS.NEW_TRANSACTION')}</FilterTitle>
            </AddButton>
          </FilterTooltip>
        </FilterButtonsContainer>
      </Header>
      <Drawer
        anchor="right"
        open={openFilters}
        onClose={() => setOpenFilters(false)}
      >
        <AllFilters
          accounts={accountsData}
          categories={categoriesData}
          setOpenFilters={setOpenFilters}
        />
      </Drawer>
      <Grid item xs={12} sm={12} md={3} lg={3}>
        <AccountsSlider
          mainCurrency={mainCurrency}
          transactions={transactionsData}
          accounts={accountsData}
        />
      </Grid>
      <Grid item xs={12} sm={12} md={9} lg={9}>
        <div>
          <TransactionsList
            transactions={transactionsData}
            accounts={accountsData}
            categories={categoriesData}
          />
        </div>
      </Grid>
    </>
  );
}
