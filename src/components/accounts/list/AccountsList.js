import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { dinero } from 'dinero.js';
import { formatDineroOutput } from '../../../utils/format/cash';
import { idbAddItem } from '../../../indexedDB/IndexedDB.js';
import {
  createAccountFilter,
  filterAccounts,
  renderNotes,
  createLocaleAccountType,
} from '../utils';
import { ReactComponent as PlusIcon } from '../../../assets/icons/shared/plus.svg';
import { ReactComponent as EditIcon } from '../../../assets/icons/shared/edit.svg';
import { ReactComponent as TransferIcon } from '../../../assets/icons/shared/transfer.svg';
import { ReactComponent as ArchiveIcon } from '../../../assets/icons/shared/archive.svg';
import { ReactComponent as ToggleEditIcon } from '../../../assets/icons/shared/toggleEdit.svg';
import cardBackground from '../../../assets/icons/shared/cardBackground.svg';
import { ReactComponent as SearchIcon } from '../../../assets/icons/shared/search.svg';
import { ReactComponent as CancelSearchIcon } from '../../../assets/icons/shared/cancelSearch.svg';
import {
  AddButtonSvg,
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
  AddCashButton,
  FlexContainer,
  ToggleButtonSvg,
  DeleteMenuItem,
  DeleteSvg,
} from '../Accounts.styled';
import { pages } from '../../../utils/constants/pages';
import { InputAdornment, MenuItem } from '@mui/material';

function archiveEventButton(account, archiveAccount, dispatch) {
  dispatch(archiveAccount(account.id));
  idbAddItem({ ...account, archived: true }, 'accounts');
}

function AccountsList({ notArchivedAccounts, archiveAccount }) {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [clickedAccount, setClickedAccount] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const filterAccount = createAccountFilter(useParams().filterCash);
  const localeFilterAccount = createLocaleAccountType(filterAccount);

  return (
    <>
      <SearchField
        placeholder={t(`ACCOUNTS.SEARCH_${localeFilterAccount}`)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <CancelSearchSvg as={CancelSearchIcon} />
            </InputAdornment>
          ),
        }}
      />
      <AddCashButton
        to={
          pages.accounts.add[filterAccount === 'all' ? 'card' : filterAccount]
        }
      >
        <AddButtonSvg as={PlusIcon} />
        {t(`ACCOUNTS.ADD_${localeFilterAccount}`)}
      </AddCashButton>
      {filterAccounts(filterAccount, notArchivedAccounts).map((account) => {
        const balance = dinero(account.balance);
        return (
          <CashListItem key={account.id}>
            <Link to={`${pages.accounts.info.main}/${account.id}`}>
              <Card
                $cardBackground={cardBackground}
                $from={account.color[0]}
                $to={account.color[1]}
                className={`${account.description}`}
              >
                <CardName>{account.description}</CardName>
                <CardBalanceContainer>
                  <CardBalance>
                    {formatDineroOutput(balance, 'USD')}
                  </CardBalance>
                  <CurrentBalance>
                    {t('ACCOUNTS.CURRENT_BALANCE')}
                  </CurrentBalance>
                </CardBalanceContainer>
              </Card>
              {renderNotes(account.notes)}
            </Link>
            <div>
              <ToggleMenu
                anchorEl={anchorEl}
                open={open}
                onClose={() => setAnchorEl(null)}
              >
                <MenuItem onClick={() => setAnchorEl(null)}>
                  <FlexContainer>
                    <CardButtonlink
                      to={`${pages.accounts.info.main}/${clickedAccount.id}`}
                    >
                      <CardButtonSvg as={EditIcon} /> {t('ACCOUNTS.EDIT')}
                    </CardButtonlink>
                  </FlexContainer>
                </MenuItem>
                <MenuItem onClick={() => setAnchorEl(null)}>
                  <FlexContainer>
                    <CardButtonSvg as={TransferIcon} />{' '}
                    {t('ACCOUNTS.NEW_TRANSFER')}
                  </FlexContainer>
                </MenuItem>
                <DeleteMenuItem onClick={() => setAnchorEl(null)}>
                  <FlexContainer
                    onClick={() =>
                      archiveEventButton(
                        clickedAccount,
                        archiveAccount,
                        dispatch,
                      )
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
      })}
    </>
  );
}

AccountsList.propTypes = {
  notArchivedAccounts: PropTypes.array,
  archiveAccount: PropTypes.func,
};

export default AccountsList;
