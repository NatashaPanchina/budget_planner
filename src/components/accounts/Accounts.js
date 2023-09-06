import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { fetchAccountsData, archiveAccount } from '../../actions/Actions.js';
import AccountsChart from './pieChart/AccountsChart.js';

import { ReactComponent as CommonFilterIcon } from '../../assets/icons/shared/mobileFilter.svg';
import { ReactComponent as FilterIcon } from '../../assets/icons/shared/filter.svg';
import { ReactComponent as TrashIcon } from '../../assets/icons/shared/trash.svg';
import { ReactComponent as CalendarIcon } from '../../assets/icons/shared/calendar.svg';
import { ReactComponent as AddIcon } from '../../assets/icons/shared/plus.svg';

import {
  MoreInformationContainer,
  CashTitleContainer,
  CashTitleLink,
  TotalBalance,
  CommonFilter,
  FlexContainer,
} from './Accounts.styled.js';
import {
  Header,
  HeaderTitle,
  ArchivedTrash,
  TrashCount,
  Trash,
  Filter,
  FilterSvg,
  CustomTooltip,
  AddButton,
  AddButtonSvg,
  AddSvg,
} from '../../theme/global.js';
import { pages } from '../../utils/constants/pages.js';
import { Grid } from '@mui/material';
import { createAccountFilter, createLocaleAccountType } from './utils/index.js';
import AccountsList from './list/AccountsList.js';

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
    <div>Loading</div>
  ) : (
    <>
      <Header>
        <HeaderTitle>{t('ACCOUNTS.ACCOUNTS_TITLE')}</HeaderTitle>
        <Filter>
          <FilterSvg as={FilterIcon} />
          {t('ACCOUNTS.FILTER_KEY')}
        </Filter>
        <Filter>
          <FilterSvg as={CalendarIcon} />
          {t('ACCOUNTS.FILTER_DATE')}
        </Filter>
        <Filter>
          <AddButton
            to={
              pages.accounts.add[
                filterAccount === 'all' ? 'card' : filterAccount
              ]
            }
          >
            <AddButtonSvg as={AddIcon} />
            {t(`ACCOUNTS.ADD_ALL`)}
          </AddButton>
        </Filter>
        <FlexContainer>
          <CommonFilter>
            <FilterSvg as={CalendarIcon} />
            <FilterSvg as={CommonFilterIcon} />
            <AddSvg
              to={
                pages.accounts.add[
                  filterAccount === 'all' ? 'card' : filterAccount
                ]
              }
            >
              <FilterSvg as={AddIcon} />
            </AddSvg>
          </CommonFilter>
          <CustomTooltip title={t('ACCOUNTS.ARCHIVED')} arrow>
            <ArchivedTrash>
              <NavLink to={pages.accounts.trash.main}>
                <Trash as={TrashIcon} />
                <TrashCount>{archivedAccounts.length}</TrashCount>
              </NavLink>
            </ArchivedTrash>
          </CustomTooltip>
        </FlexContainer>
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
          notArchivedAccounts={notArchivedAccounts}
          archiveAccount={archiveAccount}
          filterAccount={filterAccount}
          localeFilterAccount={localeFilterAccount}
        />
      </Grid>
    </>
  );
}
