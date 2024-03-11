import React from 'react';
import {
  BorderContainer,
  Button,
  FirstTitle,
  ItemContainer,
  ItemTitle,
  MobContainer,
  MultilineContainer,
  TextContainer,
  Title,
} from '../../Settings.styled';
import { useTranslation } from 'react-i18next';

export default function DataBackup() {
  const { t } = useTranslation();

  return (
    <MobContainer>
      <FirstTitle>{t('SETTINGS.DATA_BACKUP_INFO.DATA_BACKUP')}</FirstTitle>
      <TextContainer>
        {t('SETTINGS.DATA_BACKUP_INFO.DATA_BACKUP_DESCRIPTION')}
      </TextContainer>
      <Title>{t('SETTINGS.DATA_BACKUP_INFO.LAST_BACKUP')}</Title>
      <MultilineContainer>
        <ItemContainer>
          <div>
            <ItemTitle>{t('SETTINGS.DATA_BACKUP_INFO.DATABASE')}</ItemTitle>
            <div>Firebase Cloud Firestore</div>
          </div>
        </ItemContainer>
        <ItemContainer>
          <div>
            <ItemTitle>{t('SETTINGS.DATA_BACKUP_INFO.BACKUP_DATE')}</ItemTitle>
            <div>11.11.2023</div>
          </div>
        </ItemContainer>
        <ItemContainer>
          <div>
            <ItemTitle>{t('SETTINGS.DATA_BACKUP_INFO.DATA_SIZE')}</ItemTitle>
            <div>15 Mb</div>
          </div>
        </ItemContainer>
      </MultilineContainer>
      <BorderContainer>
        {t('SETTINGS.DATA_BACKUP_INFO.DATA_BACKUP')}
        <Button>{t('SETTINGS.DATA_BACKUP_INFO.WEEKLY')}</Button>
      </BorderContainer>
    </MobContainer>
  );
}
