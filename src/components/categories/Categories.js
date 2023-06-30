import React, { useEffect } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

import {
  fetchCategoriesData,
  archiveCategory,
  deleteCategory,
} from "../../actions/Actions.js";

import CategoriesBar from "./barChart/CategoriesBar.js";
import CategoriesList from "./list/CategoriesList.js";

import expenseIcon from "../../assets/icons/shared/expense.svg";
import incomeIcon from "../../assets/icons/shared/income.svg";
import { ReactComponent as FilterIcon } from "../../assets/icons/shared/filter.svg";
import { ReactComponent as ArchiveBasket } from "../../assets/icons/shared/archiveBasket.svg";
import { ReactComponent as CalendarIcon } from "../../assets/icons/shared/calendar.svg";

import "./Categories.css";

function isActive({ isActive }) {
  return isActive ? "active_categories_title" : "";
}

function createLocaleCategories(count) {
  if (count === 1) {
    return "CATEGORIES.CATEGORIES.ONE";
  } else if (count < 5) {
    return "CATEGORIES.CATEGORIES.LESS_THAN_FIVE";
  } else if (count >= 5) {
    return "CATEGORIES.CATEGORIES.MORE_THAN_FIVE";
  } else {
    return "CATEGORIES.CATEGORIES.MORE_THAN_FIVE";
  }
}

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

function Categories({
  categories: { status, categories },
  fetchCategoriesData,
  archiveCategory,
  deleteCategory,
}) {
  const { t } = useTranslation();

  const notArchivedCategories = categories.filter(
    (category) => category.archived === false
  );
  const allCount = notArchivedCategories.length;
  const expenseCount = notArchivedCategories.filter(
    (category) => category.type === "expense"
  ).length;
  const incomeCount = allCount - expenseCount;

  useEffect(() => {
    fetchCategoriesData();
  }, [fetchCategoriesData]);

  return status === "loading" ? (
    <div>Loading</div>
  ) : (
    <div className="categories_content">
      <div className="categories_more_info">
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
        <div className="categories_bar_info">
          {t("CATEGORIES.TOTAL")}
          <div className="total_categories_count">
            {allCount} {t(createLocaleCategories(allCount))}
          </div>
          <div className="categories_bar_item">
            <img src={expenseIcon} alt="expenses" />
            <div>
              {t("CATEGORIES.EXPENSES")}
              <div className="expense_categories_count">
                {expenseCount} {t(createLocaleCategories(expenseCount))}
              </div>
            </div>
          </div>
          <div className="categories_bar_item">
            <img src={incomeIcon} alt="incomes" />
            <div>
              {t("CATEGORIES.INCOMES")}
              <div className="income_categories_count">
                {incomeCount} {t(createLocaleCategories(incomeCount))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="categories_main_info">
        <div className="categories_header">
          <div className="filtered_title">
            {t("CATEGORIES.CATEGORIES_TITLE")}
          </div>
          <div className="filtered_field">
            <FilterIcon />
            {t("CATEGORIES.FILTER_KEY")}
          </div>
          <div className="filtered_field">
            <CalendarIcon />
            {t("CATEGORIES.FILTER_DATE")}
          </div>
          <div className="archived">
            <ArchiveBasket />
          </div>
        </div>
        <div className="categories_titles">
          <div className="categories_title">
            <NavLink to="/categories/all" className={isActive}>
              {t("CATEGORIES.ALL")}
            </NavLink>
          </div>
          <div className="categories_title">
            <NavLink to="/categories/expenses" className={isActive}>
              {t("CATEGORIES.EXPENSES")}
            </NavLink>
          </div>
          <div className="categories_title">
            <NavLink to="/categories/incomes" className={isActive}>
              {t("CATEGORIES.INCOMES")}
            </NavLink>
          </div>
        </div>
        <CategoriesList
          notArchivedCategories={notArchivedCategories}
          archiveCategory={archiveCategory}
          deleteCategory={deleteCategory}
        />
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    categories: state.categories,
  };
};

const mapDispatchToProps = {
  fetchCategoriesData,
  archiveCategory,
  deleteCategory,
};

export default connect(mapStateToProps, mapDispatchToProps)(Categories);
