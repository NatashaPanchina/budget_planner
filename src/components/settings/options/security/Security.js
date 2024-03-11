import React from 'react';
import {
  BorderContainer,
  EditButton,
  FirstTitle,
  MobContainer,
  TextContainer,
  Title,
} from '../../Settings.styled';
import { useTranslation } from 'react-i18next';

export default function Security() {
  const { t } = useTranslation();

  return (
    <MobContainer>
      <FirstTitle>{t('SETTINGS.SECURITY_INFO.SECURITY')}</FirstTitle>
      <FirstTitle>
        {t('SETTINGS.SECURITY_INFO.TWO_STEP_VERIFICATION')}
      </FirstTitle>
      <TextContainer>
        {t('SETTINGS.SECURITY_INFO.ADDITIONAL_TWO_STEP')}
      </TextContainer>
      <BorderContainer>
        <div>{t('SETTINGS.SECURITY_INFO.TWO_STEP_VERIFICATION_DISABLED')}</div>
        <EditButton>{t('SETTINGS.SECURITY_INFO.ENABLE')}</EditButton>
      </BorderContainer>
      <Title>{t('SETTINGS.SECURITY_INFO.APP_LOCK')}</Title>
      <TextContainer>{t('SETTINGS.SECURITY_INFO.APP_LOCK_INFO')}</TextContainer>
      <BorderContainer>
        <div>{t('SETTINGS.SECURITY_INFO.APP_LOCK_DISABLED')}</div>
        <EditButton>{t('SETTINGS.SECURITY_INFO.ENABLE')}</EditButton>
      </BorderContainer>
    </MobContainer>
  );
}
