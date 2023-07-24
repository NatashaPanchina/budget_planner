import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';

import { add, dinero } from 'dinero.js';
import { USD } from '@dinero.js/currencies';

import { formatDineroOutput } from '../../../utils/format/cash';

import { ReactComponent as ArrowRight } from '../../../assets/icons/shared/arrowRight.svg';
import { ReactComponent as ArrowLeft } from '../../../assets/icons/shared/arrowLeft.svg';
import cardBackground from '../../../assets/icons/shared/cardBackground.svg';
import { useTranslation } from 'react-i18next';
import { pages } from '../../../utils/constants/pages';
import {
  Card,
  CardBalance,
  CardBalanceContainer,
  CardName,
  CurrentBalance,
  Slide,
  SliderContainer,
  SliderNextSvg,
  SliderPrevSvg,
  SlidesContainer,
} from '../Transactions.styled';

const previousSlide = (slide, setCurrentSlide) => {
  if (slide === 1) return 100 * (slide - 1);
  const transforming = 100 * (slide - 2);
  setCurrentSlide(slide - 1);
  return transforming;
};

const nextSlide = (countSlides, slide, setCurrentSlide) => {
  if (slide === countSlides) return 100 * (slide - 1);
  const transforming = 100 * slide;
  setCurrentSlide(slide + 1);
  return transforming;
};

function Slider({ filterType, notArchivedAccounts }) {
  const { t } = useTranslation();
  const { filterAccount } = useParams();
  const [currentSlide, setCurrentSlide] = useState(1);
  const [transforming, setTransforming] = useState(0);
  const countSlides = notArchivedAccounts.length + 1;
  const accountsTotalBalance = notArchivedAccounts.reduce(
    (sum, account) => add(sum, dinero(account.balance)),
    dinero({ amount: 0, currency: USD }),
  );

  useEffect(() => {
    const index = notArchivedAccounts.findIndex(
      (account) => account.id === filterAccount,
    );
    if (index != -1)
      setTransforming(nextSlide(countSlides, index + 1, setCurrentSlide));
  }, []);

  return (
    <SliderContainer>
      <SliderPrevSvg
        as={ArrowLeft}
        onClick={() =>
          setTransforming(previousSlide(currentSlide, setCurrentSlide))
        }
      />
      <SliderNextSvg
        as={ArrowRight}
        onClick={() =>
          setTransforming(nextSlide(countSlides, currentSlide, setCurrentSlide))
        }
      />
      <SlidesContainer>
        <Slide $transforming={transforming}>
          <Card
            to={`${pages.transactions[filterType]}/all`}
            $cardBackground={cardBackground}
            $from="#D38BFF"
            $to="#6D73FF"
          >
            <CardName>{t('TRANSACTIONS.ALL')}</CardName>
            <CardBalanceContainer>
              <CardBalance>
                {formatDineroOutput(accountsTotalBalance, 'USD')}
              </CardBalance>
              <CurrentBalance>{t('TRANSACTIONS.TOTAL_BALANCE')}</CurrentBalance>
            </CardBalanceContainer>
          </Card>
        </Slide>
        {notArchivedAccounts.map((account) => {
          return (
            <Slide key={account.id} $transforming={transforming}>
              <Card
                to={`${pages.transactions[filterType]}/${account.id}`}
                $cardBackground={cardBackground}
                $from={account.color[0]}
                $to={account.color[1]}
              >
                <CardName>{account.description}</CardName>
                <CardBalanceContainer>
                  <CardBalance>
                    {formatDineroOutput(dinero(account.balance), 'USD')}
                  </CardBalance>
                  <CurrentBalance>
                    {t('TRANSACTIONS.CURRENT_BALANCE')}
                  </CurrentBalance>
                </CardBalanceContainer>
              </Card>
            </Slide>
          );
        })}
      </SlidesContainer>
    </SliderContainer>
  );
}

Slider.propTypes = {
  filterType: PropTypes.string,
  notArchivedAccounts: PropTypes.array,
};

export default Slider;
