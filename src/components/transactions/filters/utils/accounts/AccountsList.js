import React from 'react';
import PropTypes from 'prop-types';
import { CheckboxContainer, LabelContainer } from '../../../../../theme/global';

function AccountsList({ accounts, accountTypes, setAccountTypes }) {
  return accounts.map((account) => {
    const description = account.description;
    const id = account.id;
    return (
      <div key={id}>
        <LabelContainer
          label={description}
          control={
            <CheckboxContainer
              checked={
                accountTypes
                  ? accountTypes[description]
                    ? accountTypes[description].checked
                    : false
                  : false
              }
              onChange={(event) => {
                setAccountTypes({
                  ...accountTypes,
                  [description]: {
                    id,
                    checked: event.target.checked,
                  },
                });
              }}
            />
          }
        />
      </div>
    );
  });
}

AccountsList.propTypes = {
  accounts: PropTypes.array,
  accountTypes: PropTypes.object,
  setAccountTypes: PropTypes.func,
};

export default AccountsList;
