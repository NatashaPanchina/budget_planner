import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { colors } from '../../../utils/constants/colors.js';
import { categoryIcons } from '../../../utils/constants/icons.js';
import { renderColors, renderIcons, renderSelectedColor } from '../utils';
('../../../hooks/useOutsideClick.js');
import {
  AddFormButtonsContainer,
  CancelButton,
  ColorsPalette,
  ColorsPaletteButtonContainer,
  ColorsPaletteButton,
  DoneButton,
  ButtonTitle,
  ButtonSvg,
  TextInputField,
  DateField,
  ColorsPopoverPalette,
  PopoverField,
} from '../../../theme/global.js';
import {
  IconsButton,
  CategoriesIcons,
  IconsButtonContainer,
} from '../Categories.styled.js';
import { ReactComponent as DoneIcon } from '../../../assets/icons/shared/checkMark.svg';
import { ReactComponent as CancelIcon } from '../../../assets/icons/shared/cancel.svg';
import dayjs from 'dayjs';
import { doneEventHandler } from './utils/index.js';

function CategoryForm({ type, setOpenDialog }) {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const categoryType = type;
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

  return (
    <>
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
        label={t('ADD_CATEGORY.DESCRIPTION')}
        placeholder={t('ADD_CATEGORY.DESCRIPTION_PLACEHOLDER')}
        defaultValue={description}
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
        label={t('ADD_CATEGORY.DATE')}
        value={date}
        onChange={(value) => setDate(value)}
      />
      <TextInputField
        margin="normal"
        multiline
        label={t('ADD_CATEGORY.NOTES')}
        placeholder={t('ADD_CATEGORY.NOTES_PLACEHOLDER')}
        defaultValue={notes}
        onChange={(event) => setNotes(event.target.value)}
      />
      <TextInputField
        margin="normal"
        multiline
        label={t('ADD_CATEGORY.TAGS')}
        placeholder={t('ADD_CATEGORY.TAGS_PLACEHOLDER')}
        onChange={(event) => setTags(event.target.value)}
      />
      <AddFormButtonsContainer>
        <DoneButton
          onClick={() => {
            doneEventHandler(
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
          <ButtonTitle>{t('ADD_CATEGORY.DONE')}</ButtonTitle>
        </DoneButton>
        <CancelButton onClick={() => setOpenDialog(false)}>
          <ButtonSvg as={CancelIcon} />
          <ButtonTitle>{t('ADD_CATEGORY.CANCEL')}</ButtonTitle>
        </CancelButton>
      </AddFormButtonsContainer>
    </>
  );
}

CategoryForm.propTypes = {
  type: PropTypes.string,
  setOpenDialog: PropTypes.func,
};

export default CategoryForm;
