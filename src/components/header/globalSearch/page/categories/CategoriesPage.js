import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  CategoriesDescription,
  CategoriesListItem,
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
import CategorySvg from '../../../../shared/CategorySvg';

function CategoriesPage({ categories, query }) {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [clickedCategory, setClickedCategory] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  return categories.length ? (
    categories.map((category, index) => {
      return (
        <React.Fragment key={category.id}>
          <ListItemContainer>
            <Link to={`${pages.categories.info.main}/${category.id}`}>
              <CategoriesListItem>
                <CategoriesDescription>
                  <CategorySvg
                    category={category}
                    fillName={`category${index}`}
                  />
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
