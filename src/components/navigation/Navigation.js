import React from "react";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { ReactComponent as LogoIcon } from "../../assets/icons/navigation/logo.svg";
import { ReactComponent as TransactionsIcon } from "../../assets/icons/navigation/transactions.svg";
import { ReactComponent as CashIcon } from "../../assets/icons/navigation/cash.svg";
import { ReactComponent as NewTransactionIcon } from "../../assets/icons/navigation/newTransaction.svg";
import { ReactComponent as CategoriesIcon } from "../../assets/icons/navigation/categories.svg";
import { ReactComponent as AnalysisIcon } from "../../assets/icons/navigation/analysis.svg";
import { ReactComponent as MoreIcon } from "../../assets/icons/navigation/more.svg";

import { styled } from "styled-components";

const NavigationContainer = styled.div((props) => ({
  width: "17%",
  height: "100vh",
  position: "fixed",
  top: "0",
  zIndex: "20",
  borderRight: `1px solid ${props.theme.colors.border.ordinary}`,
  backgroundColor: props.theme.colors.background.primary,
}));

const LogoContainer = styled.div((props) => ({
  display: "flex",
  alignItems: "center",
  height: "56px",
  background: `linear-gradient(109.86deg, ${props.theme.colors.main.purple} -2.35%, ${props.theme.colors.main.violet} 81.35%)`,
}));

const Logo = styled.svg(() => ({
  height: "45px",
}));

const Nav = styled.nav(() => ({
  width: "90%",
  marginTop: "40px",
  marginLeft: "auto",
  marginRight: "auto",
  fontSize: "0.9375rem",
  "& div:nth-child(3) a:hover svg path": {
    fill: "#fff",
  },
  "& div:nth-child(3) a.active svg path": {
    fill: "#fff",
  },
}));

const LinkContainer = styled.div(() => ({
  height: "50px",
}));

const Svg = styled.svg(() => ({
  width: "23px",
  height: "23px",
  marginRight: "15px",
  marginLeft: "15px",
}));

const NewTransactionSvg = styled.svg(() => ({
  width: "33px",
  marginLeft: "10px",
  marginRight: "10px",
  filter: "drop-shadow(0px 2px 4px rgba(109, 115, 255, 0.5))",
  "& path": {
    fill: "#fff",
  },
  "&:hover g path": {
    fill: "#fff",
  },
}));

const Link = styled(NavLink)((props) => ({
  display: "flex",
  color: props.theme.colors.text.darker,
  height: "45px",
  width: "inherit",
  alignItems: "center",
  "&:hover": {
    color: props.theme.colors.main.violet,
    backgroundColor: props.theme.colors.background.navigation,
    borderRadius: "5px",
  },
  "&:hover svg path": {
    fill: props.theme.colors.main.violet,
  },
  "&.active": {
    color: props.theme.colors.main.violet,
    backgroundColor: props.theme.colors.background.navigation,
    borderRadius: "5px",
  },
  "&.active svg path": {
    fill: props.theme.colors.main.violet,
  },
}));

const MoreContainer = styled.div((props) => ({
  display: "flex",
  color: props.theme.colors.text.darker,
  alignItems: "center",
}));

export default function Navigation() {
  const { t } = useTranslation();
  return (
    <NavigationContainer>
      <LogoContainer>
        <Logo as={LogoIcon} />
      </LogoContainer>
      <Nav>
        <LinkContainer>
          <Link to="/transactions">
            <Svg as={TransactionsIcon} />
            {t("NAVIGATION.TRANSACTIONS")}
          </Link>
        </LinkContainer>
        <LinkContainer>
          <Link to="/cash">
            <Svg as={CashIcon} />
            {t("NAVIGATION.CASH")}
          </Link>
        </LinkContainer>
        <LinkContainer>
          <Link to="/newTransaction">
            <NewTransactionSvg as={NewTransactionIcon} />
            {t("NAVIGATION.NEW_TRANSACTION")}
          </Link>
        </LinkContainer>
        <LinkContainer>
          <Link to="/categories">
            <Svg as={CategoriesIcon} />
            {t("NAVIGATION.CATEGORIES")}
          </Link>
        </LinkContainer>
        <LinkContainer>
          <Link to="/analysis">
            <Svg as={AnalysisIcon} />
            {t("NAVIGATION.ANALYSIS")}
          </Link>
        </LinkContainer>
        <MoreContainer>
          <Svg as={MoreIcon} />
          {t("NAVIGATION.MORE")}
        </MoreContainer>
      </Nav>
    </NavigationContainer>
  );
}
