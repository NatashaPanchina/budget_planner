import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { dinero, toDecimal, add } from 'dinero.js';
import { USD } from '@dinero.js/currencies';

import { categoryIcons } from '../../../utils/constants/icons';
import { formatDineroOutput } from '../../../utils/format/cash';
import { createData } from '../utils/charts';
import { styled } from '@mui/material';

const TableContainer = styled('div')((props) => ({
  height: 450,
  overflowY: 'auto',
  '&::-webkit-scrollbar': {
    width: 5,
  },
  '&::-webkit-scrollbar-thumb': {
    background: `linear-gradient(109.86deg, ${props.theme.colors.main.purple} -2.35%, ${props.theme.colors.main.violet} 81.35%)`,
    borderRadius: props.theme.borderRadius * 2,
  },
}));

const TableDescriptionItem = styled('div')((props) => ({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  justifyContent: 'center',
  padding: props.theme.spacing(4),
  paddingLeft: props.theme.spacing(3),
  marginLeft: props.theme.spacing(2),
  marginRight: props.theme.spacing(2),
  marginTop: props.theme.spacing(5),
  fontSize: '0.875rem',
  color: props.theme.colors.text.ordinary,
  '@media (min-width: 600px)': {
    gridTemplateColumns: '1.5fr 1fr 1.5fr',
  },
  '@media (min-width: 768px)': {
    padding: props.theme.spacing(5),
    marginLeft: props.theme.spacing(5),
    marginRight: props.theme.spacing(5),
  },
}));

const PercentageDescription = styled('span')(() => ({
  display: 'none',
  '@media (min-width: 600px)': {
    display: 'flex',
    justifySelf: 'end',
  },
}));

const SumDescription = styled('span')(() => ({
  justifySelf: 'end',
  '@media (min-width: 768px)': {
    justifySelf: 'center',
  },
}));

const TableItem = styled('div')((props) => ({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: props.theme.spacing(3),
  alignItems: 'center',
  padding: props.theme.spacing(4),
  paddingLeft: props.theme.spacing(3),
  marginBottom: props.theme.spacing(2),
  marginLeft: props.theme.spacing(2),
  marginRight: props.theme.spacing(2),
  background: props.theme.colors.background.body,
  border: `1px solid ${props.theme.colors.border.item}`,
  borderRadius: props.theme.borderRadius,
  '@media (min-width: 600px)': {
    gridTemplateColumns: '1.5fr 1fr 1.5fr',
  },
  '@media (min-width: 768px)': {
    padding: props.theme.spacing(5),
    marginBottom: props.theme.spacing(4),
    marginLeft: props.theme.spacing(5),
    marginRight: props.theme.spacing(5),
  },
}));

const CategoryInfo = styled('div')(() => ({
  display: 'flex',
  alignItems: 'center',
}));

const CategoryInfoSvg = styled('svg')((props) => ({
  marginRight: props.theme.spacing(3),
  minWidth: 38,
}));

const Amount = styled('div')(() => ({
  justifySelf: 'end',
  textAlign: 'right',
  '@media (min-width: 768px)': {
    justifySelf: 'center',
  },
}));

const CategoryInfoAmount = styled(Amount, {
  shouldForwardProp: (prop) => prop !== '$amountType',
})((props) => ({
  color: props.theme.colors[props.$amountType],
}));

const Percent = styled('div')(() => ({
  display: 'none',
  justifySelf: 'end',
  '@media (min-width: 600px)': {
    display: 'flex',
  },
}));

const MobPercent = styled('div')((props) => ({
  color: props.theme.colors.text.darker,
  fontSize: '0.8125rem',
  '@media (min-width: 600px)': {
    display: 'none',
  },
}));

function renderTable(t, data, tableFilter) {
  let totalSum = data.reduce(
    (sum, category) => add(sum, category.sum),
    dinero({ amount: 0, currency: USD }),
  );
  let floatTotalSum = Number(toDecimal(totalSum));
  return (
    <>
      <TableDescriptionItem>
        <span>{t('ANALYSIS.CATEGORY')}</span>
        <PercentageDescription>
          {t('ANALYSIS.PERCENTAGE')}
        </PercentageDescription>
        <SumDescription>{t('ANALYSIS.SUM')}</SumDescription>
      </TableDescriptionItem>
      <TableItem>
        <div>{t('ANALYSIS.TOTAL_TABLE')}</div>
        <Percent>100.00%</Percent>
        <CategoryInfoAmount $amountType={tableFilter}>
          {formatDineroOutput(totalSum, 'USD')}
          <MobPercent>100.00%</MobPercent>
        </CategoryInfoAmount>
      </TableItem>
      {data.map((item) => {
        let Icon = categoryIcons[item.category.icon];
        return (
          <TableItem key={item.category.id}>
            <CategoryInfo>
              <CategoryInfoSvg
                width="38"
                height="38"
                viewBox="0 0 38 38"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  cx="19"
                  cy="19"
                  r="19"
                  fill={`url(#${item.category.description.replaceAll(
                    ' ',
                    '_',
                  )})`}
                ></circle>
                <Icon height="24" width="24" x="7" y="7" />
                <defs>
                  <linearGradient
                    id={item.category.description.replaceAll(' ', '_')}
                    x1="0"
                    y1="0"
                    x2="17"
                    y2="17"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor={item.category.color[0]} />
                    <stop offset="1" stopColor={item.category.color[1]} />
                  </linearGradient>
                </defs>
              </CategoryInfoSvg>
              {item.category.description}
            </CategoryInfo>
            <Percent>
              {((toDecimal(item.sum) * 100) / floatTotalSum).toFixed(2)}%
            </Percent>
            <CategoryInfoAmount $amountType={tableFilter}>
              {formatDineroOutput(item.sum, 'USD')}
              <MobPercent>
                {((toDecimal(item.sum) * 100) / floatTotalSum).toFixed(2)}%
              </MobPercent>
            </CategoryInfoAmount>
          </TableItem>
        );
      })}
    </>
  );
}

function Table({ transactions, categories, tableFilter, date }) {
  const { t } = useTranslation();

  let data = createData(
    { transactions, categories, tableFilter, date },
    'table',
  );

  return <TableContainer>{renderTable(t, data, tableFilter)}</TableContainer>;
}

Table.propTypes = {
  transactions: PropTypes.array,
  categories: PropTypes.array,
  tableFilter: PropTypes.string,
  date: PropTypes.object,
};

export default Table;
