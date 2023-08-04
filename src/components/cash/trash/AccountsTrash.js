import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { dinero } from 'dinero.js';

import { formatDineroOutput } from '../../../utils/format/cash';
import {
  createCashFilter,
  createLocaleCashType,
  filterAccounts,
  renderNotes,
} from '../utils';
import { idbAddItem, idbDeleteItem } from '../../../indexedDB/IndexedDB';
import {
  fetchAccountsData,
  fetchTransactionsData,
  restoreAccount,
  deleteAccount,
  deleteTransaction,
} from '../../../actions/Actions';

import { ReactComponent as BackIcon } from '../../../assets/icons/shared/back.svg';
import { ReactComponent as RestoreIcon } from '../../../assets/icons/shared/restore.svg';
import { ReactComponent as DeleteIcon } from '../../../assets/icons/shared/delete.svg';
import searchIcon from '../../../assets/icons/shared/search.svg';
import cardBackground from '../../../assets/icons/shared/cardBackground.svg';

import { styled } from 'styled-components';
import {
  BackLink,
  Search,
  SearchImg,
  SearchInput,
  BackLinkSvg,
  TrashHeader,
  TrashContainer,
} from '../../../theme/global';
import {
  Card,
  CardName,
  CardBalanceContainer,
  CardBalance,
  CurrentBalance,
  CashTitleContainer,
  CashTitleLink,
  CardButton,
  CardButtonSvg,
  CardButtonTitle,
} from '../Cash.styled';
import { pages } from '../../../utils/constants/pages';
import { Grid } from '@mui/material';

const CashListItem = styled.div((props) => ({
  display: 'flex',
  alignItems: 'center',
  marginBottom: props.theme.spacing(10),
}));

const ArchivedCount = styled.div((props) => ({
  fontSize: '0.875rem',
  color: props.theme.colors.main.violet,
  height: 50,
  display: 'flex',
  alignItems: 'center',
}));

function renderAccounts(
  accounts,
  transactions,
  filterType,
  restoreAccount,
  deleteAccount,
  deleteTransaction,
  dispatch,
  t,
) {
  return (
    <>
      <ArchivedCount>
        {t(`ACCOUNTS_TRASH.${createLocaleCashType(filterType)}_COUNT`)}
        {accounts.length}
      </ArchivedCount>
      {accounts.map((account) => {
        const balance = dinero(account.balance);
        return (
          <CashListItem key={account.id}>
            <div>
              <Card
                $cardBackground={cardBackground}
                $from={account.color[0]}
                $to={account.color[1]}
              >
                <CardName>{account.description}</CardName>
                <CardBalanceContainer>
                  <CardBalance>
                    {formatDineroOutput(balance, 'USD')}
                  </CardBalance>
                  <CurrentBalance>
                    {t('ACCOUNTS_TRASH.CURRENT_BALANCE')}
                  </CurrentBalance>
                </CardBalanceContainer>
              </Card>
              {renderNotes(account.notes)}
            </div>
            <div>
              <CardButton
                onClick={() => {
                  dispatch(restoreAccount(account.id));
                  idbAddItem({ ...account, archived: false }, 'accounts');
                }}
              >
                <CardButtonSvg as={RestoreIcon} />
                <CardButtonTitle>{t('ACCOUNTS_TRASH.RESTORE')}</CardButtonTitle>
              </CardButton>
              <CardButton
                onClick={() => {
                  transactions.forEach((transaction) => {
                    if (transaction.account === account.id) {
                      dispatch(deleteTransaction(transaction.id));
                      idbDeleteItem(transaction.id, 'transactions');
                    }
                  });
                  dispatch(deleteAccount(account.id));
                  idbDeleteItem(account.id, 'accounts');
                }}
              >
                <CardButtonSvg as={DeleteIcon} />
                <CardButtonTitle>{t('ACCOUNTS_TRASH.DELETE')}</CardButtonTitle>
              </CardButton>
            </div>
          </CashListItem>
        );
      })}
    </>
  );
}

export default function AccountsTrash() {
  const accounts = useSelector((state) => state.accounts);
  const transactions = useSelector((state) => state.transactions);
  const dispatch = useDispatch();

  const { t } = useTranslation();
  const filterType = createCashFilter(useParams().filterType);
  const archivedAccounts = accounts.accounts.filter(
    (account) => account.archived,
  );

  useEffect(() => {
    dispatch(fetchAccountsData());
    dispatch(fetchTransactionsData());
  }, [dispatch]);

  return accounts.status === 'loading' || transactions.status === 'loading' ? (
    <div>Loading</div>
  ) : (
    <Grid item xs={12}>
      <TrashContainer>
        <TrashHeader>
          <BackLink to={pages.cash.all}>
            <BackLinkSvg as={BackIcon} />
          </BackLink>
          {t('ACCOUNTS_TRASH.ARCHIVED_CASH')}
        </TrashHeader>
        <CashTitleContainer>
          <CashTitleLink to={pages.cash.trash.all}>
            {t('ACCOUNTS_TRASH.ALL')}
          </CashTitleLink>
          <CashTitleLink to={pages.cash.trash.cards}>
            {t('ACCOUNTS_TRASH.CARDS')}
          </CashTitleLink>
          <CashTitleLink to={pages.cash.trash.cash}>
            {t('ACCOUNTS_TRASH.CASH')}
          </CashTitleLink>
        </CashTitleContainer>
        <Search>
          <SearchInput
            type="text"
            placeholder={t('ACCOUNTS_TRASH.SEARCH')}
          ></SearchInput>
          <SearchImg src={searchIcon} alt="search" />
        </Search>
        {renderAccounts(
          filterAccounts(filterType, archivedAccounts),
          transactions.transactions,
          filterType,
          restoreAccount,
          deleteAccount,
          deleteTransaction,
          dispatch,
          t,
        )}
      </TrashContainer>
    </Grid>
  );
}
