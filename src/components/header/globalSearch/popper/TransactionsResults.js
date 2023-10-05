import React from 'react';
import PropTypes from 'prop-types';
import {
  Amount,
  CategorySvg,
  ItemButtonsContainer,
  ListItemContainer,
  MobTransactionDate,
  TransactionInfo,
  TransactionInfoAccount,
  TransactionItem,
} from '../GlobalSearch.styled';
import { categoryIcons } from '../../../../utils/constants/icons';
import { Link } from 'react-router-dom';
import { pages } from '../../../../utils/constants/pages';
import { dateFormatter } from '../../../../utils/format/date';
import { formatDineroOutput } from '../../../../utils/format/cash';
import { dinero } from 'dinero.js';
import { renderNotes } from '../utils';

function TransactionsResults({ transactions, categories, accounts }) {
  return transactions.slice(0, 3).map((transaction, index) => {
    const transactionCategory = categories.find(
      (category) => category.id === transaction.category,
    );
    const transactionAccount = accounts.find(
      (account) => account.id === transaction.account,
    );
    const Icon = categoryIcons[transactionCategory.icon];
    return (
      <div key={transaction.id}>
        <ListItemContainer>
          <Link to={`${pages.transactions.info.main}/${transaction.id}`}>
            <MobTransactionDate>
              {dateFormatter.format(new Date(transaction.date))}
            </MobTransactionDate>
            <TransactionItem>
              <TransactionInfo>
                <CategorySvg
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
                    fill={`url(#search${index})`}
                  ></circle>
                  <Icon height="24" width="24" x="7" y="7" />
                  <defs>
                    <linearGradient
                      id={`search${index}`}
                      x1="0"
                      y1="0"
                      x2="38"
                      y2="38"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor={transactionCategory.color[0]} />
                      <stop
                        offset="1"
                        stopColor={transactionCategory.color[1]}
                      />
                    </linearGradient>
                  </defs>
                </CategorySvg>
                <div>
                  <div>{transactionCategory.description}</div>
                  <TransactionInfoAccount>
                    {transactionAccount.description}
                  </TransactionInfoAccount>
                </div>
              </TransactionInfo>
              <Amount $amountType={transaction.transactionType}>
                {formatDineroOutput(dinero(transaction.amount), 'USD')}
              </Amount>
              {renderNotes(transaction.notes)}
            </TransactionItem>
          </Link>
          <ItemButtonsContainer></ItemButtonsContainer>
        </ListItemContainer>
      </div>
    );
  });
}

TransactionsResults.propTypes = {
  transactions: PropTypes.array,
  accounts: PropTypes.array,
  categories: PropTypes.array,
};

export default TransactionsResults;
