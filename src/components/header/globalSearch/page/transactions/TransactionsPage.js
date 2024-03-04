import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Account,
  Amount,
  Category,
  DeleteButtonSvg,
  DeleteMenuItem,
  EditButtonSvg,
  EditLinkContainer,
  FlexContainer,
  ItemButtonsContainer,
  ListItemContainer,
  MobItemButtonSvg,
  MobTransactionDate,
  TransactionDate,
  TransactionInfo,
  TransactionInfoAccount,
  TransactionItem,
} from '../../../../transactions/Transactions.styled';
import { dateFormatter } from '../../../../../utils/format/date';
import { formatDineroOutput } from '../../../../../utils/format/cash';
import { dinero } from 'dinero.js';
import { deleteClick, renderNotes } from '../../../../transactions/list/utils';
import { InfoDialog, ToggleMenu } from '../../../../../theme/global';
import { MenuItem } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { deleteTransaction, editAccount } from '../../../../../actions/Actions';
import { ReactComponent as ToggleEditIcon } from '../../../../../assets/icons/shared/toggleEdit.svg';
import { ReactComponent as EditIcon } from '../../../../../assets/icons/shared/edit.svg';
import { ReactComponent as DeleteIcon } from '../../../../../assets/icons/shared/delete.svg';
import CategorySvg from '../../../../shared/CategorySvg';
import AccountSvg from '../../../../shared/AccountSvg';
import InfoTransaction from '../../../../transactions/infoTransaction/InfoTransaction';

function TransactionsPage({
  transactions,
  accounts,
  categories,
  mainCurrency,
  query,
}) {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [clickedTransaction, setClickedTransaction] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [openDialog, setOpenDialog] = useState(false);

  return transactions.length ? (
    <>
      <InfoDialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <InfoTransaction
          clickedTransaction={clickedTransaction.id}
          transactions={transactions}
          accounts={accounts}
          categories={categories}
          setOpenDialog={setOpenDialog}
        />
      </InfoDialog>
      {transactions.map((transaction, index) => {
        const transactionCategory = categories.find(
          (category) => category.id === transaction.category,
        );
        const transactionAccount = accounts.find(
          (account) => account.id === transaction.account,
        );

        if (!transactionCategory || !transactionAccount) {
          return null;
        }

        return (
          <div key={transaction.id}>
            <MobTransactionDate>
              {dateFormatter.format(new Date(transaction.date))}
            </MobTransactionDate>
            <ListItemContainer>
              <TransactionItem
                onClick={() => {
                  setClickedTransaction(transaction);
                  setOpenDialog(true);
                }}
              >
                <Category>
                  <CategorySvg
                    category={transactionCategory}
                    fillName={`transactionCategory${index}`}
                  />
                  {transactionCategory.description}
                </Category>
                <Account>
                  <AccountSvg account={transactionAccount} />
                  {transactionAccount.description}
                </Account>
                <TransactionInfo>
                  <CategorySvg
                    category={transactionCategory}
                    fillName={`mobTransactionCategory${index}`}
                  />
                  <div>
                    <div>{transactionCategory.description}</div>
                    <TransactionInfoAccount>
                      {transactionAccount.description}
                    </TransactionInfoAccount>
                  </div>
                </TransactionInfo>
                <Amount $amountType={transaction.transactionType}>
                  {formatDineroOutput(
                    dinero(transaction.amount),
                    transaction.amount.currency.code,
                  )}
                </Amount>
                <TransactionDate>
                  {dateFormatter.format(new Date(transaction.date))}
                </TransactionDate>
                {renderNotes(transaction.notes)}
              </TransactionItem>
              <ItemButtonsContainer>
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
                    <EditLinkContainer>
                      <EditButtonSvg as={EditIcon} />
                      {t('TRANSACTIONS.EDIT')}
                    </EditLinkContainer>
                  </MenuItem>
                  <DeleteMenuItem onClick={() => setAnchorEl(null)}>
                    <FlexContainer
                      onClick={() =>
                        deleteClick(
                          clickedTransaction,
                          accounts,
                          editAccount,
                          deleteTransaction,
                          dispatch,
                        )
                      }
                    >
                      <DeleteButtonSvg as={DeleteIcon} />
                      {t('TRANSACTIONS.DELETE')}
                    </FlexContainer>
                  </DeleteMenuItem>
                </ToggleMenu>
                <MobItemButtonSvg
                  as={ToggleEditIcon}
                  onClick={(event) => {
                    setClickedTransaction(transaction);
                    setAnchorEl(event.currentTarget);
                  }}
                />
              </ItemButtonsContainer>
            </ListItemContainer>
          </div>
        );
      })}
    </>
  ) : (
    <div>
      {t('SEARCH.NO_RESULTS')} {query}
    </div>
  );
}

TransactionsPage.propTypes = {
  transactions: PropTypes.array,
  accounts: PropTypes.array,
  categories: PropTypes.array,
  mainCurrency: PropTypes.string,
  query: PropTypes.string,
};

export default TransactionsPage;
