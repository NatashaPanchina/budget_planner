import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { USD } from '@dinero.js/currencies';
import { dinero, toDecimal, toSnapshot } from 'dinero.js';

import { colors } from '../../../utils/constants/colors.js';
import { fetchAccountsData, editAccount } from '../../../actions/Actions';
import {
  NumericFormatCustom,
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
import { ReactComponent as DoneIcon } from '../../../assets/icons/shared/checkMark.svg';
import { ReactComponent as CancelIcon } from '../../../assets/icons/shared/delete.svg';

import {
  AddContainer,
  AddFormButtonsContainer,
  AddFormHeader,
  BackLink,
  BackLinkSvg,
  ButtonSvg,
  ButtonTitle,
  CancelButton,
  ColorsPalette,
  ColorsPaletteButton,
  ColorsPaletteButtonContainer,
  DateField,
  DoneButton,
  FieldDescription,
  FormField,
  FormFieldsContainer,
  MobInfoHeaderTitle,
  SelectButton,
  SelectedColor,
  TextInputField,
} from '../../../theme/global.js';
import {
  CardView,
  CardBalance,
  CardBalanceContainer,
  CardName,
  CurrentBalance,
  CashColorsContainer,
  Back,
  BackSvg,
} from '../Cash.styled.js';
import { pages } from '../../../utils/constants/pages.js';
import { Grid } from '@mui/material';
import dayjs from 'dayjs';

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

  useEffect(() => {
    dispatch(fetchAccountsData());
  }, [dispatch]);

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
    <Grid item xs={12}>
      <AddContainer>
        <Back to={pages.cash[cashType]}>
          <BackSvg as={BackIcon} />
        </Back>
        <MobInfoHeaderTitle $titleType={accountType}>
          {t(`INFO_ACCOUNT.${cashLocalType}_INFORMATION`)}
        </MobInfoHeaderTitle>
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
              <TextInputField
                $type="common"
                margin="normal"
                required
                multiline
                label={t('INFO_ACCOUNT.DESCRIPTION')}
                placeholder={t('INFO_ACCOUNT.DESCRIPTION_PLACEHOLDER')}
                defaultValue={description}
                onChange={(event) => setDescription(event.target.value)}
              />
              <TextInputField
                $type="common"
                margin="normal"
                required
                label={t('INFO_ACCOUNT.BALANCE')}
                name="numberformat"
                value={balance}
                onChange={(event) => setBalance(event.target.value)}
                InputProps={{
                  inputComponent: NumericFormatCustom,
                }}
              />
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
              <DateField
                $type="common"
                required
                label={t('INFO_ACCOUNT.DATE')}
                defaultValue={dayjs(date)}
                onChange={(value) => setDate(value)}
              />
              <TextInputField
                $type="common"
                margin="normal"
                multiline
                label={t('INFO_ACCOUNT.NOTES')}
                placeholder={t('INFO_ACCOUNT.NOTES_PLACEHOLDER')}
                defaultValue={notes}
                onChange={(event) => setNotes(event.target.value)}
              />
              <TextInputField
                $type="common"
                margin="normal"
                multiline
                label={t('INFO_ACCOUNT.TAGS')}
                placeholder={t('INFO_ACCOUNT.TAGS_PLACEHOLDER')}
                onChange={(event) => setTags(event.target.value)}
              />
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
                  <ButtonSvg as={DoneIcon} />
                  <ButtonTitle>{t('INFO_ACCOUNT.DONE')}</ButtonTitle>
                </DoneButton>
                <CancelButton to={pages.cash[cashType]}>
                  <ButtonSvg as={CancelIcon} />
                  <ButtonTitle>{t('INFO_ACCOUNT.CANCEL')}</ButtonTitle>
                </CancelButton>
              </AddFormButtonsContainer>
            </FormFieldsContainer>
          </>
        )}
      </AddContainer>
    </Grid>
  );
}
