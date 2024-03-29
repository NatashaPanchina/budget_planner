import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { colors } from '../../../utils/constants/colors.js';
import { categoryIcons } from '../../../utils/constants/icons.js';
import { renderColors, renderIcons, renderSelectedColor } from '../utils';
import { ReactComponent as DoneIcon } from '../../../assets/icons/shared/checkMark.svg';
import { ReactComponent as CancelIcon } from '../../../assets/icons/shared/cancel.svg';
import { ReactComponent as ArchiveIcon } from '../../../assets/icons/shared/hoverArchive.svg';
import {
  AddFormButtonsContainer,
  CancelButton,
  ColorsPalette,
  ColorsPaletteButtonContainer,
  ColorsPaletteButton,
  DoneButton,
  ButtonSvg,
  ButtonTitle,
  TextInputField,
  DateField,
  ColorsPopoverPalette,
  PopoverField,
  ArchiveButton,
  ArchiveButtonSvg,
  HeaderDialog,
  FilterTooltip,
} from '../../../theme/global.js';
import {
  IconsButton,
  CategoriesIcons,
  IconsButtonContainer,
} from '../Categories.styled.js';
import dayjs from 'dayjs';
import { doneEventHandler } from './utils/index.js';
import { archiveCategory } from '../../../actions/Actions.js';
import { idbAddItem } from '../../../indexedDB/IndexedDB.js';
import { Dialog } from '@mui/material';
import ArchiveAlert from '../../alerts/ArchiveAlert.js';

