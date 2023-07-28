import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { NumericFormat } from 'react-number-format';
import { dinero, toDecimal } from 'dinero.js';
import { USD } from '@dinero.js/currencies';

import { renderSelectedAccount } from '../../transactions/utils';

import { ReactComponent as PlusIcon } from '../../../assets/icons/shared/plus.svg';
import arrowIcon from '../../../assets/icons/shared/transferArrow.svg';
import { ReactComponent as OriginAccIcon } from '../../../assets/icons/shared/originAccount.svg';
import { ReactComponent as DestAccIcon } from '../../../assets/icons/shared/destAccount.svg';
import { pages } from '../../../utils/constants/pages';

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
    <>
      <div className="title_cards">
        <span>{t('NEW_TRANSACTION.ORIGIN_CASH')}</span>
        <span>{t('NEW_TRANSACTION.DESTINATION_CASH')}</span>
      </div>
      <div className="transfer_cards">
        <OriginAccIcon />
        <div className="arrow_icon">
          <img src={arrowIcon} height="25px" alt="transferArrow" />
        </div>
        <DestAccIcon />
      </div>
      <div
        className={`transaction_item ${
          activeItem === '1' ? `${transactionType}_active_item` : ''
        }`}
        onClick={() => setActiveItem('1')}
      >
        <div className="info_items">{t('NEW_TRANSACTION.FROM')}</div>
        <div className="input_items">
          {originAccount ? (
            renderSelectedAccount(originAccount, filteredAccounts)
          ) : (
            <Link to={pages.cash.add.card}>
              <PlusIcon />
              {t('NEW_TRANSACTION.ADD_CASH')}
            </Link>
          )}
        </div>
      </div>
      <div
        className={`transaction_item ${
          activeItem === '2' ? `${transactionType}_active_item` : ''
        }`}
        onClick={() => setActiveItem('2')}
      >
        <div className="info_items">{t('NEW_TRANSACTION.TO')}</div>
        <div className="input_items">
          {destAccount ? (
            renderSelectedAccount(destAccount, filteredAccounts)
          ) : (
            <Link to={pages.cash.add.card}>
              <PlusIcon />
              {t('NEW_TRANSACTION.ADD_CASH')}
            </Link>
          )}
        </div>
      </div>
      <div
        className={`transaction_item ${
          activeItem === '3' ? `${transactionType}_active_item` : ''
        }`}
        onClick={() => setActiveItem('3')}
      >
        <div className="info_items">{t('NEW_TRANSACTION.AMOUNT')}</div>
        <div className="input_items">
          ${' '}
          <NumericFormat
            thousandSeparator=","
            decimalSeparator="."
            decimalScale={2}
            allowNegative={false}
            placeholder="0.00"
            onValueChange={(values) => setAmount(values.floatValue)}
            value={amount}
          />
        </div>
      </div>
      <div
        className={`transaction_item ${
          activeItem === '4' ? `${transactionType}_active_item` : ''
        }`}
        onClick={() => setActiveItem('4')}
      >
        <div className="info_items">{t('NEW_TRANSACTION.DATE')}</div>
        <div className="input_items">
          <input
            type="date"
            value={date}
            onChange={(event) => setDate(new Date(event.target.value))}
          ></input>
        </div>
      </div>
      <div
        className={`transaction_item ${
          activeItem === '5' ? `${transactionType}_active_item` : ''
        }`}
        onClick={() => setActiveItem('5')}
      >
        <div className="info_items">{t('NEW_TRANSACTION.NOTES')}</div>
        <input
          type="text"
          onChange={(event) => setNotes(event.target.value)}
          defaultValue={notes}
        ></input>
      </div>
      <div
        className={`transaction_item ${
          activeItem === '6' ? `${transactionType}_active_item` : ''
        }`}
        onClick={() => setActiveItem('6')}
      >
        <div className="info_items">{t('NEW_TRANSACTION.TAGS')}</div>
        <input type="text"></input>
      </div>
      <div className="transactions_button_block">
        <div className="done_button_div">
          <Link
            to={`${pages.transactions[`${transactionType}s`]}/${destAccount}`}
          >
            <button className={`${transactionType}_button`}>
              {t('NEW_TRANSACTION.DONE')}
            </button>
          </Link>
        </div>
        <div className="cancel_button_div">
          <Link
            to={`${pages.transactions[`${transactionType}s`]}/${destAccount}`}
          >
            <button className="account_cancel_button">
              {t('NEW_TRANSACTION.CANCEL')}
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}

TransferTransactionForm.propTypes = {
  accounts: PropTypes.array,
};

export default TransferTransactionForm;
