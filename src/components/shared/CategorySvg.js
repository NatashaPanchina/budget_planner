import React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material';

export const SvgContainer = styled('div')((props) => ({
  position: 'relative',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: 38,
  height: 38,
  marginLeft: props.theme.spacing(2),
  marginRight: props.theme.spacing(2),
  minWidth: 38,
  '@media (min-width: 768px)': {
    marginLeft: props.theme.spacing(5),
    marginRight: props.theme.spacing(4),
  },
}));

const Emoji = styled('div')(() => ({
  position: 'absolute',
}));

function CategorySvg({ category, fillName }) {
  if (!category) return null;
  return (
    <div>
      <SvgContainer>
        <svg
          width="38"
          height="38"
          viewBox="0 0 38 38"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="19" cy="19" r="19" fill={`url(#${fillName})`}></circle>
          <defs>
            <linearGradient
              id={fillName}
              x1="0"
              y1="0"
              x2="38"
              y2="38"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor={category.color[0]} />
              <stop offset="1" stopColor={category.color[1]} />
            </linearGradient>
          </defs>
        </svg>
        <Emoji>{String.fromCodePoint(category.icon)}</Emoji>
      </SvgContainer>
    </div>
  );
}

CategorySvg.propTypes = {
  category: PropTypes.object,
  fillName: PropTypes.string,
};

export default CategorySvg;
