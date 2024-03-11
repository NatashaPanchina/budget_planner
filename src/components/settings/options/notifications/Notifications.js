import React from 'react';
import {
  BorderContainer,
  Button,
  CustomSwitch,
  FirstTitle,
  MobContainer,
  TextContainer,
  Title,
} from '../../Settings.styled';
import { useTranslation } from 'react-i18next';
import { FormControlLabel } from '@mui/material';

export default function Notifications() {
  const { t } = useTranslation();

  return (
    <MobContainer>
      <FirstTitle>{t('SETTINGS.NOTIFICATIONS_INFO.NOTIFICATIONS')}</FirstTitle>
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
    </MobContainer>
  );
}
