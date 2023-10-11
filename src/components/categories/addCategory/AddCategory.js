import React from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { addNewCategory } from '../../../actions/Actions.js';

import CategoryForm from './CategoryForm.js';

import { ReactComponent as BackIcon } from '../../../assets/icons/shared/back.svg';
import { ReactComponent as ExpenseIcon } from '../../../assets/icons/shared/newExpense.svg';
import { ReactComponent as IncomeIcon } from '../../../assets/icons/shared/newIncome.svg';

import {
  AddContainer,
  AddFormHeader,
  AddFormHeaderTitles,
  BackLink,
  BackLinkSvg,
  MobHeaderTitle,
} from '../../../theme/global.js';
import { pages } from '../../../utils/constants/pages.js';
import {
  Back,
  BackSvg,
  TitleLinkSvg,
  AddCategoryTitle,
} from '../AddCategory.styled.js';
import { Grid } from '@mui/material';

export default function AddCategory() {
  const { t } = useTranslation();

  const { categoryType } = useParams();

  return (
    <Grid item xs={12}>
      <AddContainer>
        <Back to={pages.categories[`${categoryType}s`]}>
          <BackSvg as={BackIcon} />
        </Back>
        <MobHeaderTitle $titleType={categoryType}>
          {t('ADD_CATEGORY.TITLE')}
        </MobHeaderTitle>
        <AddFormHeader>
          <BackLink to={pages.categories[`${categoryType}s`]}>
            <BackLinkSvg as={BackIcon} />
          </BackLink>
          <AddFormHeaderTitles>
            <AddCategoryTitle
              to={pages.categories.add.expense}
              $titleType="expense"
            >
              <TitleLinkSvg as={ExpenseIcon} /> {t('ADD_CATEGORY.EXPENSE')}
            </AddCategoryTitle>
            <AddCategoryTitle
              to={pages.categories.add.income}
              $titleType="income"
            >
              <TitleLinkSvg as={IncomeIcon} /> {t('ADD_CATEGORY.INCOME')}
            </AddCategoryTitle>
          </AddFormHeaderTitles>
        </AddFormHeader>
        <CategoryForm addNewCategory={addNewCategory} />
      </AddContainer>
    </Grid>
  );
}
