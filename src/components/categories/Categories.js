import React from "react";
import { NavLink } from "react-router-dom";

import CategoriesBar from "./barChart/CategoriesBar.js";
import CategoriesList from "./list/CategoriesList.js";

import expenseIcon from "./images/expenseIcon.svg";
import incomeIcon from "./images/incomeIcon.svg";
import filterIcon from "./images/filterIcon.svg";

import "./Categories.css";

function isActive({ isActive }) {
  return isActive ? "active_categories_title" : "";
}

export default function Categories({
  categories: { fetching, categories },
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

  return !fetching ? (
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
            <img src={expenseIcon} />
            <div>
              Expenses
              <div id="expense_categories_count">{expenseCount} categories</div>
            </div>
          </div>
          <div className="categories_bar_item">
            <img src={incomeIcon} />
            <div>
              Incomes
              <div id="income_categories_count">{incomeCount} categories</div>
            </div>
          </div>
        </div>
      </div>
      <div id="categories_main_info">
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
          <img src={filterIcon} />
        </div>
        <CategoriesList
          notArchivedCategories={notArchivedCategories}
          archiveCategory={archiveCategory}
          deleteCategory={deleteCategory}
        />
      </div>
    </div>
  ) : (
    <div>Loading</div>
  );
}
