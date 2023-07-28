import React from 'react';
import { dinero } from 'dinero.js';

import { categoryIcons } from '../../../utils/constants/icons';
import { formatDineroOutput } from '../../../utils/format/cash';

import cardBackground from '../../../assets/icons/shared/cardBackground.svg';

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

export function renderSelectedCategory(categoryId, categoriesData) {
  const category = categoriesData.find(
    (category) => category.id === categoryId,
  );
  if (!category) return;
  const Icon = category ? categoryIcons[category.icon] : null;
  return (
    <>
      <svg
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
      </svg>
      {category.description}
    </>
  );
}

export function renderCategories(categories, setCategory) {
  return categories.map((category, index) => {
    const Icon = categoryIcons[category.icon];
    return (
      <div
        className="categories_list_item"
        onClick={() => {
          setCategory(category.id);
          document.querySelector('.categories_list').classList.add('none');
        }}
        key={category.id}
      >
        <svg
          width="34"
          height="34"
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
        </svg>
        {category.description}
      </div>
    );
  });
}

export function renderSelectedAccount(accountId, accountsData) {
  const account = accountsData.find((account) => account.id === accountId);
  if (!account) return;
  return (
    <div className="selected_account">
      <svg
        width="34"
        height="23"
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
      </svg>
      {account.description}
    </div>
  );
}

export function renderAccounts(accounts, setAccount) {
  return accounts.map((account) => {
    const balance = dinero(account.balance);
    return (
      <div className="account_item" key={account.id}>
        <div
          className={`${account.description} card`}
          onClick={() => {
            setAccount(account.id);
            document.querySelector('.accounts_list').classList.add('none');
          }}
          style={{
            background: `url(${cardBackground}) 0% 0% / cover no-repeat,
                                    linear-gradient(90deg, ${account.color[0]} 0%, ${account.color[1]} 100%)`,
            boxShadow: `0px 4px 10px #DCE2DF`,
          }}
        >
          <div className="card_name">{account.description}</div>
          <div className="card_balance_info">
            <div className="card_balance">
              {formatDineroOutput(balance, 'USD')}
            </div>
            <div className="card_balance_title">Current balance</div>
          </div>
        </div>
      </div>
    );
  });
}
