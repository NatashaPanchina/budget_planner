import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { colors } from '../../../utils/constants/colors.js';
import { categoryIcons } from '../../../utils/constants/icons.js';
import { fetchCategoriesData, editCategory } from '../../../actions/Actions';
import { idbAddItem } from '../../../indexedDB/IndexedDB.js';
import { renderColors, renderIcons, renderSelectedColor } from '../utils';
import { ReactComponent as BackIcon } from '../../../assets/icons/shared/back.svg';
import { ReactComponent as DoneIcon } from '../../../assets/icons/shared/checkMark.svg';
import { ReactComponent as CancelIcon } from '../../../assets/icons/shared/cancel.svg';
import {
  AddFormButtonsContainer,
  AddFormHeader,
  BackLink,
  BackLinkSvg,
  CancelButton,
  ColorsPalette,
  ColorsPaletteButtonContainer,
  ColorsPaletteButton,
  DoneButton,
  AddContainer,
  MobHeaderTitle,
  ButtonSvg,
  ButtonTitle,
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
import { pages } from '../../../utils/constants/pages.js';
import { Back, BackSvg } from '../AddCategory.styled.js';
import { Grid } from '@mui/material';
import dayjs from 'dayjs';
import { toStringDate } from '../../../utils/format/date/index.js';
import Loading from '../../loading/Loading.js';

const doneEventHandler = (
  selectedCategory,
  id,
  categoryType,
  description,
  selectedColor,
  icon,
  dateObj,
  notes,
  tags,
  editCategory,
  dispatch,
) => {
  const date = toStringDate(new Date(dateObj.format()));
  const newCategory = {
    id,
    archived: false,
    type: categoryType,
    description: description,
    color: selectedColor,
    icon,
    date,
    notes,
    tags,
  };
  dispatch(editCategory(selectedCategory, newCategory));
  idbAddItem(newCategory, 'categories');
};

export default function InfoCategory() {
  const { status, categories } = useSelector((state) => state.categories);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const clickedCategory = useParams().categoryId;
  const [id, setId] = useState('');
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

  useEffect(() => {
    dispatch(fetchCategoriesData());
  }, [dispatch]);

  useEffect(() => {
    if (status === 'succeeded') {
      const infoCategory = categories.find(
        (category) => category.id === clickedCategory,
      );
      if (!infoCategory) {
        return;
      }
      setId(infoCategory.id);
      setCategoryType(infoCategory.type);
      setDescription(infoCategory.description);
      setSelectedColor(infoCategory.color);
      setIcon(infoCategory.icon);
      setDate(dayjs(new Date(infoCategory.date)));
      setNotes(infoCategory.notes);
      setTags(infoCategory.tags);
    }
  }, [status, categories, clickedCategory]);

  return (
    <Grid item xs={12}>
      <AddContainer>
        {status === 'loading' ? (
          <Loading />
        ) : (
          <>
            <Back to={pages.categories[`${categoryType}s`]}>
              <BackSvg as={BackIcon} />
            </Back>
            <MobHeaderTitle $titleType={categoryType}>
              {t('INFO_CATEGORY.CATEGORY_INFORMATION')}
            </MobHeaderTitle>
            <AddFormHeader>
              <BackLink to={pages.categories[`${categoryType}s`]}>
                <BackLinkSvg as={BackIcon} />
              </BackLink>
              {t('INFO_CATEGORY.CATEGORY_INFORMATION')}
            </AddFormHeader>
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
                startAdornment: renderSelectedColor(
                  selectedColor,
                  SelectedIcon,
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
                {renderIcons(categoryIcons, setIcon)}
              </CategoriesIcons>
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
                to={pages.categories[`${categoryType}s`]}
                onClick={() =>
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
                    editCategory,
                    dispatch,
                  )
                }
              >
                <ButtonSvg as={DoneIcon} />
                <ButtonTitle>{t('INFO_CATEGORY.DONE')}</ButtonTitle>
              </DoneButton>
              <CancelButton to={pages.categories[`${categoryType}s`]}>
                <ButtonSvg as={CancelIcon} />
                <ButtonTitle>{t('INFO_CATEGORY.CANCEL')}</ButtonTitle>
              </CancelButton>
            </AddFormButtonsContainer>
          </>
        )}
      </AddContainer>
    </Grid>
  );
}
