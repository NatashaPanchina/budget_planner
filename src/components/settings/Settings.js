import { Grid, InputAdornment, styled } from '@mui/material';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ReactComponent as CurrencySvg } from '../../assets/icons/settings/currency.svg';
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
  MainOption,
  OptionContainer,
  OptionDesc,
  OptionSvg,
  OptionsContainer,
  SvgContainer,
} from './Settings.styled';
import { pages } from '../../utils/constants/pages';
import { CancelSearchSvg, Header, SearchField } from '../../theme/global';

const SettingsOptions = styled('div')((props) => ({
  '@media (min-width: 600px)': {
    overflowY: 'auto',
    '&::-webkit-scrollbar': {
      width: 0,
    },
    paddingTop: props.theme.spacing(5),
    position: 'sticky',
    top: props.theme.spacing(12),
    height: `calc(100vh - ${props.theme.spacing(12 + 5)})`,
    paddingBottom: 0,
  },
}));

const Search = styled(SearchField)(() => ({
  marginTop: 0,
  marginBottom: 0,
}));

export default function Settings() {
  const { t } = useTranslation();
  const [query, setQuery] = useState('');

  return (
    <>
      <Header>{t('SETTINGS.SETTINGS')}</Header>
      <Grid item xs={12}>
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
        <SettingsOptions>
          <FirstMainOption>{t('SETTINGS.ACCOUNT_SETTINGS')}</FirstMainOption>
          <OptionsContainer>
            <OptionContainer to={pages.settings.account}>
              <SvgContainer>
                <OptionSvg as={AccountSvg} />
              </SvgContainer>
              <OptionDesc>{t('SETTINGS.ACCOUNT')}</OptionDesc>
            </OptionContainer>
            <OptionContainer to={pages.settings.devices}>
              <SvgContainer>
                <OptionSvg as={DevicesSvg} />
              </SvgContainer>
              <OptionDesc>{t('SETTINGS.DEVICES')}</OptionDesc>
            </OptionContainer>
            <OptionContainer to={pages.settings.security}>
              <SvgContainer>
                <OptionSvg as={SecuritySvg} />
              </SvgContainer>
              <OptionDesc>{t('SETTINGS.SECURITY')}</OptionDesc>
            </OptionContainer>
          </OptionsContainer>
          <MainOption>{t('SETTINGS.APP_SETTINGS')}</MainOption>
          <OptionsContainer>
            <OptionContainer to={pages.settings.appearance}>
              <SvgContainer>
                <OptionSvg as={AppearanceSvg} />
              </SvgContainer>
              <OptionDesc>{t('SETTINGS.APPEARANCE')}</OptionDesc>
            </OptionContainer>
            <OptionContainer to={pages.settings.language}>
              <SvgContainer>
                <OptionSvg as={LanguageSvg} />
              </SvgContainer>
              <OptionDesc>{t('SETTINGS.LANGUAGE')}</OptionDesc>
            </OptionContainer>
            <OptionContainer to={pages.settings.mainCurrency}>
              <SvgContainer>
                <OptionSvg as={CurrencySvg} />
              </SvgContainer>
              <OptionDesc>{t('SETTINGS.MAIN_CURRENCY')}</OptionDesc>
            </OptionContainer>
            <OptionContainer to={pages.settings.notifications}>
              <SvgContainer>
                <OptionSvg as={NotificationsSvg} />
              </SvgContainer>
              <OptionDesc>{t('SETTINGS.NOTIFICATIONS')}</OptionDesc>
            </OptionContainer>
          </OptionsContainer>
          <MainOption>{t('SETTINGS.DATA_AND_STORAGE')}</MainOption>
          <OptionsContainer>
            <OptionContainer to={pages.settings.dataBackup}>
              <SvgContainer>
                <OptionSvg as={DataBackupSvg} />
              </SvgContainer>
              <OptionDesc>{t('SETTINGS.DATA_BACKUP')}</OptionDesc>
            </OptionContainer>
            <OptionContainer to={pages.settings.storageUsage}>
              <SvgContainer>
                <OptionSvg as={DataSvg} />
              </SvgContainer>
              <OptionDesc>{t('SETTINGS.DATA_USAGE')}</OptionDesc>
            </OptionContainer>
          </OptionsContainer>
          <MainOption>{t('SETTINGS.HELP')}</MainOption>
          <OptionsContainer>
            <OptionContainer to={pages.settings.demo}>
              <SvgContainer>
                <OptionSvg as={DataSvg} />
              </SvgContainer>
              <OptionDesc>{t('SETTINGS.DEMO')}</OptionDesc>
            </OptionContainer>
          </OptionsContainer>
          <MainOption>{t('SETTINGS.LOG_OUT')}</MainOption>
        </SettingsOptions>
      </Grid>
    </>
  );
}
