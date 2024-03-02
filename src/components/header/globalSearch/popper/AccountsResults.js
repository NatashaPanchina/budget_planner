import React from 'react';
import PropTypes from 'prop-types';
import { dinero } from 'dinero.js';
import { renderNotes } from '../utils';
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

function AccountsResults({ accounts, query }) {
  const { t } = useTranslation();

  return accounts.length ? (
    accounts.map((account) => {
      const balance = dinero(account.balance);
      return (
        <CashListItem key={account.id}>
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
        </CashListItem>
      );
    })
  ) : (
    <div>{`${t('SEARCH.NO_RESULTS')} ${query}`}</div>
  );
}

AccountsResults.propTypes = {
  accounts: PropTypes.array,
  query: PropTypes.string,
};

export default AccountsResults;
