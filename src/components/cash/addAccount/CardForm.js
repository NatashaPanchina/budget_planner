import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

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

export default function CardForm({ accountType, addNewAccount }) {
  const { t } = useTranslation();

  const [activeItem, setActiveItem] = useState("");

  const [description, setDescription] = useState("");
  const [balance, setBalance] = useState(0.0);
  const [selectedColor, setSelectedColor] = useState(colors.green[700]);
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [tags, setTags] = useState([""]);

  const cashType = createCashType(accountType);

  const colorsRef = useOutsideClick(hideElement);

  return (
    <React.Fragment>
      <div className="account_view">
        <div
          className="card_view"
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
            <div className="card_balance_title">
              {t("ADD_ACCOUNT.CURRENT_BALANCE")}
            </div>
          </div>
        </div>
      </div>
      <div className="add_account_form">
        <div
          className={`add_account_item ${
            activeItem === "1" ? `account_active_item` : ""
          }`}
          onClick={() => setActiveItem("1")}
        >
          <div className="info_items">{t("ADD_ACCOUNT.DESCRIPTION")}</div>
          <input
            type="text"
            onChange={(event) => setDescription(event.target.value)}
            placeholder={t("ADD_ACCOUNT.DESCRIPTION_PLACEHOLDER")}
          ></input>
        </div>
        <div
          className={`add_account_item ${
            activeItem === "2" ? `account_active_item` : ""
          }`}
          onClick={() => setActiveItem("2")}
        >
          <div className="info_items">{t("ADD_ACCOUNT.BALANCE")}</div>
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
          <div className="info_items">{t("ADD_ACCOUNT.COLOR")}</div>
          <div
            className="account_selected_color"
            onClick={(event) => {
              setActiveItem("3");
              toggleElement(".account_colors_form");
              event.stopPropagation();
            }}
          >
            {renderSelectedColor(selectedColor)}
          </div>
          <div
            className="select_btns"
            onClick={(event) => {
              setActiveItem("3");
              toggleElement(".account_colors_form");
              event.stopPropagation();
            }}
          >
            {t("ADD_ACCOUNT.SELECT")}
          </div>
        </div>
        <div ref={colorsRef} className="account_colors_form none">
          <div className="accounts_palette">
            {renderColors(colors, setSelectedColor, selectedColor)}
          </div>
          <div
            className="colors_form_btns"
            onClick={() => toggleElement(".account_colors_form")}
          >
            <button>{t("ADD_ACCOUNT.OK")}</button>
          </div>
        </div>
        <div
          className={`add_account_item ${
            activeItem === "4" ? `account_active_item` : ""
          }`}
          onClick={() => setActiveItem("4")}
        >
          <div className="info_items">{t("ADD_ACCOUNT.DATE")}</div>
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
          <div className="info_items">{t("ADD_ACCOUNT.NOTES")}</div>
          <input
            type="text"
            onChange={(event) => setNotes(event.target.value)}
            placeholder={t("ADD_ACCOUNT.NOTES_PLACEHOLDER")}
          ></input>
        </div>
        <div
          className={`add_account_item ${
            activeItem === "6" ? `account_active_item` : ""
          }`}
          onClick={() => setActiveItem("6")}
        >
          <div className="info_items">{t("ADD_ACCOUNT.TAGS")}</div>
          <input
            type="text"
            placeholder={t("ADD_ACCOUNT.TAGS_PLACEHOLDER")}
          ></input>
        </div>
        <div className="account_buttons_block">
          <div className="done_button_div">
            <Link to={`/cash/${cashType}`}>
              <button
                className="account_button"
                onClick={() =>
                  doneEventHandler(
                    accountType,
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
                {t("ADD_ACCOUNT.DONE")}
              </button>
            </Link>
          </div>
          <div className="cancel_button_div">
            <Link to={`/cash/${cashType}`}>
              <button className="account_cancel_button">
                {t("ADD_ACCOUNT.CANCEL")}
              </button>
            </Link>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
