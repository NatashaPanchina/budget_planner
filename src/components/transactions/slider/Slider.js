import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';

import { add, dinero, toSnapshot } from 'dinero.js';
import { USD } from '@dinero.js/currencies';

import { formatDineroOutput } from '../../../utils/format/cash';

import cardBackground from '../../../assets/icons/shared/cardBackground.svg';
import { useTranslation } from 'react-i18next';
import { pages } from '../../../utils/constants/pages';
import {
  Card,
  CardBalance,
  CardBalanceContainer,
  CardContainer,
  CardName,
  CurrentBalance,
} from '../Transactions.styled';
import Carousel from 'react-material-ui-carousel';
import { styled } from '@mui/system';

const CustomCarousel = styled(Carousel)(() => ({
  '& .MuiIconButton-root': {
    top: 'calc(50% - 30px)!important',
    '& .css-aq8pb7-MuiSvgIcon-root': {
      fontSize: '0.75rem',
    },
  },
}));

function Slider({ filterType, notArchivedAccounts }) {
  const { t } = useTranslation();
  const { filterAccount } = useParams();
  const [currentSlide, setCurrentSlide] = useState(1);
  const accountsTotalBalance = toSnapshot(
    notArchivedAccounts.reduce(
      (sum, account) => add(sum, dinero(account.balance)),
      dinero({ amount: 0, currency: USD }),
    ),
  );
  const slides = [
    { id: 'all', color: ['#D38BFF', '#6D73FF'], balance: accountsTotalBalance },
    ...notArchivedAccounts,
  ];

  useEffect(() => {
    const index = slides.findIndex((account) => account.id === filterAccount);
    if (index != -1) setCurrentSlide(index);
  }, []);

  return (
    <CustomCarousel
      indicators={true}
      autoPlay={false}
      swipe={true}
      animation="fade"
      index={currentSlide}
    >
      {slides.map((account) => (
        <CardContainer key={account.id}>
          <Card
            to={`${pages.transactions[filterType]}/${account.id}`}
            $background={cardBackground}
            $from={account.color[0]}
            $to={account.color[1]}
          >
            <CardName>
              {account.description
                ? account.description
                : t('TRANSACTIONS.ALL')}
            </CardName>
            <CardBalanceContainer>
              <CardBalance>
                {formatDineroOutput(dinero(account.balance), 'USD')}
              </CardBalance>
              <CurrentBalance>
                {t('TRANSACTIONS.CURRENT_BALANCE')}
              </CurrentBalance>
            </CardBalanceContainer>
          </Card>
        </CardContainer>
      ))}
    </CustomCarousel>
  );
}

Slider.propTypes = {
  filterType: PropTypes.string,
  notArchivedAccounts: PropTypes.array,
};

export default Slider;
