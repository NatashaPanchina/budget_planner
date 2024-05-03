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
import { names } from '../../../../utils/constants/currencies';

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
    </MobContainer>
  );
}
