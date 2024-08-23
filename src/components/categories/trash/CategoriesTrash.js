import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { createLocaleCategories } from '../utils';
import { idbAddItem, idbDeleteItem } from '../../../indexedDB/IndexedDB';
import {
  fetchCategoriesData,
  fetchTransactionsData,
  restoreCategory,
  deleteCategory,
  deleteTransaction,
} from '../../../actions/Actions';
import { ReactComponent as BackIcon } from '../../../assets/icons/shared/back.svg';
import { ReactComponent as RestoreIcon } from '../../../assets/icons/shared/restore.svg';
import { ReactComponent as DeleteIcon } from '../../../assets/icons/shared/delete.svg';
import { ReactComponent as SearchIcon } from '../../../assets/icons/shared/search.svg';
import { ReactComponent as ToggleEditIcon } from '../../../assets/icons/shared/toggleEdit.svg';
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
  NoResultsContainer,
  NoResults,
} from '../../../theme/global';
import { pages } from '../../../utils/constants/pages';
import { Dialog, Grid, InputAdornment, MenuItem, styled } from '@mui/material';
import {
  CategoriesDescription,
  CategoriesListItem,
  CategoriesTitleContainer,
  CategoriesTitleLink,
  DeleteMenuItem,
  DeleteSvg,
  EditButtonSvg,
  EditButtons,
  FlexContainer,
} from '../Categories.styled';
import { useCategoriesSearch } from '../../../hooks/useSearch';
import Loading from '../../loading/Loading';
import NoResultsFound from '../../noResults/NoResultsFound';
import CategorySvg from '../../shared/CategorySvg';
import DeleteAlert from '../../alerts/DeleteAlert';
import Notes from '../../shared/Notes';

const ArchivedCount = styled('div')((props) => ({
  fontSize: '0.875rem',
  color: props.theme.colors.text.darker,
  marginBottom: props.theme.spacing(2),
  display: 'flex',
  alignItems: 'center',
}));

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
  const [openDelAlert, setOpenDelAlert] = useState(false);
  const deleteCallback = () => {
    transactions.transactions.forEach((transaction) => {
      if (transaction.category === clickedCategory.id) {
        dispatch(deleteTransaction(transaction.id));
        idbDeleteItem(transaction.id, 'transactions');
      }
    });
    dispatch(deleteCategory(clickedCategory.id));
    idbDeleteItem(clickedCategory.id, 'categories');
  };
  const isEmpty = () => {
    if (query === '' && searchData.length === 0) return true;
    return false;
  };

  useEffect(() => {
    dispatch(fetchCategoriesData());
    dispatch(fetchTransactionsData());
  }, [dispatch]);

  return categories.status === 'loading' ||
    transactions.status === 'loading' ? (
    <Loading />
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
          autoComplete="off"
        />
        {isEmpty() ? (
          <NoResultsContainer>
            <NoResults>
              <div>{t('CATEGORIES.NOTHING_HERE')}</div>
            </NoResults>
          </NoResultsContainer>
        ) : searchData.length ? (
          <>
            <ArchivedCount>
              {searchData.length}{' '}
              {t(createLocaleCategories('CATEGORIES_TRASH', searchData.length))}
            </ArchivedCount>
            {searchData.map((category) => {
              return (
                <CategoriesListItem key={category.id}>
                  <CategoriesDescription>
                    <CategorySvg
                      category={category}
                      fillName={`category${category.id}`}
                    />
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
                      <DeleteMenuItem
                        onClick={() => {
                          setAnchorEl(null);
                          setOpenDelAlert(true);
                        }}
                      >
                        <FlexContainer>
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
                  <Notes notes={category.notes} />
                </CategoriesListItem>
              );
            })}
          </>
        ) : (
          <NoResultsFound query={query} />
        )}
      </TrashContainer>
      <Dialog open={openDelAlert} onClose={() => setOpenDelAlert(false)}>
        <DeleteAlert
          setOpen={setOpenDelAlert}
          deleteCallback={deleteCallback}
          type="CATEGORY"
        />
      </Dialog>
    </Grid>
  );
}
