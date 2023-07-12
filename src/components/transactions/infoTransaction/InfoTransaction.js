import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { NumericFormat } from "react-number-format";

import { dinero, toSnapshot, toDecimal, subtract, add } from "dinero.js";
import { USD } from "@dinero.js/currencies";

import {
  fetchCategoriesData,
  fetchAccountsData,
  fetchTransactionsData,
  editTransaction,
  editAccount,
} from "../../../actions/Actions.js";
import { idbAddItem } from "../../../indexedDB/IndexedDB.js";
import { dineroFromFloat } from "../../../utils/format/cash";
import {
  renderSelectedCategory,
  renderCategories,
  renderAccounts,
  renderSelectedAccount,
} from "../utils";
import {
  hideElement,
  useOutsideClick,
} from "../../../hooks/useOutsideClick.js";

import { ReactComponent as BackIcon } from "../../../assets/icons/shared/back.svg";
import { ReactComponent as PlusIcon } from "../../../assets/icons/shared/plus.svg";
import searchIcon from "../../../assets/icons/shared/search.svg";

import "../../newTransaction/NewTransaction.css";
import { pages } from "../../../utils/constants/pages.js";

function createNewBalance(prevTransaction, newTransaction, accounts) {
  const prevAccount = accounts.find(
    (account) => account.id === prevTransaction.account
  );
  const newAccount = accounts.find(
    (account) => account.id === newTransaction.account
  );

  switch (newTransaction.transactionType) {
    case "income":
      //если это один и тот же счет
      if (prevAccount === newAccount) {
        const prevAccountBalance = subtract(
          dinero(prevAccount.balance),
          dinero(prevTransaction.amount)
        );
        return {
          prevAccountBalance: toSnapshot(prevAccountBalance),
          newAccountBalance: toSnapshot(
            add(prevAccountBalance, dinero(newTransaction.amount))
          ),
        };
      } else {
        return {
          prevAccountBalance: toSnapshot(
            subtract(
              dinero(prevAccount.balance),
              dinero(prevTransaction.amount)
            )
          ),
          newAccountBalance: toSnapshot(
            add(dinero(newAccount.balance), dinero(newTransaction.amount))
          ),
        };
      }
    case "expense":
      if (prevAccount === newAccount) {
        const prevAccountBalance = add(
          dinero(prevAccount.balance),
          dinero(prevTransaction.amount)
        );
        return {
          prevAccountBalance: toSnapshot(prevAccountBalance),
          newAccountBalance: toSnapshot(
            subtract(prevAccountBalance, dinero(newTransaction.amount))
          ),
        };
      } else {
        return {
          prevAccountBalance: toSnapshot(
            add(dinero(prevAccount.balance), dinero(prevTransaction.amount))
          ),
          newAccountBalance: toSnapshot(
            subtract(dinero(newAccount.balance), dinero(newTransaction.amount))
          ),
        };
      }
    default:
      return {
        prevAccountBalance: prevAccount.balance,
        newAccountBalance: newAccount.balance,
      };
  }
}

const doneEventHandler = (
  clickedTransaction,
  id,
  transactionType,
  category,
  account,
  amount,
  date,
  notes,
  tags,
  prevTransaction,
  editTransaction,
  editAccount,
  accounts,
  dispatch
) => {
  const newAmount = dineroFromFloat({ amount, currency: USD, scale: 2 });
  const newTransaction = {
    id,
    transactionType,
    category,
    account,
    amount: toSnapshot(newAmount),
    date,
    notes,
    tags,
  };
  dispatch(editTransaction(clickedTransaction, newTransaction));
  idbAddItem(newTransaction, "transactions");

  const balance = createNewBalance(prevTransaction, newTransaction, accounts);

  const prevTransactionAccount = accounts.find(
    (account) => account.id === prevTransaction.account
  );
  dispatch(
    editAccount({
      ...prevTransactionAccount,
      balance: balance.prevAccountBalance,
    })
  );
  idbAddItem(
    { ...prevTransactionAccount, balance: balance.prevAccountBalance },
    "accounts"
  );

  const newTransactionAccount = accounts.find(
    (account) => account.id === newTransaction.account
  );
  dispatch(
    editAccount({
      ...newTransactionAccount,
      balance: balance.newAccountBalance,
    })
  );
  idbAddItem(
    { ...newTransactionAccount, balance: balance.newAccountBalance },
    "accounts"
  );
};

