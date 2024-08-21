import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import {
  fetchCategoriesData,
  updateCategoriesFilters,
} from '../../actions/Actions.js';
import { createLocaleCategories, getFiltersTitle } from './utils/index.js';
import CategoriesBar from './barChart/CategoriesBar.js';
import CategoriesList from './list/CategoriesList.js';

import { ReactComponent as ExpenseIcon } from '../../assets/icons/shared/expense.svg';
import { ReactComponent as IncomeIcon } from '../../assets/icons/shared/income.svg';
import { ReactComponent as FilterIcon } from '../../assets/icons/shared/filter.svg';
import { ReactComponent as TrashIcon } from '../../assets/icons/shared/trash.svg';
import { ReactComponent as CalendarIcon } from '../../assets/icons/shared/calendar.svg';
import { ReactComponent as AddIcon } from '../../assets/icons/shared/plus.svg';
import { ReactComponent as SortIcon } from '../../assets/icons/shared/sort.svg';
import { ReactComponent as ToggleMenuIcon } from '../../assets/icons/shared/menuDots.svg';
import { ReactComponent as SearchIcon } from '../../assets/icons/shared/search.svg';

import {
  MoreInformationContainer,
  BarChartInfo,
  TotalCategoriesCount,
  BarChartInfoItem,
  CategoriesTitleContainer,
  CategoriesTitleLink,
  IncomeSvg,
  ExpenseSvg,
  FlexContainer,
  TrashLink,
} from './Categories.styled.js';
import {
  Header,
  HeaderTitle,
  ArchivedTrash,
  FilterSvg,
  Trash,
  TrashCount,
  CustomTooltip,
  AddButton,
  FilterButtonsContainer,
  FilterButton,
  FilterTitle,
  FilterTooltip,
  MobileFilterButton,
  SortButtonsContainer,
  InfoDialog,
  ToggleMenu,
  FilterMenuItem,
} from '../../theme/global.js';
import { pages } from '../../utils/constants/pages.js';
import { Drawer, Grid, MenuItem } from '@mui/material';
import { CountInfo } from '../transactions/Transactions.styled.js';
import Loading from '../loading/Loading.js';
import AddCategory from './addCategory/AddCategory.js';
import AllFilters from './filters/AllFilters.js';

function createBarData(keys, allCount, expenseCount, incomeCount) {
  if (!keys) return [];

  return [
    { [keys[0]]: allCount, type: keys[0], [`${keys[0]}Color`]: '#419FFF' },
    {
      [keys[1]]: expenseCount,
      type: keys[1],
      [`${keys[1]}Color`]: '#F4395B',
    },
    {
      [keys[2]]: incomeCount,
      type: keys[2],
      [`${keys[2]}Color`]: '#6EBD0A',
    },
  ];
}

