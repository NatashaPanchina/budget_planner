import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { dinero } from 'dinero.js';
import { formatDineroOutput } from '../../../utils/format/cash';
import { idbAddItem } from '../../../indexedDB/IndexedDB.js';
import {
  createCashFilter,
  filterAccounts,
  renderNotes,
  createLocaleCashType,
} from '../utils';
import { ReactComponent as PlusIcon } from '../../../assets/icons/shared/plus.svg';
import { ReactComponent as EditIcon } from '../../../assets/icons/shared/edit.svg';
import { ReactComponent as TransferIcon } from '../../../assets/icons/shared/transfer.svg';
import { ReactComponent as ArchiveIcon } from '../../../assets/icons/shared/archive.svg';
import { ReactComponent as ToggleEditIcon } from '../../../assets/icons/shared/toggleEdit.svg';
import cardBackground from '../../../assets/icons/shared/cardBackground.svg';
import searchIcon from '../../../assets/icons/shared/search.svg';
import {
  AddButtonSvg,
  Search,
  SearchImg,
  SearchInput,
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
} from '../Cash.styled';
import { pages } from '../../../utils/constants/pages';
import { MenuItem } from '@mui/material';

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
  const filterCash = createCashFilter(useParams().filterCash);
  const localeFilterCash = createLocaleCashType(filterCash);

  return (
    <>
      <Search>
        <SearchInput
          type="text"
          placeholder={t(`CASH.SEARCH_${localeFilterCash}`)}
        ></SearchInput>
        <SearchImg src={searchIcon} alt="search" />
      </Search>
      <AddCashButton
        to={pages.cash.add[filterCash === 'all' ? 'card' : filterCash]}
      >
        <AddButtonSvg as={PlusIcon} />
        {t(`CASH.ADD_${localeFilterCash}`)}
      </AddCashButton>
      {filterAccounts(filterCash, notArchivedAccounts).map((account) => {
        const balance = dinero(account.balance);
        return (
          <CashListItem key={account.id}>
            <Link to={`${pages.cash.info.main}/${account.id}`}>
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
                  <CurrentBalance>{t('CASH.CURRENT_BALANCE')}</CurrentBalance>
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
                      to={`${pages.cash.info.main}/${clickedAccount.id}`}
                    >
                      <CardButtonSvg as={EditIcon} /> {t('CASH.EDIT')}
                    </CardButtonlink>
                  </FlexContainer>
                </MenuItem>
                <MenuItem onClick={() => setAnchorEl(null)}>
                  <FlexContainer>
                    <CardButtonSvg as={TransferIcon} /> {t('CASH.NEW_TRANSFER')}
                  </FlexContainer>
                </MenuItem>
                <MenuItem onClick={() => setAnchorEl(null)}>
                  <FlexContainer
                    onClick={() =>
                      archiveEventButton(
                        clickedAccount,
                        archiveAccount,
                        dispatch,
                      )
                    }
                  >
                    <CardButtonSvg as={ArchiveIcon} />
                    {t('CASH.ARCHIVE')}
                  </FlexContainer>
                </MenuItem>
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
