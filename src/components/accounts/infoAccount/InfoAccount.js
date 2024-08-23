import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { dinero, toDecimal } from 'dinero.js';
import { colors } from '../../../utils/constants/colors.js';
import {
  NumericFormatCustom,
  formatDineroOutput,
  formatNumberOutput,
  getDigitAmount,
  isCashCorrect,
} from '../../../utils/format/cash';
import {
  renderSelectedColor,
  renderColors,
  createLocaleAccountType,
  renderCurrencies,
  getMonthExpenses,
  getMonthIncome,
} from '../utils';
import cardBackground from '../../../assets/icons/shared/cardBackground.svg';
import { ReactComponent as DoneIcon } from '../../../assets/icons/shared/checkMark.svg';
import { ReactComponent as CancelIcon } from '../../../assets/icons/shared/cancel.svg';
import { ReactComponent as ArchiveIcon } from '../../../assets/icons/shared/hoverArchive.svg';
import {
  AddFormButtonsContainer,
  AmountFieldsContainer,
  ArchiveButton,
  ArchiveButtonSvg,
  ButtonSvg,
  ButtonTitle,
  CancelButton,
  ColorsPalette,
  ColorsPaletteButton,
  ColorsPaletteButtonContainer,
  ColorsPopoverPalette,
  CurrencyInputField,
  DateField,
  DoneButton,
  FilterTooltip,
  HeaderDialog,
  InfoContainer,
  NumberInputField,
  PopoverField,
  TextInputField,
} from '../../../theme/global.js';
import {
  CardBalance,
  CardBalanceContainer,
  CardName,
  CurrentBalance,
  CommonInfoHeader,
  CalcInfoAmount,
  Stripe,
  InfoCardContainer,
} from '../Accounts.styled.js';
import dayjs from 'dayjs';
import { doneEventHandler } from './utils/index.js';
import { currencies, names } from '../../../utils/constants/currencies.js';
import ArchiveAlert from '../../alerts/ArchiveAlert.js';
import { Dialog } from '@mui/material';
import { archiveAccount } from '../../../actions/Actions.js';
import { idbAddItem } from '../../../indexedDB/IndexedDB.js';
import {
  convertPeriod,
  getCurrentMonth,
  isDateCorrect,
} from '../../../utils/format/date/index.js';
import {
  isDescriptionCorrect,
  isDescriptionUnique,
} from '../../../utils/format/description/index.js';
import {
  CardViewContainer,
  CommonInfoContainer,
  CommonInfoItem,
} from './InfoAccount.styled.js';

