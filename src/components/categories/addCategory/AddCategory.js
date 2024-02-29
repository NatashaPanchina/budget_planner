import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import CategoryForm from './CategoryForm.js';
import {
  AddFormHeader,
  AddFormHeaderTitles,
  MobHeaderTitle,
} from '../../../theme/global.js';
import { AddCategoryTitle } from '../AddCategory.styled.js';
import { createFilterType } from '../utils/index.js';

function AddCategory({ setOpenDialog }) {
  const { t } = useTranslation();
  const type = createFilterType(useParams().filterType);
  const [categoryType, setCategoryType] = useState(
    type === 'all' ? 'expense' : type,
  );

  return (
    <>
      <MobHeaderTitle $titleType={categoryType}>
        {t('ADD_CATEGORY.TITLE')}
      </MobHeaderTitle>
      <AddFormHeader>
        <AddFormHeaderTitles>
          <AddCategoryTitle
            $isActive={categoryType === 'expense'}
            onClick={() => setCategoryType('expense')}
          >
            {t('ADD_CATEGORY.EXPENSE')}
          </AddCategoryTitle>
          <AddCategoryTitle
            $isActive={categoryType === 'income'}
            onClick={() => setCategoryType('income')}
          >
            {t('ADD_CATEGORY.INCOME')}
          </AddCategoryTitle>
        </AddFormHeaderTitles>
      </AddFormHeader>
      <CategoryForm type={categoryType} setOpenDialog={setOpenDialog} />
    </>
  );
}

AddCategory.propTypes = {
  setOpenDialog: PropTypes.func,
};

export default AddCategory;
