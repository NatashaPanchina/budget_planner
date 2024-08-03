import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  BorderContainer,
  Button,
  EditButton,
  FirstTitle,
  ItemContainer,
  ItemTitle,
  MultilineContainer,
  SettingInfoContainer,
  SingleContainer,
  TextContainer,
  Title,
} from '../../Settings.styled';
import { useTranslation } from 'react-i18next';
import Loading from '../../../loading/Loading';
import { auth } from '../../../../configs/firebaseConfigs';
import { onAuthStateChanged } from 'firebase/auth';
import { backUp } from './utils';
import { dateFormatter } from '../../../../utils/format/date';
import { Grid, styled } from '@mui/material';
import { ReactComponent as BackIcon } from '../../../../assets/icons/shared/back.svg';
import { BackLink, BackLinkSvg, Header } from '../../../../theme/global';
import { pages } from '../../../../utils/constants/pages';

const StatusInfo = styled('div', {
  shouldForwardProp: (prop) => prop !== '$type',
})((props) => ({
  fontSize: '0.8rem',
  color: props.theme.colors[props.$type],
  marginLeft: props.theme.spacing(2),
  marginRight: 'auto',
}));

export default function DataBackup() {
  const { t } = useTranslation();
  const header = useSelector((state) => state.header);
  const dispatch = useDispatch();
  const [uid, setUid] = useState(null);
  const [backUpDate, setBackUpDate] = useState(header.profile.backupDate);
  const [status, setStatus] = useState('idle');

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
    <Grid item xs={12}>
      <Header>
        <BackLink to={pages.settings.main}>
          <BackLinkSvg as={BackIcon} />
        </BackLink>
        {t('SETTINGS.DATA_AND_STORAGE')}
      </Header>
      <SettingInfoContainer>
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
              <ItemTitle>
                {t('SETTINGS.DATA_BACKUP_INFO.BACKUP_DATE')}
              </ItemTitle>
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
            onClick={() =>
              backUp(
                setStatus,
                setBackUpDate,
                dispatch,
                header,
                backUpDate,
                uid,
              )
            }
          >
            Backup manually
          </EditButton>
          {status === 'loading' && <StatusInfo>Loading</StatusInfo>}
          {status === 'success' && (
            <StatusInfo $type="income">Successful</StatusInfo>
          )}
          {status === 'failed' && <StatusInfo $type="error">Failed</StatusInfo>}
        </SingleContainer>
      </SettingInfoContainer>
    </Grid>
  );
}
