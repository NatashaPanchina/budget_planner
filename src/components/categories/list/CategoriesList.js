import React from "react";
import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { idbAddItem } from "../../../indexedDB/IndexedDB.js";
import { categoryIcons } from "../../../utils/constants/icons.js";
import {
  renderNotes,
  createFilterType,
  filterCategories,
} from "../utils/index.js";

import searchIcon from "../../../assets/icons/shared/search.svg";
import { ReactComponent as PlusIcon } from "../../../assets/icons/shared/plus.svg";
import { ReactComponent as AddIcon } from "../../../assets/icons/shared/add.svg";
import { ReactComponent as EditIcon } from "../../../assets/icons/shared/edit.svg";
import { ReactComponent as ArchiveIcon } from "../../../assets/icons/shared/archive.svg";

export default function CategoriesList({
  notArchivedCategories,
  archiveCategory,
}) {
  const { t } = useTranslation();

  const filterType = createFilterType(useParams().filterType);

  return (
    <React.Fragment>
      <div className="search">
        <input
          type="text"
          placeholder={t("CATEGORIES.SEARCH_CATEGORY")}
        ></input>
        <img src={searchIcon} alt="search" />
      </div>
      <div className="add_category_btn">
        <Link
          to={`/categories/addCategory/${
            filterType === "all" ? "expense" : filterType
          }`}
        >
          <PlusIcon />
          {t("CATEGORIES.ADD_CATEGORY")}
        </Link>
      </div>
      {filterCategories(filterType, notArchivedCategories).map(
        (category, index) => {
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
                  <circle
                    cx="17"
                    cy="17"
                    r="17"
                    fill={`url(#${index})`}
                  ></circle>
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
                <AddIcon />
                <Link to={`/categories/infoCategory/${category.id}`}>
                  <EditIcon />
                </Link>
                <ArchiveIcon
                  onClick={() => {
                    archiveCategory(category.id);
                    idbAddItem({ ...category, archived: true }, "categories");
                  }}
                />
              </div>
              {renderNotes(category.notes)}
            </div>
          );
        }
      )}
    </React.Fragment>
  );
}
