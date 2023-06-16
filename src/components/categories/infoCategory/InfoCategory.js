import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link, useParams } from "react-router-dom";

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
  const [activeItem, setActiveItem] = useState("");

  const clickedCategory = useParams().categoryId;

  const [id, setId] = useState("");
  const [categoryType, setCategoryType] = useState("expense");
  const [description, setDescription] = useState();
  const [selectedColor, setSelectedColor] = useState([]);
  const [icon, setIcon] = useState(0);
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [tags, setTags] = useState([""]);

  const SelectedIcon = categoryIcons[icon];

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
    <div id="add_category_content">
      {status === "loading" ? (
        <div>Loading</div>
      ) : (
        <React.Fragment>
          <div id="category_titles_block">
            <Link id="category_back_nav" to={`/categories/${categoryType}s`}>
              <BackIcon />
            </Link>
            <div className="info_category_title">Category Information</div>
          </div>
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
                defaultValue={description}
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
                onClick={() => toggleElement("colors_form")}
              >
                {renderSelectedColor(selectedColor)}
              </div>
              <div
                className="select_btns"
                onClick={() => toggleElement("colors_form")}
              >
                Select
              </div>
            </div>
            <div id="colors_form" className="none">
              {renderColors(colors, setSelectedColor)}
              <div
                id="colors_form_btns"
                onClick={() => toggleElement("colors_form")}
              >
                <button>Ok</button>
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
                onClick={() => toggleElement("icons_form")}
              >
                {renderSelectedColor(selectedColor, SelectedIcon)}
              </div>
              <div
                className="select_btns"
                onClick={() => toggleElement("icons_form")}
              >
                Select
              </div>
            </div>
            <div id="icons_form" className="none">
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
                value={notes}
              ></input>
            </div>
            <div
              className={`add_category_item ${
                activeItem === "6" ? `${categoryType}_active_item` : ""
              }`}
              onClick={() => setActiveItem("6")}
            >
              <div className="info_items">Tags</div>
              <input
                type="text"
                placeholder="Click here to define some tags"
              ></input>
            </div>
            <div id="categories_buttons_block">
              <div id="done_button_div">
                <Link to={`/categories/${categoryType}s`}>
                  <button
                    id={`${categoryType}_button`}
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
                    Ok
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
