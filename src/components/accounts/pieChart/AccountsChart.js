import React from 'react';
import PropTypes from 'prop-types';
import { dinero, toDecimal } from 'dinero.js';
import { ResponsivePie } from '@nivo/pie';
import { linearGradientDef } from '@nivo/core';
import AccountsChartLegends from './AccountsChartLegends.js';
import {
  formatDineroOutput,
  formatNumberOutput,
  getDigitAmount,
} from '../../../utils/format/cash/index.js';
import {
  PieChartContainer,
  CenterText,
  Tooltip,
  TooltipSvg,
  TooltipValue,
  LegendsContainer,
} from '../Accounts.styled.js';
import { names } from '../../../utils/constants/currencies.js';

export const renderTooltip = (id, balance) => {
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
          fill={`url(#${id.replaceAll(/[ ()]/g, '_')})`}
        ></circle>
      </TooltipSvg>
      {id}:
      <TooltipValue>
        {formatDineroOutput(dinero(balance), balance.currency.code)}
      </TooltipValue>
    </Tooltip>
  );
};

const renderGradientDefs = (accounts) => {
  return accounts.map((account) => {
    return linearGradientDef(
      account.description.replaceAll(/[ ()]/g, '_'),
      [
        { offset: 0, color: account.color[0] },
        { offset: 100, color: account.color[1] },
      ],
      {
        gradientTransform: 'rotate(-45 0.5 0.5)',
      },
    );
  });
};

const renderMatchs = (accounts) => {
  return accounts.map((account) => {
    return {
      match: { id: account.description },
      id: account.description.replaceAll(/[ ()]/g, '_'),
    };
  });
};

const CenteredBalance = function (totalBalance, mainCurrency) {
  return function centeredMetric({ centerX, centerY }) {
    return (
      <CenterText
        x={centerX}
        y={centerY}
        textAnchor="middle"
        alignmentBaseline="middle"
      >
        {getDigitAmount(totalBalance, mainCurrency)}
      </CenterText>
    );
  };
};

function AccountsChart({ mainCurrency, data, totalBalance }) {
  const chartsData = data.map((account) => {
    return {
      ...account,
      convertedBalance: toDecimal(dinero(account.mainCurrencyBalance)),
    };
  });

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
  totalBalance: PropTypes.object,
};

export default AccountsChart;
