import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { colors } from "../../../utils/constants/colors.js";
import { categoryIcons } from "../../../utils/constants/icons.js";
import { fetchCategoriesData, editCategory } from "../../../actions/Actions";
import { idbAddItem } from "../../../indexedDB/IndexedDB.js";
import {
  renderColors,
  renderIcons,
  renderSelectedColor,
  toggleElement,
} from "../utils";
import {
  hideElement,
  useOutsideClick,
} from "../../../hooks/useOutsideClick.js";

import { ReactComponent as BackIcon } from "../../../assets/icons/shared/back.svg";

import "../addCategory/AddCategory.css";

const doneEventHandler = (
  selectedCategory,
  id,
  categoryType,
  description,
  selectedColor,
  icon,
  date,
  notes,
  tags,
  editCategory
) => {
  const newCategory = {
    id,
    archived: false,
    type: categoryType,
    description: description,
    color: selectedColor,
    icon,
    date,
    notes,
    tags,
  };
  editCategory(selectedCategory, newCategory);
  idbAddItem(newCategory, "categories");
};

function InfoCategory({
  categories: { status, categories },
  fetchCategoriesData,
  editCategory,
}) {
  const { t } = useTranslation();

  const [activeItem, setActiveItem] = useState("");

  const clickedCategory = useParams().categoryId;

  const [id, setId] = useState("");
  const [categoryType, setCategoryType] = useState("expense");
  const [description, setDescription] = useState();
  const [selectedColor, setSelectedColor] = useState(colors.green[600]);
  const [icon, setIcon] = useState(0);
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [tags, setTags] = useState([""]);

  const SelectedIcon = categoryIcons[icon];

  const colorsRef = useOutsideClick(hideElement);
  const iconsRef = useOutsideClick(hideElement);

  useEffect(() => {
    fetchCategoriesData();
  }, [fetchCategoriesData]);

  useEffect(() => {
    if (status === "succeeded") {
      const infoCategory = categories.find(
        (category) => category.id === clickedCategory
      );
      if (!infoCategory) {
        return;
      }
      setId(infoCategory.id);
      setCategoryType(infoCategory.type);
      setDescription(infoCategory.description);
      setSelectedColor(infoCategory.color);
      setIcon(infoCategory.icon);
      setDate(new Date(infoCategory.date));
      setNotes(infoCategory.notes);
      setTags(infoCategory.tags);
    }
  }, [status, categories, clickedCategory]);

  return (
    <div className="add_category_content">
      {status === "loading" ? (
        <div>Loading</div>
      ) : (
        <React.Fragment>
          <div className="category_titles_block">
            <Link
              className="category_back_nav"
              to={`/categories/${categoryType}s`}
            >
              <BackIcon />
            </Link>
            <div className="info_category_title">
              {t("INFO_CATEGORY.CATEGORY_INFORMATION")}
            </div>
          </div>
          <div className="add_category_form">
            <div
              className={`add_category_item ${
                activeItem === "1" ? `${categoryType}_active_item` : ""
              }`}
              onClick={() => setActiveItem("1")}
            >
              <div className="info_items">{t("INFO_CATEGORY.DESCRIPTION")}</div>
              <input
                type="text"
                onChange={(event) => setDescription(event.target.value)}
                defaultValue={description}
              ></input>
            </div>
            <div
              className={`add_category_item ${
                activeItem === "2" ? `${categoryType}_active_item` : ""
              }`}
              onClick={() => setActiveItem("2")}
            >
              <div className="info_items">{t("INFO_CATEGORY.COLOR")}</div>
              <div
                className="selected_color"
                onClick={(event) => {
                  setActiveItem("2");
                  toggleElement(".colors_form");
                  iconsRef.current.classList.add("none");
                  event.stopPropagation();
                }}
              >
                {renderSelectedColor(selectedColor)}
              </div>
              <div
                className="select_btns"
                onClick={(event) => {
                  setActiveItem("2");
                  toggleElement(".colors_form");
                  iconsRef.current.classList.add("none");
                  event.stopPropagation();
                }}
              >
                {t("INFO_CATEGORY.SELECT")}
              </div>
            </div>
            <div ref={colorsRef} className="colors_form none">
              <div className="categories_palette">
                {renderColors(colors, setSelectedColor, selectedColor)}
              </div>
              <div
                className="colors_form_btns"
                onClick={() => toggleElement(".colors_form")}
              >
                <button>{t("INFO_CATEGORY.OK")}</button>
              </div>
            </div>
            <div
              className={`add_category_item ${
                activeItem === "3" ? `${categoryType}_active_item` : ""
              }`}
              onClick={() => setActiveItem("3")}
            >
              <div className="info_items">{t("INFO_CATEGORY.ICON")}</div>
              <div
                className="selected_color"
                onClick={(event) => {
                  setActiveItem("3");
                  toggleElement(".icons_form");
                  colorsRef.current.classList.add("none");
                  event.stopPropagation();
                }}
              >
                {renderSelectedColor(selectedColor, SelectedIcon)}
              </div>
              <div
                className="select_btns"
                onClick={(event) => {
                  setActiveItem("3");
                  toggleElement(".icons_form");
                  colorsRef.current.classList.add("none");
                  event.stopPropagation();
                }}
              >
                {t("INFO_CATEGORY.SELECT")}
              </div>
            </div>
            <div ref={iconsRef} className="icons_form none">
              <div className="categories_icons">
                {renderIcons(categoryIcons, setIcon)}
              </div>
              <div className="icons_form_btns">
                <button onClick={() => toggleElement(".icons_form")}>
                  {t("INFO_CATEGORY.OK")}
                </button>
              </div>
            </div>
            <div
              className={`add_category_item ${
                activeItem === "4" ? `${categoryType}_active_item` : ""
              }`}
              onClick={() => setActiveItem("4")}
            >
              <div className="info_items">{t("INFO_CATEGORY.DATE")}</div>
              <div className="input_items">
                <input
                  type="date"
                  onChange={(event) => setDate(new Date(event.target.value))}
                ></input>
              </div>
            </div>
            <div
              className={`add_category_item ${
                activeItem === "5" ? `${categoryType}_active_item` : ""
              }`}
              onClick={() => setActiveItem("5")}
            >
              <div className="info_items">{t("INFO_CATEGORY.NOTES")}</div>
              <input
                type="text"
                onChange={(event) => setNotes(event.target.value)}
                value={notes}
              ></input>
            </div>
            <div
              className={`add_category_item ${
                activeItem === "6" ? `${categoryType}_active_item` : ""
              }`}
              onClick={() => setActiveItem("6")}
            >
              <div className="info_items">{t("INFO_CATEGORY.TAGS")}</div>
              <input type="text"></input>
            </div>
            <div className="categories_buttons_block">
              <div className="done_button_div">
                <Link to={`/categories/${categoryType}s`}>
                  <button
                    className={`${categoryType}_button`}
                    onClick={() =>
                      doneEventHandler(
                        clickedCategory,
                        id,
                        categoryType,
                        description,
                        selectedColor,
                        icon,
                        date.toISOString(),
                        notes,
                        tags,
                        editCategory
                      )
                    }
                  >
                    {t("INFO_CATEGORY.DONE")}
                  </button>
                </Link>
              </div>
              <div className="cancel_button_div">
                <Link to={`/categories/${categoryType}s`}>
                  <button className="category_cancel_button">
                    {t("INFO_CATEGORY.CANCEL")}
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </React.Fragment>
      )}
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
  editCategory,
};

export default connect(mapStateToProps, mapDispatchToProps)(InfoCategory);
