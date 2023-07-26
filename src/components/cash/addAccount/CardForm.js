import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { v4 as uuidv4 } from 'uuid';
import { NumericFormat } from 'react-number-format';
import { USD } from '@dinero.js/currencies';
import { toSnapshot } from 'dinero.js';

import { pages } from '../../../utils/constants/pages';
import { colors } from '../../../utils/constants/colors';
import {
  dineroFromFloat,
  formatNumberOutput,
} from '../../../utils/format/cash';
import {
  renderSelectedColor,
  renderColors,
  toggleElement,
  createCashType,
} from '../utils';
import { useOutsideClick, hideElement } from '../../../hooks/useOutsideClick';
import { idbAddItem } from '../../../indexedDB/IndexedDB.js';

import cardBackground from '../../../assets/icons/shared/cardBackground.svg';
import {
  CardBalance,
  CardBalanceContainer,
  CardName,
  CardView,
  CashColorsContainer,
  CurrentBalance,
  NumericInput,
} from '../Cash.styled';
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
} from '../../../theme/global';

const doneEventHandler = (
  accountType,
  description,
  balance,
  selectedColor,
  date,
  notes,
  tags,
  addNewAccount,
  dispatch,
) => {
  const newAccount = {
    id: uuidv4(),
    archived: false,
    type: accountType,
    description,
    balance: toSnapshot(
      dineroFromFloat({
        amount: balance,
        currency: USD,
        scale: 2,
      }),
    ),
    color: selectedColor,
    date,
    notes,
    tags,
  };
  dispatch(addNewAccount(newAccount));
  idbAddItem(newAccount, 'accounts');
};

function CardForm({ accountType, addNewAccount }) {
  const dispatch = useDispatch();

  const { t } = useTranslation();

  const [activeItem, setActiveItem] = useState('');

  const [description, setDescription] = useState('');
  const [balance, setBalance] = useState(0.0);
  const [selectedColor, setSelectedColor] = useState(colors.green[700]);
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState('');
  const [tags] = useState(['']);

  const cashType = createCashType(accountType);

  const colorsRef = useOutsideClick(hideElement);

  return (
    <>
      <CardView
        $cardBackground={cardBackground}
        $from={selectedColor[0]}
        $to={selectedColor[1]}
      >
        <CardName>{description}</CardName>
        <CardBalanceContainer>
          <CardBalance>{formatNumberOutput(balance, 'USD')}</CardBalance>
          <CurrentBalance>{t('ADD_ACCOUNT.CURRENT_BALANCE')}</CurrentBalance>
        </CardBalanceContainer>
      </CardView>
      <FormFieldsContainer>
        <FormField
          $isActive={activeItem === '1'}
          $formType="cash"
          onClick={() => setActiveItem('1')}
        >
          <FieldDescription>{t('ADD_ACCOUNT.DESCRIPTION')}</FieldDescription>
          <FieldInput
            type="text"
            onChange={(event) => setDescription(event.target.value)}
            placeholder={t('ADD_ACCOUNT.DESCRIPTION_PLACEHOLDER')}
          ></FieldInput>
        </FormField>
        <FormField
          $isActive={activeItem === '2'}
          $formType="cash"
          onClick={() => setActiveItem('2')}
        >
          <FieldDescription>{t('ADD_ACCOUNT.BALANCE')}</FieldDescription>
          $
          <NumericFormat
            customInput={NumericInput}
            thousandSeparator=","
            decimalSeparator="."
            decimalScale={2}
            allowNegative={false}
            placeholder="0.00"
            onValueChange={(values) => setBalance(values.floatValue)}
          />
        </FormField>
        <FormField
          $isActive={activeItem === '3'}
          $formType="cash"
          onClick={() => setActiveItem('3')}
        >
          <FieldDescription>{t('ADD_ACCOUNT.COLOR')}</FieldDescription>
          <SelectedColor
            onClick={(event) => {
              setActiveItem('3');
              toggleElement(colorsRef);
              event.stopPropagation();
            }}
          >
            {renderSelectedColor(selectedColor)}
          </SelectedColor>
          <SelectButton
            onClick={(event) => {
              setActiveItem('3');
              toggleElement(colorsRef);
              event.stopPropagation();
            }}
          >
            {t('ADD_ACCOUNT.SELECT')}
          </SelectButton>
        </FormField>
        <CashColorsContainer ref={colorsRef} className="none">
          <ColorsPalette>
            {renderColors(colors, setSelectedColor, selectedColor)}
          </ColorsPalette>
          <ColorsPaletteButtonContainer>
            <ColorsPaletteButton onClick={() => toggleElement(colorsRef)}>
              {t('ADD_ACCOUNT.OK')}
            </ColorsPaletteButton>
          </ColorsPaletteButtonContainer>
        </CashColorsContainer>
        <FormField
          $isActive={activeItem === '4'}
          $formType="cash"
          onClick={() => setActiveItem('4')}
        >
          <FieldDescription>{t('ADD_ACCOUNT.DATE')}</FieldDescription>
          <FieldInput
            type="date"
            onChange={(event) => setDate(new Date(event.target.value))}
          ></FieldInput>
        </FormField>
        <FormField
          $isActive={activeItem === '5'}
          $formType="cash"
          onClick={() => setActiveItem('5')}
        >
          <FieldDescription>{t('ADD_ACCOUNT.NOTES')}</FieldDescription>
          <FieldInput
            type="text"
            onChange={(event) => setNotes(event.target.value)}
            placeholder={t('ADD_ACCOUNT.NOTES_PLACEHOLDER')}
          ></FieldInput>
        </FormField>
        <FormField
          $isActive={activeItem === '6'}
          $formType="cash"
          onClick={() => setActiveItem('6')}
        >
          <FieldDescription>{t('ADD_ACCOUNT.TAGS')}</FieldDescription>
          <FieldInput
            type="text"
            placeholder={t('ADD_ACCOUNT.TAGS_PLACEHOLDER')}
          ></FieldInput>
        </FormField>
        <AddFormButtonsContainer>
          <DoneButton
            to={pages.cash[cashType]}
            $buttonType="cash"
            onClick={() =>
              doneEventHandler(
                accountType,
                description,
                balance,
                selectedColor,
                date.toISOString(),
                notes,
                tags,
                addNewAccount,
                dispatch,
              )
            }
          >
            {t('ADD_ACCOUNT.DONE')}
          </DoneButton>
          <CancelButton to={pages.cash[cashType]}>
            {t('ADD_ACCOUNT.CANCEL')}
          </CancelButton>
        </AddFormButtonsContainer>
      </FormFieldsContainer>
    </>
  );
}

CardForm.propTypes = {
  accountType: PropTypes.string,
  addNewAccount: PropTypes.func,
};

export default CardForm;
