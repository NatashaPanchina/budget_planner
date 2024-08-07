import React from 'react';
import PropTypes from 'prop-types';
import {
  AddButtonSvg,
  CancelSearchSvg,
  SearchField,
  SelectHeader,
  SelectHeaderButton,
  TextInputField,
} from '../../../../theme/global';
import { InputAdornment, MenuItem } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { ReactComponent as PlusIcon } from '../../../../assets/icons/shared/plus.svg';
import { ReactComponent as SearchIcon } from '../../../../assets/icons/shared/search.svg';
import { ReactComponent as CancelSearchIcon } from '../../../../assets/icons/shared/cancelSearch.svg';
import {
  Card,
  CardBalance,
  CardBalanceContainer,
  CardName,
  CardView,
  CurrentBalance,
} from '../../../newTransaction/NewTransaction.styled';
import { formatDineroOutput } from '../../../../utils/format/cash';
import { dinero } from 'dinero.js';
import cardBackground from '../../../../assets/icons/shared/cardBackground.svg';

function AccountsItems({
  accounts,
  account,
  setAccount,
  setOpenAccountDialog,
  fieldLabel = 'INFO_TRANSACTION.ACCOUNT',
  isDisplayCorrect,
}) {
  const { t } = useTranslation();

  return (
    <TextInputField
      error={isDisplayCorrect && !accounts.length ? true : false}
      helperText={
        isDisplayCorrect && !accounts.length
          ? t('NEW_TRANSACTION.NO_ACCOUNT_SELECTED')
          : ''
      }
      margin="normal"
      required
      select
      label={t(fieldLabel)}
      value={account}
      onChange={(event) => setAccount(event.target.value)}
    >
      <SelectHeader>
        {t('INFO_TRANSACTION.AVAILABLE_ACCOUNTS')}
        <SelectHeaderButton>
          <AddButtonSvg
            onClick={() => setOpenAccountDialog(true)}
            as={PlusIcon}
          />
        </SelectHeaderButton>
      </SelectHeader>
      <SearchField
        placeholder={t('INFO_TRANSACTION.SEARCH_ACCOUNT')}
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
      {accounts.length === 0 ? (
        <div>{t('INFO_TRANSACTION.NO_ACCOUNTS')}</div>
      ) : (
        accounts.map((account) => {
          const balance = account.balance;
          return (
            <MenuItem key={account.id} value={account.id}>
              <CardView>
                <Card
                  $from={account.color[0]}
                  $to={account.color[1]}
                  $cardBackground={cardBackground}
                >
                  <CardName>{account.description}</CardName>
                  <CardBalanceContainer>
                    <CardBalance>
                      {formatDineroOutput(
                        dinero(balance),
                        balance.currency.code,
                      )}
                    </CardBalance>
                    <CurrentBalance>
                      {t('ACCOUNTS.CURRENT_BALANCE')}
                    </CurrentBalance>
                  </CardBalanceContainer>
                </Card>
              </CardView>
            </MenuItem>
          );
        })
      )}
    </TextInputField>
  );
}

AccountsItems.propTypes = {
  accounts: PropTypes.array,
  account: PropTypes.string,
  setAccount: PropTypes.func,
  setOpenAccountDialog: PropTypes.func,
  fieldLabel: PropTypes.string,
  isDisplayCorrect: PropTypes.bool,
};

export default AccountsItems;
