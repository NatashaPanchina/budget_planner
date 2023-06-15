import React from "react";

import "./Header.css";

import searchIcon from "../../assets/icons/shared/globalSearch.svg";
import logoutIcon from "../../assets/icons/shared/logOut.svg";

export default function Header() {
  return (
    <div id="header">
      <div id="header_title">New Transaction</div>
      <div id="header_search">
        Search everything
        <img src={searchIcon} alt="search" height="20px" />
      </div>
      <div id="header_language">EN</div>
      <div id="header_currency">$</div>
      <div id="header_profile">Natasha</div>
      <div id="header_logout">
        <img src={logoutIcon} alt="logOut" />
      </div>
    </div>
  );
}
