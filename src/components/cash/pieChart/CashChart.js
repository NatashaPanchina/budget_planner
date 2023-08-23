import React from 'react';
import PropTypes from 'prop-types';
import { dinero, toDecimal, add } from 'dinero.js';
import { USD } from '@dinero.js/currencies';
import { ResponsivePie } from '@nivo/pie';
import { linearGradientDef } from '@nivo/core';

import CashChartLegends from './CashChartLegends.js';
import {
  formatDineroOutput,
  formatNumberOutput,
} from '../../../utils/format/cash';
import {
  PieChartContainer,
  CenterText,
  Tooltip,
  TooltipSvg,
  TooltipValue,
  LegendsContainer,
} from '../Cash.styled.js';

export function renderTooltip(id, formattedValue) {
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
      {id}:<TooltipValue>{formattedValue}</TooltipValue>
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

const CenteredBalance = function (totalBalance) {
  return function centeredMetric({ centerX, centerY }) {
    return (
      <CenterText
        x={centerX}
        y={centerY}
        textAnchor="middle"
        alignmentBaseline="middle"
      >
        {formatDineroOutput(totalBalance, 'USD')}
      </CenterText>
    );
  };
};

function CashChart({ data }) {
  const accounts = data.map((account) => {
    return {
      ...account,
      balance: toDecimal(dinero(account.balance)),
    };
  });

  let totalBalance = data.reduce(
    (sum, account) => add(sum, dinero(account.balance)),
    dinero({ amount: 0, currency: USD }),
  );

  return (
    <>
      <PieChartContainer>
        <ResponsivePie
          data={accounts}
          colors={{ datum: 'data.color[0]' }}
          value="balance"
          valueFormat={(value) => formatNumberOutput(value, 'USD')}
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
          tooltip={({ datum: { id, formattedValue, color } }) =>
            renderTooltip(id, formattedValue, color)
          }
          layers={[
            'arcs',
            'arcLabels',
            'arcLinkLabels',
            'legends',
            CenteredBalance(totalBalance),
          ]}
        />
      </PieChartContainer>
      <LegendsContainer>
        <CashChartLegends
          data={accounts}
          totalBalance={toDecimal(totalBalance)}
        />
      </LegendsContainer>
    </>
  );
}

CashChart.propTypes = {
  data: PropTypes.array,
};

export default CashChart;
