import { NavLink } from "react-router-dom";
import { ColorsContainer } from "../../theme/global";
import { styled } from "styled-components";

export const CashContainer = styled.div((props) => ({
  marginTop: props.theme.spacing(14),
  marginLeft: "20%",
  marginRight: "5%",
  display: "flex",
  justifyContent: "space-between",
}));

export const MoreInformationContainer = styled.div((props) => ({
  width: "20%",
  minWidth: 200,
  height: "80vh",
  paddingTop: props.theme.spacing(2),
  marginTop: props.theme.spacing(5),
  marginRight: props.theme.spacing(5),
  position: "fixed",
  zIndex: 10,
  border: `1px solid ${props.theme.colors.border.item}`,
  borderRadius: props.theme.borderRadius,
  textAlign: "center",
  backgroundColor: props.theme.colors.background.primary,
  boxShadow: `0px 4px 10px ${props.theme.colors.boxShadow}`,
}));

export const MainInformationContainer = styled.div(() => ({
  marginLeft: "32%",
  width: "75%",
}));

export const Header = styled.div(() => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  position: "relative",
  height: 60,
}));

export const HeaderTitle = styled.div(() => ({
  marginRight: "auto",
}));

export const CashTitleContainer = styled.div((props) => ({
  display: "flex",
  marginBottom: props.theme.spacing(4),
  borderBottom: `1px solid ${props.theme.colors.border.title}`,
  position: "sticky",
  top: props.theme.spacing(14),
  zIndex: 9,
  backgroundColor: props.theme.colors.background.body,
}));

export const CashTitleLink = styled(NavLink)((props) => ({
  height: 50,
  width: "25%",
  fontSize: "0.9375rem",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  color: props.theme.colors.text.darker,
  "&:hover": {
    color: props.theme.colors.text.primary,
  },
  "&.active": {
    color: props.theme.colors.text.primary,
    borderBottom: `2px solid ${props.theme.colors.main.violet}`,
  },
}));

export const Card = styled.div((props) => ({
  height: 173,
  width: 272,
  borderRadius: props.theme.borderRadius,
  background: `url(${props.$cardBackground}) 0% 0% / cover no-repeat, linear-gradient(90deg, ${props.$from} 0%, ${props.$to} 100%)`,
  boxShadow: `0px 4px 10px ${props.theme.colors.boxShadow}`,
  color: props.theme.colors.white,
}));

export const CardView = styled(Card)((props) => ({
  marginLeft: "auto",
  marginRight: "auto",
  marginBottom: props.theme.spacing(8),
}));

export const CardName = styled.div((props) => ({
  fontSize: "0.875rem",
  width: "100%",
  height: "10%",
  paddingTop: props.theme.spacing(2),
  paddingLeft: props.theme.spacing(4),
}));

export const CardBalanceContainer = styled.div(() => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "74%",
}));

export const CardBalance = styled.div(() => ({
  fontSize: "1.375rem",
}));

export const CurrentBalance = styled.div(() => ({
  fontSize: "0.75rem",
}));

export const CashColorsContainer = styled(ColorsContainer)(() => ({
  top: 200,
  right: 0,
}));

export const CardButton = styled.div((props) => ({
  display: "flex",
  alignItems: "center",
  marginTop: props.theme.spacing(6),
  marginBottom: props.theme.spacing(6),
  color: props.theme.colors.svg.pending,
  fill: props.theme.colors.svg.pending,
  cursor: "pointer",
  "&:hover": {
    color: props.theme.colors.svg.hover,
    fill: props.theme.colors.svg.hover,
  },
  "&:hover a": {
    color: props.theme.colors.svg.hover,
    fill: props.theme.colors.svg.hover,
  },
}));

export const CardButtonSvg = styled.svg((props) => ({
  height: 18,
  width: 18,
  marginLeft: props.theme.spacing(7),
  marginRight: props.theme.spacing(2),
  fill: "inherit",
  "& path": {
    fill: "inherit",
  },
}));

export const NumericInput = styled.input((props) => ({
  color: props.theme.colors.text.primary,
  fontSize: "1rem",
  backgroundColor: props.theme.colors.background.primary,
}));
