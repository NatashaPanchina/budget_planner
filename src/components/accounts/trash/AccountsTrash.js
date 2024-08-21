import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { dinero } from 'dinero.js';
import { formatDineroOutput } from '../../../utils/format/cash';
import { createAccountFilter, createLocaleAccountType } from '../utils';
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
import { ReactComponent as ToggleEditIcon } from '../../../assets/icons/shared/toggleEdit.svg';
import { ReactComponent as SearchIcon } from '../../../assets/icons/shared/search.svg';
import { ReactComponent as CancelSearchIcon } from '../../../assets/icons/shared/cancelSearch.svg';
import cardBackground from '../../../assets/icons/shared/cardBackground.svg';
import {
  BackLink,
  BackLinkSvg,
  TrashHeader,
  TrashContainer,
  ToggleMenu,
  SearchField,
  CancelSearchSvg,
  NoResults,
  NoResultsContainer,
} from '../../../theme/global';
import {
  Card,
  CardName,
  CardBalanceContainer,
  CardBalance,
  CurrentBalance,
  CashTitleContainer,
  CashTitleLink,
  FlexContainer,
  CardButtonSvg,
  CashListItem,
  DeleteMenuItem,
  DeleteSvg,
  TrashToggleSvg,
} from '../Accounts.styled';
import { pages } from '../../../utils/constants/pages';
import { Dialog, Grid, InputAdornment, MenuItem, styled } from '@mui/material';
import { useAccountsSearch } from '../../../hooks/useSearch';
import Loading from '../../loading/Loading';
import NoResultsFound from '../../noResults/NoResultsFound';
import DeleteAlert from '../../alerts/DeleteAlert';
import Notes from '../../shared/Notes';

const ArchivedCount = styled('div')((props) => ({
  fontSize: '0.875rem',
  color: props.theme.colors.text.darker,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  '@media (min-width: 900px)': {
    justifyContent: 'start',
  },
}));

export default function AccountsTrash() {
  const accounts = useSelector((state) => state.accounts);
  const transactions = useSelector((state) => state.transactions);
  const dispatch = useDispatch();
  const [clickedAccount, setClickedAccount] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const { t } = useTranslation();
  const filterType = createAccountFilter(useParams().filterCash);
  const [query, setQuery] = useState('');
  const searchData = useAccountsSearch(query, accounts.accounts, true);
  const [openDelAlert, setOpenDelAlert] = useState(false);
  const deleteCallback = () => {
    transactions.transactions.forEach((transaction) => {
      if (transaction.account === clickedAccount.id) {
        dispatch(deleteTransaction(transaction.id));
        idbDeleteItem(transaction.id, 'transactions');
      }
    });
    dispatch(deleteAccount(clickedAccount.id));
    idbDeleteItem(clickedAccount.id, 'accounts');
  };
  const isEmpty = () => {
    if (query === '' && searchData.length === 0) return true;
    return false;
  };

  useEffect(() => {
    dispatch(fetchAccountsData());
    dispatch(fetchTransactionsData());
  }, [dispatch]);

  return accounts.status === 'loading' || transactions.status === 'loading' ? (
    <Loading />
  ) : (
    <Grid item xs={12}>
      <TrashContainer>
        <TrashHeader>
          <BackLink to={pages.accounts.all}>
            <BackLinkSvg as={BackIcon} />
          </BackLink>
          {t('ACCOUNTS_TRASH.ARCHIVED_ACCOUNTS')}
        </TrashHeader>
        <CashTitleContainer>
          <CashTitleLink to={pages.accounts.trash.all}>
            {t('ACCOUNTS_TRASH.ALL')}
          </CashTitleLink>
          <CashTitleLink to={pages.accounts.trash.cards}>
            {t('ACCOUNTS_TRASH.CARDS')}
          </CashTitleLink>
          <CashTitleLink to={pages.accounts.trash.cash}>
            {t('ACCOUNTS_TRASH.CASH')}
          </CashTitleLink>
        </CashTitleContainer>
        <SearchField
          placeholder={t('ACCOUNTS_TRASH.SEARCH')}
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
        {isEmpty() ? (
          <NoResultsContainer>
            <NoResults>
              <div>{t('ACCOUNTS.NOTHING_HERE')}</div>
            </NoResults>
          </NoResultsContainer>
        ) : searchData.length ? (
          <>
            <ArchivedCount>
              {t(`ACCOUNTS_TRASH.${createLocaleAccountType(filterType)}_COUNT`)}
              {searchData.length}
            </ArchivedCount>
            {searchData.map((account) => {
              const balance = account.balance;
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
                          {formatDineroOutput(
                            dinero(balance),
                            balance.currency.code,
                          )}
                        </CardBalance>
                        <CurrentBalance>
                          {t('ACCOUNTS_TRASH.CURRENT_BALANCE')}
                        </CurrentBalance>
                      </CardBalanceContainer>
                    </Card>
                    <Notes notes={account.notes} />
                  </div>
                  <div>
                    <ToggleMenu
                      anchorEl={anchorEl}
                      open={open}
                      onClose={() => setAnchorEl(null)}
                    >
                      <MenuItem onClick={() => setAnchorEl(null)}>
                        <FlexContainer
                          onClick={() => {
                            dispatch(restoreAccount(clickedAccount.id));
                            idbAddItem(
                              { ...clickedAccount, archived: false },
                              'accounts',
                            );
                          }}
                        >
                          <CardButtonSvg as={RestoreIcon} />
                          {t('ACCOUNTS_TRASH.RESTORE')}
                        </FlexContainer>
                      </MenuItem>
                      <DeleteMenuItem
                        onClick={() => {
                          setAnchorEl(null);
                          setOpenDelAlert(true);
                        }}
                      >
                        <FlexContainer>
                          <DeleteSvg as={DeleteIcon} />
                          {t('ACCOUNTS_TRASH.DELETE')}
                        </FlexContainer>
                      </DeleteMenuItem>
                    </ToggleMenu>
                    <TrashToggleSvg
                      as={ToggleEditIcon}
                      onClick={(event) => {
                        setClickedAccount(account);
                        setAnchorEl(event.currentTarget);
                      }}
                    />
                  </div>
                </CashListItem>
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
            type="ACCOUNT"
          />
        </Dialog>
      </TrashContainer>
    </Grid>
  );
}
