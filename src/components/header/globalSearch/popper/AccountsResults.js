import React from 'react';
import PropTypes from 'prop-types';
import { dinero } from 'dinero.js';
import { renderNotes } from '../utils';
import { Link } from 'react-router-dom';
import { pages } from '../../../../utils/constants/pages';
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

function AccountsResults({ accounts }) {
  const { t } = useTranslation();

  return accounts.slice(0, 3).map((account) => {
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
              <CardBalance>{formatDineroOutput(balance, 'USD')}</CardBalance>
              <CurrentBalance>{t('ACCOUNTS.CURRENT_BALANCE')}</CurrentBalance>
            </CardBalanceContainer>
          </Card>
          {renderNotes(account.notes)}
        </Link>
      </CashListItem>
    );
  });
}

AccountsResults.propTypes = {
  accounts: PropTypes.array,
};

export default AccountsResults;
