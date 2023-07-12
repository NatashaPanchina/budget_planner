import React from "react";
import { NavLink, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { addNewCategory } from "../../../actions/Actions.js";

import CategoryForm from "./CategoryForm.js";

import { ReactComponent as BackIcon } from "../../../assets/icons/shared/back.svg";
import { ReactComponent as ExpenseIcon } from "../../../assets/icons/shared/expense.svg";
import { ReactComponent as IncomeIcon } from "../../../assets/icons/shared/income.svg";

import {
  AddFormContainer,
  AddFormHeader,
  AddFormHeaderTitles,
  BackLink,
  BackLinkSvg,
} from "../../../theme/global.js";
import { css, styled } from "styled-components";
import { pages } from "../../../utils/constants/pages.js";

const TitleLink = styled(NavLink)((props) => ({
  height: 60,
  width: "33.3%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  boxSizing: "border-box",
  color: props.theme.colors.text.darker,
}));

const TitleLinkSvg = styled.svg((props) => ({
  height: 23,
  marginRight: props.theme.spacing(1.5),
}));

const AddCategoryTitle = styled(TitleLink)((props) => {
  switch (props.$titleType) {
    case "income":
      return css(() => ({
        "& svg rect": {
          fill: "url(#not_active)",
        },
        "&:hover": {
          color: props.theme.colors.income,
        },
        "&:hover svg rect": {
          fill: "url(#income_active)",
        },
        "&.active": {
          borderBottom: "2px solid #6D73FF",
          color: props.theme.colors.income,
        },
        "&.active svg rect": {
          fill: "url(#income_active)",
        },
      }));
    case "expense":
      return css(() => ({
        "& svg rect": {
          fill: "url(#not_active)",
        },
        "&:hover": {
          color: props.theme.colors.expense,
        },
        "&:hover svg rect": {
          fill: "url(#expense_active)",
        },
        "&.active": {
          borderBottom: "2px solid #6D73FF",
          color: props.theme.colors.expense,
        },
        "&.active svg rect": {
          fill: "url(#expense_active)",
        },
      }));
    default:
      return css(() => ({
        "& svg rect": {
          fill: "url(#not_active)",
        },
        "&:hover": {
          color: props.theme.colors.expense,
        },
        "&:hover svg rect": {
          fill: "url(#expense_active)",
        },
        "&.active": {
          borderBottom: "2px solid #6D73FF",
          color: props.theme.colors.expense,
        },
        "&.active svg rect": {
          fill: "url(#expense_active)",
        },
      }));
  }
});

export default function AddCategory() {
  const { t } = useTranslation();

  const { categoryType } = useParams();

  return (
    <AddFormContainer>
      <AddFormHeader>
        <BackLink to={pages.categories[`${categoryType}s`]}>
          <BackLinkSvg as={BackIcon} />
        </BackLink>
        <AddFormHeaderTitles>
          <AddCategoryTitle
            to={pages.categories.add.expense}
            $titleType="expense"
          >
            <TitleLinkSvg as={ExpenseIcon} /> {t("ADD_CATEGORY.EXPENSE")}
          </AddCategoryTitle>
          <AddCategoryTitle
            to={pages.categories.add.income}
            $titleType="income"
          >
            <TitleLinkSvg as={IncomeIcon} /> {t("ADD_CATEGORY.INCOME")}
          </AddCategoryTitle>
        </AddFormHeaderTitles>
      </AddFormHeader>
      <CategoryForm addNewCategory={addNewCategory} />
    </AddFormContainer>
  );
}
