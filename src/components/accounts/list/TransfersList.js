import React from 'react';
import { useTranslation } from 'react-i18next';

import { ReactComponent as SearchIcon } from '../../../assets/icons/shared/search.svg';
import { ReactComponent as CancelSearchIcon } from '../../../assets/icons/shared/cancelSearch.svg';
import { ReactComponent as PlusIcon } from '../../../assets/icons/shared/plus.svg';
import {
  AddButton,
  AddButtonSvg,
  CancelSearchSvg,
  SearchField,
} from '../../../theme/global';
import { pages } from '../../../utils/constants/pages';
import { InputAdornment } from '@mui/material';

export default function TransferList() {
  const { t } = useTranslation();

  return (
    <div>
      <SearchField
        placeholder={t('ACCOUNTS.SEARCH_TRANSFER')}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <CancelSearchSvg as={CancelSearchIcon} />
            </InputAdornment>
          ),
        }}
      />
      <AddButton to={`${pages.newTransaction.transfer}/all`}>
        <AddButtonSvg as={PlusIcon} />
        {t('ACCOUNTS.ADD_TRANSFER')}
      </AddButton>
      Transfers
    </div>
  );
}
