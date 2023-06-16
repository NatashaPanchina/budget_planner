import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
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
  const [activeItem, setActiveItem] = useState("");

  const { categoryType } = useParams();
  const [description, setDescription] = useState("");
  const [selectedColor, setSelectedColor] = useState(colors[9]);
  const [icon, setIcon] = useState(0);
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [tags, setTags] = useState([""]);

  const SelectedIcon = categoryIcons[icon];

  const colorsRef = useOutsideClick(hideElement);
  const iconsRef = useOutsideClick(hideElement);

  return (
    <div id="add_category_form">
      <div
        className={`add_category_item ${
          activeItem === "1" ? `${categoryType}_active_item` : ""
        }`}
        onClick={() => setActiveItem("1")}
      >
        <div className="info_items">Description</div>
        <input
          type="text"
          onChange={(event) => setDescription(event.target.value)}
          placeholder="Click here to set the description"
        ></input>
      </div>
      <div
        className={`add_category_item ${
          activeItem === "2" ? `${categoryType}_active_item` : ""
        }`}
        onClick={() => setActiveItem("2")}
      >
        <div className="info_items">Color</div>
        <div
          className="selected_color"
          onClick={(event) => {
            toggleElement("colors_form");
            iconsRef.current.classList.add("none");
            event.stopPropagation();
          }}
        >
          {renderSelectedColor(selectedColor)}
        </div>
        <div
          className="select_btns"
          onClick={(event) => {
            toggleElement("colors_form");
            iconsRef.current.classList.add("none");
            event.stopPropagation();
          }}
        >
          Select
        </div>
      </div>
      <div ref={colorsRef} id="colors_form" className="none">
        {renderColors(colors, setSelectedColor)}
        <div id="colors_form_btns">
          <button onClick={() => toggleElement("colors_form")}>Ok</button>
        </div>
      </div>
      <div
        className={`add_category_item ${
          activeItem === "3" ? `${categoryType}_active_item` : ""
        }`}
        onClick={() => setActiveItem("3")}
      >
        <div className="info_items">Icon</div>
        <div
          className="selected_color"
          onClick={(event) => {
            toggleElement("icons_form");
            colorsRef.current.classList.add("none");
            event.stopPropagation();
          }}
        >
          {renderSelectedColor(selectedColor, SelectedIcon)}
        </div>
        <div
          className="select_btns"
          onClick={(event) => {
            toggleElement("icons_form");
            colorsRef.current.classList.add("none");
            event.stopPropagation();
          }}
        >
          Select
        </div>
      </div>
      <div ref={iconsRef} id="icons_form" className="none">
        {renderIcons(categoryIcons, setIcon)}
        <div id="icons_form_btns">
          <button onClick={() => toggleElement("icons_form")}>Ok</button>
        </div>
      </div>
      <div
        className={`add_category_item ${
          activeItem === "4" ? `${categoryType}_active_item` : ""
        }`}
        onClick={() => setActiveItem("4")}
      >
        <div className="info_items">Date</div>
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
        <div className="info_items">Notes</div>
        <input
          type="text"
          onChange={(event) => setNotes(event.target.value)}
          placeholder="Click here to make some notes"
        ></input>
      </div>
      <div
        className={`add_category_item ${
          activeItem === "6" ? `${categoryType}_active_item` : ""
        }`}
        onClick={() => setActiveItem("6")}
      >
        <div className="info_items">Tags</div>
        <input type="text" placeholder="Click here to define some tags"></input>
      </div>
      <div id="categories_buttons_block">
        <div id="done_button_div">
          <Link to={`/categories/${categoryType}s`}>
            <button
              id={`${categoryType}_button`}
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
              Done
            </button>
          </Link>
        </div>
        <div id="cancel_button_div">
          <Link to={`/categories/${categoryType}s`}>
            <button id="category_cancel_button">Cancel</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
