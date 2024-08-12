import React, { useEffect, useState } from 'react';
import { Backdrop, Grid } from '@mui/material';
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
import { deleteDemo, loadDemo } from './utils';
import {
  Description,
  LoadingContainer,
  ProgressContainer,
} from './Demo.styled';
import CircularProgressWithLabel from '../../../shared/CircularProgressWithLabel';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchProfileData,
  fetchTransactionsData,
} from '../../../../actions/Actions';
import { names } from '../../../../utils/constants/currencies';

export default function Demo() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const header = useSelector((state) => state.header);
  const { transactions } = useSelector((state) => state.transactions);
  const [mainCurrency, setMainCurrency] = useState(names.USD);
  const [status, setStatus] = useState('idle');
  const [deletingStatus, setDeletingStatus] = useState('idle');
  const [isOpenLoading, setIsOpenLoading] = useState(false);
  const [isDeletingLoading, setIsDeletingLoading] = useState(false);

  useEffect(() => {
    dispatch(fetchProfileData());
    dispatch(fetchTransactionsData());
  }, [dispatch]);

  useEffect(() => {
    if (header.status === 'succeeded') {
      if (!header.profile) return;
      setMainCurrency(header.profile.currency);
    }
  }, [header.status, header.profile]);

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
            {t('SETTINGS.DEMO_INFO.YOU_CAN_UPLOAD')}
          </SingleContainer>
          <SingleContainer>
            <EditButton
              onClick={() => {
                setIsOpenLoading(true);
                loadDemo(setStatus, mainCurrency);
                setTimeout(() => {
                  setIsOpenLoading(false);
                }, 3000);
              }}
            >
              {t('SETTINGS.HELP_INFO.UPLOAD')}
            </EditButton>
          </SingleContainer>
          <SingleContainer>
            <DeleteButton
              onClick={() => {
                setIsDeletingLoading(true);
                deleteDemo(setDeletingStatus, transactions, mainCurrency);
                setTimeout(() => {
                  setIsDeletingLoading(false);
                }, 3000);
              }}
            >
              {t('SETTINGS.HELP_INFO.DELETE')}
            </DeleteButton>
          </SingleContainer>
        </SettingInfoContainer>
        {isOpenLoading && status === 'success' ? (
          <LoadingContainer>
            <Backdrop open={true} />
            <ProgressContainer>
              <Description>{t('SETTINGS.DEMO_INFO.LOADING')}</Description>
              <CircularProgressWithLabel />
            </ProgressContainer>
          </LoadingContainer>
        ) : null}
        {isDeletingLoading && deletingStatus === 'success' ? (
          <LoadingContainer>
            <Backdrop open={true} />
            <ProgressContainer>
              <Description>{t('SETTINGS.DEMO_INFO.DELETING')}</Description>
              <CircularProgressWithLabel />
            </ProgressContainer>
          </LoadingContainer>
        ) : null}
      </Grid>
    </>
  );
}
