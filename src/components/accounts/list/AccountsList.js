import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { dinero } from 'dinero.js';
import { formatDineroOutput } from '../../../utils/format/cash';
import { idbAddItem } from '../../../indexedDB/IndexedDB.js';
import { ReactComponent as EditIcon } from '../../../assets/icons/shared/edit.svg';
import { ReactComponent as TransferIcon } from '../../../assets/icons/shared/transfer.svg';
import { ReactComponent as ArchiveIcon } from '../../../assets/icons/shared/archive.svg';
import { ReactComponent as ToggleEditIcon } from '../../../assets/icons/shared/toggleEdit.svg';
import cardBackground from '../../../assets/icons/shared/cardBackground.svg';
import { ReactComponent as SearchIcon } from '../../../assets/icons/shared/search.svg';
import { ReactComponent as CancelSearchIcon } from '../../../assets/icons/shared/cancelSearch.svg';

import {
  InfoDialog,
  CancelSearchSvg,
  SearchField,
  ToggleMenu,
  NoResultsContainer,
  NoResults,
} from '../../../theme/global';
import {
  Card,
  CardName,
  CardBalanceContainer,
  CardBalance,
  CurrentBalance,
  CardButtonSvg,
  CashListItem,
  CardButtonlink,
  FlexContainer,
  ToggleButtonSvg,
  DeleteMenuItem,
  DeleteSvg,
  CommonInfoItem,
  CommonInfoContainer,
  CommonInfoHeader,
  CalcInfoAmount,
  Stripe,
} from '../Accounts.styled';
import { Dialog, InputAdornment, MenuItem } from '@mui/material';
import { useAccountsSearch } from '../../../hooks/useSearch';
import NoResultsFound from '../../noResults/NoResultsFound';
import {
  archiveAccount,
  updateAccountsFilters,
} from '../../../actions/Actions.js';
import InfoAccount from '../infoAccount/InfoAccount.js';
import ArchiveAlert from '../../alerts/ArchiveAlert.js';
import Notes from '../../shared/Notes.js';
import FilterItems from '../../shared/FilterItems.js';
import { getMonthExpenses, getMonthIncome } from '../utils/index.js';
import {
  convertPeriod,
  getCurrentMonth,
} from '../../../utils/format/date/index.js';

function AccountsList({
  accounts,
  localeFilterAccount,
  categories,
  transactions,
  mainCurrency,
}) {
  const filters = useSelector((state) => state.accounts.filters);
  const header = useSelector((state) => state.header);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [clickedAccount, setClickedAccount] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [query, setQuery] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const searchData = useAccountsSearch(query, accounts, false, filters);
  const [openDelAlert, setOpenDelAlert] = useState(false);
  const archiveCallback = () => {
    dispatch(archiveAccount(clickedAccount.id));
    idbAddItem({ ...clickedAccount, archived: true }, 'accounts');
  };
  const date = getCurrentMonth();
  const formattedDate = convertPeriod(date.from, date.during, header.language);

  return (
    <>
      <SearchField
        placeholder={t(`ACCOUNTS.SEARCH_${localeFilterAccount}`)}
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
      <FilterItems filters={filters} updateFilters={updateAccountsFilters} />
      <InfoDialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <InfoAccount
          clickedAccount={clickedAccount.id}
          accounts={accounts}
          categories={categories}
          setOpenDialog={setOpenDialog}
          transactions={transactions}
        />
      </InfoDialog>
      {accounts.length === 0 ? (
        <NoResultsContainer>
          <NoResults>
            <div>{t('ACCOUNTS.NO_ACCOUNTS')}</div>
          </NoResults>
        </NoResultsContainer>
      ) : searchData.length ? (
        searchData.map((account) => {
          const balance = dinero(account.balance);
          const expenses = getMonthExpenses(
            transactions,
            account.id,
            mainCurrency,
          );
          const income = getMonthIncome(transactions, account.id, mainCurrency);
          return (
            <CashListItem key={account.id}>
              <CommonInfoContainer>
                <CommonInfoItem $type="expense">
                  <CommonInfoHeader>
                    {formattedDate} {t('INFO_ACCOUNT.EXPENSES')}
                  </CommonInfoHeader>
                  <CommonInfoHeader></CommonInfoHeader>
                  <div>
                    <CalcInfoAmount>
                      {formatDineroOutput(expenses, mainCurrency)}
                    </CalcInfoAmount>
                    <Stripe $type="expense" />
                  </div>
                </CommonInfoItem>
                <CommonInfoItem>
                  <CommonInfoHeader>
                    {formattedDate} {t('INFO_ACCOUNT.INCOME')}
                  </CommonInfoHeader>
                  <div>
                    <CalcInfoAmount>
                      {formatDineroOutput(income, mainCurrency)}
                    </CalcInfoAmount>
                    <Stripe $type="income" />
                  </div>
                </CommonInfoItem>
              </CommonInfoContainer>
              <Card
                $cardBackground={cardBackground}
                $from={account.color[0]}
                $to={account.color[1]}
                className={`${account.description}`}
                onClick={() => {
                  setClickedAccount(account);
                  setOpenDialog(true);
                }}
              >
                <CardName>{account.description}</CardName>
                <CardBalanceContainer>
                  <CardBalance>
                    {formatDineroOutput(balance, account.balance.currency.code)}
                  </CardBalance>
                  <CurrentBalance>
                    {t('ACCOUNTS.CURRENT_BALANCE')}
                  </CurrentBalance>
                </CardBalanceContainer>
              </Card>
              <Notes notes={account.notes} />
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
                  <FlexContainer>
                    <CardButtonlink>
                      <CardButtonSvg as={EditIcon} /> {t('ACCOUNTS.EDIT')}
                    </CardButtonlink>
                  </FlexContainer>
                </MenuItem>
                <MenuItem onClick={() => setAnchorEl(null)}>
                  <FlexContainer>
                    <CardButtonlink>
                      <CardButtonSvg as={TransferIcon} />{' '}
                      {t('ACCOUNTS.NEW_TRANSFER')}
                    </CardButtonlink>
                  </FlexContainer>
                </MenuItem>
                <DeleteMenuItem
                  onClick={() => {
                    setAnchorEl(null);
                    setOpenDelAlert(true);
                  }}
                >
                  <FlexContainer>
                    <DeleteSvg as={ArchiveIcon} />
                    {t('ACCOUNTS.ARCHIVE')}
                  </FlexContainer>
                </DeleteMenuItem>
              </ToggleMenu>
              <ToggleButtonSvg
                as={ToggleEditIcon}
                onClick={(event) => {
                  setClickedAccount(account);
                  setAnchorEl(event.currentTarget);
                }}
              />
            </CashListItem>
          );
        })
      ) : (
        <NoResultsFound query={query} />
      )}
      <Dialog open={openDelAlert} onClose={() => setOpenDelAlert(false)}>
        <ArchiveAlert
          setOpen={setOpenDelAlert}
          archiveCallback={archiveCallback}
        />
      </Dialog>
    </>
  );
}

AccountsList.propTypes = {
  accounts: PropTypes.array,
  filterAccount: PropTypes.string,
  localeFilterAccount: PropTypes.string,
  categories: PropTypes.array,
  transactions: PropTypes.array,
  mainCurrency: PropTypes.string,
};

export default AccountsList;
