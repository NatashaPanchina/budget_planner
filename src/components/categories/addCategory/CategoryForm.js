import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { v4 as uuidv4 } from 'uuid';

import { colors } from '../../../utils/constants/colors.js';
import { categoryIcons } from '../../../utils/constants/icons.js';
import { idbAddItem } from '../../../indexedDB/IndexedDB.js';
import {
  renderColors,
  renderIcons,
  renderSelectedColor,
  toggleElement,
} from '../utils';
import {
  hideElement,
  useOutsideClick,
} from '../../../hooks/useOutsideClick.js';

import {
  AddFormButtonsContainer,
  CancelButton,
  ColorsPalette,
  ColorsPaletteButtonContainer,
  ColorsPaletteButton,
  DoneButton,
  FieldDescription,
  FormField,
  SelectButton,
  SelectedColor,
  ButtonTitle,
  ButtonSvg,
  TextInputField,
  DateField,
  FormFieldsContainer,
} from '../../../theme/global.js';
import {
  CategoryColorsContainer,
  IconsButton,
  IconsContainer,
  CategoriesIcons,
  IconsButtonContainer,
} from '../Categories.styled.js';
import { pages } from '../../../utils/constants/pages.js';
import { ReactComponent as DoneIcon } from '../../../assets/icons/shared/checkMark.svg';
import { ReactComponent as CancelIcon } from '../../../assets/icons/shared/delete.svg';
import dayjs from 'dayjs';

const doneEventHandler = (
  categoryType,
  description,
  selectedColor,
  icon,
  date,
  notes,
  tags,
  addNewCategory,
  dispatch,
) => {
  const newCategory = {
    id: uuidv4(),
    archived: false,
    type: categoryType,
    description: description,
    color: selectedColor,
    icon,
    date,
    notes,
    tags,
  };
  dispatch(addNewCategory(newCategory));
  idbAddItem(newCategory, 'categories');
};

function CategoryForm({ addNewCategory }) {
  const dispatch = useDispatch();

  const { t } = useTranslation();

  const [activeItem, setActiveItem] = useState('');

  const { categoryType } = useParams();
  const [description, setDescription] = useState('');
  const [selectedColor, setSelectedColor] = useState(colors.green[600]);
  const [icon, setIcon] = useState(0);
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState('');
  const [tags, setTags] = useState(['']);

  const SelectedIcon = categoryIcons[icon];

  const colorsRef = useOutsideClick(hideElement);
  const iconsRef = useOutsideClick(hideElement);

  return (
    <FormFieldsContainer>
      <TextInputField
        $type={categoryType}
        margin="normal"
        required
        multiline
        label={t('ADD_CATEGORY.DESCRIPTION')}
        placeholder={t('ADD_CATEGORY.DESCRIPTION_PLACEHOLDER')}
        defaultValue={description}
        onChange={(event) => setDescription(event.target.value)}
      />
      <FormField
        $isActive={activeItem === '2'}
        $formType={categoryType}
        onClick={() => setActiveItem('2')}
      >
        <FieldDescription>{t('ADD_CATEGORY.COLOR')}</FieldDescription>
        <SelectedColor
          onClick={(event) => {
            setActiveItem('2');
            toggleElement(colorsRef);
            iconsRef.current.classList.add('none');
            event.stopPropagation();
          }}
        >
          {renderSelectedColor(selectedColor)}
        </SelectedColor>
        <SelectButton
          onClick={(event) => {
            setActiveItem('2');
            toggleElement(colorsRef);
            iconsRef.current.classList.add('none');
            event.stopPropagation();
          }}
        >
          {t('ADD_CATEGORY.SELECT')}
        </SelectButton>
      </FormField>
      <CategoryColorsContainer ref={colorsRef} className="none">
        <ColorsPalette>
          {renderColors(colors, setSelectedColor, selectedColor)}
        </ColorsPalette>
        <ColorsPaletteButtonContainer>
          <ColorsPaletteButton onClick={() => toggleElement(colorsRef)}>
            {t('ADD_CATEGORY.OK')}
          </ColorsPaletteButton>
        </ColorsPaletteButtonContainer>
      </CategoryColorsContainer>
      <FormField
        $isActive={activeItem === '3'}
        $formType={categoryType}
        onClick={() => setActiveItem('3')}
      >
        <FieldDescription>{t('ADD_CATEGORY.ICON')}</FieldDescription>
        <SelectedColor
          onClick={(event) => {
            setActiveItem('3');
            toggleElement(iconsRef);
            colorsRef.current.classList.add('none');
            event.stopPropagation();
          }}
        >
          {renderSelectedColor(selectedColor, SelectedIcon)}
        </SelectedColor>
        <SelectButton
          onClick={(event) => {
            setActiveItem('3');
            toggleElement(iconsRef);
            colorsRef.current.classList.add('none');
            event.stopPropagation();
          }}
        >
          {t('ADD_CATEGORY.SELECT')}
        </SelectButton>
      </FormField>
      <IconsContainer ref={iconsRef} className="none">
        <CategoriesIcons>{renderIcons(categoryIcons, setIcon)}</CategoriesIcons>
        <IconsButtonContainer>
          <IconsButton onClick={() => toggleElement(iconsRef)}>
            {t('ADD_CATEGORY.OK')}
          </IconsButton>
        </IconsButtonContainer>
      </IconsContainer>
      <DateField
        $type={categoryType}
        required
        label={t('ADD_CATEGORY.DATE')}
        defaultValue={dayjs(date)}
        onChange={(value) => setDate(value)}
      />
      <TextInputField
        $type={categoryType}
        margin="normal"
        multiline
        label={t('ADD_CATEGORY.NOTES')}
        placeholder={t('ADD_CATEGORY.NOTES_PLACEHOLDER')}
        defaultValue={notes}
        onChange={(event) => setNotes(event.target.value)}
      />
      <TextInputField
        $type={categoryType}
        margin="normal"
        multiline
        label={t('ADD_CATEGORY.TAGS')}
        placeholder={t('ADD_CATEGORY.TAGS_PLACEHOLDER')}
        onChange={(event) => setTags(event.target.value)}
      />
      <AddFormButtonsContainer>
        <DoneButton
          to={pages.categories[`${categoryType}s`]}
          $buttonType={categoryType}
          onClick={() =>
            doneEventHandler(
              categoryType,
              description,
              selectedColor,
              icon,
              date.toISOString(),
              notes,
              tags,
              addNewCategory,
              dispatch,
            )
          }
        >
          <ButtonSvg as={DoneIcon} />
          <ButtonTitle>{t('ADD_CATEGORY.DONE')}</ButtonTitle>
        </DoneButton>
        <CancelButton to={pages.categories[`${categoryType}s`]}>
          <ButtonSvg as={CancelIcon} />
          <ButtonTitle>{t('ADD_CATEGORY.CANCEL')}</ButtonTitle>
        </CancelButton>
      </AddFormButtonsContainer>
    </FormFieldsContainer>
  );
}

CategoryForm.propTypes = {
  addNewCategory: PropTypes.func,
};

export default CategoryForm;
