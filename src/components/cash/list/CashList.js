import React from "react";
import { useParams } from "react-router-dom";

import TransfersList from "./TransfersList.js";
import AccountsList from "./AccountsList.js";

export default function CashList({ notArchivedAccounts, archiveAccount }) {
  const filterCash = useParams().filterCash;
  return filterCash === "transfers" ? (
    <TransfersList />
  ) : (
    <AccountsList
      notArchivedAccounts={notArchivedAccounts}
      archiveAccount={archiveAccount}
    />
  );
}
