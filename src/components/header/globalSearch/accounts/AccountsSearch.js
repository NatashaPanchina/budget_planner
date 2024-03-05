import React, { useEffect, useState } from 'react';
import { useGlobalAccountsSearch } from '../../../../hooks/useSearch';
import { fetchAccountsData } from '../../../../actions/Actions';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import AccountsPage from '../page/accounts/AccountsPage';
import {
  BackLink,
  BackLinkSvg,
  CancelSearchSvg,
  FilterButton,
  FilterButtonsContainer,
  FilterSvg,
  FilterTitle,
  Header,
  HeaderTitle,
  MobileFilterButton,
  SearchField,
  SortButtonsContainer,
} from '../../../../theme/global';
import { Grid, InputAdornment } from '@mui/material';

import { ReactComponent as BackIcon } from '../../../../assets/icons/shared/back.svg';
import { ReactComponent as FilterIcon } from '../../../../assets/icons/shared/filter.svg';
import { ReactComponent as CalendarIcon } from '../../../../assets/icons/shared/calendar.svg';
import { ReactComponent as SearchIcon } from '../../../../assets/icons/shared/search.svg';
import { ReactComponent as CancelSearchIcon } from '../../../../assets/icons/shared/cancelSearch.svg';
import Loading from '../../../loading/Loading';

export default function AccountsSearch() {
  const { status, accounts } = useSelector((state) => state.accounts);
  const [accountsData, setAccountsData] = useState([]);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const queryData = useParams().query;
  const [query, setQuery] = useState(queryData);
  const searchAccounts = useGlobalAccountsSearch(query, accountsData);

  useEffect(() => {
    dispatch(fetchAccountsData());
  }, [dispatch]);

  useEffect(() => {
    if (status === 'succeeded') {
      setAccountsData(accounts);
    }
  }, [status, accounts]);

  return (
    <>
      <Header>
        <BackLink to={`/search/${queryData}`}>
          <BackLinkSvg as={BackIcon} />
        </BackLink>
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
          </SortButtonsContainer>
          <MobileFilterButton>
            <FilterSvg as={FilterIcon} />
          </MobileFilterButton>
        </FilterButtonsContainer>
      </Header>
      <Grid item xs={12} sm={12} md={12} lg={12}>
        <SearchField
          placeholder={t('ACCOUNTS.SEARCH_ALL')}
          value={query}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
            endAdornment: query ? (
              <InputAdornment position="end" onClick={() => setQuery('')}>
                <CancelSearchSvg as={CancelSearchIcon} />
              </InputAdornment>
            ) : null,
          }}
          onChange={(event) => setQuery(event.target.value)}
          autoComplete="off"
        />
        {status === 'loading' ? (
          <Loading />
        ) : (
          <AccountsPage accounts={searchAccounts} query={query} />
        )}
      </Grid>
    </>
  );
}
