import React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { names } from '../../../utils/constants/currencies';
import { fetchProfileData } from '../../../actions/Actions';
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
import {
  LabelContainer,
  RadioContainer,
  RadioGroupContainer,
} from './LoadDemo.styled';
import { idbLoad } from '../../settings/options/demo/utils';
import { pages } from '../../../utils/constants/pages';
import { useNavigate } from 'react-router-dom';
import { CircularProgress } from '@mui/material';
import { useTranslation } from 'react-i18next';

const finishLoading = async (mainCurrency, isLoadDemo, setStatus, navigate) => {
  setStatus('loading');
  try {
    if (isLoadDemo) {
      await idbLoad(mainCurrency);
    }
    setStatus('success');
    navigate(pages.transactions.main);
  } catch (err) {
    setStatus('fail');
  }
};
export default function LoadDemo() {
  const dispatch = useDispatch();
  const header = useSelector((state) => state.header);
  const navigate = useNavigate();
  const [mainCurrency, setMainCurrency] = useState(names.USD);
  const [isLoadDemo, setIsLoadDemo] = useState(true);
  const [status, setStatus] = useState('idle');
  const { t } = useTranslation();

  useEffect(() => {
    dispatch(fetchProfileData());
  }, []);

  useEffect(() => {
    if (header.status === 'succeeded') {
      if (!header.profile) return;
      setMainCurrency(header.profile.currency);
    }
  }, [header.status, header.profile]);

  return (
    <Container>
      <LogoContainer>
        <FlexContainer>
          <Logo as={LogoCatIcon} />
          <LogoTitle as={LogoTitleIcon} />
        </FlexContainer>
      </LogoContainer>
      <SelectContainer>
        <TextInfo>{t('LOAD_DEMO.DESCRIPTION')}</TextInfo>
        <TextInfo>{t('LOAD_DEMO.LOAD?')}</TextInfo>
        {status === 'loading' ? (
          <CircularProgress />
        ) : (
          <RadioGroupContainer
            value={isLoadDemo}
            onChange={(event) => setIsLoadDemo(event.target.value)}
          >
            <LabelContainer
              value={true}
              control={<RadioContainer />}
              label={t('LOAD_DEMO.YES')}
            />
            <LabelContainer
              value={false}
              control={<RadioContainer />}
              label={t('LOAD_DEMO.NO')}
            />
          </RadioGroupContainer>
        )}
        <NextLinkContainer
          onClick={() =>
            finishLoading(mainCurrency, isLoadDemo, setStatus, navigate)
          }
        >
          {t('LOAD_DEMO.FINISH')}
        </NextLinkContainer>
      </SelectContainer>
    </Container>
  );
}
