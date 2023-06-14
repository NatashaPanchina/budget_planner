import React from "react";
import { NavLink } from "react-router-dom";

import logoIcon from "./images/logo.svg";
import { ReactComponent as TransactionsIcon } from "./images/transactions.svg";
import { ReactComponent as CashIcon } from "./images/cash.svg";
import { ReactComponent as NewTransactionIcon } from "./images/newTransaction.svg";
import { ReactComponent as CategoriesIcon } from "./images/categories.svg";
import { ReactComponent as AnalysisIcon } from "./images/analysis.svg";
import { ReactComponent as MoreIcon } from "./images/more.svg";

import "./Navigation.css";

function isActive({ isActive }) {
  return isActive ? "activeLink" : "";
}

export default function Navigation() {
  return (
    <div id="navigation">
      <div id="logo">
        <img src={logoIcon} alt="logo" />
      </div>
      <nav>
        <div>
          <NavLink to="/transactions" className={isActive}>
            <TransactionsIcon />
            Transactions
          </NavLink>
        </div>
        <div>
          <NavLink to="/cash" className={isActive}>
            <CashIcon />
            Cash
          </NavLink>
        </div>
        <div>
          <NavLink to="/newTransaction" className={isActive}>
            <NewTransactionIcon id="newTransactionIcon" />
            New Transaction
          </NavLink>
        </div>
        <div>
          <NavLink to="/categories" className={isActive}>
            <CategoriesIcon />
            Categories
          </NavLink>
        </div>
        <div>
          <NavLink to="/analysis" className={isActive}>
            <AnalysisIcon id="analysisIcon" />
            Analysis
          </NavLink>
        </div>
        <div id="more_nav">
          <MoreIcon />
          more
        </div>
      </nav>
    </div>
  );
}