export default function InfoTransaction() {
  const transactions = useSelector((state) => state.transactions);
  const accounts = useSelector((state) => state.accounts);
  const categories = useSelector((state) => state.categories);
  const dispatch = useDispatch();

  const { t } = useTranslation();
  const [activeItem, setActiveItem] = useState("");

  const clickedTransaction = useParams().transactionId;

  let [id, setId] = useState("");
  const [transactionType, setTransactionType] = useState("expense");
  const [category, setCategory] = useState();
  const [account, setAccount] = useState();
  const [amount, setAmount] = useState(
    toDecimal(dinero({ amount: 0, currency: USD }))
  );
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState();
  const [tags, setTags] = useState([]);

  const [transactionsData, setTransactionsData] = useState([]);
  const [categoriesData, setCategoriesData] = useState([]);
  const [accountsData, setAccountsData] = useState([]);

  const notArchivedCategories = categoriesData.filter(
      (category) => category.archived === false
    ),
    notArchivedAccounts = accountsData.filter(
      (account) => account.archived === false
    );
  const filteredCategories = notArchivedCategories.filter(
    (category) => category.type === transactionType
  );
  const infoTransaction = transactionsData.find(
    (transaction) => transaction.id === clickedTransaction
  );

  const categoriesRef = useOutsideClick(hideElement);
  const accountsRef = useOutsideClick(hideElement);

  useEffect(() => {
    dispatch(fetchCategoriesData());
    dispatch(fetchAccountsData());
    dispatch(fetchTransactionsData());
  }, [dispatch]);

  useEffect(() => {
    if (transactions.status === "succeeded") {
      setTransactionsData(transactions.transactions);

      const infoTransaction = transactions.transactions.find(
        (transaction) => transaction.id === clickedTransaction
      );

      if (!infoTransaction) return;

      setId(infoTransaction.id);
      setTransactionType(infoTransaction.transactionType);
      setCategory(infoTransaction.category);
      setAccount(infoTransaction.account);
      setAmount(toDecimal(dinero(infoTransaction.amount)));
      setDate(new Date(infoTransaction.date));
      setNotes(infoTransaction.notes);
      setTags(infoTransaction.tags);
    }
  }, [transactions.status, transactions.transactions, clickedTransaction]);

  useEffect(() => {
    if (categories.status === "succeeded") {
      setCategoriesData(categories.categories);
    }
  }, [categories.status, categories.categories]);

  useEffect(() => {
    if (accounts.status === "succeeded") {
      setAccountsData(accounts.accounts);
    }
  }, [accounts.status, accounts.accounts]);

  return accounts.status === "loading" ||
    categories.status === "loading" ||
    transactions.status === "loading" ? (
    <div>Loading</div>
  ) : (
    <div className="main_content">
      <div className="transaction_title_block">
        <Link
          className="transaction_back_nav"
          to={`${pages.transactions[`${transactionType}s`]}/${account}`}
        >
          <BackIcon />
        </Link>
        <div className="info_transaction_title">
          {t("INFO_TRANSACTION.TITLE")}
        </div>
      </div>
      <div
        className={`transaction_item ${
          activeItem === "1" ? `${transactionType}_active_item` : ""
        }`}
        onClick={() => setActiveItem("1")}
      >
        <div className="info_items">{t("INFO_TRANSACTION.CATEGORY")}</div>
        <div className="input_items">
          <div
            className="selected_category"
            onClick={(event) => {
              setActiveItem("1");
              categoriesRef.current.classList.toggle("none");
              accountsRef.current.classList.add("none");
              event.stopPropagation();
            }}
          >
            {renderSelectedCategory(category, categoriesData)}
          </div>
        </div>
      </div>
      <div ref={categoriesRef} className="categories_list none">
        <div className="search">
          <input
            type="text"
            placeholder={t("INFO_TRANSACTION.SEARCH_CATEGORY")}
          ></input>
          <img src={searchIcon} alt="search" />
        </div>
        <div className="add_category_btn">
          <Link to={pages.categories.add[transactionType]}>
            <PlusIcon />
            {t("INFO_TRANSACTION.ADD_CATEGORY")}
          </Link>
        </div>
        {renderCategories(filteredCategories, setCategory)}
      </div>
      <div
        className={`transaction_item ${
          activeItem === "2" ? `${transactionType}_active_item` : ""
        }`}
        onClick={() => setActiveItem("2")}
      >
        <div className="info_items">{t("INFO_TRANSACTION.CASH")}</div>
        <div
          className="input_items"
          onClick={(event) => {
            setActiveItem("2");
            accountsRef.current.classList.toggle("none");
            categoriesRef.current.classList.add("none");
            event.stopPropagation();
          }}
        >
          {renderSelectedAccount(account, accountsData)}
        </div>
      </div>
      <div ref={accountsRef} className="accounts_list none">
        <div className="search">
          <input
            type="text"
            placeholder={t("INFO_TRANSACTION.SEARCH_CASH")}
          ></input>
          <img src={searchIcon} alt="search" />
        </div>
        <div className="add_category_btn">
          <Link to={pages.cash.add.card}>
            <PlusIcon />
            {t("INFO_TRANSACTION.ADD_CASH")}
          </Link>
        </div>
        {renderAccounts(notArchivedAccounts, setAccount)}
      </div>
      <div
        className={`transaction_item ${
          activeItem === "3" ? `${transactionType}_active_item` : ""
        }`}
        onClick={() => setActiveItem("3")}
      >
        <div className="info_items">{t("INFO_TRANSACTION.AMOUNT")}</div>
        <div className="input_items">
          ${" "}
          <NumericFormat
            thousandSeparator=","
            decimalSeparator="."
            decimalScale={2}
            allowNegative={false}
            placeholder="0.00"
            onValueChange={(values) => setAmount(values.floatValue)}
            value={amount}
          />
        </div>
      </div>
      <div
        className={`transaction_item ${
          activeItem === "4" ? `${transactionType}_active_item` : ""
        }`}
        onClick={() => setActiveItem("4")}
      >
        <div className="info_items">{t("INFO_TRANSACTION.DATE")}</div>
        <div className="input_items">
          <input
            type="date"
            onChange={(event) => setDate(new Date(event.target.value))}
          ></input>
        </div>
      </div>
      <div
        className={`transaction_item ${
          activeItem === "5" ? `${transactionType}_active_item` : ""
        }`}
        onClick={() => setActiveItem("5")}
      >
        <div className="info_items">{t("INFO_TRANSACTION.NOTES")}</div>
        <input
          type="text"
          onChange={(event) => setNotes(event.target.value)}
          defaultValue={notes}
        ></input>
      </div>
      <div
        className={`transaction_item ${
          activeItem === "6" ? `${transactionType}_active_item` : ""
        }`}
        onClick={() => setActiveItem("6")}
      >
        <div className="info_items">{t("INFO_TRANSACTION.TAGS")}</div>
        <input type="text"></input>
      </div>
      <div className="transactions_button_block">
        <div className="done_button_div">
          <Link to={`${pages.transactions[`${transactionType}s`]}/${account}`}>
            <button
              className={`${transactionType}_button`}
              onClick={() =>
                doneEventHandler(
                  clickedTransaction,
                  id,
                  transactionType,
                  category,
                  account,
                  amount,
                  date.toISOString(),
                  notes,
                  tags,
                  infoTransaction,
                  editTransaction,
                  editAccount,
                  accountsData,
                  dispatch
                )
              }
            >
              {t("INFO_TRANSACTION.DONE")}
            </button>
          </Link>
        </div>
        <div className="cancel_button_div">
          <Link to={`${pages.transactions[`${transactionType}s`]}/${account}`}>
            <button className="account_cancel_button">
              {t("INFO_TRANSACTION.CANCEL")}
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
