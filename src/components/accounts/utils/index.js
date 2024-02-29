import React from 'react';
import { ReactComponent as CheckMarkIcon } from '../../../assets/icons/shared/checkMark.svg';
import notesIcon from '../../../assets/icons/shared/notes.svg';
import { MenuItem, styled } from '@mui/material';

const CashNotes = styled('div')((props) => ({
  marginTop: props.theme.spacing(2),
  fontSize: '0.875rem',
  color: props.theme.colors.text.darker,
  display: 'flex',
  alignItems: 'center',
}));

const NotesImg = styled('img')((props) => ({
  height: 15,
  marginRight: props.theme.spacing(1),
}));

const ColorContainer = styled('div')(() => ({
  width: '100%',
}));

function showCheckMark(key) {
  const allMarks = document.querySelectorAll('.checkMarkIcon');
  for (let mark of allMarks) {
    if (!mark.classList.contains('none')) {
      mark.classList.add('none');
    }
  }
  document.querySelector(`.${key}`).classList.toggle('none');
}

export function renderColors(colors, setSelectedColor, initialColor) {
  let result = [];

  const isInitialColor = (color) => {
    if (!initialColor) return false;
    return initialColor[0] === color[0] && initialColor[1] === color[1];
  };

  for (let shade = 500; shade <= 900; shade += 100) {
    for (let color in colors) {
      result.push(
        <ColorContainer key={`${color}${shade}`}>
          <svg
            viewBox="0 0 34 23"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            onClick={() => {
              setSelectedColor(colors[color][shade]);
              showCheckMark(`${color}${shade}`);
            }}
          >
            <rect
              x="0"
              y="0"
              width="34"
              height="23"
              rx="5"
              fill={`url(#${color}${shade})`}
            ></rect>
            <CheckMarkIcon
              x="1.5"
              y="-3.5"
              className={`${color + shade} checkMarkIcon ${
                isInitialColor(colors[color][shade]) ? '' : 'none'
              }`}
            />
            <defs>
              <linearGradient
                id={`${color}${shade}`}
                x1="0"
                y1="0"
                x2="34"
                y2="23"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor={colors[color][shade][0]} />
                <stop offset="1" stopColor={colors[color][shade][1]} />
              </linearGradient>
            </defs>
          </svg>
        </ColorContainer>,
      );
    }
  }
  return result;
}

export function renderSelectedColor(selectedColor) {
  return (
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
        fill={`url(#SelectedAccountColor)`}
      ></rect>
      <defs>
        <linearGradient
          id="SelectedAccountColor"
          x1="0"
          y1="0"
          x2="34"
          y2="23"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor={selectedColor[0]} />
          <stop offset="1" stopColor={selectedColor[1]} />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function toggleElement(ref) {
  ref.current.classList.toggle('none');
}

export function createAccountFilter(filterAccount) {
  switch (filterAccount) {
    case 'cards':
      return 'card';
    case 'cash':
      return 'cash';
    case 'transfers':
      return 'transfer';
    default:
      return 'all';
  }
}

export function createAccountType(accountType) {
  switch (accountType) {
    case 'card':
      return 'cards';
    case 'cash':
      return 'cash';
    default:
      return 'all';
  }
}

export function createLocaleAccountType(accountType) {
  switch (accountType) {
    case 'card':
      return 'CARD';
    case 'cash':
      return 'CASH';
    case 'transfer':
      return 'TRANSFER';
    default:
      return 'ALL';
  }
}

export function createLocaleAccount(NAME, count) {
  if (count === 0) {
    return `${NAME}.CASH.MORE_THAN_FIVE`;
  } else if (count === 1) {
    return `${NAME}.CASH.ONE`;
  } else if (count < 5) {
    return `${NAME}.CASH.LESS_THAN_FIVE`;
  } else if (count >= 5) {
    return `${NAME}.CASH.MORE_THAN_FIVE`;
  } else {
    return `${NAME}.CASH.MORE_THAN_FIVE`;
  }
}

export function filterAccounts(filterAccount, accounts) {
  return filterAccount === 'all'
    ? accounts
    : accounts.filter((account) => account.type === filterAccount);
}

export function renderNotes(notes) {
  if (notes) {
    return (
      <CashNotes>
        <NotesImg src={notesIcon} alt="notes" />
        {notes}
      </CashNotes>
    );
  }
}

export const renderCurrencies = (names) => {
  let results = [];
  for (let currencyName in names) {
    results.push(
      <MenuItem key={names[currencyName]} value={names[currencyName]}>
        {names[currencyName]}
      </MenuItem>,
    );
  }
  return results;
};
