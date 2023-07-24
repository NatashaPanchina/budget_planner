import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { fetchAccountsData, archiveAccount } from '../../actions/Actions.js';
import CashList from './list/CashList.js';
import CashChart from './pieChart/CashChart.js';

import { ReactComponent as FilterIcon } from '../../assets/icons/shared/filter.svg';
import { ReactComponent as TrashIcon } from '../../assets/icons/shared/trash.svg';
import { ReactComponent as CalendarIcon } from '../../assets/icons/shared/calendar.svg';

import {
  MoreInformationContainer,
  MainInformationContainer,
  Header,
  HeaderTitle,
  CashTitleContainer,
  CashTitleLink,
} from './Cash.styled.js';
import {
  ArchivedTrash,
  TrashCount,
  Trash,
  Filter,
  FilterSvg,
} from '../../theme/global.js';
import { pages } from '../../utils/constants/pages.js';

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
    <React.Fragment>
      <MoreInformationContainer>
        {t('CASH.TOTAL_BALANCE')}
        <CashChart data={notArchivedAccounts} />
      </MoreInformationContainer>
      <MainInformationContainer>
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
          <ArchivedTrash>
            <NavLink to={pages.cash.trash.main}>
              <Trash as={TrashIcon} />
              <TrashCount>{archivedAccounts.length}</TrashCount>
            </NavLink>
          </ArchivedTrash>
        </Header>
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
      </MainInformationContainer>
    </React.Fragment>
  );
}
