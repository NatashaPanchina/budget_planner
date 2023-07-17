import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { dinero, toDecimal, add } from 'dinero.js';
import { USD } from '@dinero.js/currencies';

import { categoryIcons } from '../../../utils/constants/icons';
import { formatDineroOutput } from '../../../utils/format/cash';
import { createData } from '../utils/charts';

import { css, styled } from 'styled-components';

const TableContainer = styled.div((props) => ({
  height: 400,
  overflowY: 'auto',
  '&::-webkit-scrollbar': {
    width: 5,
  },
  '&::-webkit-scrollbar-thumb': {
    background: `linear-gradient(109.86deg, ${props.theme.colors.main.purple} -2.35%, ${props.theme.colors.main.violet} 81.35%)`,
    borderRadius: props.theme.borderRadius * 2,
  },
}));

const TableDescriptionItem = styled.div((props) => ({
  display: 'grid',
  gridTemplateColumns: '1.5fr 1fr 1.5fr',
  justifyContent: 'center',
  width: '94%',
  height: 35,
  paddingLeft: props.theme.spacing(5),
  marginTop: props.theme.spacing(10),
  marginLeft: 'auto',
  marginRight: 'auto',
  fontSize: '0.875rem',
  color: props.theme.colors.text.ordinary,
  '& span:first-child': {
    paddingLeft: props.theme.spacing(5),
  },
}));

const TableItem = styled.div((props) => ({
  display: 'grid',
  gridTemplateColumns: '1.5fr 1fr 1.5fr',
  alignItems: 'center',
  width: '94%',
  height: 65,
  paddingLeft: props.theme.spacing(5),
  marginBottom: props.theme.spacing(4),
  marginLeft: 'auto',
  marginRight: 'auto',
  background: props.theme.colors.background.body,
  border: `1px solid ${props.theme.colors.border.item}`,
  borderRadius: props.theme.borderRadius,
}));

const CategoryInfo = styled.div(() => ({
  display: 'flex',
  alignItems: 'center',
}));

const CategoryInfoSvg = styled.svg((props) => ({
  marginRight: props.theme.spacing(3),
}));

const CategoryInfoAmount = styled.div((props) => {
  switch (props.$amountType) {
    case 'expenses':
      return css(() => ({
        color: props.theme.colors.expense,
      }));
    case 'incomes':
      return css(() => ({
        color: props.theme.colors.income,
      }));
    case 'transfers':
      return css(() => ({
        color: props.theme.colors.transfer,
      }));
    default:
      return css(() => ({
        color: props.theme.colors.expense,
      }));
  }
});

function renderTable(t, data, tableFilter) {
  let totalSum = data.reduce(
    (sum, category) => add(sum, category.sum),
    dinero({ amount: 0, currency: USD }),
  );
  let floatTotalSum = Number(toDecimal(totalSum));
  return (
    <React.Fragment>
      <TableDescriptionItem>
        <span>{t('ANALYSIS.CATEGORY')}</span>
        <span>{t('ANALYSIS.PERCENTAGE')}</span>
        <span>{t('ANALYSIS.SUM')}</span>
      </TableDescriptionItem>
      <TableItem>
        <div>{t('ANALYSIS.TOTAL_TABLE')}</div>
        <div>100.00%</div>
        <CategoryInfoAmount $amountType={tableFilter}>
          {formatDineroOutput(totalSum, 'USD')}
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
                  fill={`url(#${item.category.description})`}
                ></circle>
                <Icon height="24" width="24" x="7" y="7" />
                <defs>
                  <linearGradient
                    id={item.category.description}
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
            <div>
              {((toDecimal(item.sum) * 100) / floatTotalSum).toFixed(2)}%
            </div>
            <CategoryInfoAmount $amountType={tableFilter}>
              {formatDineroOutput(item.sum, 'USD')}
            </CategoryInfoAmount>
          </TableItem>
        );
      })}
    </React.Fragment>
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
