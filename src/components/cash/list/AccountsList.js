import React from 'react';
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
import cardBackground from '../../../assets/icons/shared/cardBackground.svg';
import searchIcon from '../../../assets/icons/shared/search.svg';
import {
  AddButton,
  AddButtonSvg,
  Search,
  SearchImg,
  SearchInput,
} from '../../../theme/global';
import {
  Card,
  CardName,
  CardBalanceContainer,
  CardBalance,
  CurrentBalance,
  CardButton,
  CardButtonSvg,
  CashListItem,
  CardButtonlink,
  CardButtonTitle,
} from '../Cash.styled';
import { pages } from '../../../utils/constants/pages';

function archiveEventButton(account, archiveAccount, dispatch) {
  dispatch(archiveAccount(account.id));
  idbAddItem({ ...account, archived: true }, 'accounts');
}

function AccountsList({ notArchivedAccounts, archiveAccount }) {
  const dispatch = useDispatch();

  const { t } = useTranslation();

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
      <AddButton
        to={pages.cash.add[filterCash === 'all' ? 'card' : filterCash]}
      >
        <AddButtonSvg as={PlusIcon} />
        {t(`CASH.ADD_${localeFilterCash}`)}
      </AddButton>
      {filterAccounts(filterCash, notArchivedAccounts).map((account) => {
        const balance = dinero(account.balance);
        return (
          <CashListItem key={account.id}>
            <div>
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
            </div>
            <div>
              <CardButton>
                <CardButtonlink to={`${pages.cash.info.main}/${account.id}`}>
                  <CardButtonSvg as={EditIcon} />{' '}
                  <CardButtonTitle>{t('CASH.EDIT')}</CardButtonTitle>
                </CardButtonlink>
              </CardButton>
              <CardButton>
                <CardButtonSvg as={TransferIcon} />{' '}
                <CardButtonTitle>{t('CASH.NEW_TRANSFER')}</CardButtonTitle>
              </CardButton>
              <CardButton
                onClick={() =>
                  archiveEventButton(account, archiveAccount, dispatch)
                }
              >
                <CardButtonSvg as={ArchiveIcon} />
                <CardButtonTitle>{t('CASH.ARCHIVE')}</CardButtonTitle>
              </CardButton>
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
