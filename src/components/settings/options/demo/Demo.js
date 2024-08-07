import React from 'react';
import { Grid } from '@mui/material';
import { BackLink, BackLinkSvg, Header } from '../../../../theme/global';
import { pages } from '../../../../utils/constants/pages';
import { ReactComponent as BackIcon } from '../../../../assets/icons/shared/back.svg';
import { useTranslation } from 'react-i18next';
import {
  DeleteButton,
  EditButton,
  FirstTitle,
  SettingInfoContainer,
  SingleContainer,
} from '../../Settings.styled';

export default function Demo() {
  const { t } = useTranslation();

  return (
    <>
      <Grid item xs={12}>
        <Header>
          <BackLink to={pages.settings.main}>
            <BackLinkSvg as={BackIcon} />
          </BackLink>
          {t('SETTINGS.HELP')}
        </Header>
        <SettingInfoContainer>
          <FirstTitle>{t('SETTINGS.HELP_INFO.DEMO')}</FirstTitle>
          <SingleContainer>
            <EditButton>{t('SETTINGS.HELP_INFO.UPLOAD')}</EditButton>
          </SingleContainer>
          <SingleContainer>
            <DeleteButton>{t('SETTINGS.HELP_INFO.DELETE')}</DeleteButton>
          </SingleContainer>
        </SettingInfoContainer>
      </Grid>
    </>
  );
}
