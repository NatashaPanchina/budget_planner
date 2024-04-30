import React from 'react';
import { ReactComponent as CheckMarkIcon } from '../../../assets/icons/shared/checkMark.svg';
import { styled } from '@mui/material';
import { categoriesEmoji } from '../../../utils/constants/icons';

const ColorContainer = styled('div')(() => ({
  width: '100%',
}));

const IconContainer = styled('div', {
  shouldForwardProp: (prop) => prop !== '$isActive',
})((props) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: `${props.theme.spacing(1.5)} ${props.theme.spacing(3)}`,
  width: `calc(11.11% - ${props.theme.spacing(3 * 2)})`,
  minHeight: 40,
  cursor: 'pointer',
  borderRadius: '50%',
  background: props.$isActive ? props.theme.colors.main.violet : '',
  fontSize: 25,
  '&:hover': {
    fontSize: 27,
    transition: 'font-size 0.2s ease-out',
  },
  '@media (min-width: 600px)': {
    fontSize: 20,
    minHeight: 35,
    '&:hover': {
      fontSize: 22,
      transition: 'font-size 0.2s ease-out',
    },
    width: `calc(12.5% - ${props.theme.spacing(3 * 2)})`,
  },
}));

const EmojiIcon = styled('div')(() => ({
  fontSize: 'inherit',
}));

const EmojiTitle = styled('div')((props) => ({
  width: '100%',
  paddingLeft: props.theme.spacing(3),
  paddingRight: props.theme.spacing(3),
  paddingTop: props.theme.spacing(1),
}));

const SvgContainer = styled('div')(() => ({
  position: 'relative',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: 38,
  height: 38,
  minWidth: 38,
}));

const Emoji = styled('div')(() => ({
  position: 'absolute',
}));

export function renderSelectedColor(selectedColor, icon) {
  return selectedColor ? (
    <div>
      <SvgContainer>
        <svg
          width="34"
          height="34"
          viewBox="0 0 34 34"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="17" cy="17" r="17" fill={`url(#selectedColor)`}></circle>
          <defs>
            <linearGradient
              id="selectedColor"
              x1="0"
              y1="0"
              x2="34"
              y2="34"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor={selectedColor[0]} />
              <stop offset="1" stopColor={selectedColor[1]} />
            </linearGradient>
          </defs>
        </svg>
        {icon ? <Emoji>{String.fromCodePoint(icon)}</Emoji> : null}
      </SvgContainer>
    </div>
  ) : (
    <div>No selected color</div>
  );
}

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
            viewBox="0 0 34 34"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            onClick={() => {
              setSelectedColor(colors[color][shade]);
              showCheckMark(`${color}${shade}`);
            }}
          >
            <circle
              cx="17"
              cy="17"
              r="17"
              fill={`url(#${color}${shade})`}
            ></circle>
            <CheckMarkIcon
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
                y2="34"
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

export function renderIcons(setIcon, selectedIcon = 128522) {
  const result = [];

  categoriesEmoji.forEach((group) => {
    if (group.length !== 0) {
      result.push(<EmojiTitle key={group[0].type}>{group[0].type}</EmojiTitle>);
    }

    group.forEach((icon) => {
      result.push(
        <IconContainer key={icon.id} $isActive={icon.id === selectedIcon}>
          <EmojiIcon id={icon.id} onClick={() => setIcon(icon.id)}>
            {String.fromCodePoint(icon.value)}
          </EmojiIcon>
        </IconContainer>,
      );
    });
  });

  return result;
}

export function toggleElement(ref) {
  ref.current.classList.toggle('none');
}

export function createFilterType(filterType) {
  switch (filterType) {
    case 'expenses':
      return 'expense';
    case 'incomes':
      return 'income';
    default:
      return 'all';
  }
}

export function filterCategories(filterType, categories) {
  return filterType === 'all'
    ? categories
    : categories.filter((category) => category.type === filterType);
}

export function createLocaleCategories(NAME, count) {
  if (count === 0) {
    return `${NAME}.CATEGORIES.MORE_THAN_FIVE`;
  } else if (count === 1) {
    return `${NAME}.CATEGORIES.ONE`;
  } else if (count < 5) {
    return `${NAME}.CATEGORIES.LESS_THAN_FIVE`;
  } else if (count >= 5) {
    return `${NAME}.CATEGORIES.MORE_THAN_FIVE`;
  } else {
    return `${NAME}.CATEGORIES.MORE_THAN_FIVE`;
  }
}

export const getFiltersTitle = (sort) => {
  switch (sort) {
    case 'By date':
      return 'CATEGORIES_FILTERS.BY_DATE';
    case 'By adding':
      return 'CATEGORIES_FILTERS.BY_ADDING';
    case 'By alphabet':
      return 'CATEGORIES_FILTERS.BY_ALPHABET';
    default:
      return 'By date';
  }
};
