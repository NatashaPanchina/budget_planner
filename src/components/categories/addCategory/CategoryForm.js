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
  FieldInput,
  FormField,
  FormFieldsContainer,
  SelectButton,
  SelectedColor,
} from '../../../theme/global.js';
import {
  CategoryColorsContainer,
  IconsButton,
  IconsContainer,
  CategoriesIcons,
  IconsButtonContainer,
} from '../Categories.styled.js';
import { pages } from '../../../utils/constants/pages.js';

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
  const [tags] = useState(['']);

  const SelectedIcon = categoryIcons[icon];

  const colorsRef = useOutsideClick(hideElement);
  const iconsRef = useOutsideClick(hideElement);

  return (
    <FormFieldsContainer>
      <FormField
        $isActive={activeItem === '1'}
        $formType={categoryType}
        onClick={() => setActiveItem('1')}
      >
        <FieldDescription>{t('ADD_CATEGORY.DESCRIPTION')}</FieldDescription>
        <FieldInput
          type="text"
          onChange={(event) => setDescription(event.target.value)}
          placeholder={t('ADD_CATEGORY.DESCRIPTION_PLACEHOLDER')}
        ></FieldInput>
      </FormField>
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
      <FormField
        $isActive={activeItem === '4'}
        $formType={categoryType}
        onClick={() => setActiveItem('4')}
      >
        <FieldDescription>{t('ADD_CATEGORY.DATE')}</FieldDescription>
        <FieldInput
          type="date"
          onChange={(event) => setDate(new Date(event.target.value))}
        ></FieldInput>
      </FormField>
      <FormField
        $isActive={activeItem === '5'}
        $formType={categoryType}
        onClick={() => setActiveItem('5')}
      >
        <FieldDescription>{t('ADD_CATEGORY.NOTES')}</FieldDescription>
        <FieldInput
          type="text"
          onChange={(event) => setNotes(event.target.value)}
          placeholder={t('ADD_CATEGORY.NOTES_PLACEHOLDER')}
        ></FieldInput>
      </FormField>
      <FormField
        $isActive={activeItem === '6'}
        $formType={categoryType}
        onClick={() => setActiveItem('6')}
      >
        <FieldDescription>{t('ADD_CATEGORY.TAGS')}</FieldDescription>
        <FieldInput
          type="text"
          placeholder={t('ADD_CATEGORY.TAGS_PLACEHOLDER')}
        ></FieldInput>
      </FormField>
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
          {t('ADD_CATEGORY.DONE')}
        </DoneButton>
        <CancelButton to={pages.categories[`${categoryType}s`]}>
          {t('ADD_CATEGORY.CANCEL')}
        </CancelButton>
      </AddFormButtonsContainer>
    </FormFieldsContainer>
  );
}

CategoryForm.propTypes = {
  addNewCategory: PropTypes.func,
};

export default CategoryForm;
