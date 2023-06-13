import React from "react";
import { Link, useParams } from "react-router-dom";
import { dinero } from "dinero.js";

import { formatDineroOutput } from "../../../api";
import { idbAddItem } from "../../../indexedDB/IndexedDB.js";

import { ReactComponent as PlusIcon } from "../images/plusIcon.svg";
import { ReactComponent as EditIcon } from "../images/editIcon.svg";
import { ReactComponent as TransferIcon } from "../images/transferIcon.svg";
import { ReactComponent as ArchiveIcon } from "../images/archiveIcon.svg";
import cardBackground from "../images/cardBackground.svg";
import searchIcon from "../images/searchIcon.svg";
import notesIcon from "../images/notesIcon.svg";

function archiveEventButton(account, archiveAccount) {
  const newAccount = Object.assign({}, account, {
    archived: true,
  });
  archiveAccount(account.description);
  idbAddItem(newAccount, "accounts");
}

function renderNotes(notes) {
  if (notes) {
    return (
      <div className="accounts_notes">
        <img src={notesIcon} className="notes_icon" />
        {notes}
      </div>
    );
  }
}

//для денег нужно убрать s на конце
function createCashFilter(filterCash) {
  switch (filterCash) {
    case "cards":
      return "card";
    case "cash":
      return "cash";
    case "transfers":
      return "transfer";
    default:
      return "all";
  }
}

export default function AccountsList({ notArchivedAccounts, archiveAccount }) {
  const filterCash = createCashFilter(useParams().filterCash);
  return (
    <React.Fragment>
      <div id="search">
        <input type="text" placeholder={`Search ${filterCash}`}></input>
        <img src={searchIcon} />
      </div>
      <div id="add_account_btn">
        <Link to={`/addAccount/${filterCash === "all" ? "card" : filterCash}`}>
          <PlusIcon />
          Add {filterCash === "all" ? "cash" : filterCash}
        </Link>
      </div>
      {notArchivedAccounts.map((account, index) => {
        const balance = dinero(account.balance);
        if (account.type === filterCash || filterCash === "all") {
          return (
            <div className="account_item" key={index}>
              <div className="account_info">
                <div
                  id={account.description}
                  className="card"
                  style={{
                    background: `url(${cardBackground}) 0% 0% / cover no-repeat,
                                                    linear-gradient(90deg, ${account.color[0]} 0%, ${account.color[1]} 100%)`,
                    boxShadow: `0px 4px 10px #DCE2DF`,
                  }}
                >
                  <div className="card_name">{account.description}</div>
                  <div className="card_balance_info">
                    <div className="card_balance">
                      {formatDineroOutput(balance, "USD")}
                    </div>
                    <div className="card_balance_title">Current balance</div>
                  </div>
                </div>
                {renderNotes(account.notes)}
              </div>

              <div className="account_buttons">
                <div>
                  <Link to={`/infoAccount/${account.description}`}>
                    <EditIcon /> Edit
                  </Link>
                </div>
                <div>
                  <TransferIcon /> New Transfer
                </div>
                <div
                  onClick={() => archiveEventButton(account, archiveAccount)}
                >
                  <ArchiveIcon /> Archive
                </div>
              </div>
            </div>
          );
        }
      })}
    </React.Fragment>
  );
}
