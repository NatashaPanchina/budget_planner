import React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material';

export const Svg = styled('svg')((props) => ({
  minWidth: 34,
  marginRight: props.theme.spacing(4),
}));

function AccountSvg({ account }) {
  if (!account) return null;
  return (
    <Svg
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
        fill={`url(#${account.id})`}
      ></rect>
      <defs>
        <linearGradient
          id={account.id}
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
    </Svg>
  );
}

AccountSvg.propTypes = {
  account: PropTypes.object,
};

export default AccountSvg;
