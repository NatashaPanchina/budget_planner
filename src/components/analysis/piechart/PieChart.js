import React from 'react';
import PropTypes from 'prop-types';
import { ResponsivePie } from '@nivo/pie';

import {
  createDescriptions,
  createGradientColors,
  renderGradients,
  renderMatchs,
} from '../utils/gradients';
import { createData } from '../utils/charts';
import Legends from '../legends/Legends';
import { renderTooltip } from '../utils/tooltip';
import { Chart, ChartsInfoContainer } from '../Analysis.styled';
import { formatNumberOutput } from '../../../utils/format/cash';

function PieChart({ transactions, categories, chartFilter, date }) {
  let commonData = createData(
    { transactions, categories, chartFilter, date },
    'pie',
  );

  return (
    <ChartsInfoContainer>
      <Chart>
        <ResponsivePie
          data={commonData}
          colors={{ datum: 'data.category.color[1]' }}
          defs={renderGradients(createGradientColors(categories))}
          fill={renderMatchs(createDescriptions(categories))}
          value="sum"
          valueFormat={(value) => formatNumberOutput(value, 'USD')}
          id="category.description"
          margin={{
            top: 30,
            right: 100,
            bottom: 30,
            left: 100,
          }}
          innerRadius={0.55}
          padAngle={0.7}
          cornerRadius={4}
          enableArcLinkLabels={false}
          activeOuterRadiusOffset={8}
          sortByValue={true}
          enableArcLabels={false}
          tooltip={({ datum: { id, formattedValue, color } }) =>
            renderTooltip(id, formattedValue, color)
          }
        />
      </Chart>
      <Legends data={commonData} chartType="pie" />
    </ChartsInfoContainer>
  );
}

PieChart.propTypes = {
  transactions: PropTypes.array,
  categories: PropTypes.array,
  chartFilter: PropTypes.string,
  date: PropTypes.object,
};

export default PieChart;
