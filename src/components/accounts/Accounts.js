import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import {
  fetchAccountsData,
  fetchCategoriesData,
  updateAccountsFilters,
} from '../../actions/Actions.js';
import AccountsChart from './pieChart/AccountsChart.js';

import { ReactComponent as FilterIcon } from '../../assets/icons/shared/filter.svg';
import { ReactComponent as TrashIcon } from '../../assets/icons/shared/trash.svg';
import { ReactComponent as CalendarIcon } from '../../assets/icons/shared/calendar.svg';
import { ReactComponent as AddIcon } from '../../assets/icons/shared/plus.svg';
import { ReactComponent as SortIcon } from '../../assets/icons/shared/sort.svg';

import {
  MoreInformationContainer,
  CashTitleContainer,
  CashTitleLink,
  TotalBalance,
} from './Accounts.styled.js';
import {
  Header,
  HeaderTitle,
  ArchivedTrash,
  TrashCount,
  Trash,
  FilterSvg,
  CustomTooltip,
  AddButton,
  FilterButtonsContainer,
  FilterButton,
  FilterTitle,
  FilterTooltip,
  MobileFilterButton,
  SortButtonsContainer,
  InfoDialog,
  ToggleMenu,
} from '../../theme/global.js';
import { pages } from '../../utils/constants/pages.js';
import { Drawer, Grid, MenuItem } from '@mui/material';
import { createAccountFilter, createLocaleAccountType } from './utils/index.js';
import AccountsList from './list/AccountsList.js';
import Loading from '../loading/Loading.js';
import AddAccount from './addAccount/AddAccount.js';
import { names } from '../../utils/constants/currencies.js';
import AllFilters from './filters/AllFilters.js';

export default function Accounts() {
  const { status, accounts, filters } = useSelector((state) => state.accounts);
  const categories = useSelector((state) => state.categories);
  const header = useSelector((state) => state.header);
  const mainCurrency = header.profile ? header.profile.currency : names.USD;
  const dispatch = useDispatch();
  const filterAccount = createAccountFilter(useParams().filterCash);
  const localeFilterAccount = createLocaleAccountType(filterAccount);
  const { t } = useTranslation();
  const notArchivedAccounts = accounts.filter(
    (account) => account.archived === false,
  );
  const archivedAccounts = accounts.filter((account) => account.archived);
  const [openDialog, setOpenDialog] = useState(false);
  const [openFilters, setOpenFilters] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  useEffect(() => {
    dispatch(fetchAccountsData());
    dispatch(fetchCategoriesData());
  }, [dispatch]);

  return status === 'loading' ||
    header.status === 'loading' ||
    categories.status === 'loading' ? (
    <Loading />
  ) : (
    <>
      <Header>
        <HeaderTitle>{t('ACCOUNTS.ACCOUNTS_TITLE')}</HeaderTitle>
        <FilterButtonsContainer>
          <SortButtonsContainer>
            <FilterButton onClick={() => setOpenFilters(true)}>
              <FilterSvg as={FilterIcon} />
              <FilterTitle>{t('ACCOUNTS.FILTER_KEY')}</FilterTitle>
            </FilterButton>
            <FilterButton>
              <FilterSvg as={CalendarIcon} />
              <FilterTitle>{t('ACCOUNTS.FILTER_DATE')}</FilterTitle>
            </FilterButton>
            <FilterButton
              onClick={(event) => {
                setAnchorEl(event.currentTarget);
              }}
            >
              <FilterSvg as={SortIcon} />
              <FilterTitle>
                {filters.sort === 'By date'
                  ? t('ACCOUNTS_FILTERS.BY_DATE')
                  : t('ACCOUNTS_FILTERS.BY_ADDING')}
              </FilterTitle>
            </FilterButton>
          </SortButtonsContainer>
          <MobileFilterButton>
            <FilterSvg as={FilterIcon} />
          </MobileFilterButton>
          <FilterTooltip title={t(`ACCOUNTS.ADD_ALL`)} arrow>
            <AddButton onClick={() => setOpenDialog(true)}>
              <FilterSvg as={AddIcon} />
              <FilterTitle>{t(`ACCOUNTS.ADD_ALL`)}</FilterTitle>
            </AddButton>
          </FilterTooltip>
          <CustomTooltip title={t('ACCOUNTS.ARCHIVED')} arrow>
            <ArchivedTrash>
              <NavLink to={pages.accounts.trash.main}>
                <Trash as={TrashIcon} />
                <TrashCount>{archivedAccounts.length}</TrashCount>
              </NavLink>
            </ArchivedTrash>
          </CustomTooltip>
        </FilterButtonsContainer>
      </Header>
      <ToggleMenu
        anchorEl={anchorEl}
        open={open}
        onClose={() => setAnchorEl(null)}
      >
        <MenuItem
          onClick={() => {
            setAnchorEl(null);
            dispatch(updateAccountsFilters({ ...filters, sort: 'By date' }));
          }}
        >
          {t('ACCOUNTS_FILTERS.BY_DATE')}
        </MenuItem>
        <MenuItem
          onClick={() => {
            setAnchorEl(null);
            dispatch(
              updateAccountsFilters({
                ...filters,
                sort: 'By adding',
              }),
            );
          }}
        >
          {t('ACCOUNTS_FILTERS.BY_ADDING')}
        </MenuItem>
      </ToggleMenu>
      <Drawer
        anchor="right"
        open={openFilters}
        onClose={() => setOpenFilters(false)}
      >
        <AllFilters setOpenFilters={setOpenFilters} />
      </Drawer>
      <InfoDialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <AddAccount
          categories={categories.categories}
          setOpenDialog={setOpenDialog}
        />
      </InfoDialog>
      <Grid item xs={12} sm={12} md={4} lg={4}>
        <MoreInformationContainer>
          <TotalBalance>{t('ACCOUNTS.TOTAL_BALANCE')}</TotalBalance>
          <AccountsChart
            mainCurrency={mainCurrency}
            data={notArchivedAccounts}
          />
        </MoreInformationContainer>
      </Grid>
      <Grid item xs={12} sm={12} md={8} lg={8}>
        <CashTitleContainer>
          <CashTitleLink to={pages.accounts.all}>
            {t('ACCOUNTS.FILTER_ALL')}
          </CashTitleLink>
          <CashTitleLink to={pages.accounts.cards}>
            {t('ACCOUNTS.FILTER_CARDS')}
          </CashTitleLink>
          <CashTitleLink to={pages.accounts.cash}>
            {t('ACCOUNTS.FILTER_CASH')}
          </CashTitleLink>
        </CashTitleContainer>
        <AccountsList
          accounts={accounts}
          localeFilterAccount={localeFilterAccount}
          categories={categories.categories}
        />
      </Grid>
    </>
  );
}
