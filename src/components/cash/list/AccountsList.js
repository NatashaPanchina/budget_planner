import React from "react";
import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { dinero } from "dinero.js";

import { formatDineroOutput } from "../../../utils/format/cash";
import { idbAddItem } from "../../../indexedDB/IndexedDB.js";
import {
  createCashFilter,
  filterAccounts,
  renderNotes,
  createLocaleCashType,
} from "../utils";

import { ReactComponent as PlusIcon } from "../../../assets/icons/shared/plus.svg";
import { ReactComponent as EditIcon } from "../../../assets/icons/shared/edit.svg";
import { ReactComponent as TransferIcon } from "../../../assets/icons/shared/transfer.svg";
import { ReactComponent as ArchiveIcon } from "../../../assets/icons/shared/archive.svg";
import cardBackground from "../../../assets/icons/shared/cardBackground.svg";
import searchIcon from "../../../assets/icons/shared/search.svg";

function archiveEventButton(account, archiveAccount) {
  archiveAccount(account.id);
  idbAddItem({ ...account, archived: true }, "accounts");
}

export default function AccountsList({ notArchivedAccounts, archiveAccount }) {
  const { t } = useTranslation();

  const filterCash = createCashFilter(useParams().filterCash);
  const localeFilterCash = createLocaleCashType(filterCash);

  return (
    <React.Fragment>
      <div className="search">
        <input
          type="text"
          placeholder={t(`CASH.SEARCH_${localeFilterCash}`)}
        ></input>
        <img src={searchIcon} alt="search" />
      </div>
      <div className="add_account_btn">
        <Link
          to={`/cash/addAccount/${filterCash === "all" ? "card" : filterCash}`}
        >
          <PlusIcon />
          {t(`CASH.ADD_${localeFilterCash}`)}
        </Link>
      </div>
      {filterAccounts(filterCash, notArchivedAccounts).map((account) => {
        const balance = dinero(account.balance);
        return (
          <div className="account_item" key={account.id}>
            <div className="account_info">
              <div
                className={`${account.description} card`}
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
                  <div className="card_balance_title">
                    {t("CASH.CURRENT_BALANCE")}
                  </div>
                </div>
              </div>
              {renderNotes(account.notes)}
            </div>

            <div className="account_buttons">
              <div>
                <Link to={`/cash/infoAccount/${account.id}`}>
                  <EditIcon /> {t("CASH.EDIT")}
                </Link>
              </div>
              <div>
                <TransferIcon /> {t("CASH.NEW_TRANSFER")}
              </div>
              <div onClick={() => archiveEventButton(account, archiveAccount)}>
                <ArchiveIcon /> {t("CASH.ARCHIVE")}
              </div>
            </div>
          </div>
        );
      })}
    </React.Fragment>
  );
}
