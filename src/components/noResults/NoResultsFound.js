import React from 'react';
import PropTypes from 'prop-types';
import {
  NoSearchResults,
  NoSearchResultsContainer,
  NoSearchResultsSvg,
} from '../../theme/global';
import { ReactComponent as NoResults } from '../../assets/icons/shared/noResults.svg';
import { useTranslation } from 'react-i18next';

function NoResultsFound({ query }) {
  const { t } = useTranslation();

  return (
    <NoSearchResults>
      <NoSearchResultsContainer>
        <div>
          <NoSearchResultsSvg as={NoResults} />
        </div>
        <div>{`${t('SEARCH.NO_RESULTS')} "${query}"`}</div>
      </NoSearchResultsContainer>
    </NoSearchResults>
  );
}

NoResultsFound.propTypes = {
  query: PropTypes.string,
};

export default NoResultsFound;
