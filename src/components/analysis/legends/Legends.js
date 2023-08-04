import React from 'react';
import PropTypes from 'prop-types';

import { createDataLegends } from '../utils/legends';
import { styled } from 'styled-components';

const Container = styled.div((props) => ({
  display: 'flex',
  justifyContent: 'center',
  flexWrap: 'wrap',
  width: `calc(100% - ${props.theme.spacing(5) * 2}px)`,
  fontSize: '0.875rem',
  padding: props.theme.spacing(5),
  paddingBottom: 0,
  '@media (min-width: 768px)': {
    display: 'block',
    padding: 0,
    paddingRight: props.theme.spacing(5),
    width: `calc(30% - ${props.theme.spacing(5)}px)`,
  },
}));

const ContainerItem = styled.div((props) => ({
  display: 'flex',
  alignItems: 'center',
  margin: props.theme.spacing(2),
  marginLeft: 0,
  marginRight: props.theme.spacing(7),
  '@media (min-width: 768px)': {
    margin: 0,
    marginTop: props.theme.spacing(3),
    marginBottom: props.theme.spacing(3),
  },
}));

const Svg = styled.svg((props) => ({
  marginRight: props.theme.spacing(1),
  minWidth: 14,
}));

function Legends({ data, chartType, keys, chartFilter }) {
  let legendsData = createDataLegends(data, chartType, keys, chartFilter);

  return (
    <Container>
      {legendsData.map((item, index) => {
        return (
          <ContainerItem key={index}>
            <Svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="7"
                cy="7"
                r="7"
                fill={`url(#${item.description.replaceAll(' ', '_')}Legends)`}
              ></circle>
              <defs>
                <linearGradient
                  id={`${item.description.replaceAll(' ', '_')}Legends`}
                  x1="0"
                  y1="0"
                  x2="17"
                  y2="17"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor={item.color[0]} />
                  <stop offset="1" stopColor={item.color[1]} />
                </linearGradient>
              </defs>
            </Svg>
            {item.description}
          </ContainerItem>
        );
      })}
    </Container>
  );
}

Legends.propTypes = {
  data: PropTypes.array,
  chartType: PropTypes.string,
  keys: PropTypes.array,
  chartFilter: PropTypes.string,
};

export default Legends;
