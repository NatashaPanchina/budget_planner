import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  CardBalance,
  CardBalanceContainer,
  CardButtonSvg,
  CardButtonlink,
  CardName,
  DeleteMenuItem,
  DeleteSvg,
  FlexContainer,
  ToggleButtonSvg,
} from '../../../../accounts/Accounts.styled';
import { Link } from 'react-router-dom';
import { pages } from '../../../../../utils/constants/pages';
import { dinero } from 'dinero.js';
import { formatDineroOutput } from '../../../../../utils/format/cash';
import { CurrentBalance } from '../../GlobalSearch.styled';
import { renderNotes } from '../../../../accounts/utils';
import { ToggleMenu } from '../../../../../theme/global';
import { MenuItem } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { archiveAccount } from '../../../../../actions/Actions';
import { idbAddItem } from '../../../../../indexedDB/IndexedDB';
import { ReactComponent as EditIcon } from '../../../../../assets/icons/shared/edit.svg';
import { ReactComponent as TransferIcon } from '../../../../../assets/icons/shared/transfer.svg';
import { ReactComponent as ArchiveIcon } from '../../../../../assets/icons/shared/archive.svg';
import { ReactComponent as ToggleEditIcon } from '../../../../../assets/icons/shared/toggleEdit.svg';
import cardBackground from '../../../../../assets/icons/shared/cardBackground.svg';
import { CashListItemWrapper } from '../GlobalSearchPage.styled';

function AccountsPage({ accounts, query }) {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [clickedAccount, setClickedAccount] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  return accounts.length ? (
    accounts.map((account) => {
      const balance = dinero(account.balance);
      return (
        <CashListItemWrapper key={account.id}>
          <Link to={`${pages.accounts.info.main}/${account.id}`}>
            <Card
              $cardBackground={cardBackground}
              $from={account.color[0]}
              $to={account.color[1]}
              className={`${account.description}`}
            >
              <CardName>{account.description}</CardName>
              <CardBalanceContainer>
                <CardBalance>{formatDineroOutput(balance, 'USD')}</CardBalance>
                <CurrentBalance>{t('ACCOUNTS.CURRENT_BALANCE')}</CurrentBalance>
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
                  <CardButtonlink
                    to={`${pages.newTransaction.transfer}/${clickedAccount.id}`}
                  >
                    <CardButtonSvg as={TransferIcon} />{' '}
                    {t('ACCOUNTS.NEW_TRANSFER')}
                  </CardButtonlink>
                </FlexContainer>
              </MenuItem>
              <DeleteMenuItem onClick={() => setAnchorEl(null)}>
                <FlexContainer
                  onClick={() => {
                    dispatch(archiveAccount(account.id));
                    idbAddItem({ ...account, archived: true }, 'accounts');
                  }}
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
        </CashListItemWrapper>
      );
    })
  ) : (
    <div>
      {t('SEARCH.NO_RESULTS')} {query}
    </div>
  );
}

AccountsPage.propTypes = {
  accounts: PropTypes.array,
  query: PropTypes.string,
};

export default AccountsPage;
