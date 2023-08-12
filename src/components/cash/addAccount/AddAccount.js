import React from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { addNewAccount } from '../../../actions/Actions';
import { createCashType, createLocaleCashType } from '../utils';
import AccountForm from './AccountForm.js';

import { ReactComponent as BackIcon } from '../../../assets/icons/shared/back.svg';

import {
  AddContainer,
  AddFormHeader,
  AddFormHeaderTitles,
  BackLink,
  BackLinkSvg,
  MobInfoHeaderTitle,
} from '../../../theme/global';
import { pages } from '../../../utils/constants/pages';
import { Back, BackSvg } from '../Cash.styled';
import { Grid, styled } from '@mui/material';

const TitleLink = styled(NavLink)((props) => ({
  height: 60,
  width: '33.3%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  boxSizing: 'border-box',
  color: props.theme.colors.text.darker,
  '&:hover': {
    color: props.theme.colors.main.violet,
  },
  '&.active': {
    color: props.theme.colors.main.violet,
    borderBottom: `2px solid ${props.theme.colors.main.violet}`,
  },
}));

export default function AddAccount() {
  const { t } = useTranslation();
  const { accountType } = useParams();

  return (
    <Grid item xs={12}>
      <AddContainer>
        <Back to={pages.cash[createCashType(accountType)]}>
          <BackSvg as={BackIcon} />
        </Back>
        <MobInfoHeaderTitle $titleType={accountType}>
          {t(`ADD_ACCOUNT.${createLocaleCashType(accountType)}`)}
        </MobInfoHeaderTitle>
        <AddFormHeader>
          <BackLink to={pages.cash[createCashType(accountType)]}>
            <BackLinkSvg as={BackIcon} />
          </BackLink>
          <AddFormHeaderTitles>
            <TitleLink to={pages.cash.add.card}>
              {t('ADD_ACCOUNT.CARD')}
            </TitleLink>
            <TitleLink to={pages.cash.add.cash}>
              {t('ADD_ACCOUNT.CASH')}
            </TitleLink>
          </AddFormHeaderTitles>
        </AddFormHeader>
        <AccountForm addNewAccount={addNewAccount} />
      </AddContainer>
    </Grid>
  );
}
