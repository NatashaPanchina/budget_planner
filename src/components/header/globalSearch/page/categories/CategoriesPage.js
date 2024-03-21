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
import {
  InfoDialog,
  MobItemButtonSvg,
  ToggleMenu,
} from '../../../../../theme/global';
import { Dialog, MenuItem } from '@mui/material';
import { idbAddItem } from '../../../../../indexedDB/IndexedDB';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { archiveCategory } from '../../../../../actions/Actions';
import { ReactComponent as AddIcon } from '../../../../../assets/icons/shared/add.svg';
import { ReactComponent as EditIcon } from '../../../../../assets/icons/shared/edit.svg';
import { ReactComponent as ArchiveIcon } from '../../../../../assets/icons/shared/archive.svg';
import { ReactComponent as ToggleEditIcon } from '../../../../../assets/icons/shared/toggleEdit.svg';
import CategorySvg from '../../../../shared/CategorySvg';
import InfoCategory from '../../../../categories/infoCategory/InfoCategory';
import ArchiveAlert from '../../../../alerts/ArchiveAlert';
import Notes from '../../../../shared/Notes';

function CategoriesPage({ categories, query }) {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [clickedCategory, setClickedCategory] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [openDialog, setOpenDialog] = useState(false);
  const [openDelAlert, setOpenDelAlert] = useState(false);
  const archiveCallback = () => {
    dispatch(archiveCategory(clickedCategory.id));
    idbAddItem({ ...clickedCategory, archived: true }, 'categories');
  };

  return categories.length ? (
    <>
      <InfoDialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <InfoCategory
          clickedCategory={clickedCategory.id}
          categories={categories}
          setOpenDialog={setOpenDialog}
        />
      </InfoDialog>
      {categories.map((category, index) => {
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
                    fillName={`category${index}`}
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
      })}
      <Dialog open={openDelAlert} onClose={() => setOpenDelAlert(false)}>
        <ArchiveAlert
          setOpen={setOpenDelAlert}
          archiveCallback={archiveCallback}
        />
      </Dialog>
    </>
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
