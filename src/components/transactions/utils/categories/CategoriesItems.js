import React from 'react';
import PropTypes from 'prop-types';
import { categoryIcons } from '../../../../utils/constants/icons';
import { InputAdornment, MenuItem, styled } from '@mui/material';
import { ReactComponent as AdjustmentIcon } from '../../../../assets/icons/shared/adjustment.svg';
import { useTranslation } from 'react-i18next';
import {
  AddButtonSvg,
  CancelSearchSvg,
  SearchField,
  SelectHeader,
  SelectHeaderButton,
  TextInputField,
} from '../../../../theme/global';
import { ReactComponent as SearchIcon } from '../../../../assets/icons/shared/search.svg';
import { ReactComponent as CancelSearchIcon } from '../../../../assets/icons/shared/cancelSearch.svg';
import { ReactComponent as PlusIcon } from '../../../../assets/icons/shared/plus.svg';

const CategoriesMenuItem = styled(MenuItem)((props) => ({
  borderRadius: props.theme.borderRadius,
  backgroundColor: props.theme.colors.background.primary,
}));

const InfoContainer = styled('div')((props) => ({
  display: 'flex',
  alignItems: 'center',
  color: props.theme.colors.text.primary,
}));

const CategoriesItemSvg = styled('svg')((props) => ({
  width: 34,
  height: 34,
  marginRight: props.theme.spacing(3),
}));

function CategoriesItems({
  categories,
  category,
  setCategory,
  setOpenCategoryDialog,
}) {
  const { t } = useTranslation();

  return (
    <TextInputField
      margin="normal"
      required
      select
      label={t('INFO_TRANSACTION.CATEGORY')}
      value={category}
      onChange={(event) => setCategory(event.target.value)}
    >
      <SelectHeader>
        {t('INFO_TRANSACTION.AVAILABLE_CATEGORIES')}
        <SelectHeaderButton>
          <AddButtonSvg
            onClick={() => setOpenCategoryDialog(true)}
            as={PlusIcon}
          />
        </SelectHeaderButton>
      </SelectHeader>
      <SearchField
        placeholder={t('INFO_TRANSACTION.SEARCH_CATEGORY')}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <CancelSearchSvg as={CancelSearchIcon} />
            </InputAdornment>
          ),
        }}
      />
      {categories.length === 0 ? (
        <div>{t('INFO_TRANSACTION.NO_CATEGORIES')}</div>
      ) : (
        categories.map((category, index) => {
          let Icon = AdjustmentIcon;
          if (category.description !== 'Balance adjustment') {
            Icon = categoryIcons[category.icon];
          }
          return (
            <CategoriesMenuItem key={category.id} value={category.id}>
              <InfoContainer>
                <CategoriesItemSvg
                  viewBox="0 0 34 34"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    cx="17"
                    cy="17"
                    r="17"
                    fill={`url(#${index})`}
                  ></circle>
                  <Icon height="20" width="20" x="7" y="7" />
                  <defs>
                    <linearGradient
                      id={index}
                      x1="0"
                      y1="0"
                      x2="34"
                      y2="34"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor={category.color[0]} />
                      <stop offset="1" stopColor={category.color[1]} />
                    </linearGradient>
                  </defs>
                </CategoriesItemSvg>
                {category.description}
              </InfoContainer>
            </CategoriesMenuItem>
          );
        })
      )}
    </TextInputField>
  );
}

CategoriesItems.propTypes = {
  categories: PropTypes.array,
  category: PropTypes.string,
  setCategory: PropTypes.func,
  setOpenCategoryDialog: PropTypes.func,
};

export default CategoriesItems;
