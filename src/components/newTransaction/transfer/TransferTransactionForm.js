import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { dinero, toDecimal } from 'dinero.js';
import { ReactComponent as DoneIcon } from '../../../assets/icons/shared/checkMark.svg';
import { ReactComponent as CancelIcon } from '../../../assets/icons/shared/cancel.svg';
import {
  AddFormButtonsContainer,
  ButtonSvg,
  ButtonTitle,
  CancelButton,
  DateField,
  DoneButton,
  NumberInputField,
  TextInputField,
} from '../../../theme/global';
import { NumericFormatCustom, isCashCorrect } from '../../../utils/format/cash';
import dayjs from 'dayjs';
import { useParams } from 'react-router-dom';
import { currencies } from '../../../utils/constants/currencies';
import AccountsItems from '../../transactions/utils/accounts/AccountsItems';
import { isDateCorrect } from '../../../utils/format/date';

function TransferTransactionForm({ accounts, setOpenDialog }) {
  const { transactionAccount } = useParams();
  const { t } = useTranslation();
  const [filteredAccounts, setFilteredAccounts] = useState([]);
  const transactionType = 'transfer';
  const [originAccount, setOriginAccount] = useState('');
  const [destAccount, setDestAccount] = useState('');
  const [amount, setAmount] = useState('0');
  const [date, setDate] = useState(dayjs(new Date()));
  const [notes, setNotes] = useState('');
  const [tags, setTags] = useState([]);

  const [isDisplayCorrect, setIsDisplayCorrect] = useState(false);
  const isCash = isCashCorrect(amount);
  const isDate = isDateCorrect(date);
  const isAccount = Boolean(filteredAccounts.length);

  useEffect(() => {
    setFilteredAccounts(accounts);
    if (accounts.length) {
      setOriginAccount(accounts[0].id);
      setDestAccount(accounts[0].id);
    }
    if (transactionAccount) setOriginAccount(transactionAccount);
  }, [accounts]);

  return (
    <>
      <NumberInputField
        error={isDisplayCorrect && !isCash}
        helperText={
          isDisplayCorrect && !isCash
            ? t('NEW_TRANSACTION.AMOUNT_GREATER_ZERO')
            : ''
        }
        margin="normal"
        required
        label={t('NEW_TRANSACTION.AMOUNT')}
        name="numberformat"
        value={amount}
        onChange={(event) => setAmount(event.target.value)}
        InputProps={{
          inputComponent: NumericFormatCustom,
        }}
        autoFocus
      />
      <AccountsItems
        accounts={filteredAccounts}
        account={originAccount}
        setAccount={setOriginAccount}
        setOpenAccountDialog={() => null}
        fieldLabel="NEW_TRANSACTION.ORIGIN_ACCOUNT"
        isDisplayCorrect={isDisplayCorrect}
      />
      <AccountsItems
        accounts={filteredAccounts}
        account={originAccount}
        setAccount={setOriginAccount}
        setOpenAccountDialog={() => null}
        fieldLabel="NEW_TRANSACTION.DESTINATION_ACCOUNT"
        isDisplayCorrect={isDisplayCorrect}
      />
      <DateField
        slotProps={{
          textField: {
            helperText: isDate ? '' : t('NEW_TRANSACTION.DATE_CANT_BE_MORE'),
          },
        }}
        $isError={!isDate}
        required
        label={t('NEW_TRANSACTION.DATE')}
        value={date}
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
        <DoneButton
          onClick={() => {
            setIsDisplayCorrect(true);
            if (!isCash || !isDate || !isAccount) return;
            setOpenDialog(false);
          }}
        >
          <ButtonSvg as={DoneIcon} />
          <ButtonTitle>{t('NEW_TRANSACTION.DONE')}</ButtonTitle>
        </DoneButton>
        <CancelButton onClick={() => setOpenDialog(false)}>
          <ButtonSvg as={CancelIcon} />
          <ButtonTitle>{t('NEW_TRANSACTION.CANCEL')}</ButtonTitle>
        </CancelButton>
      </AddFormButtonsContainer>
    </>
  );
}

TransferTransactionForm.propTypes = {
  accounts: PropTypes.array,
  setOpenDialog: PropTypes.func,
};

export default TransferTransactionForm;
