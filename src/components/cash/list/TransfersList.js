import React from "react";
import { Link } from "react-router-dom";

import searchIcon from "../images/searchIcon.svg";
import { ReactComponent as PlusIcon } from "../images/plusIcon.svg";

export default function TransferList({ transactions }) {
  return (
    <div>
      <div id="search">
        <input type="text" placeholder="Search transfer"></input>
        <img src={searchIcon} />
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
