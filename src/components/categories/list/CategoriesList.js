import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { idbAddItem } from '../../../indexedDB/IndexedDB.js';
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
  InfoDialog,
  NoResultsContainer,
  NoResults,
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
  AddSvg,
  Add,
  AddText,
} from '../Categories.styled.js';
import { Dialog, InputAdornment, MenuItem } from '@mui/material';
import { useCategoriesSearch } from '../../../hooks/useSearch.js';
import NoResultsFound from '../../noResults/NoResultsFound.js';
import CategorySvg from '../../shared/CategorySvg.js';
import {
  archiveCategory,
  updateCategoriesFilters,
} from '../../../actions/Actions.js';
import InfoCategory from '../infoCategory/InfoCategory.js';
import ArchiveAlert from '../../alerts/ArchiveAlert.js';
import Notes from '../../shared/Notes.js';
import FilterItems from '../../shared/FilterItems.js';

function CategoriesList({ categories, setOpenAddDialog }) {
  const filters = useSelector((state) => state.categories.filters);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [clickedCategory, setClickedCategory] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [query, setQuery] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const searchData = useCategoriesSearch(query, categories, false, filters);
  const [openDelAlert, setOpenDelAlert] = useState(false);
  const archiveCallback = () => {
    if (!clickedCategory) return;
    dispatch(archiveCategory(clickedCategory.id));
    idbAddItem({ ...clickedCategory, archived: true }, 'categories');
  };
  const isEmpty = () => {
    if (categories.length === 0) return true;
    if (query === '' && searchData.length === 0) return true;
    return false;
  };

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
      <FilterItems filters={filters} updateFilters={updateCategoriesFilters} />
      <InfoDialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <InfoCategory
          clickedCategory={clickedCategory.id}
          categories={categories}
          setOpenDialog={setOpenDialog}
        />
      </InfoDialog>
      {isEmpty() ? (
        <NoResultsContainer>
          <NoResults>
            <div>{t('CATEGORIES.NO_CATEGORIES')}</div>
            <Add onClick={() => setOpenAddDialog(true)}>
              <AddSvg as={AddIcon} />
              <AddText>Add</AddText>
            </Add>
          </NoResults>
        </NoResultsContainer>
      ) : searchData.length ? (
        searchData.map((category) => {
          return (
            <React.Fragment key={category.id}>
              <ListItemContainer>
                <CategoriesListItem
                  onClick={() => {
                    setClickedCategory(category);
                    setOpenDialog(true);
                  }}
                >
                  <CategoriesDescription>
                    <CategorySvg
                      category={category}
                      fillName={`category${category.id}`}
                    />
                    {category.description}
                  </CategoriesDescription>
                  <Notes notes={category.notes} />
                </CategoriesListItem>
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
                    <MenuItem
                      onClick={() => {
                        setAnchorEl(null);
                        setOpenDialog(true);
                      }}
                    >
                      <EditLinkContainer>
                        <EditButtonSvg as={EditIcon} />
                        {t('CATEGORIES.EDIT')}
                      </EditLinkContainer>
                    </MenuItem>
                    <DeleteMenuItem
                      onClick={() => {
                        setAnchorEl(null);
                        setOpenDelAlert(true);
                      }}
                    >
                      <FlexContainer>
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
      <Dialog open={openDelAlert} onClose={() => setOpenDelAlert(false)}>
        <ArchiveAlert
          setOpen={setOpenDelAlert}
          archiveCallback={archiveCallback}
          type="CATEGORY"
        />
      </Dialog>
    </>
  );
}

CategoriesList.propTypes = {
  categories: PropTypes.array,
  setOpenAddDialog: PropTypes.func,
};

export default CategoriesList;
