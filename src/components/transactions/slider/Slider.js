import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { add, dinero } from 'dinero.js';
import { USD } from '@dinero.js/currencies';

import { formatDineroOutput } from '../../../utils/format/cash';

import { ReactComponent as ArrowRight } from '../../../assets/icons/shared/arrowRight.svg';
import { ReactComponent as ArrowLeft } from '../../../assets/icons/shared/arrowLeft.svg';
import cardBackground from '../../../assets/icons/shared/cardBackground.svg';
import { useTranslation } from 'react-i18next';
import { pages } from '../../../utils/constants/pages';

function previousSlide(slide, setCurrentSlide) {
  if (slide === 1) return;

  const slides = document.querySelectorAll('.accounts_slide');

  for (let i = 0; i < slides.length; i++) {
    slides[i].style.transform = `translate(-${100 * (slide - 2)}%)`;
  }
  setCurrentSlide(slide - 1);
}

function nextSlide(countSlides, slide, setCurrentSlide) {
  if (slide === countSlides) return;

  const slides = document.querySelectorAll('.accounts_slide');

  for (let i = 0; i < slides.length; i++) {
    slides[i].style.transform = `translate(-${100 * slide}%)`;
  }
  setCurrentSlide(slide + 1);
}

function Slider({ filterType, notArchivedAccounts }) {
  const { t } = useTranslation();
  const [currentSlide, setCurrentSlide] = useState(1);
  const countSlides = notArchivedAccounts.length + 1;
  const accountsTotalBalance = notArchivedAccounts.reduce(
    (sum, account) => add(sum, dinero(account.balance)),
    dinero({ amount: 0, currency: USD }),
  );

  return (
    <div className="accounts_card_block">
      <ArrowLeft
        className="arrow_left"
        onClick={() => previousSlide(currentSlide, setCurrentSlide)}
      />
      <ArrowRight
        className="arrow_right"
        onClick={() => nextSlide(countSlides, currentSlide, setCurrentSlide)}
      />
      <div className="accounts_slides_container">
        <div className="accounts_slide">
          <Link
            to={`${pages.transactions[filterType]}/all`}
            className="account_card"
            style={{
              background: `url(${cardBackground}) 0% 0% / cover no-repeat,
                                    linear-gradient(90deg, #D38BFF 0%, #6D73FF 100%)`,
              boxShadow: `0px 4px 10px #DCE2DF`,
            }}
          >
            <div className="card_name">{t('TRANSACTIONS.ALL')}</div>
            <div className="card_balance_info">
              <div className="card_balance">
                {formatDineroOutput(accountsTotalBalance, 'USD')}
              </div>
              <div className="card_balance_title">
                {t('TRANSACTIONS.CURRENT_BALANCE')}
              </div>
            </div>
          </Link>
        </div>
        {notArchivedAccounts.map((account) => {
          return (
            <div key={account.id} className="accounts_slide">
              <Link
                to={`${pages.transactions[filterType]}/${account.id}`}
                className="account_card"
                style={{
                  background: `url(${cardBackground}) 0% 0% / cover no-repeat,
                                        linear-gradient(90deg, ${account.color[0]} 0%, ${account.color[1]} 100%)`,
                  boxShadow: `0px 4px 10px #DCE2DF`,
                }}
              >
                <div className="card_name">{account.description}</div>
                <div className="card_balance_info">
                  <div className="card_balance">
                    {formatDineroOutput(dinero(account.balance), 'USD')}
                  </div>
                  <div className="card_balance_title">
                    {t('TRANSACTIONS.CURRENT_BALANCE')}
                  </div>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}

Slider.propTypes = {
  filterType: PropTypes.string,
  notArchivedAccounts: PropTypes.array,
};

export default Slider;
