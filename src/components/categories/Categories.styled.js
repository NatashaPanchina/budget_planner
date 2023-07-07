import { styled } from "styled-components";
import { NavLink } from "react-router-dom";

export const CategoroiesContainer = styled.div(() => ({
  marginTop: "56px",
  marginLeft: "22%",
  marginRight: "5%",
  display: "flex",
  justifyContent: "space-between",
}));

export const MoreInformationContainer = styled.div(() => ({
  width: "20%",
  minWidth: "170px",
  height: "100vh",
  marginRight: "20px",
  position: "fixed",
}));

export const BarChartInfo = styled.div(() => ({
  marginTop: "20px",
  textAlign: "center",
}));

export const TotalCategoriesCount = styled.div((props) => ({
  marginTop: "10px",
  marginBottom: "15px",
  color: props.theme.colors.main.violet,
}));

export const BarChartInfoItem = styled.div((props) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: "80px",
  width: "90%",
  marginBottom: "15px",
  marginLeft: "auto",
  marginRight: "auto",
  background: props.theme.colors.background.primary,
  border: `1px solid ${props.theme.colors.border.item}`,
  boxShadow: `0px 4px 10px ${props.theme.colors.boxShadow}`,
  borderRadius: "10px",
  textAlign: "left",
  fontSize: "0.875rem",
}));

export const Img = styled.img(() => ({
  height: "30px",
  marginLeft: "10px",
  marginRight: "10px",
}));

export const ExpensesCategoriesCount = styled.div((props) => ({
  fontSize: "1rem",
  color: props.theme.colors.expense,
}));

export const IncomesCategoriesCount = styled.div((props) => ({
  fontSize: "1rem",
  color: props.theme.colors.income,
}));

export const MainInformationContainer = styled.div(() => ({
  marginLeft: "30%",
  width: "70%",
}));

export const Header = styled.div(() => ({
  display: "flex",
  position: "relative",
  alignItems: "center",
  justifyContent: "flex-end",
  height: "50px",
}));

export const HeaderTitle = styled.div(() => ({
  marginRight: "auto",
}));

export const Filter = styled.div((props) => ({
  display: "flex",
  alignItems: "center",
  backgroundColor: props.theme.colors.background.primary,
  boxShadow: `0px 4px 10px ${props.theme.colors.boxShadow}`,
  borderRadius: "15px",
  height: "fit-content",
  padding: "7px 10px",
  marginRight: "10%",
  fontSize: "0.875rem",
  color: props.theme.colors.text.darker,
}));

export const Svg = styled.svg(() => ({
  height: "18px",
  width: "18px",
  margin: "0px 5px",
}));

export const CategoriesTitleContainer = styled.div((props) => ({
  display: "flex",
  marginBottom: "15px",
  borderBottom: `1px solid ${props.theme.colors.border.title}`,
  position: "sticky",
  top: "56px",
  zIndex: "9",
  backgroundColor: props.theme.colors.background.body,
}));

export const CategoriesTitleLink = styled(NavLink)((props) => ({
  height: "50px",
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
    borderBottom: "2px solid #6d73ff",
  },
}));
