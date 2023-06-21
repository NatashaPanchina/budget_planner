import React from "react";

import "./Header.css";

import searchIcon from "../../assets/icons/shared/globalSearch.svg";
import logoutIcon from "../../assets/icons/shared/logOut.svg";

export default function Header() {
  return (
    <div className="header">
      <div className="header_title">New Transaction</div>
      <div className="header_search">
        Search everything
        <img src={searchIcon} alt="search" />
      </div>
      <div className="header_language">EN</div>
      <div className="header_currency">$</div>
      <div className="header_profile">Natasha</div>
      <div className="header_logout">
        <img src={logoutIcon} alt="logOut" />
      </div>
    </div>
  );
}
