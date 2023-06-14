import React from "react";
import { Link } from "react-router-dom";

import searchIcon from "../../../assets/icons/shared/search.svg";
import { ReactComponent as PlusIcon } from "../../../assets/icons/shared/plus.svg";

export default function TransferList({ transactions }) {
  return (
    <div>
      <div id="search">
        <input type="text" placeholder="Search transfer"></input>
        <img src={searchIcon} alt="search" />
      </div>
      <div id="add_account_btn">
        <Link to={`/newTransaction/transfer/all`}>
          <PlusIcon />
          Add transfer
        </Link>
      </div>
      Transfers
    </div>
  );
}
