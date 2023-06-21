import React from "react";
import { Link, NavLink, useParams } from "react-router-dom";
import { connect } from "react-redux";

import { addNewCategory } from "../../../actions/Actions.js";

import CategoryForm from "./CategoryForm.js";

import { ReactComponent as BackIcon } from "../../../assets/icons/shared/back.svg";
import { ReactComponent as ExpenseIcon } from "../../../assets/icons/shared/expense.svg";
import { ReactComponent as IncomeIcon } from "../../../assets/icons/shared/income.svg";

import "./AddCategory.css";

function isActiveLink(isActive, categoryType) {
  switch (categoryType) {
    case "expense":
      return isActive ? `active_expenseCategory` : `not_active_incomeCategory`;
    case "income":
      return isActive ? `active_incomeCategory` : `not_active_expenseCategory`;
    default:
      return "";
  }
}

function AddCategory({ addNewCategory }) {
  const { categoryType } = useParams();

  return (
    <div className="add_category_content">
      <div className="category_titles_block">
        <Link className="category_back_nav" to={`/categories/${categoryType}s`}>
          <BackIcon />
        </Link>
        <div className="add_category_titles">
          <div className="add_category_title">
            <NavLink
              to="/addCategory/expense"
              className={({ isActive }) => isActiveLink(isActive, categoryType)}
            >
              <ExpenseIcon /> Expense
            </NavLink>
          </div>
          <div className="add_category_title">
            <NavLink
              to="/addCategory/income"
              className={({ isActive }) => isActiveLink(isActive, categoryType)}
            >
              <IncomeIcon /> Income
            </NavLink>
          </div>
        </div>
      </div>
      <CategoryForm addNewCategory={addNewCategory} />
    </div>
  );
}

const mapDispatchToProps = {
  addNewCategory,
};

export default connect(null, mapDispatchToProps)(AddCategory);
