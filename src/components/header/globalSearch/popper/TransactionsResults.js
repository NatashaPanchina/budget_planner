import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Amount,
  CategorySvg,
  Emoji,
  ListItemContainer,
  MobTransactionDate,
  SvgContainer,
  TransactionInfo,
  TransactionInfoAccount,
  TransactionItem,
} from '../GlobalSearch.styled';
import { dateFormatter } from '../../../../utils/format/date';
import { formatDineroOutput } from '../../../../utils/format/cash';
import { dinero } from 'dinero.js';
import { useTranslation } from 'react-i18next';
import { InfoDialog } from '../../../../theme/global';
import InfoTransaction from '../../../transactions/infoTransaction/InfoTransaction';
import Notes from '../../../shared/Notes';

function TransactionsResults({ transactions, categories, accounts, query }) {
  const { t } = useTranslation();
  const [clickedTransaction, setClickedTransaction] = useState('');
  const [openDialog, setOpenDialog] = useState(false);

  return transactions.length ? (
    <>
      <InfoDialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <InfoTransaction
          clickedTransaction={clickedTransaction.id}
          transactions={transactions}
          accounts={accounts}
          categories={categories}
          setOpenDialog={setOpenDialog}
        />
      </InfoDialog>
      {transactions.map((transaction, index) => {
        const transactionCategory = categories.find(
          (category) => category.id === transaction.category,
        );
        const transactionAccount = accounts.find(
          (account) => account.id === transaction.account,
        );

        if (!transactionCategory || !transactionAccount) {
          return null;
        }

        return (
          <div key={transaction.id}>
            <ListItemContainer>
              <MobTransactionDate>
                {dateFormatter.format(new Date(transaction.date))}
              </MobTransactionDate>
              <TransactionItem
                onClick={() => {
                  setClickedTransaction(transaction);
                  setOpenDialog(true);
                }}
              >
                <TransactionInfo>
                  <div>
                    <SvgContainer>
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
                          fill={`url(#popperTransactionCategory${index})`}
                        ></circle>
                        <defs>
                          <linearGradient
                            id={`popperTransactionCategory${index}`}
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
                      <Emoji>
                        {String.fromCodePoint(transactionCategory.icon)}
                      </Emoji>
                    </SvgContainer>
                  </div>
                  <div>
                    <div>{transactionCategory.description}</div>
                    <TransactionInfoAccount>
                      {transactionAccount.description}
                    </TransactionInfoAccount>
                  </div>
                </TransactionInfo>
                <Amount $amountType={transaction.transactionType}>
                  {formatDineroOutput(
                    dinero(transaction.amount),
                    transaction.amount.currency.code,
                  )}
                </Amount>
                <Notes notes={transaction.notes} />
              </TransactionItem>
            </ListItemContainer>
          </div>
        );
      })}
    </>
  ) : (
    <div>{`${t('SEARCH.NO_RESULTS')} ${query}`}</div>
  );
}

TransactionsResults.propTypes = {
  transactions: PropTypes.array,
  accounts: PropTypes.array,
  categories: PropTypes.array,
  query: PropTypes.string,
};

export default TransactionsResults;
