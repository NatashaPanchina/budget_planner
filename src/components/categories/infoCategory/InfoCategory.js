import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { colors } from '../../../utils/constants/colors.js';
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
  InfoContainer,
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
import { isDateCorrect } from '../../../utils/format/date/index.js';
import {
  isDescriptionCorrect,
  isDescriptionUnique,
} from '../../../utils/format/description/index.js';
import Icons from '../utils/icons/Icons.js';
import SelectedColor from '../utils/color/SelectedColor.js';
import Colors from '../utils/color/Colors.js';

function InfoCategory({ clickedCategory, categories, setOpenDialog }) {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [id, setId] = useState('');
  const [categoryType, setCategoryType] = useState('expense');
  const [prevDescription, setPrevDescription] = useState('');
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
  const [openDelAlert, setOpenDelAlert] = useState(false);

  const [isDescription, setIsDescription] = useState(
    isDescriptionCorrect(description),
  );
  const isDate = isDateCorrect(date);
  const descHelperText = `ADD_CATEGORY.DESCRIPTION_CANT_BE.${isDescription.status.toUpperCase()}`;

  const archiveCallback = () => {
    if (!selectedCategory) return;
    setOpenDialog(false);
    dispatch(archiveCategory(selectedCategory.is));
    idbAddItem({ ...selectedCategory, archived: true }, 'categories');
  };

  useEffect(() => {
    const selectedCategory = categories.find(
      (category) => category.id === clickedCategory,
    );
    if (!selectedCategory) return;
    setSelectedCategory(selectedCategory);
    setId(selectedCategory.id);
    setCategoryType(selectedCategory.type);
    setPrevDescription(selectedCategory.description);
    setDescription(selectedCategory.description);
    setSelectedColor(selectedCategory.color);
    setIcon(selectedCategory.icon);
    setDate(dayjs(new Date(selectedCategory.date)));
    setNotes(selectedCategory.notes);
    setTags(selectedCategory.tags);
    setIsDescription(isDescriptionCorrect(selectedCategory.description));
  }, [clickedCategory]);

  return (
    <InfoContainer>
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
        error={!isDescription.correct}
        helperText={isDescription.correct ? '' : t(descHelperText)}
        margin="normal"
        required
        multiline
        label={t('INFO_CATEGORY.DESCRIPTION')}
        placeholder={t('INFO_CATEGORY.DESCRIPTION_PLACEHOLDER')}
        value={description}
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
          {' '}
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
            if (!isDate || !isDescription.correct) return;
            if (
              !isDescriptionUnique(description, prevDescription, categories)
            ) {
              setIsDescription({
                status: 'unique',
                correct: false,
                result: description,
              });
              return;
            }
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
          type="CATEGORY"
        />
      </Dialog>
    </InfoContainer>
  );
}

InfoCategory.propTypes = {
  clickedCategory: PropTypes.string,
  categories: PropTypes.array,
  setOpenDialog: PropTypes.func,
};

export default InfoCategory;
