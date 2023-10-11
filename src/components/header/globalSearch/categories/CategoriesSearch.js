import React, { useEffect, useState } from 'react';
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
import CategoriesPage from '../page/categories/CategoriesPage';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { fetchCategoriesData } from '../../../../actions/Actions';
import { useGlobalCategoriesSearch } from '../../../../hooks/useSearch';
import { useParams } from 'react-router-dom';

import { ReactComponent as BackIcon } from '../../../../assets/icons/shared/back.svg';
import { ReactComponent as FilterIcon } from '../../../../assets/icons/shared/filter.svg';
import { ReactComponent as CalendarIcon } from '../../../../assets/icons/shared/calendar.svg';
import { ReactComponent as SearchIcon } from '../../../../assets/icons/shared/search.svg';
import { ReactComponent as CancelSearchIcon } from '../../../../assets/icons/shared/cancelSearch.svg';
import Loading from '../../../loading/Loading';

export default function CategoriesSearch() {
  const { status, categories } = useSelector((state) => state.categories);
  const [categoriesData, setCategoriesData] = useState([]);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const queryData = useParams().query;
  const [query, setQuery] = useState(queryData);
  const searchCategories = useGlobalCategoriesSearch(query, categoriesData);

  useEffect(() => {
    dispatch(fetchCategoriesData());
  }, [dispatch]);

  useEffect(() => {
    if (status === 'succeeded') {
      setCategoriesData(categories);
    }
  }, [status, categories]);

  return (
    <>
      <Header>
        <BackLink to={`/search/${queryData}`}>
          <BackLinkSvg as={BackIcon} />
        </BackLink>
        <HeaderTitle>{t('CATEGORIES.CATEGORIES_TITLE')}</HeaderTitle>
        <FilterButtonsContainer>
          <SortButtonsContainer>
            <FilterButton>
              <FilterSvg as={FilterIcon} />
              <FilterTitle>{t('CATEGORIES.FILTER_KEY')}</FilterTitle>
            </FilterButton>
            <FilterButton>
              <FilterSvg as={CalendarIcon} />
              <FilterTitle>{t('CATEGORIES.FILTER_DATE')}</FilterTitle>
            </FilterButton>
          </SortButtonsContainer>
          <MobileFilterButton>
            <FilterSvg as={FilterIcon} />
          </MobileFilterButton>
        </FilterButtonsContainer>
      </Header>
      <Grid item xs={12} sm={12} md={12} lg={12}>
        <SearchField
          placeholder={t('CATEGORIES.SEARCH_CATEGORY')}
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
          <CategoriesPage categories={searchCategories} query={query} />
        )}
      </Grid>
    </>
  );
}
