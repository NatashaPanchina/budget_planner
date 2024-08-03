import React from 'react';
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
import { useSelector } from 'react-redux';
import { names } from '../../../../utils/constants/currencies';
import { ReactComponent as BackIcon } from '../../../../assets/icons/shared/back.svg';
import { BackLink, BackLinkSvg, Header } from '../../../../theme/global';
import { pages } from '../../../../utils/constants/pages';

export default function MainCurrency() {
  const { t } = useTranslation();
  const header = useSelector((state) => state.header);

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
          {t('SETTINGS.MAIN_CURRENCY_INFO.MAIN_CURRENCY')}
        </FirstTitle>
        <TextContainer>
          {t('SETTINGS.MAIN_CURRENCY_INFO.CHOOSE_CURRENCY')}
        </TextContainer>
        <RadioGroup value={header.profile.currency}>
          {Object.values(names).map((currency) => (
            <BorderContainer key={currency}>
              <LabelContainer
                value={currency}
                control={<RadioContainer />}
                label={t(`SETTINGS.MAIN_CURRENCY_INFO.${currency}`)}
              />
            </BorderContainer>
          ))}
        </RadioGroup>
      </SettingInfoContainer>
    </Grid>
  );
}
