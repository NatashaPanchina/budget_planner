import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { v4 as uuidv4 } from "uuid";

import { colors } from "../../../utils/constants/colors.js";
import { categoryIcons } from "../../../utils/constants/icons.js";
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

import "./AddCategory.css";

const doneEventHandler = (
  categoryType,
  description,
  selectedColor,
  icon,
  date,
  notes,
  tags,
  addNewCategory
) => {
  const newCategory = {
    id: uuidv4(),
    archived: false,
    type: categoryType,
    description: description,
    color: selectedColor,
    icon,
    date,
    notes,
    tags,
  };
  addNewCategory(newCategory);
  idbAddItem(newCategory, "categories");
};

export default function CategoryForm({ addNewCategory }) {
  const { t } = useTranslation();

  const [activeItem, setActiveItem] = useState("");

  const { categoryType } = useParams();
  const [description, setDescription] = useState("");
  const [selectedColor, setSelectedColor] = useState(colors.green[600]);
  const [icon, setIcon] = useState(0);
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [tags, setTags] = useState([""]);

  const SelectedIcon = categoryIcons[icon];

  const colorsRef = useOutsideClick(hideElement);
  const iconsRef = useOutsideClick(hideElement);

  return (
    <div className="add_category_form">
      <div
        className={`add_category_item ${
          activeItem === "1" ? `${categoryType}_active_item` : ""
        }`}
        onClick={() => setActiveItem("1")}
      >
        <div className="info_items">{t("ADD_CATEGORY.DESCRIPTION")}</div>
        <input
          type="text"
          onChange={(event) => setDescription(event.target.value)}
          placeholder={t("ADD_CATEGORY.DESCRIPTION_PLACEHOLDER")}
        ></input>
      </div>
      <div
        className={`add_category_item ${
          activeItem === "2" ? `${categoryType}_active_item` : ""
        }`}
        onClick={() => setActiveItem("2")}
      >
        <div className="info_items">{t("ADD_CATEGORY.COLOR")}</div>
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
          {t("ADD_CATEGORY.SELECT")}
        </div>
      </div>
      <div ref={colorsRef} className="colors_form none">
        <div className="categories_palette">
          {renderColors(colors, setSelectedColor, selectedColor)}
        </div>
        <div className="colors_form_btns">
          <button onClick={() => toggleElement(".colors_form")}>
            {t("ADD_CATEGORY.OK")}
          </button>
        </div>
      </div>
      <div
        className={`add_category_item ${
          activeItem === "3" ? `${categoryType}_active_item` : ""
        }`}
        onClick={() => setActiveItem("3")}
      >
        <div className="info_items">{t("ADD_CATEGORY.ICON")}</div>
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
          {t("ADD_CATEGORY.SELECT")}
        </div>
      </div>
      <div ref={iconsRef} className="icons_form none">
        <div className="categories_icons">
          {renderIcons(categoryIcons, setIcon)}
        </div>
        <div className="icons_form_btns">
          <button onClick={() => toggleElement(".icons_form")}>
            {t("ADD_CATEGORY.OK")}
          </button>
        </div>
      </div>
      <div
        className={`add_category_item ${
          activeItem === "4" ? `${categoryType}_active_item` : ""
        }`}
        onClick={() => setActiveItem("4")}
      >
        <div className="info_items">{t("ADD_CATEGORY.DATE")}</div>
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
        <div className="info_items">{t("ADD_CATEGORY.NOTES")}</div>
        <input
          type="text"
          onChange={(event) => setNotes(event.target.value)}
          placeholder={t("ADD_CATEGORY.NOTES_PLACEHOLDER")}
        ></input>
      </div>
      <div
        className={`add_category_item ${
          activeItem === "6" ? `${categoryType}_active_item` : ""
        }`}
        onClick={() => setActiveItem("6")}
      >
        <div className="info_items">{t("ADD_CATEGORY.TAGS")}</div>
        <input
          type="text"
          placeholder={t("ADD_CATEGORY.TAGS_PLACEHOLDER")}
        ></input>
      </div>
      <div className="categories_buttons_block">
        <div className="done_button_div">
          <Link to={`/categories/${categoryType}s`}>
            <button
              className={`${categoryType}_button`}
              onClick={() =>
                doneEventHandler(
                  categoryType,
                  description,
                  selectedColor,
                  icon,
                  date.toISOString(),
                  notes,
                  tags,
                  addNewCategory
                )
              }
            >
              {t("ADD_CATEGORY.DONE")}
            </button>
          </Link>
        </div>
        <div className="cancel_button_div">
          <Link to={`/categories/${categoryType}s`}>
            <button className="category_cancel_button">
              {t("ADD_CATEGORY.CANCEL")}
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
