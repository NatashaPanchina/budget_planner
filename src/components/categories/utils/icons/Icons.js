import React from 'react';
import PropTypes from 'prop-types';
import { categoriesEmoji } from '../../../../utils/constants/icons';
import { styled } from '@mui/material';

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

function Icons({ setIcon, selectedIcon }) {
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

Icons.propTypes = {
  setIcon: PropTypes.func,
  selectedIcon: PropTypes.number,
};

export default Icons;
