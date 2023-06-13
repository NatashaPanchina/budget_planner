import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Header from "./components/header/Header";
import Navigation from "./components/navigation/Navigation";
import Transactions from "./containers/Transactions";
import InfoTransaction from "./containers/InfoTransaction";
import Cash from "./containers/Cash";
import NewTransaction from "./containers/NewTransaction";
import Categories from "./containers/Categories";
import AddCategory from "./containers/AddCategory";
import AddAccount from "./containers/AddAccount";
import InfoAccount from "./containers/InfoAccount";
import InfoCategory from "./containers/InfoCategory";
import Analysis from "./containers/Analysis";

import "./App.css";

function App() {
  return (
    <div>
      <Header />
      <Router>
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
            path="/infoTransaction/:transactionId"
            element={<InfoTransaction />}
          />
          <Route path="/cash" element={<Navigate replace to="all" />} />
          <Route path="/cash/:filterCash" element={<Cash />} />
          <Route path="/addAccount/:accountType" element={<AddAccount />} />
          <Route
            path="/infoAccount/:accountDescription"
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
          <Route path="/addCategory/:categoryType" element={<AddCategory />} />
          <Route
            path="/infoCategory/:categoryDescription"
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
