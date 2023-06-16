import React, { useState } from "react";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

import { NumericFormat } from "react-number-format";
import { USD } from "@dinero.js/currencies";
import { toSnapshot } from "dinero.js";

import { colors } from "../../../utils/constants/colors";
import {
  dineroFromFloat,
  formatNumberOutput,
} from "../../../utils/format/cash";
import {
  renderSelectedColor,
  renderColors,
  toggleElement,
  createCashType,
} from "../utils";
import { useOutsideClick, hideElement } from "../../../hooks/useOutsideClick";
import { idbAddItem } from "../../../indexedDB/IndexedDB.js";

import cardBackground from "../../../assets/icons/shared/cardBackground.svg";

const doneEventHandler = (
  accountType,
  description,
  balance,
  selectedColor,
  date,
  notes,
  tags,
  addNewAccount
) => {
  const newAccount = {
    id: uuidv4(),
    archived: false,
    type: accountType,
    description,
    balance: toSnapshot(
      dineroFromFloat({
        amount: balance,
        currency: USD,
        scale: 2,
      })
    ),
    color: selectedColor,
    date,
    notes,
    tags,
  };
  addNewAccount(newAccount);
  idbAddItem(newAccount, "accounts");
};

export default function CashForm({ accountType, addNewAccount }) {
  const cashType = createCashType(accountType);

  const [activeItem, setActiveItem] = useState("");

  const [description, setDescription] = useState("");
  const [balance, setBalance] = useState(0.0);
  const [selectedColor, setSelectedColor] = useState(colors[26]);
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [tags, setTags] = useState([""]);

  const colorsRef = useOutsideClick(hideElement);

  return (
    <React.Fragment>
      <div id="account_view">
        <div
          id="card_view"
          style={{
            background: `url(${cardBackground}) 0% 0% / cover no-repeat,
                              linear-gradient(90deg, ${selectedColor[0]} 0%, ${selectedColor[1]} 100%)`,
            boxShadow: `0px 4px 10px #DCE2DF`,
          }}
        >
          <div className="card_name">{description}</div>
          <div className="card_balance_info">
            <div className="card_balance">
              {formatNumberOutput(balance, "USD")}
            </div>
            <div className="card_balance_title">Current balance</div>
          </div>
        </div>
      </div>
      <div id="add_account_form">
        <div
          className={`add_account_item ${
            activeItem === "1" ? `account_active_item` : ""
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
          className={`add_account_item ${
            activeItem === "2" ? `account_active_item` : ""
          }`}
          onClick={() => setActiveItem("2")}
        >
          <div className="info_items">Balance</div>
          <div className="input_items">
            $
            <NumericFormat
              thousandSeparator=","
              decimalSeparator="."
              decimalScale={2}
              allowNegative={false}
              placeholder="0.00"
              onValueChange={(values) => setBalance(values.floatValue)}
            />
          </div>
        </div>
        <div
          className={`add_account_item ${
            activeItem === "3" ? `account_active_item` : ""
          }`}
          onClick={() => setActiveItem("3")}
        >
          <div className="info_items">Color</div>
          <div
            id="account_selected_color"
            onClick={(event) => {
              toggleElement("account_colors_form");
              event.stopPropagation();
            }}
          >
            {renderSelectedColor(selectedColor)}
          </div>
          <div
            className="select_btns"
            onClick={(event) => {
              toggleElement("account_colors_form");
              event.stopPropagation();
            }}
          >
            Select
          </div>
        </div>
        <div ref={colorsRef} id="account_colors_form" className="none">
          {renderColors(colors, setSelectedColor)}
          <div
            id="colors_form_btns"
            onClick={() => toggleElement("account_colors_form")}
          >
            <button>Ok</button>
          </div>
        </div>
        <div
          className={`add_account_item ${
            activeItem === "4" ? `account_active_item` : ""
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
          className={`add_account_item ${
            activeItem === "5" ? `account_active_item` : ""
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
          className={`add_account_item ${
            activeItem === "6" ? `account_active_item` : ""
          }`}
          onClick={() => setActiveItem("6")}
        >
          <div className="info_items">Tags</div>
          <input
            type="text"
            placeholder="Click here to define some tags"
          ></input>
        </div>
        <div id="account_buttons_block">
          <div id="done_button_div">
            <Link to={`/cash/${cashType}`}>
              <button
                id="account_button"
                onClick={() =>
                  doneEventHandler(
                    cashType,
                    description,
                    balance,
                    selectedColor,
                    date.toISOString(),
                    notes,
                    tags,
                    addNewAccount
                  )
                }
              >
                Done
              </button>
            </Link>
          </div>
          <div id="cancel_button_div">
            <Link to={`/cash/${cashType}`}>
              <button id="account_cancel_button">Cancel</button>
            </Link>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
