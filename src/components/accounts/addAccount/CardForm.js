import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { dinero, toDecimal } from 'dinero.js';
import { colors } from '../../../utils/constants/colors';
import {
  NumericFormatCustom,
  formatNumberOutput,
  isCashCorrect,
} from '../../../utils/format/cash';
import { renderSelectedColor, renderColors } from '../utils';
import cardBackground from '../../../assets/icons/shared/cardBackground.svg';
import { ReactComponent as DoneIcon } from '../../../assets/icons/shared/checkMark.svg';
import { ReactComponent as CancelIcon } from '../../../assets/icons/shared/cancel.svg';
import {
  CardBalance,
  CardBalanceContainer,
  CardName,
  CardView,
  CurrentBalance,
} from '../Accounts.styled';
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
  NumberInputField,
  AmountFieldsContainer,
} from '../../../theme/global';
import dayjs from 'dayjs';
import { currencies, names } from '../../../utils/constants/currencies';
import { cardDoneHandler } from './utils';
import CurrenciesItems from '../../transactions/utils/currencies/CurrenciesItems';
import { isDateCorrect } from '../../../utils/format/date';
import {
  isDescriptionCorrect,
  isDescriptionUnique,
} from '../../../utils/format/description';

function CardForm({ accounts, categories, setOpenDialog }) {
  const dispatch = useDispatch();
  const header = useSelector((state) => state.header);
  const mainCurrency = header.profile ? header.profile.currency : names.USD;
  const { t } = useTranslation();
  const [description, setDescription] = useState('');
  const [currency, setCurrency] = useState(mainCurrency);
  const [balance, setBalance] = useState(
    toDecimal(dinero({ amount: 0, currency: currencies.USD })),
  );
  const [selectedColor, setSelectedColor] = useState(colors.green[700]);
  const [date, setDate] = useState(dayjs(new Date()));
  const [notes, setNotes] = useState('');
  const [tags, setTags] = useState(['']);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const [isDescription, setIsDescription] = useState(
    isDescriptionCorrect(description),
  );
  const isBalance = isCashCorrect(balance);
  const isDate = isDateCorrect(date);
  const descHelperText = `ADD_ACCOUNT.DESCRIPTION_CANT_BE.${isDescription.status.toUpperCase()}`;

  return (
    <>
      <CardView
        $cardBackground={cardBackground}
        $from={selectedColor[0]}
        $to={selectedColor[1]}
      >
        <CardName>{description}</CardName>
        <CardBalanceContainer>
          <CardBalance>{formatNumberOutput(balance, currency)}</CardBalance>
          <CurrentBalance>{t('ADD_ACCOUNT.CURRENT_BALANCE')}</CurrentBalance>
        </CardBalanceContainer>
      </CardView>
      <AmountFieldsContainer>
        <CurrenciesItems
          names={names}
          currency={currency}
          setCurrency={setCurrency}
        />
        <NumberInputField
          error={!isBalance}
          helperText={isBalance ? '' : t('ADD_ACCOUNT.BALANCE_GREATER_ZERO')}
          margin="normal"
          required
          label={t('ADD_ACCOUNT.BALANCE')}
          name="numberformat"
          value={balance}
          onChange={(event) => setBalance(event.target.value)}
          inputProps={{ currency }}
          InputProps={{
            inputComponent: NumericFormatCustom,
          }}
          autoFocus
        />
      </AmountFieldsContainer>
      <TextInputField
        margin="normal"
        required
        label={t('ADD_ACCOUNT.TYPE')}
        value={t(`ADD_ACCOUNT.TYPE_CARD`)}
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
        label={t('ADD_ACCOUNT.DESCRIPTION')}
        placeholder={t('ADD_ACCOUNT.DESCRIPTION_PLACEHOLDER')}
        defaultValue={description}
        onChange={(event) => {
          setDescription(event.target.value);
          setIsDescription(isDescriptionCorrect(event.target.value));
        }}
      />
      <PopoverField
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
        slotProps={{
          textField: {
            helperText: isDate ? '' : t('ADD_ACCOUNT.DATE_CANT_BE_MORE'),
          },
        }}
        $isError={!isDate}
        required
        label={t('ADD_ACCOUNT.DATE')}
        value={date}
        onChange={(value) => setDate(value)}
      />
      <TextInputField
        margin="normal"
        multiline
        label={t('ADD_ACCOUNT.NOTES')}
        placeholder={t('ADD_ACCOUNT.NOTES_PLACEHOLDER')}
        defaultValue={notes}
        onChange={(event) => setNotes(event.target.value)}
      />
      <TextInputField
        margin="normal"
        multiline
        label={t('ADD_ACCOUNT.TAGS')}
        placeholder={t('ADD_ACCOUNT.TAGS_PLACEHOLDER')}
        onChange={(event) => setTags(event.target.value)}
      />
      <AddFormButtonsContainer>
        <DoneButton
          onClick={() => {
            if (!isBalance || !isDescription.correct || !isDate) return;
            if (!isDescriptionUnique(description, null, accounts)) {
              setIsDescription({
                status: 'unique',
                correct: false,
                result: description,
              });
              return;
            }
            cardDoneHandler(
              description,
              currency,
              balance,
              selectedColor,
              date,
              notes,
              tags,
              categories,
              dispatch,
              mainCurrency,
            );
            setOpenDialog(false);
          }}
        >
          <ButtonSvg as={DoneIcon} />
          <ButtonTitle>{t('ADD_ACCOUNT.DONE')}</ButtonTitle>
        </DoneButton>
        <CancelButton onClick={() => setOpenDialog(false)}>
          <ButtonSvg as={CancelIcon} />
          <ButtonTitle>{t('ADD_ACCOUNT.CANCEL')}</ButtonTitle>
        </CancelButton>
      </AddFormButtonsContainer>
    </>
  );
}

CardForm.propTypes = {
  accounts: PropTypes.array,
  categories: PropTypes.array,
  setOpenDialog: PropTypes.func,
};

export default CardForm;
