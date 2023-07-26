import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { colors } from '../../../utils/constants/colors.js';
import { categoryIcons } from '../../../utils/constants/icons.js';
import { fetchCategoriesData, editCategory } from '../../../actions/Actions';
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

import { ReactComponent as BackIcon } from '../../../assets/icons/shared/back.svg';

import {
  AddFormButtonsContainer,
  AddFormContainer,
  AddFormHeader,
  BackLink,
  BackLinkSvg,
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
  selectedCategory,
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
) => {
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

  const [activeItem, setActiveItem] = useState('');

  const clickedCategory = useParams().categoryId;

  const [id, setId] = useState('');
  const [categoryType, setCategoryType] = useState('expense');
  const [description, setDescription] = useState();
  const [selectedColor, setSelectedColor] = useState(colors.green[600]);
  const [icon, setIcon] = useState(0);
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState('');
  const [tags, setTags] = useState(['']);

  const SelectedIcon = categoryIcons[icon];

  const colorsRef = useOutsideClick(hideElement);
  const iconsRef = useOutsideClick(hideElement);

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
      setDate(new Date(infoCategory.date));
      setNotes(infoCategory.notes);
      setTags(infoCategory.tags);
    }
  }, [status, categories, clickedCategory]);

  return (
    <AddFormContainer>
      {status === 'loading' ? (
        <div>Loading</div>
      ) : (
        <>
          <AddFormHeader>
            <BackLink to={pages.categories[`${categoryType}s`]}>
              <BackLinkSvg as={BackIcon} />
            </BackLink>
            {t('INFO_CATEGORY.CATEGORY_INFORMATION')}
          </AddFormHeader>
          <FormFieldsContainer>
            <FormField
              $isActive={activeItem === '1'}
              $formType={categoryType}
              onClick={() => setActiveItem('1')}
            >
              <FieldDescription>
                {t('ADD_CATEGORY.DESCRIPTION')}
              </FieldDescription>
              <FieldInput
                type="text"
                onChange={(event) => setDescription(event.target.value)}
                defaultValue={description}
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
              <CategoriesIcons>
                {renderIcons(categoryIcons, setIcon)}
              </CategoriesIcons>
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
                value={notes}
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
                    clickedCategory,
                    id,
                    categoryType,
                    description,
                    selectedColor,
                    icon,
                    date.toISOString(),
                    notes,
                    tags,
                    editCategory,
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
        </>
      )}
    </AddFormContainer>
  );
}
