import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { dinero } from 'dinero.js';
import cardBackground from '../../../../assets/icons/shared/cardBackground.svg';
import {
  Card,
  CardBalance,
  CardBalanceContainer,
  CardName,
  CashListItem,
  CurrentBalance,
} from '../GlobalSearch.styled';
import { formatDineroOutput } from '../../../../utils/format/cash';
import { useTranslation } from 'react-i18next';
import { InfoDialog } from '../../../../theme/global';
import InfoAccount from '../../../accounts/infoAccount/InfoAccount';
import Notes from '../../../shared/Notes';

function AccountsResults({ accounts, categories, query }) {
  const { t } = useTranslation();
  const [clickedAccount, setClickedAccount] = useState('');
  const [openDialog, setOpenDialog] = useState(false);

  return accounts.length ? (
    <>
      <InfoDialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <InfoAccount
          clickedAccount={clickedAccount.id}
          accounts={accounts}
          categories={categories}
          setOpenDialog={setOpenDialog}
        />
      </InfoDialog>
      {accounts.map((account) => {
        const balance = account.balance;
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
                  {formatDineroOutput(dinero(balance), balance.currency.code)}
                </CardBalance>
                <CurrentBalance>{t('ACCOUNTS.CURRENT_BALANCE')}</CurrentBalance>
              </CardBalanceContainer>
            </Card>
            <Notes notes={account.notes} />
          </CashListItem>
        );
      })}
    </>
  ) : (
    <div>{`${t('SEARCH.NO_RESULTS')} ${query}`}</div>
  );
}

AccountsResults.propTypes = {
  accounts: PropTypes.array,
  categories: PropTypes.array,
  query: PropTypes.string,
};

export default AccountsResults;
