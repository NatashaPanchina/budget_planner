import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { fetchAccountsData, archiveAccount } from '../../actions/Actions.js';
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
} from '../../theme/global.js';
import { pages } from '../../utils/constants/pages.js';
import { Grid } from '@mui/material';
import { createAccountFilter, createLocaleAccountType } from './utils/index.js';
import AccountsList from './list/AccountsList.js';
import Loading from '../loading/Loading.js';

export default function Cash() {
  const { status, accounts } = useSelector((state) => state.accounts);
  const dispatch = useDispatch();
  const filterAccount = createAccountFilter(useParams().filterCash);
  const localeFilterAccount = createLocaleAccountType(filterAccount);
  const { t } = useTranslation();
  const notArchivedAccounts = accounts.filter(
    (account) => account.archived === false,
  );
  const archivedAccounts = accounts.filter((account) => account.archived);

  useEffect(() => {
    dispatch(fetchAccountsData());
  }, [dispatch]);

  return status === 'loading' ? (
    <Loading />
  ) : (
    <>
      <Header>
        <HeaderTitle>{t('ACCOUNTS.ACCOUNTS_TITLE')}</HeaderTitle>
        <FilterButtonsContainer>
          <SortButtonsContainer>
            <FilterButton>
              <FilterSvg as={FilterIcon} />
              <FilterTitle>{t('ACCOUNTS.FILTER_KEY')}</FilterTitle>
            </FilterButton>
            <FilterButton>
              <FilterSvg as={CalendarIcon} />
              <FilterTitle>{t('ACCOUNTS.FILTER_DATE')}</FilterTitle>
            </FilterButton>
            <FilterButton>
              <FilterSvg as={SortIcon} />
              <FilterTitle>Filter</FilterTitle>
            </FilterButton>
          </SortButtonsContainer>
          <MobileFilterButton>
            <FilterSvg as={FilterIcon} />
          </MobileFilterButton>
          <FilterTooltip title={t(`ACCOUNTS.ADD_ALL`)} arrow>
            <AddButton
              to={
                pages.accounts.add[
                  filterAccount === 'all' ? 'card' : filterAccount
                ]
              }
            >
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
      <Grid item xs={12} sm={12} md={4} lg={4}>
        <MoreInformationContainer>
          <TotalBalance>{t('ACCOUNTS.TOTAL_BALANCE')}</TotalBalance>
          <AccountsChart data={notArchivedAccounts} />
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
          archiveAccount={archiveAccount}
          localeFilterAccount={localeFilterAccount}
        />
      </Grid>
    </>
  );
}
