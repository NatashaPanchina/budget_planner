import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { v4 as uuidv4 } from 'uuid';
import { USD } from '@dinero.js/currencies';
import { dinero, toDecimal, toSnapshot } from 'dinero.js';
import { pages } from '../../../utils/constants/pages';
import { colors } from '../../../utils/constants/colors';
import {
  NumericFormatCustom,
  dineroFromFloat,
  formatNumberOutput,
} from '../../../utils/format/cash';
import { renderSelectedColor, renderColors, createCashType } from '../utils';
import { idbAddItem } from '../../../indexedDB/IndexedDB.js';
import cardBackground from '../../../assets/icons/shared/cardBackground.svg';
import { ReactComponent as DoneIcon } from '../../../assets/icons/shared/checkMark.svg';
import { ReactComponent as CancelIcon } from '../../../assets/icons/shared/delete.svg';
import {
  CardBalance,
  CardBalanceContainer,
  CardName,
  CardView,
  CurrentBalance,
} from '../Cash.styled';
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
} from '../../../theme/global';
import dayjs from 'dayjs';
import { MenuItem } from '@mui/material';

const doneEventHandler = (
  accountType,
  description,
  currency,
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
    currency,
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
  const [description, setDescription] = useState('');
  const [currency, setCurrency] = useState('USD');
  const [balance, setBalance] = useState(
    toDecimal(dinero({ amount: 0, currency: USD })),
  );
  const [selectedColor, setSelectedColor] = useState(colors.green[700]);
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState('');
  const [tags, setTags] = useState(['']);
  const cashType = createCashType(accountType);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

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
      <>
        <TextInputField
          $type="common"
          margin="normal"
          required
          multiline
          label={t('ADD_ACCOUNT.DESCRIPTION')}
          placeholder={t('ADD_ACCOUNT.DESCRIPTION_PLACEHOLDER')}
          defaultValue={description}
          onChange={(event) => setDescription(event.target.value)}
        />
        <TextInputField
          $type="common"
          margin="normal"
          required
          select
          fullWidth
          label={t('ADD_ACCOUNT.CURRENCY')}
          value={currency}
          onChange={(event) => setCurrency(event.target.value)}
        >
          <MenuItem value="USD">USD</MenuItem>
        </TextInputField>
        <TextInputField
          $type="common"
          margin="normal"
          required
          label={t('ADD_ACCOUNT.BALANCE')}
          name="numberformat"
          value={balance}
          onChange={(event) => setBalance(event.target.value)}
          InputProps={{
            inputComponent: NumericFormatCustom,
          }}
        />
        <TextInputField
          $type="common"
          margin="normal"
          required
          label={t('ADD_ACCOUNT.COLOR')}
          InputProps={{
            readOnly: true,
            startAdornment: renderSelectedColor(selectedColor),
          }}
          onClick={(event) => setAnchorEl(event.currentTarget)}
        />
        <ColorsPopoverPalette
          open={open}
          anchorEl={anchorEl}
          onClose={() => setAnchorEl(null)}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        >
          <ColorsPalette>
            {renderColors(colors, setSelectedColor, selectedColor)}
          </ColorsPalette>
          <ColorsPaletteButtonContainer>
            <ColorsPaletteButton onClick={() => setAnchorEl(null)}>
              {t('ADD_ACCOUNT.OK')}
            </ColorsPaletteButton>
          </ColorsPaletteButtonContainer>
        </ColorsPopoverPalette>
        <DateField
          $type="common"
          required
          label={t('ADD_ACCOUNT.DATE')}
          defaultValue={dayjs(date)}
          onChange={(value) => setDate(value)}
        />
        <TextInputField
          $type="common"
          margin="normal"
          multiline
          label={t('ADD_ACCOUNT.NOTES')}
          placeholder={t('ADD_ACCOUNT.NOTES_PLACEHOLDER')}
          defaultValue={notes}
          onChange={(event) => setNotes(event.target.value)}
        />
        <TextInputField
          $type="common"
          margin="normal"
          multiline
          label={t('ADD_ACCOUNT.TAGS')}
          placeholder={t('ADD_ACCOUNT.TAGS_PLACEHOLDER')}
          onChange={(event) => setTags(event.target.value)}
        />
        <AddFormButtonsContainer>
          <DoneButton
            to={pages.cash[cashType]}
            $buttonType="cash"
            onClick={() =>
              doneEventHandler(
                accountType,
                description,
                currency,
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
            <ButtonSvg as={DoneIcon} />
            <ButtonTitle>{t('ADD_ACCOUNT.DONE')}</ButtonTitle>
          </DoneButton>
          <CancelButton to={pages.cash[cashType]}>
            <ButtonSvg as={CancelIcon} />
            <ButtonTitle>{t('ADD_ACCOUNT.CANCEL')}</ButtonTitle>
          </CancelButton>
        </AddFormButtonsContainer>
      </>
    </>
  );
}

CardForm.propTypes = {
  accountType: PropTypes.string,
  addNewAccount: PropTypes.func,
};

export default CardForm;
