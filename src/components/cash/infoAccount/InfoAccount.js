import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { NumericFormat } from 'react-number-format';
import { USD } from '@dinero.js/currencies';
import { dinero, toDecimal, toSnapshot } from 'dinero.js';

import { colors } from '../../../utils/constants/colors.js';
import { fetchAccountsData, editAccount } from '../../../actions/Actions';
import {
  dineroFromFloat,
  formatNumberOutput,
} from '../../../utils/format/cash';
import {
  renderSelectedColor,
  renderColors,
  toggleElement,
  createCashType,
  createLocaleCashType,
} from '../utils';
import { useOutsideClick, hideElement } from '../../../hooks/useOutsideClick';
import { idbAddItem } from '../../../indexedDB/IndexedDB.js';

import { ReactComponent as BackIcon } from '../../../assets/icons/shared/back.svg';
import cardBackground from '../../../assets/icons/shared/cardBackground.svg';

import {
  AddFormButtonsContainer,
  AddFormContainer,
  AddFormHeader,
  BackLink,
  BackLinkSvg,
  CancelButton,
  ColorsPalette,
  ColorsPaletteButton,
  ColorsPaletteButtonContainer,
  DoneButton,
  FieldDescription,
  FieldInput,
  FormField,
  FormFieldsContainer,
  SelectButton,
  SelectedColor,
} from '../../../theme/global.js';
import {
  CardView,
  CardBalance,
  CardBalanceContainer,
  CardName,
  CurrentBalance,
  CashColorsContainer,
  NumericInput,
} from '../Cash.styled.js';
import { pages } from '../../../utils/constants/pages.js';

