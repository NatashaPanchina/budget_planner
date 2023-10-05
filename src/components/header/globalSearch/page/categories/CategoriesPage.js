import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  CategoriesDescription,
  CategoriesListItem,
  CategoriesSvg,
  DeleteMenuItem,
  DeleteSvg,
  EditButtonSvg,
  EditButtons,
  EditLinkContainer,
  FlexContainer,
  ListItemContainer,
} from '../../../../categories/Categories.styled';
import { Link } from 'react-router-dom';
import { pages } from '../../../../../utils/constants/pages';
import { categoryIcons } from '../../../../../utils/constants/icons';
import { renderNotes } from '../../../../categories/utils';
import { MobItemButtonSvg, ToggleMenu } from '../../../../../theme/global';
import { MenuItem } from '@mui/material';
import { idbAddItem } from '../../../../../indexedDB/IndexedDB';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { archiveCategory } from '../../../../../actions/Actions';

import { ReactComponent as AddIcon } from '../../../../../assets/icons/shared/add.svg';
import { ReactComponent as EditIcon } from '../../../../../assets/icons/shared/edit.svg';
import { ReactComponent as ArchiveIcon } from '../../../../../assets/icons/shared/archive.svg';
import { ReactComponent as ToggleEditIcon } from '../../../../../assets/icons/shared/toggleEdit.svg';

function CategoriesPage({ categories, query }) {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [clickedCategory, setClickedCategory] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  return categories.length ? (
    categories.map((category, index) => {
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
                      fill={`url(#category${index})`}
                    ></circle>
                    <Icon height="24" width="24" x="7" y="7" />
                    <defs>
                      <linearGradient
                        id={`category${index}`}
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
    })
  ) : (
    <div>
      {t('SEARCH.NO_RESULTS')} {query}
    </div>
  );
}

CategoriesPage.propTypes = {
  categories: PropTypes.array,
  query: PropTypes.string,
};

export default CategoriesPage;
