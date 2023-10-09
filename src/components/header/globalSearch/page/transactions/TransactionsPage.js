import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { categoryIcons } from '../../../../../utils/constants/icons';
import {
  Account,
  AccountSvg,
  Amount,
  Category,
  CategorySvg,
  DeleteButtonSvg,
  DeleteMenuItem,
  EditButtonSvg,
  EditLinkContainer,
  FlexContainer,
  ItemButtonsContainer,
  ListItemContainer,
  MobItemButtonSvg,
  MobTransactionDate,
  TransactionDate,
  TransactionInfo,
  TransactionInfoAccount,
  TransactionItem,
} from '../../../../transactions/Transactions.styled';
import { dateFormatter } from '../../../../../utils/format/date';
import { Link } from 'react-router-dom';
import { pages } from '../../../../../utils/constants/pages';
import { formatDineroOutput } from '../../../../../utils/format/cash';
import { dinero } from 'dinero.js';
import { deleteClick, renderNotes } from '../../../../transactions/list/utils';
import { ToggleMenu } from '../../../../../theme/global';
import { MenuItem } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { deleteTransaction, editAccount } from '../../../../../actions/Actions';
import { ReactComponent as ToggleEditIcon } from '../../../../../assets/icons/shared/toggleEdit.svg';
import { ReactComponent as EditIcon } from '../../../../../assets/icons/shared/edit.svg';
import { ReactComponent as DeleteIcon } from '../../../../../assets/icons/shared/delete.svg';

function TransactionsPage({ transactions, accounts, categories, query }) {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [clickedTransaction, setClickedTransaction] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  return transactions.length ? (
    transactions.map((transaction, index) => {
      const transactionCategory = categories.find(
        (category) => category.id === transaction.category,
      );
      const transactionAccount = accounts.find(
        (account) => account.id === transaction.account,
      );

      if (!transactionCategory || !transactionAccount) {
        return null;
      }

      const Icon = categoryIcons[transactionCategory.icon];

      return (
        <div key={transaction.id}>
          <MobTransactionDate>
            {dateFormatter.format(new Date(transaction.date))}
          </MobTransactionDate>
          <ListItemContainer>
            <Link to={`${pages.transactions.info.main}/${transaction.id}`}>
              <TransactionItem>
                <Category>
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
                      fill={`url(#transaction${index})`}
                    ></circle>
                    <Icon height="24" width="24" x="7" y="7" />
                    <defs>
                      <linearGradient
                        id={`transaction${index}`}
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
                  {transactionCategory.description}
                </Category>
                <Account>
                  <AccountSvg
                    width="34"
                    height="23"
                    viewBox="0 0 34 23"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect
                      x="0"
                      y="0"
                      width="34"
                      height="23"
                      rx="5"
                      fill={`url(#${transactionAccount.description.replaceAll(
                        ' ',
                        '_',
                      )})`}
                    ></rect>
                    <defs>
                      <linearGradient
                        id={transactionAccount.description.replaceAll(' ', '_')}
                        x1="0"
                        y1="0"
                        x2="34"
                        y2="11.5"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor={transactionAccount.color[0]} />
                        <stop
                          offset="1"
                          stopColor={transactionAccount.color[1]}
                        />
                      </linearGradient>
                    </defs>
                  </AccountSvg>
                  {transactionAccount.description}
                </Account>
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
                      fill={`url(#mobTransaction${index})`}
                    ></circle>
                    <Icon height="24" width="24" x="7" y="7" />
                    <defs>
                      <linearGradient
                        id={`mobTransaction${index}`}
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
                <TransactionDate>
                  {dateFormatter.format(new Date(transaction.date))}
                </TransactionDate>
                {renderNotes(transaction.notes)}
              </TransactionItem>
            </Link>
            <ItemButtonsContainer>
              <ToggleMenu
                anchorEl={anchorEl}
                open={open}
                onClose={() => setAnchorEl(null)}
              >
                <MenuItem onClick={() => setAnchorEl(null)}>
                  <EditLinkContainer
                    to={`${pages.transactions.info.main}/${clickedTransaction.id}`}
                  >
                    <EditButtonSvg as={EditIcon} />
                    {t('TRANSACTIONS.EDIT')}
                  </EditLinkContainer>
                </MenuItem>
                <DeleteMenuItem onClick={() => setAnchorEl(null)}>
                  <FlexContainer
                    onClick={() =>
                      deleteClick(
                        clickedTransaction,
                        accounts,
                        editAccount,
                        deleteTransaction,
                        dispatch,
                      )
                    }
                  >
                    <DeleteButtonSvg as={DeleteIcon} />
                    {t('TRANSACTIONS.DELETE')}
                  </FlexContainer>
                </DeleteMenuItem>
              </ToggleMenu>
              <MobItemButtonSvg
                as={ToggleEditIcon}
                onClick={(event) => {
                  setClickedTransaction(transaction);
                  setAnchorEl(event.currentTarget);
                }}
              />
            </ItemButtonsContainer>
          </ListItemContainer>
        </div>
      );
    })
  ) : (
    <div>
      {t('SEARCH.NO_RESULTS')} {query}
    </div>
  );
}

TransactionsPage.propTypes = {
  transactions: PropTypes.array,
  accounts: PropTypes.array,
  categories: PropTypes.array,
  query: PropTypes.string,
};

export default TransactionsPage;
