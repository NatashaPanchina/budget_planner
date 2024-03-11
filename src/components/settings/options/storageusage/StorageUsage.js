import React, { useState } from 'react';
import {
  DeleteButton,
  FirstTitle,
  MobContainer,
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
import { Dialog } from '@mui/material';
import { useTranslation } from 'react-i18next';

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
      <MobContainer>
        <FirstTitle>
          {t('SETTINGS.STORAGE_USAGE_INFO.STORAGE_USAGE')}
        </FirstTitle>
        <TextContainer>
          {t('SETTINGS.STORAGE_USAGE_INFO.STORAGE_USAGE_DESCRIPTION')}
        </TextContainer>
        <div>15.0 Mb</div>
        <Title>{t('SETTINGS.STORAGE_USAGE_INFO.DELETING_DATA')}</Title>
        <SingleContainer>
          <TextContainer>
            {t('SETTINGS.STORAGE_USAGE_INFO.DELETING_DESCRIPTION')}
          </TextContainer>
          <DeleteButton
            onClick={() => {
              setOpen(true);
            }}
          >
            {t('SETTINGS.STORAGE_USAGE_INFO.DELETE_ALL')}
          </DeleteButton>
        </SingleContainer>
      </MobContainer>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DeleteAlert setOpen={setOpen} deleteCallback={deleteCallback} />
      </Dialog>
    </>
  );
}
