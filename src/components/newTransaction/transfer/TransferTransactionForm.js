import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { NumericFormat } from 'react-number-format';
import { dinero, toDecimal } from 'dinero.js';
import { USD } from '@dinero.js/currencies';

import { renderSelectedAccount } from '../../transactions/utils';

import { ReactComponent as DoneIcon } from '../../../assets/icons/shared/checkMark.svg';
import { ReactComponent as CancelIcon } from '../../../assets/icons/shared/delete.svg';
import { ReactComponent as PlusIcon } from '../../../assets/icons/shared/plus.svg';
import { ReactComponent as ArrowIcon } from '../../../assets/icons/shared/transferArrow.svg';
import { ReactComponent as OriginAccIcon } from '../../../assets/icons/shared/originAccount.svg';
import { ReactComponent as DestAccIcon } from '../../../assets/icons/shared/destAccount.svg';
import { pages } from '../../../utils/constants/pages';
import {
  AddButton,
  AddButtonSvg,
  AddFormButtonsContainer,
  ButtonSvg,
  ButtonTitle,
  CancelButton,
  DoneButton,
  FieldDescription,
  FieldInput,
  FormField,
  FormFieldsContainer,
} from '../../../theme/global';
import {
  NumericInput,
  TransferArrow,
  TransferCardSvg,
  TransferCards,
  TransferCardsTitle,
} from '../NewTransaction.styled';

function TransferTransactionForm({ accounts }) {
  const { t } = useTranslation();
  const [activeItem, setActiveItem] = useState('');
  const [filteredAccounts, setFilteredAccounts] = useState([]);

  const transactionType = 'transfer';
  const [originAccount, setOriginAccount] = useState();
  const [destAccount, setDestAccount] = useState();
  const [amount, setAmount] = useState(
    toDecimal(dinero({ amount: 0, currency: USD })),
  );
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState('');
  //const [tags, setTags] = useState([]);

  useEffect(() => {
    setFilteredAccounts(accounts);
    if (accounts.length) {
      setOriginAccount(accounts[0].id);
      setDestAccount(accounts[0].id);
    }
  }, [accounts]);

  return (
    <FormFieldsContainer>
      <TransferCardsTitle>
        <span>{t('NEW_TRANSACTION.ORIGIN_CASH')}</span>
        <span>{t('NEW_TRANSACTION.DESTINATION_CASH')}</span>
      </TransferCardsTitle>
      <TransferCards>
        <TransferCardSvg as={OriginAccIcon} />
        <TransferArrow as={ArrowIcon} />
        <TransferCardSvg as={DestAccIcon} />
      </TransferCards>
      <FormField
        $isActive={activeItem === '1'}
        $formType={transactionType}
        onClick={() => setActiveItem('1')}
      >
        <FieldDescription>{t('NEW_TRANSACTION.FROM')}</FieldDescription>
        {originAccount ? (
          renderSelectedAccount(originAccount, filteredAccounts)
        ) : (
          <AddButton to={pages.cash.add.card}>
            <AddButtonSvg as={PlusIcon} />
            {t('NEW_TRANSACTION.ADD_CASH')}
          </AddButton>
        )}
      </FormField>
      <FormField
        $isActive={activeItem === '2'}
        $formType={transactionType}
        onClick={() => setActiveItem('2')}
      >
        <FieldDescription>{t('NEW_TRANSACTION.TO')}</FieldDescription>
        {destAccount ? (
          renderSelectedAccount(destAccount, filteredAccounts)
        ) : (
          <AddButton to={pages.cash.add.card}>
            <AddButtonSvg as={PlusIcon} />
            {t('NEW_TRANSACTION.ADD_CASH')}
          </AddButton>
        )}
      </FormField>
      <FormField
        $isActive={activeItem === '3'}
        $formType={transactionType}
        onClick={() => setActiveItem('3')}
      >
        <FieldDescription>{t('NEW_TRANSACTION.AMOUNT')}</FieldDescription>
        $
        <NumericFormat
          customInput={NumericInput}
          thousandSeparator=","
          decimalSeparator="."
          decimalScale={2}
          allowNegative={false}
          placeholder="0.00"
          onValueChange={(values) => setAmount(values.floatValue)}
          value={amount}
        />
      </FormField>
      <FormField
        $isActive={activeItem === '4'}
        $formType={transactionType}
        onClick={() => setActiveItem('4')}
      >
        <FieldDescription>{t('NEW_TRANSACTION.DATE')}</FieldDescription>
        <FieldInput
          type="date"
          value={date}
          onChange={(event) => setDate(new Date(event.target.value))}
        ></FieldInput>
      </FormField>
      <FormField
        $isActive={activeItem === '5'}
        $formType={transactionType}
        onClick={() => setActiveItem('5')}
      >
        <FieldDescription>{t('NEW_TRANSACTION.NOTES')}</FieldDescription>
        <FieldInput
          type="text"
          onChange={(event) => setNotes(event.target.value)}
          defaultValue={notes}
        ></FieldInput>
      </FormField>
      <FormField
        $isActive={activeItem === '6'}
        $formType={transactionType}
        onClick={() => setActiveItem('6')}
      >
        <FieldDescription>{t('NEW_TRANSACTION.TAGS')}</FieldDescription>
        <FieldInput type="text"></FieldInput>
      </FormField>
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
    </FormFieldsContainer>
  );
}

TransferTransactionForm.propTypes = {
  accounts: PropTypes.array,
};

export default TransferTransactionForm;
