import React from 'react';
import PropTypes from 'prop-types';
import { categoryIcons } from '../../../../utils/constants/icons';
import {
  CategoriesDescription,
  CategoriesListItem,
  CategoriesSvg,
  ListItemContainer,
} from '../GlobalSearch.styled';
import { Link } from 'react-router-dom';
import { pages } from '../../../../utils/constants/pages';
import { renderNotes } from '../utils';

function CategoriesResults({ categories }) {
  return categories.slice(0, 3).map((category, index) => {
    const Icon = categoryIcons[category.icon];
    return (
      <ListItemContainer key={category.id}>
        <Link to={`${pages.categories.info.main}/${category.id}`}>
          <CategoriesListItem>
            <CategoriesDescription>
              <CategoriesSvg
                width="38"
                height="38"
                viewBox="0 0 38 38"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  cx="19"
                  cy="19"
                  r="19"
                  fill={`url(#searchCategory${index})`}
                ></circle>
                <Icon height="24" width="24" x="7" y="7" />
                <defs>
                  <linearGradient
                    id={`searchCategory${index}`}
                    x1="0"
                    y1="0"
                    x2="38"
                    y2="38"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor={category.color[0]} />
                    <stop offset="1" stopColor={category.color[1]} />
                  </linearGradient>
                </defs>
              </CategoriesSvg>
              {category.description}
            </CategoriesDescription>
            {renderNotes(category.notes)}
          </CategoriesListItem>
        </Link>
      </ListItemContainer>
    );
  });
}

CategoriesResults.propTypes = {
  categories: PropTypes.array,
};

export default CategoriesResults;
