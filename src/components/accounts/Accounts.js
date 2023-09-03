import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { fetchAccountsData, archiveAccount } from '../../actions/Actions.js';
import List from './list/List.js';
import AccountsChart from './pieChart/AccountsChart.js';

import { ReactComponent as CommonFilterIcon } from '../../assets/icons/shared/mobileFilter.svg';
import { ReactComponent as FilterIcon } from '../../assets/icons/shared/filter.svg';
import { ReactComponent as TrashIcon } from '../../assets/icons/shared/trash.svg';
import { ReactComponent as CalendarIcon } from '../../assets/icons/shared/calendar.svg';

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
} from '../../theme/global.js';
import { pages } from '../../utils/constants/pages.js';
import { Grid } from '@mui/material';

export default function Cash() {
  const { status, accounts } = useSelector((state) => state.accounts);
  const dispatch = useDispatch();

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
        <FlexContainer>
          <CommonFilter>
            <FilterSvg as={CalendarIcon} />
            <FilterSvg as={CommonFilterIcon} />
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
          <CashTitleLink to={pages.accounts.transfers}>
            {t('ACCOUNTS.FILTER_TRANSFERS')}
          </CashTitleLink>
        </CashTitleContainer>
        <List
          notArchivedAccounts={notArchivedAccounts}
          archiveAccount={archiveAccount}
        />
      </Grid>
    </>
  );
}
