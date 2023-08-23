export const getMobileTitle = (transactionType, t) => {
  switch (transactionType) {
    case 'expense':
      return t('NEW_TRANSACTION.TITLE.EXPENSE');
    case 'income':
      return t('NEW_TRANSACTION.TITLE.INCOME');
    case 'transfer':
      return t('NEW_TRANSACTION.TITLE.TRANSFER');
    default:
      return t('NEW_TRANSACTION.TITLE.EXPENSE');
  }
};
