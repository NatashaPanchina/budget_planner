import React from 'react';
import PropTypes from 'prop-types';

import './Legends.css';
import { createDataLegends } from '../utils/legends';

function Legends({ data, chartType, keys, chartFilter }) {
  let legendsData = createDataLegends(data, chartType, keys, chartFilter);

  return (
    <div className="chart_legends">
      {legendsData.map((item, index) => {
        return (
          <div className="legends_item" key={index}>
            <svg
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
                fill={`url(#${item.description}Legends)`}
              ></circle>
              <defs>
                <linearGradient
                  id={`${item.description}Legends`}
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
            </svg>
            {item.description}
          </div>
        );
      })}
    </div>
  );
}

Legends.propTypes = {
  data: PropTypes.array,
  chartType: PropTypes.string,
  keys: PropTypes.array,
  chartFilter: PropTypes.string,
};

export default Legends;
