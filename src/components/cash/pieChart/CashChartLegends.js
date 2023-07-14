import React from 'react';
import PropTypes from 'prop-types';
import { styled } from 'styled-components';

const LegendsContainer = styled.div((props) => ({
  display: 'grid',
  width: '100%',
  alignItems: 'center',
  justifyItems: 'start',
  gridTemplateColumns: '30px 2fr 2fr',
  gridRowGap: props.theme.spacing(3),
}));

const LegendsSvg = styled.svg(() => ({
  alignSelf: 'center',
}));

const LegendsProcent = styled.span((props) => ({
  alignSelf: 'center',
  justifySelf: 'end',
  color: props.$textColor,
}));

function CashChartLegends({ data, totalBalance }) {
  const sortedData = data.slice().sort((a, b) => b.balance - a.balance);

  return (
    <LegendsContainer>
      {sortedData.map((value, index) => {
        return (
          <React.Fragment key={index}>
            <LegendsSvg height={14} width={14} xmlns="http://www.w3.org/2000/svg">
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
