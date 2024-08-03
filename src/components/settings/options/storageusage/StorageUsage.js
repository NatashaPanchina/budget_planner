import React, { useState } from 'react';
import {
  DeleteButton,
  FirstTitle,
  SettingInfoContainer,
  SingleContainer,
  TextContainer,
  Title,
} from '../../Settings.styled';
import { clearIdb } from '../../../../indexedDB/IndexedDB';
import {
  resetAccounts,
  resetCategories,
  resetTransactions,
} from '../../../../actions/Actions';
import { useDispatch } from 'react-redux';
import DeleteAlert from '../../../alerts/DeleteAlert';
import { Dialog, Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { ReactComponent as BackIcon } from '../../../../assets/icons/shared/back.svg';
import { BackLink, BackLinkSvg, Header } from '../../../../theme/global';
import { pages } from '../../../../utils/constants/pages';

export default function StorageUsage() {
  const [open, setOpen] = useState(false);
  const deleteCallback = () => {
    dispatch(resetTransactions());
    dispatch(resetAccounts());
    dispatch(resetCategories());
    clearIdb(['transactions', 'categories', 'accounts']);
  };
  const dispatch = useDispatch();
  const { t } = useTranslation();

  return (
    <>
      <Grid item xs={12}>
        <Header>
          <BackLink to={pages.settings.main}>
            <BackLinkSvg as={BackIcon} />
          </BackLink>
          {t('SETTINGS.DATA_AND_STORAGE')}
        </Header>
        <SettingInfoContainer>
          <FirstTitle>
            {t('SETTINGS.STORAGE_USAGE_INFO.STORAGE_USAGE')}
          </FirstTitle>
          <TextContainer>
            {t('SETTINGS.STORAGE_USAGE_INFO.STORAGE_USAGE_DESCRIPTION')}
          </TextContainer>
          <div>15.0 Mb</div>
          <Title>{t('SETTINGS.STORAGE_USAGE_INFO.DELETING_DATA')}</Title>
          <TextContainer>
            {t('SETTINGS.STORAGE_USAGE_INFO.DELETING_DESCRIPTION')}
          </TextContainer>
          <SingleContainer>
            <DeleteButton
              onClick={() => {
                setOpen(true);
              }}
            >
              {t('SETTINGS.STORAGE_USAGE_INFO.DELETE_ALL')}
            </DeleteButton>
          </SingleContainer>
        </SettingInfoContainer>
      </Grid>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DeleteAlert setOpen={setOpen} deleteCallback={deleteCallback} />
      </Dialog>
    </>
  );
}
