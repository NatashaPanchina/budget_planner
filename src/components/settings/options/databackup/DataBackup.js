import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  BorderContainer,
  Button,
  EditButton,
  FirstTitle,
  ItemContainer,
  ItemTitle,
  MobContainer,
  MultilineContainer,
  SingleContainer,
  TextContainer,
  Title,
} from '../../Settings.styled';
import { useTranslation } from 'react-i18next';
import Loading from '../../../loading/Loading';
import { auth } from '../../../../configs/firebaseConfigs';
import { onAuthStateChanged } from 'firebase/auth';
import { backUpData } from './utils';
import { dateFormatter } from '../../../../utils/format/date';
import { updateHeaderProfile } from '../../../../actions/Actions';
import { idbAddItem } from '../../../../indexedDB/IndexedDB';

export default function DataBackup() {
  const { t } = useTranslation();
  const header = useSelector((state) => state.header);
  const dispatch = useDispatch();
  const [uid, setUid] = useState(null);
  const [backUpDate, setBackUpDate] = useState(header.profile.backupDate);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUid(user.uid);
      } else {
        setUid(null);
      }
    });
  }, [auth]);

  return header.status === 'loading' ? (
    <Loading />
  ) : (
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
            <div>{dateFormatter.format(backUpDate)}</div>
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
      <SingleContainer>
        <EditButton
          onClick={() => {
            setBackUpDate(Date.now());
            backUpData(uid, backUpDate);
            dispatch(
              updateHeaderProfile({
                ...header.profile,
                backUpDate,
              }),
            );
            idbAddItem({ ...header.profile, backUpDate }, 'profile');
          }}
        >
          Backup manually
        </EditButton>
      </SingleContainer>
    </MobContainer>
  );
}
