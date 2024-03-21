import React from 'react';
import PropTypes from 'prop-types';
import { CheckboxContainer, LabelContainer } from '../../../../../theme/global';

function CategorieList({ categories, categoryTypes, setCategoryTypes }) {
  return categories.map((category) => {
    const description = category.description;
    const id = category.id;
    return (
      <div key={id}>
        <LabelContainer
          label={description}
          control={
            <CheckboxContainer
              checked={
                categoryTypes
                  ? categoryTypes[description]
                    ? categoryTypes[description].checked
                    : false
                  : false
              }
              onChange={(event) => {
                setCategoryTypes({
                  ...categoryTypes,
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

CategorieList.propTypes = {
  categories: PropTypes.array,
  categoryTypes: PropTypes.object,
  setCategoryTypes: PropTypes.func,
};

export default CategorieList;
