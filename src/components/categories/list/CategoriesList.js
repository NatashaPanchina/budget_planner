import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { idbAddItem } from '../../../indexedDB/IndexedDB.js';
import { renderNotes } from '../utils/index.js';

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
import { useCategoriesSearch } from '../../../hooks/useSearch.js';
import NoResultsFound from '../../noResults/NoResultsFound.js';
import CategorySvg from '../../shared/CategorySvg.js';

function CategoriesList({ categories, archiveCategory }) {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [clickedCategory, setClickedCategory] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [query, setQuery] = useState('');

  const searchData = useCategoriesSearch(query, categories, false);
  return (
    <>
      <SearchField
        placeholder={t('CATEGORIES.SEARCH_CATEGORY')}
        value={query}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
          endAdornment: query ? (
            <InputAdornment position="end" onClick={() => setQuery('')}>
              <CancelSearchSvg as={CancelSearchIcon} />
            </InputAdornment>
          ) : null,
        }}
        onChange={(event) => setQuery(event.target.value)}
        autoComplete="off"
      />
      {searchData.length ? (
        searchData.map((category, index) => {
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
        <NoResultsFound query={query} />
      )}
      {}
    </>
  );
}

CategoriesList.propTypes = {
  categories: PropTypes.array,
  archiveCategory: PropTypes.func,
  filterType: PropTypes.string,
};

export default CategoriesList;
