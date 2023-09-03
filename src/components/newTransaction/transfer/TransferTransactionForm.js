import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { dinero, toDecimal } from 'dinero.js';
import { USD } from '@dinero.js/currencies';
import { renderAccounts } from '../../transactions/utils';
import { ReactComponent as SearchIcon } from '../../../assets/icons/shared/search.svg';
import { ReactComponent as CancelSearchIcon } from '../../../assets/icons/shared/cancelSearch.svg';
import { ReactComponent as DoneIcon } from '../../../assets/icons/shared/checkMark.svg';
import { ReactComponent as CancelIcon } from '../../../assets/icons/shared/cancel.svg';
import { ReactComponent as PlusIcon } from '../../../assets/icons/shared/plus.svg';
import { pages } from '../../../utils/constants/pages';
import {
  AddButtonSvg,
  AddFormButtonsContainer,
  ButtonSvg,
  ButtonTitle,
  CancelButton,
  CancelSearchSvg,
  DateField,
  DoneButton,
  SearchField,
  SelectHeader,
  TextInputField,
} from '../../../theme/global';
import { AddAccount } from '../NewTransaction.styled';
import { NumericFormatCustom } from '../../../utils/format/cash';
import dayjs from 'dayjs';
import { InputAdornment } from '@mui/material';

function TransferTransactionForm({ accounts }) {
  const { t } = useTranslation();
  const [filteredAccounts, setFilteredAccounts] = useState([]);
  const transactionType = 'transfer';
  const [originAccount, setOriginAccount] = useState('');
  const [destAccount, setDestAccount] = useState('');
  const [amount, setAmount] = useState(
    toDecimal(dinero({ amount: 0, currency: USD })),
  );
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState('');
  const [tags, setTags] = useState([]);

  useEffect(() => {
    setFilteredAccounts(accounts);
    if (accounts.length) {
      setOriginAccount(accounts[0].id);
      setDestAccount(accounts[0].id);
    }
  }, [accounts]);

  return (
    <>
      <TextInputField
        margin="normal"
        required
        select
        label={t('NEW_TRANSACTION.ORIGIN_ACCOUNT')}
        value={originAccount}
        onChange={(event) => setOriginAccount(event.target.value)}
      >
        <SelectHeader>{t('NEW_TRANSACTION.AVAILABLE_ACCOUNTS')}</SelectHeader>
        <SearchField
          placeholder={t('NEW_TRANSACTION.SEARCH_ACCOUNTS')}
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
        <AddAccount to={pages.accounts.add.card}>
          <AddButtonSvg as={PlusIcon} />
          {t('NEW_TRANSACTION.ADD_ACCOUNT')}
        </AddAccount>
        {renderAccounts(filteredAccounts, t)}
      </TextInputField>
      <TextInputField
        margin="normal"
        required
        select
        label={t('NEW_TRANSACTION.DESTINATION_ACCOUNT')}
        value={destAccount}
        onChange={(event) => setDestAccount(event.target.value)}
      >
        <SelectHeader>{t('NEW_TRANSACTION.AVAILABLE_ACCOUNTS')}</SelectHeader>
        <SearchField
          placeholder={t('NEW_TRANSACTION.SEARCH_ACCOUNTS')}
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
        <AddAccount to={pages.accounts.add.card}>
          <AddButtonSvg as={PlusIcon} />
          {t('NEW_TRANSACTION.ADD_ACCOUNT')}
        </AddAccount>
        {renderAccounts(filteredAccounts, t)}
      </TextInputField>
      <TextInputField
        margin="normal"
        required
        label={t('NEW_TRANSACTION.AMOUNT')}
        name="numberformat"
        value={amount}
        onChange={(event) => setAmount(event.target.value)}
        InputProps={{
          inputComponent: NumericFormatCustom,
        }}
      />
      <DateField
        required
        label={t('NEW_TRANSACTION.DATE')}
        defaultValue={dayjs(date)}
        onChange={(value) => setDate(value)}
      />
      <TextInputField
        margin="normal"
        multiline
        label={t('NEW_TRANSACTION.NOTES')}
        placeholder="Tap here to make some notes"
        defaultValue={notes}
        onChange={(event) => setNotes(event.target.value)}
      />
      <TextInputField
        margin="normal"
        multiline
        label={t('NEW_TRANSACTION.TAGS')}
        onChange={(event) => setTags(event.target.value)}
      />
      <AddFormButtonsContainer>
        <DoneButton to={`${pages.transactions[`${transactionType}s`]}/all`}>
          <ButtonSvg as={DoneIcon} />
          <ButtonTitle>{t('NEW_TRANSACTION.DONE')}</ButtonTitle>
        </DoneButton>
        <CancelButton to={`${pages.transactions[`${transactionType}s`]}/all`}>
          <ButtonSvg as={CancelIcon} />
          <ButtonTitle>{t('NEW_TRANSACTION.CANCEL')}</ButtonTitle>
        </CancelButton>
      </AddFormButtonsContainer>
    </>
  );
}

TransferTransactionForm.propTypes = {
  accounts: PropTypes.array,
};

export default TransferTransactionForm;
