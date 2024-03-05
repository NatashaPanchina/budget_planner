import React from 'react';
import PropTypes from 'prop-types';
import { dinero, toDecimal, add } from 'dinero.js';
import { ResponsivePie } from '@nivo/pie';
import { linearGradientDef } from '@nivo/core';
import AccountsChartLegends from './AccountsChartLegends.js';
import {
  formatDineroOutput,
  formatNumberOutput,
} from '../../../utils/format/cash/index.js';
import {
  PieChartContainer,
  CenterText,
  Tooltip,
  TooltipSvg,
  TooltipValue,
  LegendsContainer,
} from '../Accounts.styled.js';
import { currencies, names } from '../../../utils/constants/currencies.js';

export function renderTooltip(id, balance) {
  return (
    <Tooltip>
      <TooltipSvg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="10"
          cy="10"
          r="10"
          fill={`url(#${id.replaceAll(' ', '_')})`}
        ></circle>
      </TooltipSvg>
      {id}:
      <TooltipValue>
        {formatDineroOutput(dinero(balance), balance.currency.code)}
      </TooltipValue>
    </Tooltip>
  );
}

function renderGradientDefs(accounts) {
  return accounts.map((account) => {
    return linearGradientDef(
      account.description.replaceAll(' ', ''),
      [
        { offset: 0, color: account.color[0] },
        { offset: 100, color: account.color[1] },
      ],
      {
        gradientTransform: 'rotate(-45 0.5 0.5)',
      },
    );
  });
}

function renderMatchs(accounts) {
  return accounts.map((account) => {
    return {
      match: { id: account.description },
      id: account.description.replaceAll(' ', ''),
    };
  });
}

const CenteredBalance = function (totalBalance, mainCurrency) {
  return function centeredMetric({ centerX, centerY }) {
    return (
      <CenterText
        x={centerX}
        y={centerY}
        textAnchor="middle"
        alignmentBaseline="middle"
      >
        {formatDineroOutput(totalBalance, mainCurrency)}
      </CenterText>
    );
  };
};

function AccountsChart({ mainCurrency, data }) {
  const chartsData = data.map((account) => {
    return {
      ...account,
      convertedBalance: toDecimal(dinero(account.mainCurrencyBalance)),
    };
  });
  const totalBalance = data.reduce(
    (sum, account) => add(sum, dinero(account.mainCurrencyBalance)),
    dinero({ amount: 0, currency: currencies[mainCurrency] }),
  );

  return (
    <>
      <PieChartContainer>
        <ResponsivePie
          data={chartsData}
          colors={{ datum: 'data.color[0]' }}
          value="convertedBalance"
          valueFormat={(value) =>
            formatNumberOutput(value, names[mainCurrency])
          }
          id="description"
          margin={{
            top: 10,
            right: 10,
            bottom: 10,
            left: 10,
          }}
          innerRadius={0.65}
          padAngle={0.7}
          cornerRadius={3}
          enableArcLinkLabels={false}
          activeOuterRadiusOffset={7}
          enableArcLabels={false}
          sortByValue={true}
          defs={renderGradientDefs(data)}
          fill={renderMatchs(data)}
          tooltip={({ datum: { id, data, color } }) =>
            renderTooltip(id, data.balance, color)
          }
          layers={[
            'arcs',
            'arcLabels',
            'arcLinkLabels',
            'legends',
            CenteredBalance(totalBalance, mainCurrency),
          ]}
        />
      </PieChartContainer>
      <LegendsContainer>
        <AccountsChartLegends
          data={chartsData}
          totalBalance={toDecimal(totalBalance)}
          mainCurrency={mainCurrency}
        />
      </LegendsContainer>
    </>
  );
}

AccountsChart.propTypes = {
  mainCurrency: PropTypes.string,
  data: PropTypes.array,
};

export default AccountsChart;
