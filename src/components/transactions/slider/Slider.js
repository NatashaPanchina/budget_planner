import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';

import { dinero, toSnapshot } from 'dinero.js';

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
import { currencies } from '../../../utils/constants/currencies';
import { getTotalBalance } from '../utils';

const CustomCarousel = styled(Carousel)(() => ({
  '& .MuiIconButton-root': {
    top: 'calc(50% - 30px)!important',
    '& .css-aq8pb7-MuiSvgIcon-root': {
      fontSize: '0.6rem',
    },
    '@media (min-width: 768px)': {
      '& .css-aq8pb7-MuiSvgIcon-root': {
        fontSize: '0.75rem',
      },
    },
  },
}));

function Slider({ mainCurrency, filterType, notArchivedAccounts }) {
  const { t } = useTranslation();
  const { filterAccount } = useParams();
  const [currentSlide, setCurrentSlide] = useState(1);
  const [totalBalance, setTotalBalance] = useState(
    dinero({ amount: 0, currency: currencies[mainCurrency] }),
  );

  const slides = [
    {
      id: 'all',
      color: ['#D38BFF', '#6D73FF'],
      balance: toSnapshot(totalBalance),
    },
    ...notArchivedAccounts,
  ];

  useEffect(() => {
    const index = slides.findIndex((account) => account.id === filterAccount);
    if (index != -1) setCurrentSlide(index);
  }, []);

  useEffect(() => {
    getTotalBalance(mainCurrency, notArchivedAccounts).then((result) => {
      setTotalBalance(result);
    });
  }, [mainCurrency, notArchivedAccounts]);

  return (
    <CustomCarousel
      indicators={true}
      autoPlay={false}
      swipe={true}
      animation="slide"
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
                {formatDineroOutput(
                  dinero(account.balance),
                  account.balance.currency.code,
                )}
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
  mainCurrency: PropTypes.string,
  filterType: PropTypes.string,
  notArchivedAccounts: PropTypes.array,
};

export default Slider;
