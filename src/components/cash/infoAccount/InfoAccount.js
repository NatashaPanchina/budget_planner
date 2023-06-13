import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { NumericFormat } from "react-number-format";
import { USD } from "@dinero.js/currencies";
import { dinero, toDecimal, toSnapshot } from "dinero.js";

import { colors } from "../../../data/colors";
import { dineroFromFloat, formatNumberOutput } from "../../../api";
import {
  renderSelectedColor,
  renderColors,
  toggleElement,
  createCashType,
} from "../api";
import { idbEditItem } from "../../../indexedDB/IndexedDB.js";

import { ReactComponent as BackIcon } from "../images/backIcon.svg";
import cardBackground from "../images/cardBackground.svg";

import "../addAccount/AddAccount.css";

const doneEventHandler = (
  clickedAccount,
  accountType,
  description,
  balance,
  selectedColor,
  date,
  notes,
  tags,
  editAccount
) => {
  const newAccount = {
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
  editAccount(clickedAccount, newAccount);
  idbEditItem(clickedAccount, newAccount, "accounts");
};

export default function InfoAccount({
  accounts: { fetching, accounts },
  editAccount,
}) {
  const [activeItem, setActiveItem] = useState("");

  //счет который пользователь хочет отредактировать (нажал на него на странице Cash)
  const clickedAccount = useParams().accountDescription;

  const [accountType, setAccountType] = useState("");
  const [description, setDescription] = useState("");
  const [balance, setBalance] = useState(
    toDecimal(dinero({ amount: 0, currency: USD }))
  );
  const [selectedColor, setSelectedColor] = useState(["#07CC32", "#009B76"]);
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [tags, setTags] = useState([""]);
  let cashType = createCashType(accountType);
  //этот хук нужен так как получение данных из дб асинхронно.
  //и не проверяя переменную fetching мы не узнаем когда
  //данные подгрузились и доступны.
  //хук срабатывает при изменении fetching только один раз.
  //если бы он срабатывал несколько раз данные бы
  //невозможно было отредактировать. т.к они бы постоянно
  //перезаписывались. происходило бы большое количество
  //рендерингов.
  //теперь, когда fetching станет false значит данные
  //загрузились в indexedDB. и мы можем получить даннные
  //необходимого счета из этой бд.
  useEffect(() => {
    if (!fetching) {
      let selectedAccount = accounts.find(
        (account) => account.description === clickedAccount
      );
      setAccountType(selectedAccount.type);
      setDescription(selectedAccount.description);
      setBalance(toDecimal(dinero(selectedAccount.balance)));
      setSelectedColor(selectedAccount.color);
      setDate(new Date(selectedAccount.date));
      setNotes(selectedAccount.notes);
      setTags(selectedAccount.tags);
      cashType = createCashType(accountType);
    }
  }, [fetching]);

  return (
    <div id="add_account_content">
      <div id="accounts_title_block">
        <Link id="account_back_nav" to={`/cash/${cashType}`}>
          <BackIcon />
        </Link>
        <div id="info_account_title">Account information</div>
      </div>
      {!fetching ? (
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
                defaultValue={description}
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
                  value={balance}
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
                onClick={() => toggleElement("account_colors_form")}
              >
                {renderSelectedColor(selectedColor)}
              </div>
              <div
                className="select_btns"
                onClick={() => toggleElement("account_colors_form")}
              >
                Select
              </div>
            </div>
            <div id="account_colors_form" className="none">
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
                value={notes}
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
                        clickedAccount,
                        accountType,
                        description,
                        balance,
                        selectedColor,
                        date.toISOString(),
                        notes,
                        tags,
                        editAccount
                      )
                    }
                  >
                    Ok
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
      ) : (
        <div>Loading</div>
      )}
    </div>
  );
}
