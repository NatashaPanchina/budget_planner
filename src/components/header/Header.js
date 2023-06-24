import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";

import { idbAddItem } from "../../indexedDB/IndexedDB";
import { fetchProfileData, changeLanguage } from "../../actions/Actions";
import { hideElement, useOutsideClick } from "../../hooks/useOutsideClick";

import searchIcon from "../../assets/icons/shared/globalSearch.svg";
import logoutIcon from "../../assets/icons/shared/logOut.svg";

import "./Header.css";

//lookup map
function renderHeaderTitles(t) {
  return {
    "/transactions": t("HEADER.TRANSACTIONS"),
    "/cash": t("HEADER.CASH"),
    "/newTransaction": t("HEADER.NEW_TRANSACTION"),
    "/categories": t("HEADER.CATEGORIES"),
    "/analysis": t("HEADER.ANALYSIS"),
  };
}

function Header({
  header: { status, profile },
  fetchProfileData,
  changeLanguage,
}) {
  const [headerTitle, setHeaderTitle] = useState("");
  const [id, setId] = useState("");
  const [username, setUsername] = useState("User");
  const [language, setLanguage] = useState("EN");
  const [currency, setCurrency] = useState("$");

  const { t, i18n } = useTranslation();
  const location = useLocation();
  const languageRef = useOutsideClick(hideElement);

  const titles = renderHeaderTitles(t);
  const path = location.pathname.match(/\/(\w)+/)[0];

  useEffect(() => {
    fetchProfileData();
  }, [fetchProfileData]);

  useEffect(() => {
    if (status === "succeeded") {
      if (!profile) return;
      setId(profile.id);
      setUsername(profile.username);
      setLanguage(profile.language);
      setCurrency(profile.currency);
    }
  }, [status, profile]);

  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language, i18n]);

  useEffect(() => {
    setHeaderTitle(titles[path]);
  }, [path, titles]);

  return (
    <div className="header">
      <div className="header_title">{headerTitle}</div>
      <div className="header_search">
        {t("HEADER.SEARCH_EVERYTHING")}
        <img src={searchIcon} alt="search" />
      </div>
      <div
        className="header_language"
        onClick={(event) => {
          languageRef.current.classList.toggle("none");
          event.stopPropagation();
        }}
      >
        <div className="current_language">{language}</div>
        <div ref={languageRef} className="languages_menu none">
          <div
            className="languages_menu_item"
            onClick={() => {
              idbAddItem({ id, username, currency, language: "EN" }, "profile");
              changeLanguage("EN");
            }}
          >
            EN
          </div>
          <div
            className="languages_menu_item"
            onClick={() => {
              idbAddItem({ id, username, currency, language: "RU" }, "profile");
              changeLanguage("RU");
            }}
          >
            RU
          </div>
        </div>
      </div>
      <div className="header_currency">{currency}</div>
      <div className="header_profile">{username}</div>
      <div className="header_logout">
        <img src={logoutIcon} alt="logOut" />
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    header: state.header,
  };
};

const mapDispatchtoProps = {
  fetchProfileData,
  changeLanguage,
};

export default connect(mapStateToProps, mapDispatchtoProps)(Header);
