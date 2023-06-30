import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import "./locales";

import Header from "./components/header/Header";
import Navigation from "./components/navigation/Navigation";
import Transactions from "./components/transactions/Transactions";
import InfoTransaction from "./components/transactions/infoTransaction/InfoTransaction";
import Cash from "./components/cash/Cash";
import NewTransaction from "./components/newTransaction/NewTransaction";
import Categories from "./components/categories/Categories";
import CategoriesTrash from "./components/categories/trash/CategoriesTrash";
import AddCategory from "./components/categories/addCategory/AddCategory";
import AddAccount from "./components/cash/addAccount/AddAccount";
import InfoAccount from "./components/cash/infoAccount/InfoAccount";
import InfoCategory from "./components/categories/infoCategory/InfoCategory";
import Analysis from "./components/analysis/Analysis";

import "./App.css";
import AccountsTrash from "./components/cash/trash/AccountsTrash";

function App() {
  return (
    <div>
      <Router>
        <Header />
        <Navigation />
        <Routes>
          <Route
            path="/transactions"
            element={<Navigate replace to="all/all" />}
          />
          <Route
            path="/transactions/:filterType/:filterAccount"
            element={<Transactions />}
          />
          <Route
            path="/transactions/infoTransaction/:transactionId"
            element={<InfoTransaction />}
          />
          <Route path="/cash" element={<Navigate replace to="all" />} />
          <Route path="/cash/:filterCash" element={<Cash />} />
          <Route path="/cash/trash" element={<Navigate replace to="all" />} />
          <Route path="/cash/trash/:filterType" element={<AccountsTrash />} />
          <Route
            path="/cash/addAccount/:accountType"
            element={<AddAccount />}
          />
          <Route
            path="/cash/infoAccount/:accountId"
            element={<InfoAccount />}
          />
          <Route
            path="/newTransaction"
            element={<Navigate replace to="expense/all" />}
          />
          <Route
            path="/newTransaction/:transactionType/:transactionAccount"
            element={<NewTransaction />}
          />
          <Route path="/categories" element={<Navigate replace to="all" />} />
          <Route path="/categories/:filterType" element={<Categories />} />
          <Route
            path="/categories/trash"
            element={<Navigate replace to="all" />}
          />
          <Route
            path="/categories/trash/:filterType"
            element={<CategoriesTrash />}
          />
          <Route
            path="/categories/addCategory/:categoryType"
            element={<AddCategory />}
          />
          <Route
            path="/categories/infoCategory/:categoryId"
            element={<InfoCategory />}
          />
          <Route path="/analysis" element={<Analysis />} />
          <Route path="/" element={<Navigate replace to="/analysis" />} />
        </Routes>
      </Router>
      <footer></footer>
    </div>
  );
}

export default App;
