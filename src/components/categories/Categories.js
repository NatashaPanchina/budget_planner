import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { fetchCategoriesData, archiveCategory } from "../../actions/Actions.js";
import { createLocaleCategories } from "./utils/index.js";
import CategoriesBar from "./barChart/CategoriesBar.js";
import CategoriesList from "./list/CategoriesList.js";

import expenseIcon from "../../assets/icons/shared/expense.svg";
import incomeIcon from "../../assets/icons/shared/income.svg";
import { ReactComponent as FilterIcon } from "../../assets/icons/shared/filter.svg";
import { ReactComponent as TrashIcon } from "../../assets/icons/shared/trash.svg";
import { ReactComponent as CalendarIcon } from "../../assets/icons/shared/calendar.svg";

import {
  CategoroiesContainer,
  MoreInformationContainer,
  BarChartInfo,
  TotalCategoriesCount,
  BarChartInfoItem,
  Img,
  ExpensesCategoriesCount,
  IncomesCategoriesCount,
  MainInformationContainer,
  Header,
  HeaderTitle,
  CategoriesTitleContainer,
  CategoriesTitleLink,
} from "./Categories.styled.js";
import {
  ArchivedTrash,
  FilterSvg,
  Trash,
  TrashCount,
  Filter,
} from "../../theme/global.js";
import { pages } from "../../utils/constants/pages.js";

function createBarData(keys, allCount, expenseCount, incomeCount) {
  if (!keys) return [];

  return [
    { [keys[0]]: allCount, type: keys[0], [`${keys[0]}Color`]: "#419FFF" },
    {
      [keys[1]]: expenseCount,
      type: keys[1],
      [`${keys[1]}Color`]: "#F4395B",
    },
    {
      [keys[2]]: incomeCount,
      type: keys[2],
      [`${keys[2]}Color`]: "#6EBD0A",
    },
  ];
}

export default function Categories() {
  const { status, categories } = useSelector((state) => state.categories);
  const dispatch = useDispatch();

  const { t } = useTranslation();

  const notArchivedCategories = categories.filter(
    (category) => category.archived === false
  );
  const archivedCategories = categories.filter((category) => category.archived);
  const allCount = notArchivedCategories.length;
  const expenseCount = notArchivedCategories.filter(
    (category) => category.type === "expense"
  ).length;
  const incomeCount = allCount - expenseCount;

  useEffect(() => {
    dispatch(fetchCategoriesData());
  }, [dispatch]);

  return status === "loading" ? (
    <div>Loading</div>
  ) : (
    <CategoroiesContainer>
      <MoreInformationContainer>
        <CategoriesBar
          data={createBarData(
            [
              t("CATEGORIES.ALL"),
              t("CATEGORIES.EXPENSES"),
              t("CATEGORIES.INCOMES"),
            ],
            allCount,
            expenseCount,
            incomeCount
          )}
        />
        <BarChartInfo>
          {t("CATEGORIES.TOTAL")}
          <TotalCategoriesCount>
            {allCount} {t(createLocaleCategories("CATEGORIES", allCount))}
          </TotalCategoriesCount>
          <BarChartInfoItem>
            <Img src={expenseIcon} alt="expenses" />
            <div>
              {t("CATEGORIES.EXPENSES")}
              <ExpensesCategoriesCount>
                {expenseCount}{" "}
                {t(createLocaleCategories("CATEGORIES", expenseCount))}
              </ExpensesCategoriesCount>
            </div>
          </BarChartInfoItem>
          <BarChartInfoItem>
            <Img src={incomeIcon} alt="incomes" />
            <div>
              {t("CATEGORIES.INCOMES")}
              <IncomesCategoriesCount>
                {incomeCount}{" "}
                {t(createLocaleCategories("CATEGORIES", incomeCount))}
              </IncomesCategoriesCount>
            </div>
          </BarChartInfoItem>
        </BarChartInfo>
      </MoreInformationContainer>
      <MainInformationContainer>
        <Header>
          <HeaderTitle>{t("CATEGORIES.CATEGORIES_TITLE")}</HeaderTitle>
          <Filter>
            <FilterSvg as={FilterIcon} />
            {t("CATEGORIES.FILTER_KEY")}
          </Filter>
          <Filter>
            <FilterSvg as={CalendarIcon} />
            {t("CATEGORIES.FILTER_DATE")}
          </Filter>
          <ArchivedTrash>
            <NavLink to={pages.categories.trash.main}>
              <Trash as={TrashIcon} />
              <TrashCount>{archivedCategories.length}</TrashCount>
            </NavLink>
          </ArchivedTrash>
        </Header>
        <CategoriesTitleContainer>
          <CategoriesTitleLink to={pages.categories.all}>
            {t("CATEGORIES.ALL")}
          </CategoriesTitleLink>
          <CategoriesTitleLink to={pages.categories.expenses}>
            {t("CATEGORIES.EXPENSES")}
          </CategoriesTitleLink>
          <CategoriesTitleLink to={pages.categories.incomes}>
            {t("CATEGORIES.INCOMES")}
          </CategoriesTitleLink>
        </CategoriesTitleContainer>
        <CategoriesList
          notArchivedCategories={notArchivedCategories}
          archiveCategory={archiveCategory}
        />
      </MainInformationContainer>
    </CategoroiesContainer>
  );
}
