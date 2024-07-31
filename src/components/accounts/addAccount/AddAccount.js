import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { createAccountFilter, createLocaleAccountType } from '../utils';
import AccountForm from './AccountForm.js';
import {
  AddFormHeader,
  AddFormHeaderTitles,
  MobHeaderTitle,
} from '../../../theme/global';
import { styled } from '@mui/material';

export const Header = styled(AddFormHeader)(() => ({
  '@media (min-width: 600px)': {
    padding: 0,
  },
}));

const TitleLink = styled('div', {
  shouldForwardProp: (prop) => prop !== '$isActive',
})((props) => ({
  cursor: 'pointer',
  padding: props.theme.spacing(4),
  width: '33.3%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  boxSizing: 'border-box',
  color: props.$isActive
    ? props.theme.colors.main.violet
    : props.theme.colors.text.darker,
  '&:hover': {
    color: props.theme.colors.main.violet,
  },
  borderBottom: props.$isActive
    ? `2px solid ${props.theme.colors.main.violet}`
    : '',
}));

function AddAccount({ accounts, categories, setOpenDialog }) {
  const { t } = useTranslation();
  const type = createAccountFilter(useParams().filterCash);
  const [accountType, setAccountType] = useState(type);

  return (
    <>
      <MobHeaderTitle>
        {t(`ADD_ACCOUNT.${createLocaleAccountType(accountType)}`)}
      </MobHeaderTitle>
      <Header>
        <AddFormHeaderTitles>
          <TitleLink
            $isActive={accountType === 'card' || accountType === 'all'}
            onClick={() => setAccountType('card')}
          >
            {t('ADD_ACCOUNT.CARD')}
          </TitleLink>
          <TitleLink
            $isActive={accountType === 'cash'}
            onClick={() => setAccountType('cash')}
          >
            {t('ADD_ACCOUNT.CASH')}
          </TitleLink>
        </AddFormHeaderTitles>
      </Header>
      <AccountForm
        accounts={accounts}
        categories={categories}
        setOpenDialog={setOpenDialog}
        type={accountType}
      />
    </>
  );
}

AddAccount.propTypes = {
  accounts: PropTypes.array,
  categories: PropTypes.array,
  setOpenDialog: PropTypes.func,
};

export default AddAccount;
