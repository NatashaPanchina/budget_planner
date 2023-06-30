import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import searchIcon from "../../../assets/icons/shared/search.svg";
import { ReactComponent as PlusIcon } from "../../../assets/icons/shared/plus.svg";

export default function TransferList({ transactions }) {
  const { t } = useTranslation();

  return (
    <div>
      <div className="search">
        <input type="text" placeholder={t("CASH.SEARCH_TRANSFER")}></input>
        <img src={searchIcon} alt="search" />
      </div>
      <div className="add_account_btn">
        <Link to={`/newTransaction/transfer/all`}>
          <PlusIcon />
          {t("CASH.ADD_TRANSFER")}
        </Link>
      </div>
      Transfers
    </div>
  );
}
