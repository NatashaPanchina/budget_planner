import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { dinero, toDecimal } from 'dinero.js';
import { USD } from '@dinero.js/currencies';
import { renderAccounts } from '../../transactions/utils';
import searchIcon from '../../../assets/icons/shared/search.svg';
import { ReactComponent as DoneIcon } from '../../../assets/icons/shared/checkMark.svg';
import { ReactComponent as CancelIcon } from '../../../assets/icons/shared/delete.svg';
import { ReactComponent as PlusIcon } from '../../../assets/icons/shared/plus.svg';
import { pages } from '../../../utils/constants/pages';
import {
  AddButtonSvg,
  AddFormButtonsContainer,
  ButtonSvg,
  ButtonTitle,
  CancelButton,
  DateField,
  DoneButton,
  Search,
  SearchImg,
  SearchInput,
  TextInputField,
} from '../../../theme/global';
import { AddAccount } from '../NewTransaction.styled';
import { NumericFormatCustom } from '../../../utils/format/cash';
import dayjs from 'dayjs';

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
        $type={transactionType}
        margin="normal"
        required
        select
        label={t('NEW_TRANSACTION.ORIGIN_CASH')}
        value={originAccount}
        onChange={(event) => setOriginAccount(event.target.value)}
      >
        <Search>
          <SearchInput
            type="text"
            placeholder={t('NEW_TRANSACTION.SEARCH_CASH')}
          ></SearchInput>
          <SearchImg src={searchIcon} alt="search" />
        </Search>
        <AddAccount to={pages.cash.add.card}>
          <AddButtonSvg as={PlusIcon} />
          {t('NEW_TRANSACTION.ADD_CASH')}
        </AddAccount>
        {renderAccounts(filteredAccounts, t)}
      </TextInputField>
      <TextInputField
        $type={transactionType}
        margin="normal"
        required
        select
        label={t('NEW_TRANSACTION.DESTINATION_CASH')}
        value={destAccount}
        onChange={(event) => setDestAccount(event.target.value)}
      >
        <Search>
          <SearchInput
            type="text"
            placeholder={t('NEW_TRANSACTION.SEARCH_CASH')}
          ></SearchInput>
          <SearchImg src={searchIcon} alt="search" />
        </Search>
        <AddAccount to={pages.cash.add.card}>
          <AddButtonSvg as={PlusIcon} />
          {t('NEW_TRANSACTION.ADD_CASH')}
        </AddAccount>
        {renderAccounts(filteredAccounts, t)}
      </TextInputField>
      <TextInputField
        $type={transactionType}
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
        $type={transactionType}
        required
        label={t('NEW_TRANSACTION.DATE')}
        defaultValue={dayjs(date)}
        onChange={(value) => setDate(value)}
      />
      <TextInputField
        $type={transactionType}
        margin="normal"
        multiline
        label={t('NEW_TRANSACTION.NOTES')}
        placeholder="Tap here to make some notes"
        defaultValue={notes}
        onChange={(event) => setNotes(event.target.value)}
      />
      <TextInputField
        $type={transactionType}
        margin="normal"
        multiline
        label={t('NEW_TRANSACTION.TAGS')}
        onChange={(event) => setTags(event.target.value)}
      />
      <AddFormButtonsContainer>
        <DoneButton
          $buttonType={transactionType}
          to={`${pages.transactions[`${transactionType}s`]}/${destAccount}`}
        >
          <ButtonSvg as={DoneIcon} />
          <ButtonTitle>{t('NEW_TRANSACTION.DONE')}</ButtonTitle>
        </DoneButton>
        <CancelButton
          to={`${pages.transactions[`${transactionType}s`]}/${destAccount}`}
        >
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
