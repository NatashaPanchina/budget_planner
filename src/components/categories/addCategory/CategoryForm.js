import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { colors } from '../../../utils/constants/colors.js';
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
import { isDateCorrect } from '../../../utils/format/date/index.js';
import {
  isDescriptionCorrect,
  isDescriptionUnique,
} from '../../../utils/format/description/index.js';
import Loading from '../../loading/Loading.js';
import Colors from '../utils/color/Colors.js';
import SelectedColor from '../utils/color/SelectedColor.js';
import Icons from '../utils/icons/Icons.js';

function CategoryForm({ type, setOpenDialog }) {
  const dispatch = useDispatch();
  const { status, categories } = useSelector((state) => state.categories);
  const { t } = useTranslation();
  const categoryType = type;
  const [description, setDescription] = useState('');
  const [selectedColor, setSelectedColor] = useState(colors.green[600]);
  const [icon, setIcon] = useState(127827);
  const [date, setDate] = useState(dayjs(new Date()));
  const [notes, setNotes] = useState('');
  const [tags, setTags] = useState(['']);

  const [anchorColorsEl, setAnchorColorsEl] = useState(null);
  const [anchorIconsEl, setAnchorIconsEl] = useState(null);
  const openColors = Boolean(anchorColorsEl);
  const openIcons = Boolean(anchorIconsEl);

  const [isDescription, setIsDescription] = useState(
    isDescriptionCorrect(description),
  );
  const isDate = isDateCorrect(date);
  const descHelperText = `ADD_CATEGORY.DESCRIPTION_CANT_BE.${isDescription.status.toUpperCase()}`;

  return status === 'Loading' ? (
    <Loading />
  ) : (
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
        error={!isDescription.correct}
        helperText={isDescription.correct ? '' : t(descHelperText)}
        margin="normal"
        required
        multiline
        label={t('ADD_CATEGORY.DESCRIPTION')}
        placeholder={t('ADD_CATEGORY.DESCRIPTION_PLACEHOLDER')}
        defaultValue={description}
        onChange={(event) => {
          setDescription(event.target.value);
          setIsDescription(isDescriptionCorrect(event.target.value));
        }}
      />
      <PopoverField
        margin="normal"
        required
        label={t('INFO_CATEGORY.COLOR')}
        InputProps={{
          readOnly: true,
          startAdornment: <SelectedColor selectedColor={selectedColor} />,
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
          <Colors
            colors={colors}
            setSelectedColor={setSelectedColor}
            initialColor={selectedColor}
          />
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
          startAdornment: (
            <SelectedColor selectedColor={selectedColor} icon={icon} />
          ),
        }}
        onClick={(event) => setAnchorIconsEl(event.currentTarget)}
      />
      <ColorsPopoverPalette
        open={openIcons}
        anchorEl={anchorIconsEl}
        onClose={() => setAnchorIconsEl(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      >
        <CategoriesIcons>
          <Icons setIcon={setIcon} selectedIcon={icon} />
        </CategoriesIcons>
        <IconsButtonContainer>
          <IconsButton onClick={() => setAnchorIconsEl(null)}>
            {t('INFO_CATEGORY.OK')}
          </IconsButton>
        </IconsButtonContainer>
      </ColorsPopoverPalette>
      <DateField
        slotProps={{
          textField: {
            helperText: isDate ? '' : t('ADD_CATEGORY.DATE_CANT_BE_MORE'),
          },
        }}
        $isError={!isDate}
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
            if (!isDate || !isDescription.correct) return;
            if (!isDescriptionUnique(description, null, categories)) {
              setIsDescription({
                status: 'unique',
                correct: false,
                result: description,
              });
              return;
            }
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
