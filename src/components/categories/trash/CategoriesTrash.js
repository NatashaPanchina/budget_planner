import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { createLocaleCategories, renderNotes } from '../utils';
import { idbAddItem, idbDeleteItem } from '../../../indexedDB/IndexedDB';
import {
  fetchCategoriesData,
  fetchTransactionsData,
  restoreCategory,
  deleteCategory,
  deleteTransaction,
} from '../../../actions/Actions';
import { categoryIcons } from '../../../utils/constants/icons.js';

import { ReactComponent as BackIcon } from '../../../assets/icons/shared/back.svg';
import { ReactComponent as RestoreIcon } from '../../../assets/icons/shared/restore.svg';
import { ReactComponent as DeleteIcon } from '../../../assets/icons/shared/delete.svg';
import { ReactComponent as SearchIcon } from '../../../assets/icons/shared/search.svg';
import { ReactComponent as ToggleEditIcon } from '../../../assets/icons/shared/toggleEdit.svg';
import { ReactComponent as NoResults } from '../../../assets/icons/shared/noResults.svg';
import { ReactComponent as CancelSearchIcon } from '../../../assets/icons/shared/cancelSearch.svg';

import {
  BackLink,
  BackLinkSvg,
  ToggleMenu,
  TrashContainer,
  TrashHeader,
  MobItemButtonSvg,
  SearchField,
  CancelSearchSvg,
  NoSearchResults,
  NoSearchResultsContainer,
  NoSearchResultsSvg,
} from '../../../theme/global';
import { pages } from '../../../utils/constants/pages';
import { Grid, InputAdornment, MenuItem, styled } from '@mui/material';
import {
  CategoriesDescription,
  CategoriesListItem,
  CategoriesSvg,
  CategoriesTitleContainer,
  CategoriesTitleLink,
  DeleteMenuItem,
  DeleteSvg,
  EditButtonSvg,
  EditButtons,
  FlexContainer,
} from '../Categories.styled';
import { useCategoriesSearch } from '../../../hooks/useSearch';

const ArchivedCount = styled('div')((props) => ({
  fontSize: '0.875rem',
  color: props.theme.colors.main.violet,
  height: 60,
  display: 'flex',
  alignItems: 'center',
}));

function renderCategories(
  clickedCategory,
  setClickedCategory,
  anchorEl,
  setAnchorEl,
  open,
  categories,
  transactions,
  restoreCategory,
  deleteCategory,
  deleteTransaction,
  dispatch,
  t,
) {
  return (
    <>
      <ArchivedCount>
        {categories.length}{' '}
        {t(createLocaleCategories('CATEGORIES_TRASH', categories.length))}
      </ArchivedCount>
      {categories.map((category, index) => {
        let Icon = categoryIcons[category.icon];
        return (
          <CategoriesListItem key={category.id}>
            <CategoriesDescription>
              <CategoriesSvg
                width="38"
                height="38"
                viewBox="0 0 38 38"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="19" cy="19" r="19" fill={`url(#${index})`}></circle>
                <Icon height="24" width="24" x="7" y="7" />
                <defs>
                  <linearGradient
                    id={index}
                    x1="0"
                    y1="0"
                    x2="38"
                    y2="38"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor={category.color[0]} />
                    <stop offset="1" stopColor={category.color[1]} />
                  </linearGradient>
                </defs>
              </CategoriesSvg>
              {category.description}
            </CategoriesDescription>
            <EditButtons>
              <ToggleMenu
                anchorEl={anchorEl}
                open={open}
                onClose={() => setAnchorEl(null)}
              >
                <MenuItem onClick={() => setAnchorEl(null)}>
                  <FlexContainer
                    onClick={() => {
                      dispatch(restoreCategory(clickedCategory.id));
                      idbAddItem(
                        { ...clickedCategory, archived: false },
                        'categories',
                      );
                    }}
                  >
                    <EditButtonSvg as={RestoreIcon} />
                    {t('CATEGORIES_TRASH.RESTORE')}
                  </FlexContainer>
                </MenuItem>
                <DeleteMenuItem onClick={() => setAnchorEl(null)}>
                  <FlexContainer
                    onClick={() => {
                      transactions.forEach((transaction) => {
                        if (transaction.category === clickedCategory.id) {
                          dispatch(deleteTransaction(transaction.id));
                          idbDeleteItem(transaction.id, 'transactions');
                        }
                      });
                      dispatch(deleteCategory(clickedCategory.id));
                      idbDeleteItem(clickedCategory.id, 'categories');
                    }}
                  >
                    <DeleteSvg as={DeleteIcon} />
                    {t('CATEGORIES_TRASH.DELETE')}
                  </FlexContainer>
                </DeleteMenuItem>
              </ToggleMenu>
              <MobItemButtonSvg
                as={ToggleEditIcon}
                onClick={(event) => {
                  setClickedCategory(category);
                  setAnchorEl(event.currentTarget);
                }}
              />
            </EditButtons>
            {renderNotes(category.notes)}
          </CategoriesListItem>
        );
      })}
    </>
  );
}

export default function CategoriesTrash() {
  const categories = useSelector((state) => state.categories);
  const transactions = useSelector((state) => state.transactions);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [clickedCategory, setClickedCategory] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [query, setQuery] = useState('');

  const searchData = useCategoriesSearch(query, categories.categories, true);

  useEffect(() => {
    dispatch(fetchCategoriesData());
    dispatch(fetchTransactionsData());
  }, [dispatch]);

  return categories.status === 'loading' ||
    transactions.status === 'loading' ? (
    <div>Loading</div>
  ) : (
    <Grid item xs={12}>
      <TrashContainer>
        <TrashHeader>
          <BackLink to={pages.categories.all}>
            <BackLinkSvg as={BackIcon} />
          </BackLink>
          {t('CATEGORIES_TRASH.ARCHIVED_CATEGORIES')}
        </TrashHeader>
        <CategoriesTitleContainer>
          <CategoriesTitleLink to={pages.categories.trash.all}>
            {t('CATEGORIES_TRASH.ALL')}
          </CategoriesTitleLink>
          <CategoriesTitleLink to={pages.categories.trash.expenses}>
            {t('CATEGORIES_TRASH.EXPENSES')}
          </CategoriesTitleLink>
          <CategoriesTitleLink to={pages.categories.trash.incomes}>
            {t('CATEGORIES_TRASH.INCOMES')}
          </CategoriesTitleLink>
        </CategoriesTitleContainer>
        <SearchField
          placeholder={t('CATEGORIES_TRASH.SEARCH')}
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
        />
        {searchData.length ? (
          renderCategories(
            clickedCategory,
            setClickedCategory,
            anchorEl,
            setAnchorEl,
            open,
            searchData,
            transactions.transactions,
            restoreCategory,
            deleteCategory,
            deleteTransaction,
            dispatch,
            t,
          )
        ) : (
          <NoSearchResults>
            <NoSearchResultsContainer>
              <div>
                <NoSearchResultsSvg as={NoResults} />
              </div>
              <div>{`${t('SEARCH.NO_RESULTS')} "${query}"`}</div>
            </NoSearchResultsContainer>
          </NoSearchResults>
        )}
      </TrashContainer>
    </Grid>
  );
}
