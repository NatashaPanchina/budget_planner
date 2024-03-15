import React, { useState } from 'react';
import { names } from '../../../utils/constants/currencies';
import { TextField, styled } from '@mui/material';
import { renderCurrencies } from '../../transactions/utils';
import {
  Container,
  FlexContainer,
  Logo,
  LogoContainer,
  LogoTitle,
  NextLinkContainer,
  SelectContainer,
  TextInfo,
} from '../Auth.styled';
import { ReactComponent as LogoCatIcon } from '../../../assets/icons/navigation/logoCat.svg';
import { ReactComponent as LogoTitleIcon } from '../../../assets/icons/navigation/logoTitle.svg';
import { idbUpdateItem } from '../../../indexedDB/IndexedDB';
import { pages } from '../../../utils/constants/pages';
import { getAuth } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { updateMainCurrency } from '../../../actions/Actions';
import { useDispatch } from 'react-redux';

const CurrencyField = styled(TextField)((props) => ({
  width: '100%',
  backgroundColor: props.theme.colors.background.primary,
  borderRadius: props.theme.borderRadius,
  '& label': {
    color: props.theme.colors.text.darker,
  },
  '& label.Mui-focused': {
    color: props.theme.colors.main.violet,
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderRadius: props.theme.borderRadius,
      border: `1px solid ${props.theme.colors.border.item}`,
    },
    '&:hover fieldset': {
      border: `1px solid ${props.theme.colors.text.darker}`,
    },
    '&.Mui-focused fieldset': {
      border: `1px solid ${props.theme.colors.main.violet}`,
    },
    '& .MuiInputBase-input': {
      color: props.theme.colors.text.primary,
      borderRadius: props.theme.borderRadius,
      backgroundColor: props.theme.colors.background.primary,
    },
    '& .MuiSelect-icon': {
      fill: props.theme.colors.main.violet,
    },
  },
}));

const updateCurrency = async (currency, auth, navigate, dispatch) => {
  if (!currency) return 'This field should not be empty';
  const data = {
    currency,
  };
  try {
    await idbUpdateItem(auth.currentUser.uid, data, 'profile');
    dispatch(updateMainCurrency(data.currency));
    navigate(pages.transactions.main);
  } catch (error) {
    console.log(error.message);
  }
};

export default function SelectCurrency() {
  const auth = getAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [currency, setCurrency] = useState(names.USD);
  const dispatch = useDispatch();

  return (
    <Container>
      <LogoContainer>
        <FlexContainer>
          <Logo as={LogoCatIcon} />
          <LogoTitle as={LogoTitleIcon} />
        </FlexContainer>
      </LogoContainer>
      <SelectContainer>
        <TextInfo>{t('MAIN_CURRENCY.SELECT_MAIN_CURRENCY')}</TextInfo>
        <CurrencyField
          margin="normal"
          required
          select
          fullWidth
          value={currency}
          onChange={(event) => setCurrency(event.target.value)}
        >
          {renderCurrencies(names)}
        </CurrencyField>
        <NextLinkContainer
          onClick={() => updateCurrency(currency, auth, navigate, dispatch)}
        >
          {t('MAIN_CURRENCY.FINISH')}
        </NextLinkContainer>
      </SelectContainer>
    </Container>
  );
}
