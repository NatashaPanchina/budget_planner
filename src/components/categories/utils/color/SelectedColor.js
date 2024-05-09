import React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material';

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

function SelectedColor({ selectedColor, icon }) {
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

SelectedColor.propTypes = {
  selectedColor: PropTypes.array,
  icon: PropTypes.number,
};

export default SelectedColor;
