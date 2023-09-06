import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { idbAddItem } from '../../../indexedDB/IndexedDB.js';
import { categoryIcons } from '../../../utils/constants/icons.js';
import { renderNotes, filterCategories } from '../utils/index.js';

import { ReactComponent as SearchIcon } from '../../../assets/icons/shared/search.svg';
import { ReactComponent as CancelSearchIcon } from '../../../assets/icons/shared/cancelSearch.svg';
import { ReactComponent as AddIcon } from '../../../assets/icons/shared/add.svg';
import { ReactComponent as EditIcon } from '../../../assets/icons/shared/edit.svg';
import { ReactComponent as ArchiveIcon } from '../../../assets/icons/shared/archive.svg';
import { ReactComponent as ToggleEditIcon } from '../../../assets/icons/shared/toggleEdit.svg';

import {
  CancelSearchSvg,
  MobItemButtonSvg,
  SearchField,
  ToggleMenu,
} from '../../../theme/global.js';
import {
  CategoriesListItem,
  CategoriesDescription,
  CategoriesSvg,
  EditButtons,
  EditButtonSvg,
  ListItemContainer,
  FlexContainer,
  EditLinkContainer,
  DeleteMenuItem,
  DeleteSvg,
} from '../Categories.styled.js';
import { pages } from '../../../utils/constants/pages.js';
import { InputAdornment, MenuItem } from '@mui/material';

function CategoriesList({
  notArchivedCategories,
  archiveCategory,
  filterType,
}) {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [clickedCategory, setClickedCategory] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  return (
    <>
      <SearchField
        placeholder={t('CATEGORIES.SEARCH_CATEGORY')}
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
      {filterCategories(filterType, notArchivedCategories).map(
        (category, index) => {
          let Icon = categoryIcons[category.icon];
          return (
            <React.Fragment key={category.id}>
              <ListItemContainer>
                <Link to={`${pages.categories.info.main}/${category.id}`}>
                  <CategoriesListItem>
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
                    {renderNotes(category.notes)}
                  </CategoriesListItem>
                </Link>
                <EditButtons>
                  <ToggleMenu
                    anchorEl={anchorEl}
                    open={open}
                    onClose={() => setAnchorEl(null)}
                  >
                    <MenuItem onClick={() => setAnchorEl(null)}>
                      <FlexContainer>
                        <EditButtonSvg as={AddIcon} />
                        {t('CATEGORIES.ADD_SUB')}
                      </FlexContainer>
                    </MenuItem>
                    <MenuItem onClick={() => setAnchorEl(null)}>
                      <EditLinkContainer
                        to={`${pages.categories.info.main}/${clickedCategory.id}`}
                      >
                        <EditButtonSvg as={EditIcon} />
                        {t('CATEGORIES.EDIT')}
                      </EditLinkContainer>
                    </MenuItem>
                    <DeleteMenuItem onClick={() => setAnchorEl(null)}>
                      <FlexContainer
                        onClick={() => {
                          dispatch(archiveCategory(clickedCategory.id));
                          idbAddItem(
                            { ...clickedCategory, archived: true },
                            'categories',
                          );
                        }}
                      >
                        <DeleteSvg as={ArchiveIcon} />
                        {t('CATEGORIES.ARCHIVE')}
                      </FlexContainer>
                    </DeleteMenuItem>
                  </ToggleMenu>
                  <MobItemButtonSvg
                    as={ToggleEditIcon}
                    onClick={(event) => {
                      setClickedCategory(category);
                      setAnchorEl(event.currentTarget);
                    }}
                  />
                </EditButtons>
              </ListItemContainer>
            </React.Fragment>
          );
        },
      )}
    </>
  );
}

CategoriesList.propTypes = {
  notArchivedCategories: PropTypes.array,
  archiveCategory: PropTypes.func,
  filterType: PropTypes.string,
};

export default CategoriesList;