const doneEventHandler = (
  clickedAccount,
  id,
  accountType,
  description,
  balance,
  selectedColor,
  date,
  notes,
  tags,
  editAccount,
  dispatch,
) => {
  const newAccount = {
    id,
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
  dispatch(editAccount(clickedAccount, newAccount));
  idbAddItem(newAccount, 'accounts');
};

export default function InfoAccount() {
  const { status, accounts } = useSelector((state) => state.accounts);
  const dispatch = useDispatch();

  const { t } = useTranslation();

  const [activeItem, setActiveItem] = useState('');

  //счет который пользователь хочет отредактировать (нажал на него на странице Cash)
  const clickedAccount = useParams().accountId;

  const [id, setId] = useState('');
  const [accountType, setAccountType] = useState('');
  const [description, setDescription] = useState('');
  const [balance, setBalance] = useState(
    toDecimal(dinero({ amount: 0, currency: USD })),
  );
  const [selectedColor, setSelectedColor] = useState(colors.green[800]);
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState('');
  const [tags, setTags] = useState(['']);

  const cashType = createCashType(accountType);
  const cashLocalType = createLocaleCashType(accountType);

  const colorsRef = useOutsideClick(hideElement);

  //запрашиваем нужные данные для этого компонента
  //один раз только при его монтировании
  useEffect(() => {
    dispatch(fetchAccountsData());
  }, [dispatch]);

  //получаем данные нужного счета когда они подгрузились
  useEffect(() => {
    if (status === 'succeeded') {
      let selectedAccount = accounts.find(
        (account) => account.id === clickedAccount,
      );
      if (!selectedAccount) {
        return;
      }
      setId(selectedAccount.id);
      setAccountType(selectedAccount.type);
      setDescription(selectedAccount.description);
      setBalance(toDecimal(dinero(selectedAccount.balance)));
      setSelectedColor(selectedAccount.color);
      setDate(new Date(selectedAccount.date));
      setNotes(selectedAccount.notes);
      setTags(selectedAccount.tags);
    }
  }, [status, accounts, clickedAccount]);

  return (
    <AddFormContainer>
      <AddFormHeader>
        <BackLink to={pages.cash[cashType]}>
          <BackLinkSvg as={BackIcon} />
        </BackLink>
        {t(`INFO_ACCOUNT.${cashLocalType}_INFORMATION`)}
      </AddFormHeader>
      {status === 'loading' ? (
        <div>Loading</div>
      ) : (
        <>
          <CardView
            $cardBackground={cardBackground}
            $from={selectedColor[0]}
            $to={selectedColor[1]}
          >
            <CardName>{description}</CardName>
            <CardBalanceContainer>
              <CardBalance>{formatNumberOutput(balance, 'USD')}</CardBalance>
              <CurrentBalance>
                {t('INFO_ACCOUNT.CURRENT_BALANCE')}
              </CurrentBalance>
            </CardBalanceContainer>
          </CardView>
          <FormFieldsContainer>
            <FormField
              $isActive={activeItem === '1'}
              $formType="cash"
              onClick={() => setActiveItem('1')}
            >
              <FieldDescription>
                {t('INFO_ACCOUNT.DESCRIPTION')}
              </FieldDescription>
              <FieldInput
                type="text"
                onChange={(event) => setDescription(event.target.value)}
                defaultValue={description}
                placeholder={t('ADD_ACCOUNT.DESCRIPTION_PLACEHOLDER')}
              ></FieldInput>
            </FormField>
            <FormField
              $isActive={activeItem === '2'}
              $formType="cash"
              onClick={() => setActiveItem('2')}
            >
              <FieldDescription>{t('INFO_ACCOUNT.BALANCE')}</FieldDescription>
              <div>
                $
                <NumericFormat
                  customInput={NumericInput}
                  thousandSeparator=","
                  decimalSeparator="."
                  decimalScale={2}
                  allowNegative={false}
                  placeholder="0.00"
                  onValueChange={(values) => setBalance(values.floatValue)}
                  value={balance}
                />
              </div>
            </FormField>
            <FormField
              $isActive={activeItem === '3'}
              $formType="cash"
              onClick={() => setActiveItem('3')}
            >
              <FieldDescription>{t('INFO_ACCOUNT.COLOR')}</FieldDescription>
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
                {t('INFO_ACCOUNT.SELECT')}
              </SelectButton>
            </FormField>
            <CashColorsContainer ref={colorsRef} className="none">
              <ColorsPalette>
                {renderColors(colors, setSelectedColor, selectedColor)}
              </ColorsPalette>
              <ColorsPaletteButtonContainer>
                <ColorsPaletteButton onClick={() => toggleElement(colorsRef)}>
                  {t('INFO_ACCOUNT.OK')}
                </ColorsPaletteButton>
              </ColorsPaletteButtonContainer>
            </CashColorsContainer>
            <FormField
              $isActive={activeItem === '4'}
              $formType="cash"
              onClick={() => setActiveItem('4')}
            >
              <FieldDescription>{t('INFO_ACCOUNT.DATE')}</FieldDescription>
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
              <FieldDescription>{t('INFO_ACCOUNT.NOTES')}</FieldDescription>
              <FieldInput
                type="text"
                onChange={(event) => setNotes(event.target.value)}
                value={notes}
              ></FieldInput>
            </FormField>
            <FormField
              $isActive={activeItem === '6'}
              $formType="cash"
              onClick={() => setActiveItem('6')}
            >
              <FieldDescription>{t('INFO_ACCOUNT.TAGS')}</FieldDescription>
              <FieldInput></FieldInput>
            </FormField>
            <AddFormButtonsContainer>
              <DoneButton
                to={pages.cash[cashType]}
                $buttonType="cash"
                onClick={() =>
                  doneEventHandler(
                    clickedAccount,
                    id,
                    accountType,
                    description,
                    balance,
                    selectedColor,
                    date.toISOString(),
                    notes,
                    tags,
                    editAccount,
                    dispatch,
                  )
                }
              >
                {t('INFO_ACCOUNT.DONE')}
              </DoneButton>
              <CancelButton to={pages.cash[cashType]}>
                {t('INFO_ACCOUNT.CANCEL')}
              </CancelButton>
            </AddFormButtonsContainer>
          </FormFieldsContainer>
        </>
      )}
    </AddFormContainer>
  );
}
