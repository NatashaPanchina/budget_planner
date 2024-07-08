import React from 'react';
import PropTypes from 'prop-types';
import {
  FilterItem,
  FilterItemSvg,
  FilterItemsContainer,
} from '../../theme/global';
import { ReactComponent as DeleteFilter } from '../../assets/icons/shared/cancel.svg';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

const format = (string) => {
  return string.replace(' ', '_').toUpperCase();
};

const getActiveFilters = (filters, t, updateFilters, dispatch) => {
  const arFilters = Object.entries(filters);
  console.log(arFilters);
  const result = [];

  arFilters.forEach((filter) => {
    if (filter[0] === 'sort' && filter[1] !== 'By date') {
      result.push({
        text: t(`FILTERS.${format(filter[1])}`),
        handler: () => dispatch(updateFilters({ ...filters, sort: 'By date' })),
      });
    }
    if (filter[0] === 'type' && filter[1] !== 'All') {
      result.push({
        text: t(`FILTERS.${format(filter[1])}`),
        handler: () => dispatch(updateFilters({ ...filters, type: 'All' })),
      });
    }
    if (filter[0] === 'accounts' && filter[1] !== null) {
      const arr = filter[1];
      arr.forEach((account) => {
        if (account.checked) {
          result.push({
            text: account.description,
            handler: () => {
              const newAccountTypes = arr.filter(
                (accountType) =>
                  accountType.description !== account.description,
              );
              dispatch(
                updateFilters({
                  ...filters,
                  accounts: newAccountTypes,
                }),
              );
            },
          });
        }
      });
    }
    if (filter[0] === 'categories' && filter[1] !== null) {
      const arr = Object.keys(filter[1]);
      arr.forEach((category) => {
        if (filter[1][category].checked) {
          result.push({
            text: category,
            handler: () =>
              dispatch(
                updateFilters({
                  ...filters,
                  categories: {
                    ...filters.categories,
                    [category]: {
                      ...filters.categories[category],
                      checked: false,
                    },
                  },
                }),
              ),
          });
        }
      });
    }
    if (filter[0] === 'currencies' && filter[1] !== null) {
      const arr = Object.keys(filter[1]);
      arr.forEach((currency) => {
        if (filter[1][currency]) {
          result.push({
            text: currency,
            handler: () =>
              dispatch(
                updateFilters({
                  ...filters,
                  currencies: { ...filters.currencies, [currency]: false },
                }),
              ),
          });
        }
      });
    }
    if (
      filter[0] === 'amount' &&
      filter[1].from !== null &&
      filter[1].to !== null
    ) {
      result.push({
        text: `${t(`FILTERS.FROM`)} ${filter[1].from} ${t(`FILTERS.TO`)} ${
          filter[1].to
        }`,
        handler: () =>
          dispatch(
            updateFilters({ ...filters, amount: { from: null, to: null } }),
          ),
      });
    }
    if (
      filter[0] === 'balance' &&
      filter[1].from !== null &&
      filter[1].to !== null
    ) {
      result.push({
        text: `${t(`FILTERS.FROM`)} ${filter[1].from} ${t(`FILTERS.TO`)} ${
          filter[1].to
        }`,
        handler: () =>
          dispatch(
            updateFilters({ ...filters, balance: { from: null, to: null } }),
          ),
      });
    }
    if (filter[0] === 'notes' && filter[1] !== 'All') {
      if (filter[1]) {
        result.push({
          text: t(`FILTERS.WITH_NOTES`),
          handler: () => dispatch(updateFilters({ ...filters, notes: 'All' })),
        });
      } else {
        result.push({
          text: t(`FILTERS.WITHOUT_NOTES`),
          handler: () => dispatch(updateFilters({ ...filters, notes: 'All' })),
        });
      }
    }
  });

  return result;
};

function FilterItems({ filters, updateFilters }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const activeFilters = getActiveFilters(filters, t, updateFilters, dispatch);
  console.log(activeFilters);

  return (
    <FilterItemsContainer>
      {activeFilters.map((filter, index) => {
        return (
          <FilterItem key={index} onClick={filter.handler}>
            {filter.text} <FilterItemSvg as={DeleteFilter} />
          </FilterItem>
        );
      })}
    </FilterItemsContainer>
  );
}

FilterItems.propTypes = {
  filters: PropTypes.object,
  updateFilters: PropTypes.func,
};

export default FilterItems;
