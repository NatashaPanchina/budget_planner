import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import {
  fetchAccountsData,
  fetchCategoriesData,
  fetchTransactionsData,
} from "../../actions/Actions";
import TransactionsAnalysis from "./transactions/TransactionsAnalysis";

function Analysis({
  categories,
  accounts,
  transactions,
  fetchAccountsData,
  fetchCategoriesData,
  fetchTransactionsData,
}) {
  const [categoriesData, setCategoriesData] = useState([]);
  const [accountsData, setAccountsData] = useState([]);
  const [transactionsData, setTransactionsData] = useState([]);

  useEffect(() => {
    fetchCategoriesData();
    fetchAccountsData();
    fetchTransactionsData();
  }, [fetchCategoriesData, fetchAccountsData, fetchTransactionsData]);

  useEffect(() => {
    if (categories.status === "succeeded")
      setCategoriesData(categories.categories);
    if (accounts.status === "succeeded") setAccountsData(accounts.accounts);
    if (transactions.status === "succeeded")
      setTransactionsData(transactions.transactions);
  }, [
    categories.status,
    accounts.status,
    transactions.status,
    categories.categories,
    accounts.accounts,
    transactions.transactions,
  ]);

  return categories.status === "loading" ||
    accounts.status === "loading" ||
    transactions.status === "loading" ? (
    <div>Loading</div>
  ) : (
    <TransactionsAnalysis
      transactions={transactionsData}
      categories={categoriesData}
      accounts={accountsData}
    />
  );
}

const mapStateToProps = (state) => {
  return {
    categories: state.categories,
    accounts: state.accounts,
    transactions: state.transactions,
  };
};

const mapDispatchToProps = {
  fetchCategoriesData,
  fetchAccountsData,
  fetchTransactionsData,
};

export default connect(mapStateToProps, mapDispatchToProps)(Analysis);
