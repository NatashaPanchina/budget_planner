import React from "react";
import { useParams } from "react-router-dom";

import CashForm from "./CashForm.js";
import CardForm from "./CardForm.js";

export default function AccountForm({ addNewAccount }) {
  const { accountType } = useParams();

  switch (accountType) {
    case "card":
      return (
        <CardForm accountType={accountType} addNewAccount={addNewAccount} />
      );
    case "cash":
      return (
        <CashForm accountType={accountType} addNewAccount={addNewAccount} />
      );
    default:
      return <CardForm addNewAccount={addNewAccount} />;
  }
}