function InfoAccount({
  clickedAccount,
  accounts,
  categories,
  setOpenDialog,
  transactions,
}) {
  const dispatch = useDispatch();
  const header = useSelector((state) => state.header);
  const mainCurrency = header.profile ? header.profile.currency : names.USD;
  const { t } = useTranslation();
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [id, setId] = useState('');
  const [creationDate, setCreationDate] = useState(Date.now());
  const [accountType, setAccountType] = useState('');
  const [prevDescription, setPrevDescription] = useState('');
  const [description, setDescription] = useState('');
  const [currency, setCurrency] = useState(names.USD);
  const [balance, setBalance] = useState(
    toDecimal(dinero({ amount: 1000, currency: currencies[currency] })),
  );
  const [selectedColor, setSelectedColor] = useState(colors.green[800]);
  const [date, setDate] = useState(dayjs(new Date()));
  const [notes, setNotes] = useState('');
  const [tags, setTags] = useState(['']);
  const cashLocalType = createLocaleAccountType(accountType);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [openDelAlert, setOpenDelAlert] = useState(false);
  const [isDescription, setIsDescription] = useState(
    isDescriptionCorrect(description),
  );
  const isBalance = isCashCorrect(balance);
  const isDate = isDateCorrect(date);
  const descHelperText = `ADD_ACCOUNT.DESCRIPTION_CANT_BE.${isDescription.status.toUpperCase()}`;
  const expenses = getMonthExpenses(transactions, clickedAccount, mainCurrency);
  const income = getMonthIncome(transactions, clickedAccount, mainCurrency);
  const currentDate = getCurrentMonth();
  const formattedDate = convertPeriod(
    currentDate.from,
    currentDate.during,
    header.language,
  );

  const archiveCallback = () => {
    if (!selectedAccount) return;
    setOpenDialog(false);
    dispatch(archiveAccount(selectedAccount.id));
    idbAddItem({ ...selectedAccount, archived: true }, 'accounts');
  };

  useEffect(() => {
    const selectedAccount = accounts.find(
      (account) => account.id === clickedAccount,
    );
    if (!selectedAccount) return;
    setSelectedAccount(selectedAccount);
    const balance = selectedAccount.balance;
    setId(selectedAccount.id);
    setCreationDate(selectedAccount.creationDate);
    setAccountType(selectedAccount.type);
    setPrevDescription(selectedAccount.description);
    setDescription(selectedAccount.description);
    setCurrency(balance.currency.code);
    setBalance(formatDineroOutput(dinero(balance), balance.currency.code));
    setSelectedColor(selectedAccount.color);
    setDate(dayjs(new Date(selectedAccount.date)));
    setNotes(selectedAccount.notes);
    setTags(selectedAccount.tags);
    setIsDescription(isDescriptionCorrect(selectedAccount.description));
  }, [clickedAccount]);

  return (
    <InfoContainer>
      <HeaderDialog>
        {t(`INFO_ACCOUNT.${cashLocalType}_INFORMATION`)}
        <FilterTooltip title={t('ACCOUNTS.ARCHIVE')} arrow>
          <ArchiveButton
            onClick={() => {
              setOpenDelAlert(true);
            }}
          >
            <ArchiveButtonSvg as={ArchiveIcon} />
          </ArchiveButton>
        </FilterTooltip>
      </HeaderDialog>
      <InfoCardContainer>
        <CommonInfoContainer>
          <CommonInfoItem>
            <CommonInfoHeader>
              {formattedDate} {t('INFO_ACCOUNT.EXPENSES')}
            </CommonInfoHeader>
            <div>
              <CalcInfoAmount>
                {getDigitAmount(expenses, mainCurrency)}
              </CalcInfoAmount>
              <Stripe $type="expense" />
            </div>
          </CommonInfoItem>
          <CommonInfoItem>
            <CommonInfoHeader>
              {formattedDate} {t('INFO_ACCOUNT.INCOME')}
            </CommonInfoHeader>
            <div>
              <CalcInfoAmount>
                {getDigitAmount(income, mainCurrency)}
              </CalcInfoAmount>
              <Stripe $type="income" />
            </div>
          </CommonInfoItem>
        </CommonInfoContainer>
        <CardViewContainer
          $cardBackground={cardBackground}
          $from={selectedColor[0]}
          $to={selectedColor[1]}
        >
          <CardName>{description}</CardName>
          <CardBalanceContainer>
            <CardBalance>{formatNumberOutput(balance, currency)}</CardBalance>
            <CurrentBalance>{t('INFO_ACCOUNT.CURRENT_BALANCE')}</CurrentBalance>
          </CardBalanceContainer>
        </CardViewContainer>
      </InfoCardContainer>
      <AmountFieldsContainer>
        <CurrencyInputField
          margin="normal"
          required
          select
          fullWidth
          label={t('INFO_ACCOUNT.CURRENCY')}
          value={currency}
          onChange={(event) => setCurrency(event.target.value)}
        >
          {renderCurrencies(names)}
        </CurrencyInputField>
        <NumberInputField
          error={!isBalance}
          helperText={isBalance ? '' : t('ADD_ACCOUNT.BALANCE_GREATER_ZERO')}
          margin="normal"
          required
          label={t('INFO_ACCOUNT.BALANCE')}
          name="numberformat"
          value={balance}
          onChange={(event) => setBalance(event.target.value)}
          inputProps={{ currency }}
          InputProps={{
            inputComponent: NumericFormatCustom,
          }}
        />
      </AmountFieldsContainer>
      <TextInputField
        margin="normal"
        required
        label={t('INFO_ACCOUNT.TYPE')}
        value={t(`INFO_ACCOUNT.${accountType.toUpperCase()}`)}
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
        label={t('INFO_ACCOUNT.DESCRIPTION')}
        placeholder={t('INFO_ACCOUNT.DESCRIPTION_PLACEHOLDER')}
        defaultValue={description}
        onChange={(event) => {
          setDescription(event.target.value);
          setIsDescription(isDescriptionCorrect(event.target.value));
        }}
      />
      <PopoverField
        margin="normal"
        required
        label={t('INFO_ACCOUNT.COLOR')}
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
            {t('INFO_ACCOUNT.OK')}
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
        label={t('INFO_ACCOUNT.DATE')}
        value={date}
        onChange={(value) => setDate(value)}
      />
      <TextInputField
        margin="normal"
        multiline
        label={t('INFO_ACCOUNT.NOTES')}
        placeholder={t('INFO_ACCOUNT.NOTES_PLACEHOLDER')}
        defaultValue={notes}
        onChange={(event) => setNotes(event.target.value)}
      />
      <TextInputField
        margin="normal"
        multiline
        label={t('INFO_ACCOUNT.TAGS')}
        placeholder={t('INFO_ACCOUNT.TAGS_PLACEHOLDER')}
        onChange={(event) => setTags(event.target.value)}
      />
      <AddFormButtonsContainer>
        <DoneButton
          onClick={() => {
            if (!isBalance || !isDescription.correct || !isDate) return;
            if (!isDescriptionUnique(description, prevDescription, accounts)) {
              setIsDescription({
                status: 'unique',
                correct: false,
                result: description,
              });
              return;
            }
            doneEventHandler(
              categories,
              accounts,
              clickedAccount,
              id,
              creationDate,
              accountType,
              description,
              currency,
              balance,
              selectedColor,
              date,
              notes,
              tags,
              dispatch,
              mainCurrency,
            );
            setOpenDialog(false);
          }}
        >
          <ButtonSvg as={DoneIcon} />
          <ButtonTitle>{t('INFO_ACCOUNT.DONE')}</ButtonTitle>
        </DoneButton>
        <CancelButton onClick={() => setOpenDialog(false)}>
          <ButtonSvg as={CancelIcon} />
          <ButtonTitle>{t('INFO_ACCOUNT.CANCEL')}</ButtonTitle>
        </CancelButton>
      </AddFormButtonsContainer>
      <Dialog open={openDelAlert} onClose={() => setOpenDelAlert(false)}>
        <ArchiveAlert
          setOpen={setOpenDelAlert}
          archiveCallback={archiveCallback}
        />
      </Dialog>
    </InfoContainer>
  );
}

InfoAccount.propTypes = {
  clickedAccount: PropTypes.string,
  accounts: PropTypes.array,
  categories: PropTypes.array,
  setOpenDialog: PropTypes.func,
  transactions: PropTypes.array,
};

export default InfoAccount;
