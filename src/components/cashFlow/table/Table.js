import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { dinero, toDecimal, add } from 'dinero.js';
import { categoryIcons } from '../../../utils/constants/icons';
import { formatDineroOutput } from '../../../utils/format/cash';
import { createData } from '../utils/charts';
import { styled } from '@mui/material';
import { currencies, names } from '../../../utils/constants/currencies';
import { useSelector } from 'react-redux';

const TableContainer = styled('div')((props) => ({
  height: 500,
  overflowY: 'auto',
  '&::-webkit-scrollbar': {
    width: 5,
  },
  '&::-webkit-scrollbar-thumb': {
    background: props.theme.colors.background.ordinary,
    borderRadius: props.theme.borderRadius * 2,
  },
  '@media (min-width: 600px)': {
    height: 450,
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
  fontSize: '0.875rem',
  color: props.theme.colors.text.ordinary,
}));

const SumDescription = styled('span')(() => ({
  justifySelf: 'end',
}));

const TableItem = styled('div')((props) => ({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: props.theme.spacing(3),
  alignItems: 'center',
  padding: props.theme.spacing(3),
  paddingLeft: props.theme.spacing(2),
  marginBottom: props.theme.spacing(2),
  marginLeft: props.theme.spacing(2),
  marginRight: props.theme.spacing(2),
  background: props.theme.colors.background.body,
  border: `1px solid ${props.theme.colors.border.item}`,
  borderRadius: props.theme.borderRadius,
}));

const TotalTableItem = styled('div')((props) => ({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: props.theme.spacing(3),
  alignItems: 'center',
  padding: props.theme.spacing(2),
  paddingLeft: props.theme.spacing(3),
  marginBottom: props.theme.spacing(2),
  marginLeft: props.theme.spacing(2),
  marginRight: props.theme.spacing(4),
}));

const CategoryInfo = styled('div')(() => ({
  display: 'flex',
  alignItems: 'center',
  '@media (min-width: 600px)': {
    fontSize: '0.9rem',
  },
}));

const CategoryInfoSvg = styled('svg')((props) => ({
  marginRight: props.theme.spacing(3),
  minWidth: 38,
  '@media (min-width: 600px)': {
    minWidth: 30,
    height: 30,
    marginRight: props.theme.spacing(1),
  },
}));

const Amount = styled('div')(() => ({
  justifySelf: 'end',
  textAlign: 'right',
}));

const CategoryInfoAmount = styled(Amount, {
  shouldForwardProp: (prop) => prop !== '$amountType',
})((props) => ({
  color: props.theme.colors[props.$amountType],
}));

const Percent = styled('div')((props) => ({
  color: props.theme.colors.text.darker,
  fontSize: '0.8125rem',
}));

function renderTable(t, data, tableFilter, mainCurrency) {
  const totalSum = data.reduce(
    (sum, category) => add(sum, category.sum),
    dinero({ amount: 0, currency: currencies[mainCurrency] }),
  );
  const floatTotalSum = Number(toDecimal(totalSum));

  return (
    <>
      <TableDescriptionItem>
        <span>{t('ANALYSIS.CATEGORY')}</span>
        <SumDescription>{t('ANALYSIS.SUM')}</SumDescription>
      </TableDescriptionItem>
      <TotalTableItem>
        <div>{t('ANALYSIS.TOTAL_TABLE')}</div>
        <CategoryInfoAmount
          $amountType={tableFilter.slice(0, tableFilter.length - 1)}
        >
          {formatDineroOutput(totalSum, mainCurrency)}
          <Percent>100.00%</Percent>
        </CategoryInfoAmount>
      </TotalTableItem>
      {data.map((item) => {
        const Icon = categoryIcons[item.category.icon];
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
            <CategoryInfoAmount
              $amountType={tableFilter.slice(0, tableFilter.length - 1)}
            >
              {formatDineroOutput(item.sum, mainCurrency)}
              <Percent>
                {((toDecimal(item.sum) * 100) / floatTotalSum).toFixed(2)}%
              </Percent>
            </CategoryInfoAmount>
          </TableItem>
        );
      })}
    </>
  );
}

function Table({ transactions, categories, tableFilter, date }) {
  const { t } = useTranslation();
  const header = useSelector((state) => state.header);
  const mainCurrency = header.profile ? header.profile.currency : names.USD;
  const data = createData(
    { transactions, categories, tableFilter, date },
    'table',
    mainCurrency,
  );

  return (
    <TableContainer>
      {renderTable(t, data, tableFilter, mainCurrency)}
    </TableContainer>
  );
}

Table.propTypes = {
  transactions: PropTypes.array,
  categories: PropTypes.array,
  tableFilter: PropTypes.string,
  date: PropTypes.object,
};

export default Table;
