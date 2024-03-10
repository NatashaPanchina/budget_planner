import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import {
  AllFiltersContainer,
  AllFiltersHeader,
  AllFiltersTitle,
  FilterContainer,
  LabelContainer,
  RadioContainer,
  ResetButton,
  ShowButton,
} from '../../../theme/global';
import { RadioGroup } from '@mui/material';
import { updateCategoriesFilters } from '../../../actions/Actions';

function AllFilters({ setOpenFilters }) {
  const dispatch = useDispatch();
  const filters = useSelector((state) => state.categories.filters);
  const { t } = useTranslation();
  const [sortType, setSortType] = useState(filters.sort);
  const [type, setType] = useState(filters.type);
  const [notes, setNotes] = useState(filters.notes);

  return (
    <AllFiltersContainer>
      <AllFiltersHeader>
        {t('CATEGORIES_FILTERS.ALL_FILTERS')}
        <ResetButton
          onClick={() => {
            setSortType('By date');
            setType('All');
            setNotes('All');
          }}
        >
          {t('CATEGORIES_FILTERS.RESET_FILTERS')}
        </ResetButton>
      </AllFiltersHeader>
      <FilterContainer>
        <AllFiltersTitle>{t('CATEGORIES_FILTERS.SORT')}</AllFiltersTitle>
        <RadioGroup
          value={sortType}
          onChange={(event) => setSortType(event.target.value)}
        >
          <LabelContainer
            value="By date"
            control={<RadioContainer />}
            label={t('CATEGORIES_FILTERS.BY_DATE')}
          />
          <LabelContainer
            value="By adding"
            control={<RadioContainer />}
            label={t('CATEGORIES_FILTERS.BY_ADDING')}
          />
          <LabelContainer
            value="By alphabet"
            control={<RadioContainer />}
            label={t('CATEGORIES_FILTERS.BY_ALPHABET')}
          />
        </RadioGroup>
      </FilterContainer>
      <FilterContainer>{t('CATEGORIES_FILTERS.DATE')}</FilterContainer>
      <FilterContainer>
        <AllFiltersTitle>{t('CATEGORIES_FILTERS.TYPE')}</AllFiltersTitle>
        <RadioGroup
          value={type}
          onChange={(event) => setType(event.target.value)}
        >
          <LabelContainer
            value="All"
            control={<RadioContainer />}
            label={t('CATEGORIES_FILTERS.ALL')}
          />
          <LabelContainer
            value="expense"
            control={<RadioContainer />}
            label={t('CATEGORIES_FILTERS.EXPENSE')}
          />
          <LabelContainer
            value="income"
            control={<RadioContainer />}
            label={t('CATEGORIES_FILTERS.INCOME')}
          />
        </RadioGroup>
      </FilterContainer>
      <FilterContainer>
        <AllFiltersTitle>{t('CATEGORIES_FILTERS.NOTES')}</AllFiltersTitle>
        <RadioGroup
          value={notes}
          onChange={(event) => setNotes(event.target.value)}
        >
          <LabelContainer
            value="All"
            control={<RadioContainer />}
            label={t('CATEGORIES_FILTERS.ALL')}
          />
          <LabelContainer
            value="true"
            control={<RadioContainer />}
            label={t('CATEGORIES_FILTERS.WITH_NOTES')}
          />
          <LabelContainer
            value="false"
            control={<RadioContainer />}
            label={t('CATEGORIES_FILTERS.WITHOUT_NOTES')}
          />
        </RadioGroup>
      </FilterContainer>
      <ShowButton
        onClick={() => {
          dispatch(
            updateCategoriesFilters({
              sort: sortType,
              type,
              notes,
            }),
          );
          setOpenFilters(false);
        }}
      >
        {t('CATEGORIES_FILTERS.SHOW')}
      </ShowButton>
    </AllFiltersContainer>
  );
}

AllFilters.propTypes = {
  setOpenFilters: PropTypes.func,
};

export default AllFilters;
