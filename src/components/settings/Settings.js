import { Grid, InputAdornment, styled } from '@mui/material';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ReactComponent as AccountSvg } from '../../assets/icons/settings/profile.svg';
import { ReactComponent as DevicesSvg } from '../../assets/icons/settings/devices.svg';
import { ReactComponent as SecuritySvg } from '../../assets/icons/settings/security.svg';
import { ReactComponent as AppearanceSvg } from '../../assets/icons/settings/interface.svg';
import { ReactComponent as LanguageSvg } from '../../assets/icons/settings/language.svg';
import { ReactComponent as NotificationsSvg } from '../../assets/icons/settings/notifications.svg';
import { ReactComponent as DataBackupSvg } from '../../assets/icons/settings/cloud.svg';
import { ReactComponent as DataSvg } from '../../assets/icons/settings/store.svg';
import { ReactComponent as SearchIcon } from '../../assets/icons/shared/search.svg';
import { ReactComponent as CancelSearchIcon } from '../../assets/icons/shared/cancelSearch.svg';
import {
  FirstMainOption,
  MainContainer,
  MainOption,
  OptionContainer,
  OptionSvg,
  OptionsContainer,
} from './Settings.styled';
import { Outlet } from 'react-router-dom';
import { pages } from '../../utils/constants/pages';
import { CancelSearchSvg, SearchField } from '../../theme/global';

const SettingsOptions = styled('div')((props) => ({
  position: 'sticky',
  top: props.theme.spacing(14),
  height: `calc(100vh - ${props.theme.spacing(14)})`,
  overflowY: 'auto',
  '&::-webkit-scrollbar': {
    width: 0,
  },
  paddingTop: props.theme.spacing(5),
  paddingBottom: props.theme.spacing(8),
  '@media (min-width: 600px)': {
    paddingBottom: 0,
  },
}));

const Search = styled(SearchField)(() => ({
  marginTop: 0,
  marginBottom: 0,
}));

const SettingsTitle = styled('div')(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: 60,
  fontSize: '1.3rem',
  '@media (min-width: 600px)': {
    display: 'none',
  },
}));

export default function Settings() {
  const { t } = useTranslation();
  const [query, setQuery] = useState('');

  return (
    <>
      <Grid item xs={12} sm={3} md={3} lg={3}>
        <SettingsOptions>
          <SettingsTitle>{t('SETTINGS.SETTINGS')}</SettingsTitle>
          <Search
            placeholder={t('SETTINGS.SEARCH_SETTINGS')}
            value={query}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
              endAdornment: query ? (
                <InputAdornment position="end" onClick={() => setQuery('')}>
                  <CancelSearchSvg as={CancelSearchIcon} />
                </InputAdornment>
              ) : null,
            }}
            onChange={(event) => setQuery(event.target.value)}
            autoComplete="off"
          />
          <FirstMainOption>{t('SETTINGS.ACCOUNT_SETTINGS')}</FirstMainOption>
          <OptionsContainer>
            <OptionContainer to={pages.settings.account}>
              <OptionSvg as={AccountSvg} />
              {t('SETTINGS.ACCOUNT')}
            </OptionContainer>
            <OptionContainer to={pages.settings.devices}>
              <OptionSvg as={DevicesSvg} />
              {t('SETTINGS.DEVICES')}
            </OptionContainer>
            <OptionContainer to={pages.settings.security}>
              <OptionSvg as={SecuritySvg} />
              {t('SETTINGS.SECURITY')}
            </OptionContainer>
          </OptionsContainer>
          <MainOption>{t('SETTINGS.APP_SETTINGS')}</MainOption>
          <OptionsContainer>
            <OptionContainer to={pages.settings.appearance}>
              <OptionSvg as={AppearanceSvg} />
              {t('SETTINGS.APPEARANCE')}
            </OptionContainer>
            <OptionContainer to={pages.settings.language}>
              <OptionSvg as={LanguageSvg} />
              {t('SETTINGS.LANGUAGE')}
            </OptionContainer>
            <OptionContainer to={pages.settings.mainCurrency}>
              <OptionSvg as={NotificationsSvg} />
              {t('SETTINGS.MAIN_CURRENCY')}
            </OptionContainer>
            <OptionContainer to={pages.settings.notifications}>
              <OptionSvg as={NotificationsSvg} />
              {t('SETTINGS.NOTIFICATIONS')}
            </OptionContainer>
          </OptionsContainer>
          <MainOption>{t('SETTINGS.DATA_AND_STORAGE')}</MainOption>
          <OptionsContainer>
            <OptionContainer to={pages.settings.dataBackup}>
              <OptionSvg as={DataBackupSvg} />
              {t('SETTINGS.DATA_BACKUP')}
            </OptionContainer>
            <OptionContainer to={pages.settings.storageUsage}>
              <OptionSvg as={DataSvg} />
              {t('SETTINGS.DATA_USAGE')}
            </OptionContainer>
          </OptionsContainer>
          <MainOption>{t('SETTINGS.HELP')}</MainOption>
          <MainOption>{t('SETTINGS.LOG_OUT')}</MainOption>
        </SettingsOptions>
      </Grid>
      <Grid item xs={12} sm={9} md={9} lg={9}>
        <MainContainer>
          <Outlet />
        </MainContainer>
      </Grid>
    </>
  );
}
