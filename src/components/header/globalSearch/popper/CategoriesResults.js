import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  CategoriesDescription,
  CategoriesListItem,
  CategoriesSvg,
  Emoji,
  ListItemContainer,
  SvgContainer,
} from '../GlobalSearch.styled';
import { useTranslation } from 'react-i18next';
import { InfoDialog } from '../../../../theme/global';
import InfoCategory from '../../../categories/infoCategory/InfoCategory';
import Notes from '../../../shared/Notes';

function CategoriesResults({ categories, query }) {
  const { t } = useTranslation();
  const [clickedCategory, setClickedCategory] = useState('');
  const [openDialog, setOpenDialog] = useState(false);

  return categories.length ? (
    <>
      <InfoDialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <InfoCategory
          clickedCategory={clickedCategory.id}
          categories={categories}
          setOpenDialog={setOpenDialog}
        />
      </InfoDialog>
      {categories.map((category, index) => {
        return (
          <ListItemContainer key={category.id}>
            <CategoriesListItem
              onClick={() => {
                setClickedCategory(category);
                setOpenDialog(true);
              }}
            >
              <CategoriesDescription>
                <div>
                  <SvgContainer>
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
                        fill={`url(#popperCategory${index})`}
                      ></circle>
                      <defs>
                        <linearGradient
                          id={`popperCategory${index}`}
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
                    <Emoji>{String.fromCodePoint(category.icon)}</Emoji>
                  </SvgContainer>
                </div>
                {category.description}
              </CategoriesDescription>
              <Notes notes={category.notes} />
            </CategoriesListItem>
          </ListItemContainer>
        );
      })}
    </>
  ) : (
    <div>{`${t('SEARCH.NO_RESULTS')} ${query}`}</div>
  );
}

CategoriesResults.propTypes = {
  categories: PropTypes.array,
  query: PropTypes.string,
};

export default CategoriesResults;
