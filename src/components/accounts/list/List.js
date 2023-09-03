import React from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';

import TransfersList from './TransfersList.js';
import AccountsList from './AccountsList.js';

function List({ notArchivedAccounts, archiveAccount }) {
  const filterCash = useParams().filterCash;
  return filterCash === 'transfers' ? (
    <TransfersList />
  ) : (
    <AccountsList
      notArchivedAccounts={notArchivedAccounts}
      archiveAccount={archiveAccount}
    />
  );
}

List.propTypes = {
  notArchivedAccounts: PropTypes.array,
  archiveAccount: PropTypes.func,
};

export default List;
