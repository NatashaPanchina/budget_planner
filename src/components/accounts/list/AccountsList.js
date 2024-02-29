import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { dinero } from 'dinero.js';
import { formatDineroOutput } from '../../../utils/format/cash';
import { idbAddItem } from '../../../indexedDB/IndexedDB.js';
import { renderNotes } from '../utils';
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
} from '../Accounts.styled';
import { InputAdornment, MenuItem } from '@mui/material';
import { useAccountsSearch } from '../../../hooks/useSearch';
import NoResultsFound from '../../noResults/NoResultsFound';
import { archiveAccount } from '../../../actions/Actions.js';
import InfoAccount from '../infoAccount/InfoAccount.js';

function archiveEventButton(account, dispatch) {
  dispatch(archiveAccount(account.id));
  idbAddItem({ ...account, archived: true }, 'accounts');
}

function AccountsList({ accounts, localeFilterAccount, categories }) {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [clickedAccount, setClickedAccount] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [query, setQuery] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const searchData = useAccountsSearch(query, accounts, false);

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
      <InfoDialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <InfoAccount
          clickedAccount={clickedAccount.id}
          accounts={accounts}
          categories={categories}
          setOpenDialog={setOpenDialog}
        />
      </InfoDialog>
      {searchData.length ? (
        searchData.map((account) => {
          const balance = dinero(account.balance);
          return (
            <CashListItem key={account.id}>
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
              {renderNotes(account.notes)}
              <div>
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
                  <DeleteMenuItem onClick={() => setAnchorEl(null)}>
                    <FlexContainer
                      onClick={() =>
                        archiveEventButton(clickedAccount, dispatch)
                      }
                    >
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
              </div>
            </CashListItem>
          );
        })
      ) : (
        <NoResultsFound query={query} />
      )}
    </>
  );
}

AccountsList.propTypes = {
  accounts: PropTypes.array,
  filterAccount: PropTypes.string,
  localeFilterAccount: PropTypes.string,
  categories: PropTypes.array,
};

export default AccountsList;
