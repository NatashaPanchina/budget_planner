import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { dinero } from 'dinero.js';

import { formatDineroOutput } from '../../../utils/format/cash';
import { dateFormatter } from '../../../utils/format/date';

import { categoryIcons } from '../../../utils/constants/icons';
import { ReactComponent as SearchIcon } from '../../../assets/icons/shared/search.svg';
import { ReactComponent as CancelSearchIcon } from '../../../assets/icons/shared/cancelSearch.svg';
import { ReactComponent as ToggleEditIcon } from '../../../assets/icons/shared/toggleEdit.svg';
import { ReactComponent as EditIcon } from '../../../assets/icons/shared/edit.svg';
import { ReactComponent as DeleteIcon } from '../../../assets/icons/shared/delete.svg';
import { ReactComponent as NoResults } from '../../../assets/icons/shared/noResults.svg';

import { useDispatch } from 'react-redux';
import { deleteClick, renderNotes } from './utils';
import { pages } from '../../../utils/constants/pages';
import {
  Account,
  Amount,
  Category,
  TransactionDate,
  Description,
  TransactionItem,
  TransactionsTitleContainer,
  TransactionsTitleLink,
  CategorySvg,
  AccountSvg,
  TransactionInfo,
  ItemButtonsContainer,
  TransactionInfoAccount,
  MobItemButtonSvg,
  MobTransactionDate,
  ListItemContainer,
  EditLinkContainer,
  FlexContainer,
  EditButtonSvg,
  DescriptionCategory,
  DeleteButtonSvg,
  DeleteMenuItem,
} from '../Transactions.styled';
import {
  CancelSearchSvg,
  NoSearchResults,
  NoSearchResultsContainer,
  NoSearchResultsSvg,
  SearchField,
  ToggleMenu,
} from '../../../theme/global';
import { InputAdornment, MenuItem } from '@mui/material';
import { useTransactionsSearch } from '../../../hooks/useSearch';

function TransactionsList({
  transactions,
  accounts,
  categories,
  deleteTransaction,
  editAccount,
}) {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { filterAccount } = useParams();
  const [clickedTransaction, setClickedTransaction] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [query, setQuery] = useState('');

  const searchData = useTransactionsSearch(query, transactions);

  return (
    <>
      <TransactionsTitleContainer>
        <TransactionsTitleLink
          to={`${pages.transactions.all}/${filterAccount}`}
        >
          {t('TRANSACTIONS.ALL')}
        </TransactionsTitleLink>
        <TransactionsTitleLink
          to={`${pages.transactions.expenses}/${filterAccount}`}
        >
          {t('TRANSACTIONS.FILTER_EXPENSES')}
        </TransactionsTitleLink>
        <TransactionsTitleLink
          to={`${pages.transactions.incomes}/${filterAccount}`}
        >
          {t('TRANSACTIONS.FILTER_INCOMES')}
        </TransactionsTitleLink>
        <TransactionsTitleLink
          to={`${pages.transactions.transfers}/${filterAccount}`}
        >
          {t('TRANSACTIONS.FILTER_TRANSFERS')}
        </TransactionsTitleLink>
      </TransactionsTitleContainer>
      <SearchField
        placeholder={t('TRANSACTIONS.SEARCH')}
        value={query}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
          endAdornment: query ? (
            <InputAdornment position="end" onClick={() => setQuery('')}>
              <CancelSearchSvg as={CancelSearchIcon} />
            </InputAdornment>
          ) : null,
        }}
        onChange={(event) => setQuery(event.target.value)}
      />
      {searchData.length ? (
        <>
          <Description>
            <DescriptionCategory>
              {t('TRANSACTIONS.CATEGORY')}
            </DescriptionCategory>
            <span>{t('TRANSACTIONS.ACCOUNT')}</span>
            <span>{t('TRANSACTIONS.AMOUNT')}</span>
            <span>{t('TRANSACTIONS.DATE')}</span>
          </Description>
          {searchData.map((transaction, index) => {
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
                  <Link
                    to={`${pages.transactions.info.main}/${transaction.id}`}
                  >
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
                            fill={`url(#${index})`}
                          ></circle>
                          <Icon height="24" width="24" x="7" y="7" />
                          <defs>
                            <linearGradient
                              id={index}
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
                              id={transactionAccount.description.replaceAll(
                                ' ',
                                '_',
                              )}
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
                            fill={`url(#mob${index})`}
                          ></circle>
                          <Icon height="24" width="24" x="7" y="7" />
                          <defs>
                            <linearGradient
                              id={`mob${index}`}
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
          })}
        </>
      ) : (
        <NoSearchResults>
          <NoSearchResultsContainer>
            <div>
              <NoSearchResultsSvg as={NoResults} />
            </div>
            <div>{`${t('SEARCH.NO_RESULTS')} "${query}"`}</div>
          </NoSearchResultsContainer>
        </NoSearchResults>
      )}
    </>
  );
}

TransactionsList.propTypes = {
  transactions: PropTypes.array,
  accounts: PropTypes.array,
  categories: PropTypes.array,
  deleteTransaction: PropTypes.func,
  editAccount: PropTypes.func,
};

export default TransactionsList;
