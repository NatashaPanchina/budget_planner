import React from "react";

import "./Header.css";

import searchIcon from "./images/searchIcon.svg";
import logoutIcon from "./images/logoutIcon.svg";

export default function Header() {
  return (
    <div id="header">
      <div id="header_title">New Transaction</div>
      <div id="header_search">
        Search everything
        <img src={searchIcon} height="20px" />
      </div>
      <div id="header_language">EN</div>
      <div id="header_currency">$</div>
      <div id="header_profile">Natasha</div>
      <div id="header_logout">
        <img src={logoutIcon} />
      </div>
    </div>
  );
}
