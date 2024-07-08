import React from 'react';
import PropTypes from 'prop-types';
import { CheckboxContainer, LabelContainer } from '../../../../../theme/global';

function AccountsList({ accounts, accountTypes, setAccountTypes }) {
  return accounts.map((account) => {
    const description = account.description;
    const id = account.id;

    const type = accountTypes
      ? accountTypes.find(
          (accountType) => accountType.description === description,
        )
      : null;

    console.log(accountTypes);
    return (
      <div key={id}>
        <LabelContainer
          label={description}
          control={
            <CheckboxContainer
              checked={accountTypes ? (type ? type.checked : false) : false}
              onChange={(event) => {
                //if no element in array
                if (!type) {
                  setAccountTypes([
                    ...accountTypes,
                    {
                      id,
                      description,
                      checked: event.target.checked,
                    },
                  ]);
                } else {
                  const index = accountTypes.findIndex(
                    (accountType) => accountType.description === description,
                  );
                  const newTypes = accountTypes.slice();
                  if (index !== -1) {
                    newTypes[index] = {
                      id,
                      description,
                      checked: event.target.checked,
                    };
                    setAccountTypes(newTypes);
                  }
                }
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
  accountTypes: PropTypes.array,
  setAccountTypes: PropTypes.func,
};

export default AccountsList;
