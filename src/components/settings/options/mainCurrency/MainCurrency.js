import React from 'react';
import {
  BorderContainer,
  FirstTitle,
  LabelContainer,
  MobContainer,
  RadioContainer,
  TextContainer,
} from '../../Settings.styled';
import { useTranslation } from 'react-i18next';
import { RadioGroup } from '@mui/material';
import { useSelector } from 'react-redux';

export default function MainCurrency() {
  const { t } = useTranslation();
  const header = useSelector((state) => state.header);

  return (
    <MobContainer>
      <FirstTitle>{t('SETTINGS.MAIN_CURRENCY_INFO.MAIN_CURRENCY')}</FirstTitle>
      <TextContainer>
        {t('SETTINGS.MAIN_CURRENCY_INFO.CHOOSE_CURRENCY')}
      </TextContainer>
      <RadioGroup value={header.profile.currency}>
        <BorderContainer>
          <LabelContainer
            value="USD"
            control={<RadioContainer />}
            label={t('SETTINGS.MAIN_CURRENCY_INFO.USD')}
          />
        </BorderContainer>
        <BorderContainer>
          <LabelContainer
            value="EUR"
            control={<RadioContainer />}
            label={t('SETTINGS.MAIN_CURRENCY_INFO.EUR')}
          />
        </BorderContainer>
        <BorderContainer>
          <LabelContainer
            value="RUB"
            control={<RadioContainer />}
            label={t('SETTINGS.MAIN_CURRENCY_INFO.RUB')}
          />
        </BorderContainer>
        <BorderContainer>
          <LabelContainer
            value="KZT"
            control={<RadioContainer />}
            label={t('SETTINGS.MAIN_CURRENCY_INFO.KZT')}
          />
        </BorderContainer>
      </RadioGroup>
    </MobContainer>
  );
}
