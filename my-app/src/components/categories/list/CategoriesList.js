import React from "react";
import { Link, useParams } from "react-router-dom";

import { idbAddItem } from "../../../indexedDB/IndexedDB.js";
import { categoryIcons } from "../../../data/icons";

import searchIcon from "../images/searchIcon.svg";
import notesIcon from "../images/notesIcon.svg";
import { ReactComponent as PlusIcon } from "../images/plusIcon.svg";
import { ReactComponent as AddIcon } from "../images/addIcon.svg";
import { ReactComponent as EditIcon } from "../images/editIcon.svg";
import { ReactComponent as ArchiveIcon } from "../images/archiveIcon.svg";

function renderNotes(notes) {
  if (notes) {
    return (
      <div className="categories_notes">
        <img src={notesIcon} className="notes_icon" />
        {notes}
      </div>
    );
  }
}

//для категории добавления нужно убрать s на конце
function createFiltertype(filterType) {
  switch (filterType) {
    case "expenses":
      return "expense";
    case "incomes":
      return "income";
    default:
      return "all";
  }
}

export default function CategoriesList({
  notArchivedCategories,
  archiveCategory,
  deleteCategory,
}) {
  const filterCategories = createFiltertype(useParams().filterType);

  return (
    <React.Fragment>
      <div id="search">
        <input type="text" placeholder="Search category"></input>
        <img src={searchIcon} />
      </div>
      <div id="add_category_btn">
        <Link
          to={`/addCategory/${
            filterCategories === "all" ? "expense" : filterCategories
          }`}
        >
          <PlusIcon />
          Add category
        </Link>
      </div>
      {notArchivedCategories.map((category, index) => {
        let Icon = categoryIcons[category.icon];
        if (category.type === filterCategories || filterCategories === "all") {
          return (
            <div key={index} className="category_item">
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
                      x2="17"
                      y2="17"
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
                <Link to={`/infoCategory/${category.description}`}>
                  <EditIcon />
                </Link>
                <ArchiveIcon
                  onClick={() => {
                    archiveCategory(category.description);
                    idbAddItem(
                      Object.assign({}, category, { archived: true }),
                      "categories"
                    );
                  }}
                />
              </div>
              {renderNotes(category.notes)}
            </div>
          );
        }
      })}
    </React.Fragment>
  );
}
