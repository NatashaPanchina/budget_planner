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
  createAccountType,
  createLocaleAccountType,
} from '../utils';
import { idbAddItem } from '../../../indexedDB/IndexedDB.js';
import { ReactComponent as BackIcon } from '../../../assets/icons/shared/back.svg';
import cardBackground from '../../../assets/icons/shared/cardBackground.svg';
import { ReactComponent as DoneIcon } from '../../../assets/icons/shared/checkMark.svg';
import { ReactComponent as CancelIcon } from '../../../assets/icons/shared/cancel.svg';
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
  ColorsPopoverPalette,
  DateField,
  DoneButton,
  MobHeaderTitle,
  PopoverField,
  TextInputField,
} from '../../../theme/global.js';
import {
  CardView,
  CardBalance,
  CardBalanceContainer,
  CardName,
  CurrentBalance,
  Back,
  BackSvg,
} from '../Accounts.styled.js';
import { pages } from '../../../utils/constants/pages.js';
import { Grid, MenuItem } from '@mui/material';
import dayjs from 'dayjs';
import { toStringDate } from '../../../utils/format/date/index.js';

const doneEventHandler = (
  clickedAccount,
  id,
  accountType,
  description,
  currency,
  balance,
  selectedColor,
  dateObj,
  notes,
  tags,
  editAccount,
  dispatch,
) => {
  const date = toStringDate(new Date(dateObj.format()));
  const newBalance = dineroFromFloat({
    amount: balance,
    currency: USD,
    scale: 2,
  });
  const newAccount = {
    id,
    archived: false,
    type: accountType,
    description,
    currency,
    formatBalance: toDecimal(newBalance),
    balance: toSnapshot(newBalance),
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
  //счет который пользователь хочет отредактировать (нажал на него на странице Cash)
  const clickedAccount = useParams().accountId;
  const [id, setId] = useState('');
  const [accountType, setAccountType] = useState('');
  const [description, setDescription] = useState('');
  const [currency, setCurrency] = useState('USD');
  const [balance, setBalance] = useState(
    toDecimal(dinero({ amount: 0, currency: USD })),
  );
  const [selectedColor, setSelectedColor] = useState(colors.green[800]);
  const [date, setDate] = useState(dayjs(new Date()));
  const [notes, setNotes] = useState('');
  const [tags, setTags] = useState(['']);
  const cashType = createAccountType(accountType);
  const cashLocalType = createLocaleAccountType(accountType);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

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
      setCurrency(selectedAccount.currency);
      setBalance(toDecimal(dinero(selectedAccount.balance)));
      setSelectedColor(selectedAccount.color);
      setDate(dayjs(new Date(selectedAccount.date)));
      setNotes(selectedAccount.notes);
      setTags(selectedAccount.tags);
    }
  }, [status, accounts, clickedAccount]);

  return (
    <Grid item xs={12}>
      <AddContainer>
        <Back to={pages.accounts[cashType]}>
          <BackSvg as={BackIcon} />
        </Back>
        <MobHeaderTitle>
          {t(`INFO_ACCOUNT.${cashLocalType}_INFORMATION`)}
        </MobHeaderTitle>
        <AddFormHeader>
          <BackLink to={pages.accounts[cashType]}>
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
              margin="normal"
              required
              multiline
              label={t('INFO_ACCOUNT.DESCRIPTION')}
              placeholder={t('INFO_ACCOUNT.DESCRIPTION_PLACEHOLDER')}
              defaultValue={description}
              onChange={(event) => setDescription(event.target.value)}
            />
            <TextInputField
              margin="normal"
              required
              select
              fullWidth
              label={t('INFO_ACCOUNT.CURRENCY')}
              value={currency}
              onChange={(event) => setCurrency(event.target.value)}
            >
              <MenuItem value="USD">USD</MenuItem>
            </TextInputField>
            <TextInputField
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
                to={pages.accounts[cashType]}
                onClick={() =>
                  doneEventHandler(
                    clickedAccount,
                    id,
                    accountType,
                    description,
                    currency,
                    balance,
                    selectedColor,
                    date,
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
              <CancelButton to={pages.accounts[cashType]}>
                <ButtonSvg as={CancelIcon} />
                <ButtonTitle>{t('INFO_ACCOUNT.CANCEL')}</ButtonTitle>
              </CancelButton>
            </AddFormButtonsContainer>
          </>
        )}
      </AddContainer>
    </Grid>
  );
}
