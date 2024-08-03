import React from 'react';
import {
  BorderContainer,
  Button,
  CustomSwitch,
  FirstTitle,
  SettingInfoContainer,
  TextContainer,
  Title,
} from '../../Settings.styled';
import { useTranslation } from 'react-i18next';
import { FormControlLabel, Grid } from '@mui/material';
import { ReactComponent as BackIcon } from '../../../../assets/icons/shared/back.svg';
import { BackLink, BackLinkSvg, Header } from '../../../../theme/global';
import { pages } from '../../../../utils/constants/pages';

export default function Notifications() {
  const { t } = useTranslation();

  return (
    <Grid item xs={12}>
      <Header>
        <BackLink to={pages.settings.main}>
          <BackLinkSvg as={BackIcon} />
        </BackLink>
        {t('SETTINGS.APP_SETTINGS')}
      </Header>
      <SettingInfoContainer>
        <FirstTitle>
          {t('SETTINGS.NOTIFICATIONS_INFO.NOTIFICATIONS')}
        </FirstTitle>
        <BorderContainer>
          {t('SETTINGS.NOTIFICATIONS_INFO.ALLOW_NOTIFICATIONS')}
          <FormControlLabel control={<CustomSwitch />} />
        </BorderContainer>
        <Title>{t('SETTINGS.NOTIFICATIONS_INFO.SOUNDS')}</Title>
        <TextContainer>
          {t('SETTINGS.NOTIFICATIONS_INFO.CHOOSE_NOTIFICATIONS')}
        </TextContainer>
        <BorderContainer>
          {t('SETTINGS.NOTIFICATIONS_INFO.SOUND')}
          <Button>{t('SETTINGS.NOTIFICATIONS_INFO.BY_DEFAULT')}</Button>
        </BorderContainer>
        <BorderContainer>
          {t('SETTINGS.NOTIFICATIONS_INFO.TURN_OFF_SOUNDS')}
          <FormControlLabel control={<CustomSwitch />} />
        </BorderContainer>
        <BorderContainer>
          В будущем здесь будет список
          <FormControlLabel control={<CustomSwitch />} />
        </BorderContainer>
      </SettingInfoContainer>
    </Grid>
  );
}
