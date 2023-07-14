import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { idbAddItem } from '../../../indexedDB/IndexedDB.js';
import { categoryIcons } from '../../../utils/constants/icons.js';
import {
  renderNotes,
  createFilterType,
  filterCategories,
} from '../utils/index.js';

import searchIcon from '../../../assets/icons/shared/search.svg';
import { ReactComponent as PlusIcon } from '../../../assets/icons/shared/plus.svg';
import { ReactComponent as AddIcon } from '../../../assets/icons/shared/add.svg';
import { ReactComponent as EditIcon } from '../../../assets/icons/shared/edit.svg';
import { ReactComponent as ArchiveIcon } from '../../../assets/icons/shared/archive.svg';

import { styled } from 'styled-components';
import {
  AddButton,
  AddButtonSvg,
  Search,
  SearchImg,
  SearchInput,
} from '../../../theme/global.js';
import { pages } from '../../../utils/constants/pages.js';

const CategoriesListItem = styled.div((props) => ({
  width: '100%',
  paddingTop: props.theme.spacing(2),
  paddingBottom: props.theme.spacing(2),
  marginBottom: props.theme.spacing(4),
  background: props.theme.colors.background.primary,
  border: `1px solid ${props.theme.colors.border.item}`,
  boxShadow: `0px 4px 10px ${props.theme.colors.boxShadow}`,
  borderRadius: props.theme.borderRadius,
  display: 'grid',
  gridTemplateAreas: '"desc" "notes"',
  gridTemplateColumns: '1fr',
  gap: '10px 5%',
  alignItems: 'center',
  position: 'relative',
}));

const CategoriesDescription = styled.div(() => ({
  gridArea: 'desc',
  display: 'flex',
  alignItems: 'center',
}));

const CategoriesSvg = styled.svg((props) => ({
  marginLeft: props.theme.spacing(5),
  marginRight: props.theme.spacing(5),
}));

const EditButtons = styled.div(() => ({
  position: 'absolute',
  top: 16,
  right: 0,
}));

const EditButtonSvg = styled.svg((props) => ({
  height: 15,
  marginLeft: props.theme.spacing(2),
  marginRight: props.theme.spacing(2),
  cursor: 'pointer',
  '& path': {
    fill: props.theme.colors.svg.pending,
  },
  '&:hover path': {
    fill: props.theme.colors.svg.hover,
  },
}));

function CategoriesList({ notArchivedCategories, archiveCategory }) {
  const dispatch = useDispatch();

  const { t } = useTranslation();

  const filterType = createFilterType(useParams().filterType);

  return (
    <React.Fragment>
      <Search>
        <SearchInput
          type="text"
          placeholder={t('CATEGORIES.SEARCH_CATEGORY')}
        ></SearchInput>
        <SearchImg src={searchIcon} alt="search" />
      </Search>

      <AddButton
        to={pages.categories.add[filterType === 'all' ? 'expense' : filterType]}
      >
        <AddButtonSvg as={PlusIcon} />
        {t('CATEGORIES.ADD_CATEGORY')}
      </AddButton>

      {filterCategories(filterType, notArchivedCategories).map(
        (category, index) => {
          let Icon = categoryIcons[category.icon];
          return (
            <CategoriesListItem key={category.id}>
              <CategoriesDescription>
                <CategoriesSvg
                  width="38"
                  height="38"
                  viewBox="0 0 38 38"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    cx="19"
                    cy="19"
                    r="19"
                    fill={`url(#${index})`}
                  ></circle>
                  <Icon height="24" width="24" x="7" y="7" />
                  <defs>
                    <linearGradient
                      id={index}
                      x1="0"
                      y1="0"
                      x2="38"
                      y2="38"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor={category.color[0]} />
                      <stop offset="1" stopColor={category.color[1]} />
                    </linearGradient>
                  </defs>
                </CategoriesSvg>
                {category.description}
              </CategoriesDescription>
              <EditButtons>
                <EditButtonSvg as={AddIcon} />
                <Link to={`${pages.categories.info.main}/${category.id}`}>
                  <EditButtonSvg as={EditIcon} />
                </Link>
                <EditButtonSvg
                  as={ArchiveIcon}
                  onClick={() => {
                    dispatch(archiveCategory(category.id));
                    idbAddItem({ ...category, archived: true }, 'categories');
                  }}
                />
              </EditButtons>
              {renderNotes(category.notes)}
            </CategoriesListItem>
          );
        },
      )}
    </React.Fragment>
  );
}

CategoriesList.propTypes = {
  notArchivedCategories: PropTypes.array,
  archiveCategory: PropTypes.func,
};

export default CategoriesList;
