import React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material';
import { showCheckMark } from '..';
import { ReactComponent as CheckMarkIcon } from '../../../../assets/icons/shared/checkMark.svg';

const ColorContainer = styled('div')(() => ({
  width: '100%',
}));

function Colors({ colors, setSelectedColor, initialColor }) {
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

Colors.propTypes = {
  colors: PropTypes.object,
  setSelectedColor: PropTypes.func,
  initialColor: PropTypes.array,
};

export default Colors;
