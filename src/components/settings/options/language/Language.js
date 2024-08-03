import React, { useEffect, useState } from 'react';
import {
  BorderContainer,
  FirstTitle,
  LabelContainer,
  RadioContainer,
  SettingInfoContainer,
  TextContainer,
} from '../../Settings.styled';
import { useTranslation } from 'react-i18next';
import { Grid, RadioGroup } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { changeLanguage } from '../../../../actions/Actions';
import { ReactComponent as BackIcon } from '../../../../assets/icons/shared/back.svg';
import { BackLink, BackLinkSvg, Header } from '../../../../theme/global';
import { pages } from '../../../../utils/constants/pages';

export default function Language() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const header = useSelector((state) => state.header);
  const [language, setLanguage] = useState(header.language);

  useEffect(() => {
    setLanguage(header.language);
  }, [header.language]);

  return (
    <Grid item xs={12}>
      <Header>
        <BackLink to={pages.settings.main}>
          <BackLinkSvg as={BackIcon} />
        </BackLink>
        {t('SETTINGS.APP_SETTINGS')}
      </Header>
      <SettingInfoContainer>
        <FirstTitle>{t('SETTINGS.LANGUAGE_INFO.LANGUAGE')}</FirstTitle>
        <TextContainer>
          {t('SETTINGS.LANGUAGE_INFO.SELECT_LANGUAGE')}
        </TextContainer>
        <RadioGroup
          value={language}
          onChange={(event) => {
            const newLanguage = event.target.value;
            setLanguage(newLanguage);
            localStorage.setItem('language', newLanguage);
            dispatch(changeLanguage(newLanguage));
          }}
        >
          <BorderContainer>
            <LabelContainer
              value="EN"
              control={<RadioContainer />}
              label="English"
            />
          </BorderContainer>
          <BorderContainer>
            <LabelContainer
              value="RU"
              control={<RadioContainer />}
              label="Русский"
            />
          </BorderContainer>
        </RadioGroup>
      </SettingInfoContainer>
    </Grid>
  );
}
