import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import {
  createFilterType,
  createLocaleCategories,
  filterCategories,
  renderNotes,
} from '../utils';
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
import searchIcon from '../../../assets/icons/shared/search.svg';
import { ReactComponent as ToggleEditIcon } from '../../../assets/icons/shared/toggleEdit.svg';

import { styled } from 'styled-components';
import {
  BackLink,
  BackLinkSvg,
  Search,
  SearchImg,
  SearchInput,
  TrashContainer,
  TrashHeader,
} from '../../../theme/global';
import { pages } from '../../../utils/constants/pages';
import { Grid } from '@mui/material';
import {
  CategoriesDescription,
  CategoriesListItem,
  CategoriesSvg,
  CategoriesTitleContainer,
  CategoriesTitleLink,
  EditButtonSvg,
  EditButtons,
  MobItemButtonSvg,
} from '../Categories.styled';

const ArchivedCount = styled.div((props) => ({
  fontSize: '0.875rem',
  color: props.theme.colors.main.violet,
  height: 60,
  display: 'flex',
  alignItems: 'center',
}));

function renderCategories(
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
              <EditButtonSvg
                as={RestoreIcon}
                onClick={() => {
                  dispatch(restoreCategory(category.id));
                  idbAddItem({ ...category, archived: false }, 'categories');
                }}
              />
              <EditButtonSvg
                as={DeleteIcon}
                onClick={() => {
                  transactions.forEach((transaction) => {
                    if (transaction.category === category.id) {
                      dispatch(deleteTransaction(transaction.id));
                      idbDeleteItem(transaction.id, 'transactions');
                    }
                  });
                  dispatch(deleteCategory(category.id));
                  idbDeleteItem(category.id, 'categories');
                }}
              />
              <MobItemButtonSvg as={ToggleEditIcon} />
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
  const filterType = createFilterType(useParams().filterType);
  const archivedCategories = categories.categories.filter(
    (category) => category.archived,
  );

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
        <Search>
          <SearchInput
            type="text"
            placeholder={t('CATEGORIES_TRASH.SEARCH')}
          ></SearchInput>
          <SearchImg src={searchIcon} alt="search" />
        </Search>
        {renderCategories(
          filterCategories(filterType, archivedCategories),
          transactions.transactions,
          restoreCategory,
          deleteCategory,
          deleteTransaction,
          dispatch,
          t,
        )}
      </TrashContainer>
    </Grid>
  );
}
