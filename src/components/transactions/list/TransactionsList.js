import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { dinero } from 'dinero.js';

import { formatDineroOutput } from '../../../utils/format/cash';
import { dateFormatter } from '../../../utils/format/date';

import { ReactComponent as SearchIcon } from '../../../assets/icons/shared/search.svg';
import { ReactComponent as CancelSearchIcon } from '../../../assets/icons/shared/cancelSearch.svg';
import { ReactComponent as ToggleEditIcon } from '../../../assets/icons/shared/toggleEdit.svg';
import { ReactComponent as EditIcon } from '../../../assets/icons/shared/edit.svg';
import { ReactComponent as DeleteIcon } from '../../../assets/icons/shared/delete.svg';

import { useDispatch, useSelector } from 'react-redux';
import { deleteClick } from './utils';
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
  InfoDialog,
  NoResults,
  NoResultsContainer,
  SearchField,
  ToggleMenu,
} from '../../../theme/global';
import { Dialog, InputAdornment, MenuItem } from '@mui/material';
import { useTransactionsSearch } from '../../../hooks/useSearch';
import NoResultsFound from '../../noResults/NoResultsFound';
import CategorySvg from '../../shared/CategorySvg';
import AccountSvg from '../../shared/AccountSvg';
import { names } from '../../../utils/constants/currencies';
import InfoTransaction from '../infoTransaction/InfoTransaction';
import DeleteAlert from '../../alerts/DeleteAlert';
import Notes from '../../shared/Notes';

function TransactionsList({ transactions, accounts, categories }) {
  const filters = useSelector((state) => state.transactions.filters);
  const header = useSelector((state) => state.header);
  const mainCurrency = header.profile ? header.profile.currency : names.USD;
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { filterAccount } = useParams();
  const [clickedTransaction, setClickedTransaction] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [query, setQuery] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const searchData = useTransactionsSearch(query, transactions, filters);
  const [openDelAlert, setOpenDelAlert] = useState(false);
  const deleteCallback = () =>
    deleteClick(clickedTransaction, accounts, dispatch, mainCurrency);

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
        autoComplete="off"
      />
      <InfoDialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <InfoTransaction
          clickedTransaction={clickedTransaction.id}
          transactions={transactions}
          accounts={accounts}
          categories={categories}
          setOpenDialog={setOpenDialog}
        />
      </InfoDialog>
      {transactions.length === 0 ? (
        <NoResultsContainer>
          <NoResults>
            <div>{t('TRANSACTIONS.NO_TRANSACTIONS')}</div>
          </NoResults>
        </NoResultsContainer>
      ) : searchData.length ? (
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

            return (
              <div key={transaction.id}>
                <MobTransactionDate>
                  {dateFormatter.format(new Date(transaction.date))}
                </MobTransactionDate>
                <ListItemContainer>
                  <TransactionItem
                    onClick={() => {
                      setClickedTransaction(transaction);
                      setOpenDialog(true);
                    }}
                  >
                    <Category>
                      <CategorySvg
                        category={transactionCategory}
                        fillName={`transactionCategory${index}`}
                      />
                      {transactionCategory.description}
                    </Category>
                    <Account>
                      <AccountSvg account={transactionAccount} />
                      {transactionAccount.description}
                    </Account>
                    <TransactionInfo>
                      <CategorySvg
                        category={transactionCategory}
                        fillName={`mobTransactionCategory${index}`}
                      />
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
                    <TransactionDate>
                      {dateFormatter.format(new Date(transaction.date))}
                    </TransactionDate>
                    <Notes notes={transaction.notes} />
                  </TransactionItem>
                  <ItemButtonsContainer>
                    <ToggleMenu
                      anchorEl={anchorEl}
                      open={open}
                      onClose={() => setAnchorEl(null)}
                    >
                      <MenuItem
                        onClick={() => {
                          setAnchorEl(null);
                          setOpenDialog(true);
                        }}
                      >
                        <EditLinkContainer>
                          <EditButtonSvg as={EditIcon} />
                          {t('TRANSACTIONS.EDIT')}
                        </EditLinkContainer>
                      </MenuItem>
                      <DeleteMenuItem
                        onClick={() => {
                          setAnchorEl(null);
                          setOpenDelAlert(true);
                        }}
                      >
                        <FlexContainer>
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
        <NoResultsFound query={query} />
      )}
      <Dialog open={openDelAlert} onClose={() => setOpenDelAlert(false)}>
        <DeleteAlert
          setOpen={setOpenDelAlert}
          deleteCallback={deleteCallback}
        />
      </Dialog>
    </>
  );
}

TransactionsList.propTypes = {
  transactions: PropTypes.array,
  accounts: PropTypes.array,
  categories: PropTypes.array,
};

export default TransactionsList;
