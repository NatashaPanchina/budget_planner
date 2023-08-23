import React from 'react';
import { dinero } from 'dinero.js';

import { categoryIcons } from '../../../utils/constants/icons';
import { formatDineroOutput } from '../../../utils/format/cash';

import cardBackground from '../../../assets/icons/shared/cardBackground.svg';
import {
  Card,
  CardBalance,
  CardBalanceContainer,
  CardName,
  CardView,
  CurrentBalance,
} from '../../newTransaction/NewTransaction.styled';
import { MenuItem, styled } from '@mui/material';

const CategoriesMenuItem = styled(MenuItem)((props) => ({
  borderRadius: props.theme.borderRadius,
  backgroundColor: props.theme.colors.background.primary,
}));

const InfoContainer = styled('div')((props) => ({
  display: 'flex',
  alignItems: 'center',
  color: props.theme.colors.text.primary,
}));

const CategoriesItemSvg = styled('svg')((props) => ({
  width: 34,
  height: 34,
  marginRight: props.theme.spacing(3),
}));

export function createLocaleTransactions(NAME, count) {
  const lastNumber = Number(String(count).match(/\d$/g)[0]);
  if (lastNumber === 0) {
    return `${NAME}.TRANSACTIONS.MORE_THAN_FIVE`;
  } else if (lastNumber === 1) {
    return `${NAME}.TRANSACTIONS.ONE`;
  } else if (lastNumber < 5) {
    return `${NAME}.TRANSACTIONS.LESS_THAN_FIVE`;
  } else if (lastNumber >= 5) {
    return `${NAME}.TRANSACTIONS.MORE_THAN_FIVE`;
  } else {
    return `${NAME}.TRANSACTIONS.MORE_THAN_FIVE`;
  }
}

export function renderCategories(categories) {
  return categories.map((category, index) => {
    const Icon = categoryIcons[category.icon];
    return (
      <CategoriesMenuItem key={category.id} value={category.id}>
        <InfoContainer>
          <CategoriesItemSvg
            viewBox="0 0 34 34"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="17" cy="17" r="17" fill={`url(#${index})`}></circle>
            <Icon height="20" width="20" x="7" y="7" />
            <defs>
              <linearGradient
                id={index}
                x1="0"
                y1="0"
                x2="34"
                y2="34"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor={category.color[0]} />
                <stop offset="1" stopColor={category.color[1]} />
              </linearGradient>
            </defs>
          </CategoriesItemSvg>
          {category.description}
        </InfoContainer>
      </CategoriesMenuItem>
    );
  });
}

export function renderAccounts(accounts, t) {
  return accounts.map((account) => {
    const balance = dinero(account.balance);
    return (
      <MenuItem key={account.id} value={account.id}>
        <CardView>
          <Card
            $from={account.color[0]}
            $to={account.color[1]}
            $cardBackground={cardBackground}
          >
            <CardName>{account.description}</CardName>
            <CardBalanceContainer>
              <CardBalance>{formatDineroOutput(balance, 'USD')}</CardBalance>
              <CurrentBalance>{t('CASH.CURRENT_BALANCE')}</CurrentBalance>
            </CardBalanceContainer>
          </Card>
        </CardView>
      </MenuItem>
    );
  });
}
