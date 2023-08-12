import React from 'react';
import PropTypes from 'prop-types';
import { formatNumberOutput } from '../../../utils/format/cash';
import { styled } from '@mui/material';

const LegendsContainer = styled('div')((props) => ({
  display: 'grid',
  width: '100%',
  alignItems: 'center',
  justifyItems: 'start',
  gridTemplateColumns: '15px 2fr 2fr 2fr',
  gridRowGap: props.theme.spacing(3),
  gridColumnGap: props.theme.spacing(1),
  '@media (min-width: 900px)': {
    gridTemplateColumns: '20px 2fr 2fr',
  },
}));

const LegendsSvg = styled('svg')(() => ({
  alignSelf: 'center',
  minWidth: 14,
}));

const LegendsProcent = styled('span')((props) => ({
  alignSelf: 'center',
  justifySelf: 'end',
  color: props.$textColor,
}));

const Balance = styled('span')((props) => ({
  alignSelf: 'center',
  justifySelf: 'center',
  color: props.$textColor,
  '@media (min-width: 900px)': {
    display: 'none',
  },
}));

function CashChartLegends({ data, totalBalance }) {
  const sortedData = data.slice().sort((a, b) => b.balance - a.balance);

  return (
    <LegendsContainer>
      <span></span>
      <span>Total</span>
      <Balance>{formatNumberOutput(totalBalance, 'USD')}</Balance>
      <LegendsProcent>100.00%</LegendsProcent>
      {sortedData.map((value, index) => {
        return (
          <React.Fragment key={index}>
            <LegendsSvg
              height={14}
              width={14}
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx={7}
                cy={7}
                r={7}
                fill={`url(#${value.description.replaceAll(' ', '_')})`}
              />
              <defs>
                <linearGradient
                  id={value.description.replaceAll(' ', '_')}
                  x1="0"
                  y1="0"
                  x2="14"
                  y2="14"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor={value.color[0]} />
                  <stop offset="1" stopColor={value.color[1]} />
                </linearGradient>
              </defs>
            </LegendsSvg>
            <span>{value.description}</span>
            <Balance>{formatNumberOutput(value.balance, 'USD')}</Balance>
            <LegendsProcent $textColor={value.color[1]}>
              {((value.balance * 100) / totalBalance).toFixed(2)} %
            </LegendsProcent>
          </React.Fragment>
        );
      })}
    </LegendsContainer>
  );
}

CashChartLegends.propTypes = {
  data: PropTypes.array,
  totalBalance: PropTypes.string,
};

export default CashChartLegends;
