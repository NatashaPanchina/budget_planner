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
import { dinero } from 'dinero.js';
import { formatDineroOutput } from '../../../../../utils/format/cash';
import { CurrentBalance } from '../../GlobalSearch.styled';
import { InfoDialog, ToggleMenu } from '../../../../../theme/global';
import { Dialog, MenuItem } from '@mui/material';
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
import InfoAccount from '../../../../accounts/infoAccount/InfoAccount';
import ArchiveAlert from '../../../../alerts/ArchiveAlert';
import Notes from '../../../../shared/Notes';

function AccountsPage({ accounts, categories, query }) {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [clickedAccount, setClickedAccount] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [openDialog, setOpenDialog] = useState(false);
  const [openDelAlert, setOpenDelAlert] = useState(false);
  const archiveCallback = () => {
    dispatch(archiveAccount(clickedAccount.id));
    idbAddItem({ ...clickedAccount, archived: true }, 'accounts');
  };

  return accounts.length ? (
    <>
      {' '}
      <InfoDialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <InfoAccount
          clickedAccount={clickedAccount.id}
          accounts={accounts}
          categories={categories}
          setOpenDialog={setOpenDialog}
        />
      </InfoDialog>
      {accounts.map((account) => {
        const balance = dinero(account.balance);
        return (
          <CashListItemWrapper key={account.id}>
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
                <CurrentBalance>{t('ACCOUNTS.CURRENT_BALANCE')}</CurrentBalance>
              </CardBalanceContainer>
            </Card>
            <Notes notes={account.notes} />
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
            </div>
          </CashListItemWrapper>
        );
      })}
      <Dialog open={openDelAlert} onClose={() => setOpenDelAlert(false)}>
        <ArchiveAlert
          setOpen={setOpenDelAlert}
          archiveCallback={archiveCallback}
        />
      </Dialog>
    </>
  ) : (
    <div>
      {t('SEARCH.NO_RESULTS')} {query}
    </div>
  );
}

AccountsPage.propTypes = {
  accounts: PropTypes.array,
  categories: PropTypes.array,
  query: PropTypes.string,
};

export default AccountsPage;
