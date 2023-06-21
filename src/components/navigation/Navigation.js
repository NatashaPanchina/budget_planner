import React from "react";
import { NavLink } from "react-router-dom";

import { ReactComponent as LogoIcon } from "../../assets/icons/navigation/logo.svg";
import { ReactComponent as TransactionsIcon } from "../../assets/icons/navigation/transactions.svg";
import { ReactComponent as CashIcon } from "../../assets/icons/navigation/cash.svg";
import { ReactComponent as NewTransactionIcon } from "../../assets/icons/navigation/newTransaction.svg";
import { ReactComponent as CategoriesIcon } from "../../assets/icons/navigation/categories.svg";
import { ReactComponent as AnalysisIcon } from "../../assets/icons/navigation/analysis.svg";
import { ReactComponent as MoreIcon } from "../../assets/icons/navigation/more.svg";

import "./Navigation.css";

function isActive({ isActive }) {
  return isActive ? "activeLink" : "";
}

export default function Navigation() {
  return (
    <div className="navigation">
      <div className="logo">
        <LogoIcon />
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
            <NewTransactionIcon className="newTransactionIcon" />
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
            <AnalysisIcon className="analysisIcon" />
            Analysis
          </NavLink>
        </div>
        <div className="more_nav">
          <MoreIcon />
          more
        </div>
      </nav>
    </div>
  );
}
