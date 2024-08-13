import React, { useState } from 'react';
import { names } from '../../../utils/constants/currencies';
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
import CurrenciesItems from '../utils/currencies/CurrenciesItems';

const updateCurrency = async (currency, auth, navigate, dispatch) => {
  if (!currency) return 'This field should not be empty';
  const data = {
    currency,
  };
  try {
    await idbUpdateItem(auth.currentUser.uid, data, 'profile');
    dispatch(updateMainCurrency(data.currency));
    navigate(pages.loadingDemo);
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
        <CurrenciesItems
          names={names}
          currency={currency}
          setCurrency={setCurrency}
        />
        <NextLinkContainer
          onClick={() => updateCurrency(currency, auth, navigate, dispatch)}
        >
          {t('MAIN_CURRENCY.NEXT')}
        </NextLinkContainer>
      </SelectContainer>
    </Container>
  );
}
