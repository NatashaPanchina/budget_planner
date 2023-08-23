import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { fetchAccountsData, archiveAccount } from '../../actions/Actions.js';
import CashList from './list/CashList.js';
import CashChart from './pieChart/CashChart.js';

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
} from './Cash.styled.js';
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
        <HeaderTitle>{t('CASH.CASH_TITLE')}</HeaderTitle>
        <Filter>
          <FilterSvg as={FilterIcon} />
          {t('CASH.FILTER_KEY')}
        </Filter>
        <Filter>
          <FilterSvg as={CalendarIcon} />
          {t('CASH.FILTER_DATE')}
        </Filter>
        <FlexContainer>
          <CommonFilter>
            <FilterSvg as={CalendarIcon} />
            <FilterSvg as={CommonFilterIcon} />
          </CommonFilter>
          <CustomTooltip title={t('CASH.ARCHIVED')} arrow>
            <ArchivedTrash>
              <NavLink to={pages.cash.trash.main}>
                <Trash as={TrashIcon} />
                <TrashCount>{archivedAccounts.length}</TrashCount>
              </NavLink>
            </ArchivedTrash>
          </CustomTooltip>
        </FlexContainer>
      </Header>
      <Grid item xs={12} sm={12} md={4} lg={4}>
        <MoreInformationContainer>
          <TotalBalance>{t('CASH.TOTAL_BALANCE')}</TotalBalance>
          <CashChart data={notArchivedAccounts} />
        </MoreInformationContainer>
      </Grid>
      <Grid item xs={12} sm={12} md={8} lg={8}>
        <CashTitleContainer>
          <CashTitleLink to={pages.cash.all}>
            {t('CASH.FILTER_ALL')}
          </CashTitleLink>
          <CashTitleLink to={pages.cash.cards}>
            {t('CASH.FILTER_CARDS')}
          </CashTitleLink>
          <CashTitleLink to={pages.cash.cash}>
            {t('CASH.FILTER_CASH')}
          </CashTitleLink>
          <CashTitleLink to={pages.cash.transfers}>
            {t('CASH.FILTER_TRANSFERS')}
          </CashTitleLink>
        </CashTitleContainer>
        <CashList
          notArchivedAccounts={notArchivedAccounts}
          archiveAccount={archiveAccount}
        />
      </Grid>
    </>
  );
}
