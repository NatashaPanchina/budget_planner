import React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material';
import { categoryIcons } from '../../utils/constants/icons';

export const Svg = styled('svg')((props) => ({
  marginLeft: props.theme.spacing(2),
  marginRight: props.theme.spacing(2),
  minWidth: 38,
  '@media (min-width: 768px)': {
    marginLeft: props.theme.spacing(5),
    marginRight: props.theme.spacing(4),
  },
}));

function CategorySvg({ category, fillName }) {
  //console.log(category);
  if (!category) return null;
  const Icon = categoryIcons[category.icon];
  return (
    <Svg
      width="38"
      height="38"
      viewBox="0 0 38 38"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="19" cy="19" r="19" fill={`url(#${fillName})`}></circle>
      <Icon height="24" width="24" x="7" y="7" />
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
    </Svg>
  );
}

CategorySvg.propTypes = {
  category: PropTypes.object,
  fillName: PropTypes.string,
};

export default CategorySvg;