export default function Categories() {
  const { status, categories, filters } = useSelector(
    (state) => state.categories,
  );
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const notArchivedCategories = categories.filter(
    (category) => category.archived === false,
  );
  const archivedCategories = categories.filter((category) => category.archived);
  const allCount = notArchivedCategories.length;
  const expenseCount = notArchivedCategories.filter(
    (category) => category.type === 'expense',
  ).length;
  const incomeCount = allCount - expenseCount;
  const [openDialog, setOpenDialog] = useState(false);
  const [openFilters, setOpenFilters] = useState(false);
  const [mobMenu, setMobMenu] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  useEffect(() => {
    dispatch(fetchCategoriesData());
  }, [dispatch]);

  return status === 'loading' ? (
    <Loading />
  ) : (
    <>
      <Header>
        <HeaderTitle>{t('CATEGORIES.CATEGORIES_TITLE')}</HeaderTitle>
        <FilterButtonsContainer>
          <SortButtonsContainer>
            <FilterButton onClick={() => setOpenFilters(true)}>
              <FilterSvg as={FilterIcon} />
              <FilterTitle>{t('CATEGORIES.FILTER_KEY')}</FilterTitle>
            </FilterButton>
            <FilterButton>
              <FilterSvg as={CalendarIcon} />
              <FilterTitle>{t('CATEGORIES.FILTER_DATE')}</FilterTitle>
            </FilterButton>
            <FilterButton
              onClick={(event) => {
                setAnchorEl(event.currentTarget);
              }}
            >
              <FilterSvg as={SortIcon} />
              <FilterTitle>{t(getFiltersTitle(filters.sort))}</FilterTitle>
            </FilterButton>
            <ToggleMenu
              anchorEl={anchorEl}
              open={open}
              onClose={() => setAnchorEl(null)}
            >
              <MenuItem
                onClick={() => {
                  setAnchorEl(null);
                  dispatch(
                    updateCategoriesFilters({ ...filters, sort: 'By date' }),
                  );
                }}
              >
                {t('CATEGORIES_FILTERS.BY_DATE')}
              </MenuItem>
              <MenuItem
                onClick={() => {
                  setAnchorEl(null);
                  dispatch(
                    updateCategoriesFilters({
                      ...filters,
                      sort: 'By adding',
                    }),
                  );
                }}
              >
                {t('CATEGORIES_FILTERS.BY_ADDING')}
              </MenuItem>
              <MenuItem
                onClick={() => {
                  setAnchorEl(null);
                  dispatch(
                    updateCategoriesFilters({
                      ...filters,
                      sort: 'By alphabet',
                    }),
                  );
                }}
              >
                {t('CATEGORIES_FILTERS.BY_ALPHABET')}
              </MenuItem>
            </ToggleMenu>
          </SortButtonsContainer>
          <FilterTooltip title={t('CATEGORIES.ADD_CATEGORY')} arrow>
            <AddButton onClick={() => setOpenDialog(true)}>
              <FilterSvg as={AddIcon} />
              <FilterTitle>{t('CATEGORIES.ADD_CATEGORY')}</FilterTitle>
            </AddButton>
          </FilterTooltip>
          <CustomTooltip title={t('CATEGORIES.ARCHIVED')} arrow>
            <ArchivedTrash>
              <NavLink to={pages.categories.trash.main}>
                <Trash as={TrashIcon} />
                <TrashCount>{archivedCategories.length}</TrashCount>
              </NavLink>
            </ArchivedTrash>
          </CustomTooltip>
          <MobileFilterButton onClick={() => setMobMenu(true)}>
            <FilterSvg as={ToggleMenuIcon} />
          </MobileFilterButton>
        </FilterButtonsContainer>
      </Header>
      <Drawer anchor="right" open={mobMenu} onClose={() => setMobMenu(false)}>
        <FilterMenuItem
          onClick={() => {
            setMobMenu(false);
          }}
        >
          <FlexContainer>
            <FilterSvg as={SearchIcon} />
            {t('CATEGORIES.SEARCH')}
          </FlexContainer>
        </FilterMenuItem>
        <FilterMenuItem
          onClick={() => {
            setMobMenu(false);
            setOpenDialog(true);
          }}
        >
          <FlexContainer>
            <FilterSvg as={AddIcon} />
            {t('CATEGORIES.ADD_CATEGORY')}
          </FlexContainer>
        </FilterMenuItem>
        <FilterMenuItem
          onClick={() => {
            setMobMenu(false);
            setOpenFilters(true);
          }}
        >
          <FlexContainer>
            <FilterSvg as={FilterIcon} />
            {t('CATEGORIES.FILTER_KEY')}
          </FlexContainer>
        </FilterMenuItem>
        <FilterMenuItem onClick={() => setMobMenu(false)}>
          <FlexContainer>
            <FilterSvg as={CalendarIcon} />
            {t('CATEGORIES.FILTER_DATE')}
          </FlexContainer>
        </FilterMenuItem>
        <FilterMenuItem onClick={() => setMobMenu(false)}>
          <TrashLink to={pages.categories.trash.main}>
            <FlexContainer>
              <Trash as={TrashIcon} />
              {t('CATEGORIES.ARCHIVED')}
            </FlexContainer>
          </TrashLink>
        </FilterMenuItem>
      </Drawer>
      <Drawer
        anchor="right"
        open={openFilters}
        onClose={() => setOpenFilters(false)}
      >
        <AllFilters setOpenFilters={setOpenFilters} />
      </Drawer>
      <InfoDialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <AddCategory setOpenDialog={setOpenDialog} />
      </InfoDialog>
      <Grid item xs={12} sm={12} md={3} lg={3}>
        <MoreInformationContainer>
          <CategoriesBar
            data={createBarData(
              [
                t('CATEGORIES.ALL'),
                t('CATEGORIES.EXPENSES'),
                t('CATEGORIES.INCOMES'),
              ],
              allCount,
              expenseCount,
              incomeCount,
            )}
          />
          <BarChartInfo>
            <TotalCategoriesCount>
              <div>
                {t('CATEGORIES.TOTAL')}
                <CountInfo $countType="total">
                  {allCount} {t(createLocaleCategories('CATEGORIES', allCount))}
                </CountInfo>
              </div>
            </TotalCategoriesCount>
            <BarChartInfoItem>
              <ExpenseSvg as={ExpenseIcon} />
              <div>
                {t('CATEGORIES.EXPENSES')}
                <CountInfo $countType="expense">
                  {expenseCount}{' '}
                  {t(createLocaleCategories('CATEGORIES', expenseCount))}
                </CountInfo>
              </div>
            </BarChartInfoItem>
            <BarChartInfoItem>
              <IncomeSvg as={IncomeIcon} />
              <div>
                {t('CATEGORIES.INCOMES')}
                <CountInfo $countType="income">
                  {incomeCount}{' '}
                  {t(createLocaleCategories('CATEGORIES', incomeCount))}
                </CountInfo>
              </div>
            </BarChartInfoItem>
          </BarChartInfo>
        </MoreInformationContainer>
      </Grid>
      <Grid item xs={12} sm={12} md={9} lg={9}>
        <CategoriesTitleContainer>
          <CategoriesTitleLink to={pages.categories.all}>
            {t('CATEGORIES.ALL')}
          </CategoriesTitleLink>
          <CategoriesTitleLink to={pages.categories.expenses}>
            {t('CATEGORIES.EXPENSES')}
          </CategoriesTitleLink>
          <CategoriesTitleLink to={pages.categories.incomes}>
            {t('CATEGORIES.INCOMES')}
          </CategoriesTitleLink>
        </CategoriesTitleContainer>
        <CategoriesList
          categories={categories}
          setOpenAddDialog={setOpenDialog}
        />
      </Grid>
    </>
  );
}
