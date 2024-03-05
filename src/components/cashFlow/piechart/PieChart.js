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
import { Chart, ChartsInfoContainer } from '../CashFlow.styled';
import {
  formatDineroOutput,
  formatNumberOutput,
} from '../../../utils/format/cash';
import { styled } from '@mui/material';
import { currencies, names } from '../../../utils/constants/currencies';
import { useSelector } from 'react-redux';
import { add, dinero, toDecimal } from 'dinero.js';
import { createTypeFilter } from '../utils/shared';

const CenterText = styled('text')((props) => ({
  fill: props.theme.colors.text.primary,
}));

const CenteredBalance = function (totalAmount, mainCurrency) {
  return function centeredMetric({ centerX, centerY }) {
    return (
      <CenterText
        x={centerX}
        y={centerY}
        textAnchor="middle"
        alignmentBaseline="middle"
      >
        {formatDineroOutput(totalAmount, mainCurrency)}
      </CenterText>
    );
  };
};

function PieChart({ transactions, categories, chartFilter, date }) {
  const header = useSelector((state) => state.header);
  const mainCurrency = header.profile ? header.profile.currency : names.USD;
  const commonData = createData(
    { transactions, categories, chartFilter, date },
    'pie',
    mainCurrency,
  );

  const filter = createTypeFilter(chartFilter);
  const totalAmount = transactions
    .filter((transaction) => {
      const transactionDate = new Date(transaction.date);
      return (
        transaction.transactionType === filter &&
        transactionDate >= date.from &&
        transactionDate <= date.to
      );
    })
    .reduce(
      (sum, transaction) => add(sum, dinero(transaction.mainCurrencyAmount)),
      dinero({ amount: 0, currency: currencies[mainCurrency] }),
    );

  return (
    <ChartsInfoContainer>
      <Chart>
        <ResponsivePie
          theme={{
            labels: {
              text: {
                fill: '#fff',
              },
            },
          }}
          data={commonData}
          colors={{ datum: 'data.category.color[1]' }}
          defs={renderGradients(createGradientColors(categories))}
          fill={renderMatchs(createDescriptions(categories))}
          value="sum"
          valueFormat={(value) =>
            formatNumberOutput(value, names[mainCurrency])
          }
          id="category.description"
          margin={{
            top: 30,
            right: 100,
            bottom: 30,
            left: 100,
          }}
          innerRadius={0.65}
          padAngle={0.7}
          cornerRadius={4}
          enableArcLinkLabels={false}
          activeOuterRadiusOffset={8}
          sortByValue={true}
          enableArcLabels={true}
          arcLabel={(datum) =>
            `${((datum.value * 100) / toDecimal(totalAmount)).toFixed(2)}%`
          }
          arcLabelsSkipAngle={20}
          tooltip={({ datum: { id, formattedValue, color } }) =>
            renderTooltip(id, formattedValue, color)
          }
          layers={[
            'arcs',
            'arcLabels',
            'arcLinkLabels',
            'legends',
            CenteredBalance(totalAmount, mainCurrency),
          ]}
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
