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
import { ChartsInfoContainer, Pie } from '../CashFlow.styled';
import { formatNumberOutput, getDigitAmount } from '../../../utils/format/cash';
import { styled } from '@mui/material';
import { currencies, names } from '../../../utils/constants/currencies';
import { useSelector } from 'react-redux';
import { add, dinero } from 'dinero.js';
import { createTypeFilter } from '../utils/shared';
import Tooltip from '../utils/tooltip/Tooltip';
import { toStringDate } from '../../../utils/format/date';

const CenterText = styled('text')((props) => ({
  fill: props.theme.colors.text.primary,
  fontWeight: 500,
  fontSize: '1.3rem',
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
        {getDigitAmount(totalAmount, mainCurrency)}
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
      const transactionDate = transaction.date;
      return (
        transaction.transactionType === filter &&
        transactionDate >= toStringDate(date.from) &&
        transactionDate <= toStringDate(date.to)
      );
    })
    .reduce(
      (sum, transaction) => add(sum, dinero(transaction.mainCurrencyAmount)),
      dinero({ amount: 0, currency: currencies[mainCurrency] }),
    );

  return (
    <ChartsInfoContainer>
      <Pie>
        <ResponsivePie
          theme={{
            labels: {
              text: {
                fill: '#fff',
                fontSize: 16,
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
            top: 10,
            right: 10,
            bottom: 10,
            left: 10,
          }}
          innerRadius={0.65}
          enableArcLinkLabels={false}
          activeOuterRadiusOffset={8}
          sortByValue={true}
          enableArcLabels={true}
          arcLabel={(datum) => {
            return `${String.fromCodePoint(datum.data.category.icon)}`;
          }}
          arcLabelsSkipAngle={20}
          tooltip={({ datum: { id, formattedValue, value } }) => (
            <Tooltip
              id={id}
              formattedValue={formattedValue}
              value={value}
              totalAmount={totalAmount}
            />
          )}
          layers={[
            'arcs',
            'arcLabels',
            'arcLinkLabels',
            'legends',
            CenteredBalance(totalAmount, mainCurrency),
          ]}
        />
      </Pie>
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