function InfoCategory({ clickedCategory, categories, setOpenDialog }) {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [id, setId] = useState('');
  const [creationDate, setCreationDate] = useState(Date.now());
  const [categoryType, setCategoryType] = useState('expense');
  const [description, setDescription] = useState('');
  const [selectedColor, setSelectedColor] = useState(colors.green[600]);
  const [icon, setIcon] = useState(0);
  const [date, setDate] = useState(dayjs(new Date()));
  const [notes, setNotes] = useState('');
  const [tags, setTags] = useState(['']);
  const SelectedIcon = categoryIcons[icon];
  const [anchorColorsEl, setAnchorColorsEl] = useState(null);
  const [anchorIconsEl, setAnchorIconsEl] = useState(null);
  const openColors = Boolean(anchorColorsEl);
  const openIcons = Boolean(anchorIconsEl);
  const [openDelAlert, setOpenDelAlert] = useState(false);
  const archiveCallback = () => {
    setOpenDialog(false);
    dispatch(archiveCategory(clickedCategory));
    idbAddItem(
      {
        id,
        creationDate,
        visible: true,
        type: categoryType,
        description,
        color: selectedColor,
        icon,
        date,
        notes,
        tags,
        archived: true,
      },
      'categories',
    );
  };

  useEffect(() => {
    const selectedCategory = categories.find(
      (category) => category.id === clickedCategory,
    );
    if (!selectedCategory) return;
    setId(selectedCategory.id);
    setCreationDate(selectedCategory.creationDate);
    setCategoryType(selectedCategory.type);
    setDescription(selectedCategory.description);
    setSelectedColor(selectedCategory.color);
    setIcon(selectedCategory.icon);
    setDate(dayjs(new Date(selectedCategory.date)));
    setNotes(selectedCategory.notes);
    setTags(selectedCategory.tags);
  }, [clickedCategory]);

  return (
    <>
      <HeaderDialog>
        {t('INFO_CATEGORY.CATEGORY_INFORMATION')}
        <FilterTooltip title={t('CATEGORIES.ARCHIVE')} arrow>
          <ArchiveButton
            onClick={() => {
              setOpenDelAlert(true);
            }}
          >
            <ArchiveButtonSvg as={ArchiveIcon} />
          </ArchiveButton>
        </FilterTooltip>
      </HeaderDialog>
      <TextInputField
        margin="normal"
        required
        label={t('INFO_CATEGORY.TYPE')}
        value={t(`INFO_CATEGORY.${categoryType.toUpperCase()}`)}
        InputProps={{
          readOnly: true,
        }}
      />
      <TextInputField
        margin="normal"
        required
        multiline
        label={t('INFO_CATEGORY.DESCRIPTION')}
        placeholder={t('INFO_CATEGORY.DESCRIPTION_PLACEHOLDER')}
        value={description}
        onChange={(event) => setDescription(event.target.value)}
      />
      <PopoverField
        margin="normal"
        required
        label={t('INFO_CATEGORY.COLOR')}
        InputProps={{
          readOnly: true,
          startAdornment: renderSelectedColor(selectedColor),
        }}
        onClick={(event) => setAnchorColorsEl(event.currentTarget)}
      />
      <ColorsPopoverPalette
        open={openColors}
        anchorEl={anchorColorsEl}
        onClose={() => setAnchorColorsEl(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      >
        <ColorsPalette>
          {renderColors(colors, setSelectedColor, selectedColor)}
        </ColorsPalette>
        <ColorsPaletteButtonContainer>
          <ColorsPaletteButton onClick={() => setAnchorColorsEl(null)}>
            {t('INFO_CATEGORY.OK')}
          </ColorsPaletteButton>
        </ColorsPaletteButtonContainer>
      </ColorsPopoverPalette>
      <PopoverField
        margin="normal"
        required
        label={t('INFO_CATEGORY.ICON')}
        InputProps={{
          readOnly: true,
          startAdornment: renderSelectedColor(selectedColor, SelectedIcon),
        }}
        onClick={(event) => setAnchorIconsEl(event.currentTarget)}
      />
      <ColorsPopoverPalette
        open={openIcons}
        anchorEl={anchorIconsEl}
        onClose={() => setAnchorIconsEl(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      >
        <CategoriesIcons>{renderIcons(categoryIcons, setIcon)}</CategoriesIcons>
        <IconsButtonContainer>
          <IconsButton onClick={() => setAnchorIconsEl(null)}>
            {t('INFO_CATEGORY.OK')}
          </IconsButton>
        </IconsButtonContainer>
      </ColorsPopoverPalette>
      <DateField
        required
        label={t('INFO_CATEGORY.DATE')}
        value={date}
        onChange={(value) => setDate(value)}
      />
      <TextInputField
        margin="normal"
        multiline
        label={t('INFO_CATEGORY.NOTES')}
        placeholder={t('INFO_CATEGORY.NOTES_PLACEHOLDER')}
        defaultValue={notes}
        onChange={(event) => setNotes(event.target.value)}
      />
      <TextInputField
        margin="normal"
        multiline
        label={t('INFO_CATEGORY.TAGS')}
        placeholder={t('INFO_CATEGORY.TAGS_PLACEHOLDER')}
        onChange={(event) => setTags(event.target.value)}
      />
      <AddFormButtonsContainer>
        <DoneButton
          onClick={() => {
            doneEventHandler(
              clickedCategory,
              id,
              categoryType,
              description,
              selectedColor,
              icon,
              date,
              notes,
              tags,
              dispatch,
            );
            setOpenDialog(false);
          }}
        >
          <ButtonSvg as={DoneIcon} />
          <ButtonTitle>{t('INFO_CATEGORY.DONE')}</ButtonTitle>
        </DoneButton>
        <CancelButton onClick={() => setOpenDialog(false)}>
          <ButtonSvg as={CancelIcon} />
          <ButtonTitle>{t('INFO_CATEGORY.CANCEL')}</ButtonTitle>
        </CancelButton>
      </AddFormButtonsContainer>
      <Dialog open={openDelAlert} onClose={() => setOpenDelAlert(false)}>
        <ArchiveAlert
          setOpen={setOpenDelAlert}
          archiveCallback={archiveCallback}
        />
      </Dialog>
    </>
  );
}

InfoCategory.propTypes = {
  clickedCategory: PropTypes.string,
  categories: PropTypes.array,
  setOpenDialog: PropTypes.func,
};

export default InfoCategory;
