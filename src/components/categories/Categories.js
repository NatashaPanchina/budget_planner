import React, { useEffect } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";

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

function Categories({
  categories: { status, categories },
  fetchCategoriesData,
  archiveCategory,
  deleteCategory,
}) {
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
    <div id="categories_content">
      <div id="categories_more_info">
        <CategoriesBar
          data={[
            { all: allCount, type: "all", allColor: "#419FFF" },
            { expense: expenseCount, type: "expense", expenseColor: "#F4395B" },
            { income: incomeCount, type: "income", incomeColor: "#6EBD0A" },
          ]}
        />
        <div id="categories_bar_info">
          Total
          <div id="total_categories_count">{allCount} categories</div>
          <div className="categories_bar_item">
            <img src={expenseIcon} alt="expenses" />
            <div>
              Expenses
              <div id="expense_categories_count">{expenseCount} categories</div>
            </div>
          </div>
          <div className="categories_bar_item">
            <img src={incomeIcon} alt="incomes" />
            <div>
              Incomes
              <div id="income_categories_count">{incomeCount} categories</div>
            </div>
          </div>
        </div>
      </div>
      <div id="categories_main_info">
        <div id="categories_header">
          <div id="categories_title">Categories</div>
          <div className="filtered_field">
            <FilterIcon />
            By default
          </div>
          <div className="filtered_field">
            <CalendarIcon />
            All time
          </div>
          <div id="archived">
            <ArchiveBasket />
          </div>
        </div>
        <div id="categories_titles">
          <div className="categories_title">
            <NavLink to="/categories/all" className={isActive}>
              All
            </NavLink>
          </div>
          <div className="categories_title">
            <NavLink to="/categories/expenses" className={isActive}>
              Expenses
            </NavLink>
          </div>
          <div className="categories_title">
            <NavLink to="/categories/incomes" className={isActive}>
              Incomes
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
