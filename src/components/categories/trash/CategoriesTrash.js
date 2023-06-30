import React, { useEffect } from "react";
import { connect } from "react-redux";
import { NavLink, Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

import {
  createFilterType,
  createLocaleCategories,
  filterCategories,
  renderNotes,
} from "../utils";
import { idbAddItem, idbDeleteItem } from "../../../indexedDB/IndexedDB";
import {
  fetchCategoriesData,
  fetchTransactionsData,
  restoreCategory,
  deleteCategory,
  deleteTransaction,
} from "../../../actions/Actions";
import { categoryIcons } from "../../../utils/constants/icons.js";

import { ReactComponent as BackIcon } from "../../../assets/icons/shared/back.svg";
import { ReactComponent as TrashIcon } from "../../../assets/icons/shared/trash.svg";
import { ReactComponent as RestoreIcon } from "../../../assets/icons/shared/restore.svg";
import { ReactComponent as DeleteIcon } from "../../../assets/icons/shared/delete.svg";
import searchIcon from "../../../assets/icons/shared/search.svg";

import "./CategoriesTrash.css";

function renderCategories(
  categories,
  transactions,
  restoreCategory,
  deleteCategory,
  deleteTransaction,
  t
) {
  return (
    <React.Fragment>
      <div className="archived_count">
        {categories.length}{" "}
        {t(createLocaleCategories("CATEGORIES_TRASH", categories.length))}
      </div>
      {categories.map((category, index) => {
        let Icon = categoryIcons[category.icon];
        return (
          <div key={category.id} className="category_item">
            <div className="categories_description">
              <svg
                width="34"
                height="34"
                viewBox="0 0 34 34"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="17" cy="17" r="17" fill={`url(#${index})`}></circle>
                <Icon height="20" width="20" x="7" y="7" />
                <defs>
                  <linearGradient
                    id={index}
                    x1="0"
                    y1="0"
                    x2="34"
                    y2="34"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor={category.color[0]} />
                    <stop offset="1" stopColor={category.color[1]} />
                  </linearGradient>
                </defs>
              </svg>
              {category.description}
            </div>
            <div className="category_edits">
              <RestoreIcon
                onClick={() => {
                  restoreCategory(category.id);
                  idbAddItem({ ...category, archived: false }, "categories");
                }}
              />
              <DeleteIcon
                onClick={() => {
                  transactions.forEach((transaction) => {
                    if (transaction.category === category.id) {
                      deleteTransaction(transaction.id);
                      idbDeleteItem(transaction.id, "transactions");
                    }
                  });
                  deleteCategory(category.id);
                  idbDeleteItem(category.id, "categories");
                }}
              />
            </div>
            {renderNotes(category.notes)}
          </div>
        );
      })}
    </React.Fragment>
  );
}

function isActive({ isActive }) {
  return isActive ? "active_categories_title" : "";
}

function CategoriesTrash({
  categories,
  transactions,
  fetchCategoriesData,
  fetchTransactionsData,
  restoreCategory,
  deleteCategory,
  deleteTransaction,
}) {
  const { t } = useTranslation();
  const filterType = createFilterType(useParams().filterType);
  const archivedCategories = categories.categories.filter(
    (category) => category.archived
  );

  useEffect(() => {
    fetchCategoriesData();
    fetchTransactionsData();
  }, [fetchCategoriesData, fetchTransactionsData]);

  return categories.status === "loading" ||
    transactions.status === "loading" ? (
    <div>Loading</div>
  ) : (
    <div className="categories_trash_content">
      <div className="trash_header">
        <Link className="category_back_nav" to={`/categories/all`}>
          <BackIcon />
        </Link>
        {t("CATEGORIES_TRASH.ARCHIVED_CATEGORIES")}
        <div className="trash_icon">
          <TrashIcon />
          <div className="trash_count">{archivedCategories.length}</div>
        </div>
      </div>
      <div className="categories_titles">
        <div className="categories_title">
          <NavLink to="/categories/trash/all" className={isActive}>
            {t("CATEGORIES_TRASH.ALL")}
          </NavLink>
        </div>
        <div className="categories_title">
          <NavLink to="/categories/trash/expenses" className={isActive}>
            {t("CATEGORIES_TRASH.EXPENSES")}
          </NavLink>
        </div>
        <div className="categories_title">
          <NavLink to="/categories/trash/incomes" className={isActive}>
            {t("CATEGORIES_TRASH.INCOMES")}
          </NavLink>
        </div>
      </div>
      <div className="search">
        <input type="text" placeholder={t("CATEGORIES_TRASH.SEARCH")}></input>
        <img src={searchIcon} alt="search" />
      </div>
      {renderCategories(
        filterCategories(filterType, archivedCategories),
        transactions.transactions,
        restoreCategory,
        deleteCategory,
        deleteTransaction,
        t
      )}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    categories: state.categories,
    transactions: state.transactions,
  };
};

const mapDispatchToProps = {
  fetchCategoriesData,
  fetchTransactionsData,
  restoreCategory,
  deleteCategory,
  deleteTransaction,
};

export default connect(mapStateToProps, mapDispatchToProps)(CategoriesTrash);
