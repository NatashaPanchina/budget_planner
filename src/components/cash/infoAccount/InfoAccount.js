import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { NumericFormat } from "react-number-format";
import { USD } from "@dinero.js/currencies";
import { dinero, toDecimal, toSnapshot } from "dinero.js";

import { colors } from "../../../utils/constants/colors.js";
import { fetchAccountsData, editAccount } from "../../../actions/Actions";
import {
  dineroFromFloat,
  formatNumberOutput,
} from "../../../utils/format/cash";
import {
  renderSelectedColor,
  renderColors,
  toggleElement,
  createCashType,
  createLocaleCashType,
} from "../utils";
import { useOutsideClick, hideElement } from "../../../hooks/useOutsideClick";
import { idbAddItem } from "../../../indexedDB/IndexedDB.js";

import { ReactComponent as BackIcon } from "../../../assets/icons/shared/back.svg";
import cardBackground from "../../../assets/icons/shared/cardBackground.svg";

import "../addAccount/AddAccount.css";

const doneEventHandler = (
  clickedAccount,
  id,
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
    id,
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
  idbAddItem(newAccount, "accounts");
};

function InfoAccount({
  accounts: { status, accounts },
  fetchAccountsData,
  editAccount,
}) {
  const { t } = useTranslation();

  const [activeItem, setActiveItem] = useState("");

  //счет который пользователь хочет отредактировать (нажал на него на странице Cash)
  const clickedAccount = useParams().accountId;

  const [id, setId] = useState("");
  const [accountType, setAccountType] = useState("");
  const [description, setDescription] = useState("");
  const [balance, setBalance] = useState(
    toDecimal(dinero({ amount: 0, currency: USD }))
  );
  const [selectedColor, setSelectedColor] = useState(colors.green[800]);
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [tags, setTags] = useState([""]);

  const cashType = createCashType(accountType);
  const cashLocalType = createLocaleCashType(accountType);

  const colorsRef = useOutsideClick(hideElement);

  //запрашиваем нужные данные для этого компонента
  //один раз только при его монтировании
  useEffect(() => {
    fetchAccountsData();
  }, [fetchAccountsData]);

  //получаем данные нужного счета когда они подгрузились
  useEffect(() => {
    if (status === "succeeded") {
      let selectedAccount = accounts.find(
        (account) => account.id === clickedAccount
      );
      if (!selectedAccount) {
        return;
      }
      setId(selectedAccount.id);
      setAccountType(selectedAccount.type);
      setDescription(selectedAccount.description);
      setBalance(toDecimal(dinero(selectedAccount.balance)));
      setSelectedColor(selectedAccount.color);
      setDate(new Date(selectedAccount.date));
      setNotes(selectedAccount.notes);
      setTags(selectedAccount.tags);
    }
  }, [status, accounts, clickedAccount]);

  return (
    <div className="add_account_content">
      <div className="accounts_title_block">
        <Link className="account_back_nav" to={`/cash/${cashType}`}>
          <BackIcon />
        </Link>
        <div className="info_account_title">
          {t(`INFO_ACCOUNT.${cashLocalType}_INFORMATION`)}
        </div>
      </div>
      {status === "loading" ? (
        <div>Loading</div>
      ) : (
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
                  {t("INFO_ACCOUNT.CURRENT_BALANCE")}
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
              <div className="info_items">{t("INFO_ACCOUNT.DESCRIPTION")}</div>
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
              <div className="info_items">{t("INFO_ACCOUNT.BALANCE")}</div>
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
              <div className="info_items">{t("INFO_ACCOUNT.COLOR")}</div>
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
                {t("INFO_ACCOUNT.SELECT")}
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
                <button>{t("INFO_ACCOUNT.OK")}</button>
              </div>
            </div>
            <div
              className={`add_account_item ${
                activeItem === "4" ? `account_active_item` : ""
              }`}
              onClick={() => setActiveItem("4")}
            >
              <div className="info_items">{t("INFO_ACCOUNT.DATE")}</div>
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
              <div className="info_items">{t("INFO_ACCOUNT.NOTES")}</div>
              <input
                type="text"
                onChange={(event) => setNotes(event.target.value)}
                value={notes}
              ></input>
            </div>
            <div
              className={`add_account_item ${
                activeItem === "6" ? `account_active_item` : ""
              }`}
              onClick={() => setActiveItem("6")}
            >
              <div className="info_items">{t("INFO_ACCOUNT.TAGS")}</div>
              <input type="text"></input>
            </div>
            <div className="account_buttons_block">
              <div className="done_button_div">
                <Link to={`/cash/${cashType}`}>
                  <button
                    className="account_button"
                    onClick={() =>
                      doneEventHandler(
                        clickedAccount,
                        id,
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
                    {t("INFO_ACCOUNT.DONE")}
                  </button>
                </Link>
              </div>
              <div className="cancel_button_div">
                <Link to={`/cash/${cashType}`}>
                  <button className="account_cancel_button">
                    {t("INFO_ACCOUNT.CANCEL")}
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
    accounts: state.accounts,
  };
};

const mapDispatchToProps = {
  fetchAccountsData,
  editAccount,
};

export default connect(mapStateToProps, mapDispatchToProps)(InfoAccount);
