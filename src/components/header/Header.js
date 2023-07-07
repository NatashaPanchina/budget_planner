import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";

import { idbAddItem } from "../../indexedDB/IndexedDB";
import {
  fetchProfileData,
  changeLanguage,
  changeMode,
} from "../../actions/Actions";
import { hideElement, useOutsideClick } from "../../hooks/useOutsideClick";

import { ReactComponent as CurrencyDollarIcon } from "../../assets/icons/shared/currencyDollar.svg";
import { ReactComponent as LightModeIcon } from "../../assets/icons/shared/lightMode.svg";
import { ReactComponent as DarkModeIcon } from "../../assets/icons/shared/darkMode.svg";
import searchIcon from "../../assets/icons/shared/globalSearch.svg";
import logoutIcon from "../../assets/icons/shared/logOut.svg";

import { styled } from "styled-components";

const HeaderContainer = styled.div((props) => ({
  width: "83%",
  height: "56px",
  marginLeft: "17%",
  display: "flex",
  position: "fixed",
  zIndex: "10",
  top: "0",
  alignItems: "center",
  backgroundColor: props.theme.colors.background.primary,
  borderBottom: `1px solid ${props.theme.colors.border.ordinary}`,
}));

const Title = styled.div(() => ({
  fontWeight: "400",
  fontSize: "1.25rem",
  paddingLeft: "5%",
  width: "30%",
}));

const GlobalSearch = styled.div((props) => ({
  height: " 30px",
  paddingLeft: "5px",
  width: "25%",
  backgroundColor: props.theme.colors.grey[700],
  borderRadius: "5px",
  display: "flex",
  alignItems: "center",
  color: "#C4C4C4",
  fontSize: "0.875rem",
  "& img": {
    paddingLeft: "5px",
    paddingRight: "5px",
    marginLeft: "auto",
    height: "20px",
  },
}));

const Container = styled.div((props) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "5.5%",
  cursor: "pointer",
  color: props.theme.colors.text.darker,
}));

const CurrentLng = styled.div((props) => ({
  "&:hover": {
    color: props.theme.colors.text.primary,
  },
}));

const LanguagesMenu = styled.div((props) => ({
  position: "absolute",
  top: "56px",
  zIndex: "10",
  backgroundColor: props.theme.colors.background.primary,
  padding: "10px",
  border: `1px solid ${props.theme.colors.border.ordinary}`,
  cursor: "pointer",
}));

const LanguagesMenuItem = styled.div((props) => ({
  padding: "10px",
  "&:hover": {
    color: props.theme.colors.text.primary,
  },
}));

const Svg = styled.svg(() => ({
  height: "30px",
  width: "30px",
}));

const SvgMode = styled(Svg)((props) => ({
  "&:hover circle": {
    fill: props.theme.colors.background.navigation,
  },
}));

const Profile = styled.div(() => ({
  display: "flex",
  justifyContent: "flex-end",
  width: "20%",
}));

const LogOut = styled(Container)(() => ({
  width: "8%",
  "& img": {
    height: "30px",
  },
}));

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

export default function Header() {
  const { status, profile } = useSelector((state) => state.header);
  const dispatch = useDispatch();

  const [headerTitle, setHeaderTitle] = useState("");
  const [id, setId] = useState("");
  const [username, setUsername] = useState("User");
  const [language, setLanguage] = useState("EN");
  const [currency, setCurrency] = useState("$");
  const [mode, setMode] = useState("light");

  const { t, i18n } = useTranslation();
  const location = useLocation();
  const languageRef = useOutsideClick(hideElement);

  const titles = renderHeaderTitles(t);
  const path = location.pathname.match(/\/(\w)*/)[0];

  useEffect(() => {
    dispatch(fetchProfileData());
  }, [dispatch]);

  useEffect(() => {
    if (status === "succeeded") {
      if (!profile) return;
      setId(profile.id);
      setUsername(profile.username);
      setLanguage(profile.language);
      setCurrency(profile.currency);
      setMode(profile.mode);
    }
  }, [status, profile]);

  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language, i18n]);

  useEffect(() => {
    setHeaderTitle(titles[path]);
  }, [path, titles]);

  return (
    <HeaderContainer>
      <Title>{headerTitle}</Title>
      <GlobalSearch>
        {t("HEADER.SEARCH_EVERYTHING")}
        <img src={searchIcon} alt="search" />
      </GlobalSearch>
      <Container
        onClick={(event) => {
          languageRef.current.classList.toggle("none");
          event.stopPropagation();
        }}
      >
        <CurrentLng>{language}</CurrentLng>
        <LanguagesMenu ref={languageRef} className="none">
          <LanguagesMenuItem
            onClick={() => {
              idbAddItem(
                { id, username, currency, language: "EN", mode },
                "profile"
              );
              dispatch(changeLanguage("EN"));
            }}
          >
            EN
          </LanguagesMenuItem>
          <LanguagesMenuItem
            onClick={() => {
              idbAddItem(
                { id, username, currency, language: "RU", mode },
                "profile"
              );
              dispatch(changeLanguage("RU"));
            }}
          >
            RU
          </LanguagesMenuItem>
        </LanguagesMenu>
      </Container>
      <Container>
        <Svg as={CurrencyDollarIcon} />
      </Container>
      <Container
        onClick={() => {
          setMode(mode === "light" ? "dark" : "light");
          idbAddItem(
            {
              id,
              username,
              currency,
              language,
              mode: mode === "light" ? "dark" : "light",
            },
            "profile"
          );
          dispatch(changeMode(mode === "light" ? "dark" : "light"));
        }}
      >
        <SvgMode as={mode === "light" ? LightModeIcon : DarkModeIcon} />
      </Container>
      <Profile>{username}</Profile>
      <LogOut>
        <img src={logoutIcon} alt="logOut" />
      </LogOut>
    </HeaderContainer>
  );
}
