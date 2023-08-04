import React from 'react';
import { dinero } from 'dinero.js';

import { categoryIcons } from '../../../utils/constants/icons';
import { formatDineroOutput } from '../../../utils/format/cash';

import cardBackground from '../../../assets/icons/shared/cardBackground.svg';
import { styled } from 'styled-components';
import {
  Card,
  CardBalance,
  CardBalanceContainer,
  CardName,
  CardView,
  CurrentBalance,
} from '../../newTransaction/NewTransaction.styled';

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

const CategoriesItem = styled.div((props) => ({
  height: 60,
  display: 'flex',
  alignItems: 'center',
  cursor: 'pointer',
  borderRadius: props.theme.borderRadius,
  color: props.theme.colors.text.primary,
  backgroundColor: props.$isActive
    ? props.theme.colors.background.navigation
    : '',
  '&:hover': {
    backgroundColor: props.theme.colors.background.navigation,
  },
}));

const SelectedCategory = styled.div((props) => ({
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  cursor: 'pointer',
  marginRight: props.theme.spacing(2),
  color: props.theme.colors.text.primary,
}));

const CategoriesItemSvg = styled.svg((props) => ({
  width: 34,
  height: 34,
  marginRight: props.theme.spacing(2),
  marginLeft: props.theme.spacing(2),
}));

export function renderSelectedCategory(categoryId, categoriesData) {
  const category = categoriesData.find(
    (category) => category.id === categoryId,
  );
  if (!category) return;
  const Icon = category ? categoryIcons[category.icon] : null;
  return (
    <SelectedCategory>
      <CategoriesItemSvg
        width="34"
        height="34"
        viewBox="0 0 34 34"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="17" cy="17" r="17" fill={`url(#selectedCategory)`}></circle>
        <Icon height="20" width="20" x="7" y="7" />
        <defs>
          <linearGradient
            id="selectedCategory"
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
    </SelectedCategory>
  );
}

export function renderCategories(
  categories,
  currentCategory,
  setCategory,
  categoriesRef,
) {
  return categories.map((category, index) => {
    const Icon = categoryIcons[category.icon];
    return (
      <CategoriesItem
        onClick={() => {
          setCategory(category.id);
          categoriesRef.current.classList.add('none');
        }}
        key={category.id}
        $isActive={category.id === currentCategory}
      >
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
      </CategoriesItem>
    );
  });
}

const SelectedAccount = styled.div((props) => ({
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  cursor: 'pointer',
  marginRight: props.theme.spacing(2),
  color: props.theme.colors.text.primary,
}));

const SelectedAccountSvg = styled.svg((props) => ({
  width: 34,
  height: 23,
  marginRight: props.theme.spacing(2),
}));

export function renderSelectedAccount(accountId, accountsData) {
  const account = accountsData.find((account) => account.id === accountId);
  if (!account) return;
  return (
    <SelectedAccount>
      <SelectedAccountSvg
        viewBox="0 0 34 23"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          x="0"
          y="0"
          width="34"
          height="23"
          rx="5"
          fill={`url(#selectedAccount)`}
        ></rect>
        <defs>
          <linearGradient
            id="selectedAccount"
            x1="0"
            y1="0"
            x2="34"
            y2="11.5"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor={account.color[0]} />
            <stop offset="1" stopColor={account.color[1]} />
          </linearGradient>
        </defs>
      </SelectedAccountSvg>
      {account.description}
    </SelectedAccount>
  );
}

export function renderAccounts(accounts, setAccount, accountsRef, t) {
  return accounts.map((account) => {
    const balance = dinero(account.balance);
    return (
      <CardView key={account.id}>
        <Card
          onClick={() => {
            setAccount(account.id);
            accountsRef.current.classList.add('none');
          }}
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
    );
  });
}
