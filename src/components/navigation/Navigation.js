import React from "react";
import { NavLink } from "react-router-dom";

import logoIcon from "./images/logo.svg";
import { ReactComponent as TransactionsIcon } from "./images/transactionsIcon.svg";
import { ReactComponent as CashIcon } from "./images/cashIcon.svg";
import { ReactComponent as NewTransactionIcon } from "./images/newTransactionIcon.svg";
import { ReactComponent as CategoriesIcon } from "./images/categoriesIcon.svg";
import { ReactComponent as AnalysisIcon } from "./images/analysisIcon.svg";
import { ReactComponent as MoreIcon } from "./images/moreIcon.svg";

import "./Navigation.css";

function isActive({ isActive }) {
  return isActive ? "activeLink" : "";
}

export default function Navigation() {
  return (
    <div id="navigation">
      <div id="logo">
        <img src={logoIcon} />
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
