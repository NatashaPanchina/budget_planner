import React from 'react';
import {
  BorderContainer,
  EditButton,
  FirstTitle,
  SettingInfoContainer,
  TextContainer,
  Title,
} from '../../Settings.styled';
import { useTranslation } from 'react-i18next';
import { Grid } from '@mui/material';
import { BackLink, BackLinkSvg, Header } from '../../../../theme/global';
import { pages } from '../../../../utils/constants/pages';
import { ReactComponent as BackIcon } from '../../../../assets/icons/shared/back.svg';

export default function Security() {
  const { t } = useTranslation();

  return (
    <Grid item xs={12}>
      <Header>
        <BackLink to={pages.settings.main}>
          <BackLinkSvg as={BackIcon} />
        </BackLink>
        {t('SETTINGS.ACCOUNT_SETTINGS')}
      </Header>
      <SettingInfoContainer>
        <FirstTitle>{t('SETTINGS.SECURITY_INFO.SECURITY')}</FirstTitle>
        <FirstTitle>
          {t('SETTINGS.SECURITY_INFO.TWO_STEP_VERIFICATION')}
        </FirstTitle>
        <TextContainer>
          {t('SETTINGS.SECURITY_INFO.ADDITIONAL_TWO_STEP')}
        </TextContainer>
        <BorderContainer>
          <div>
            {t('SETTINGS.SECURITY_INFO.TWO_STEP_VERIFICATION_DISABLED')}
          </div>
          <EditButton>{t('SETTINGS.SECURITY_INFO.ENABLE')}</EditButton>
        </BorderContainer>
        <Title>{t('SETTINGS.SECURITY_INFO.APP_LOCK')}</Title>
        <TextContainer>
          {t('SETTINGS.SECURITY_INFO.APP_LOCK_INFO')}
        </TextContainer>
        <BorderContainer>
          <div>{t('SETTINGS.SECURITY_INFO.APP_LOCK_DISABLED')}</div>
          <EditButton>{t('SETTINGS.SECURITY_INFO.ENABLE')}</EditButton>
        </BorderContainer>
      </SettingInfoContainer>
    </Grid>
  );
}
