import React from 'react';
import PropTypes from 'prop-types';
import { dinero, toDecimal, add } from 'dinero.js';
import { formatDineroOutput } from '../../../utils/format/cash';
import { createData } from '../utils/charts';
import { styled } from '@mui/material';
import { currencies, names } from '../../../utils/constants/currencies';
import { useSelector } from 'react-redux';

const TableContainer = styled('div')((props) => ({
  maxHeight: 420,
  overflowY: 'auto',
  '&::-webkit-scrollbar': {
    width: 3,
  },
  '&::-webkit-scrollbar-thumb': {
    background: props.theme.colors.background.ordinary,
    borderRadius: props.theme.borderRadius * 2,
  },
  '@media (min-width: 600px)': {
    maxHeight: 450,
  },
}));

const TableItem = styled('div')((props) => ({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: props.theme.spacing(3),
  alignItems: 'center',
  padding: props.theme.spacing(4),
  paddingLeft: props.theme.spacing(2),
  marginLeft: props.theme.spacing(4),
  marginRight: props.theme.spacing(4),
  borderBottom: `1px solid ${props.theme.colors.border.item}`,
}));

const CategoryInfo = styled('div')(() => ({
  display: 'flex',
  alignItems: 'center',
  '@media (min-width: 600px)': {
    fontSize: '0.9rem',
  },
}));

export const SvgContainer = styled('div')((props) => ({
  position: 'relative',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: 38,
  height: 38,
  marginRight: props.theme.spacing(3),
  minWidth: 38,
  fontSize: '1.3rem',
  '@media (min-width: 600px)': {
    minWidth: 30,
    height: 30,
    marginRight: props.theme.spacing(2),
  },
}));

const Emoji = styled('div')(() => ({
  position: 'absolute',
}));

const Amount = styled('div')(() => ({
  justifySelf: 'end',
  textAlign: 'right',
}));

const CategoryInfoAmount = styled(Amount)(() => ({
  fontWeight: 500,
}));

const Percent = styled('div')((props) => ({
  color: props.theme.colors.text.darker,
  fontSize: '0.8125rem',
}));

function Table({ transactions, categories, tableFilter, date }) {
  const header = useSelector((state) => state.header);
  const mainCurrency = header.profile ? header.profile.currency : names.USD;
  const data = createData(
    { transactions, categories, tableFilter, date },
    'table',
    mainCurrency,
  );
  const totalSum = data.reduce(
    (sum, category) => add(sum, category.sum),
    dinero({ amount: 0, currency: currencies[mainCurrency] }),
  );
  const floatTotalSum = Number(toDecimal(totalSum));

  return (
    <TableContainer>
      {data.map((item) => {
        return (
          <TableItem key={item.category.id}>
            <CategoryInfo>
              <div>
                <SvgContainer>
                  <Emoji>{String.fromCodePoint(item.category.icon)}</Emoji>
                </SvgContainer>
              </div>
              {item.category.description}
            </CategoryInfo>
            <CategoryInfoAmount>
              {formatDineroOutput(item.sum, mainCurrency)}
              <Percent>
                {((toDecimal(item.sum) * 100) / floatTotalSum).toFixed(2)}%
              </Percent>
            </CategoryInfoAmount>
          </TableItem>
        );
      })}
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
