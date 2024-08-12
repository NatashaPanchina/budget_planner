import { linearGradientDef } from '@nivo/core';
import { chartsColors } from '../../../../utils/constants/chartsColors';
import { convertPeriod } from '../../../../utils/format/date';

export function createDescriptions(categories, currentDate, comparedDate) {
  let result = categories.map((category) => category.description);
  const currentDateDesc = currentDate
    ? convertPeriod(currentDate.from, currentDate.during, 'EN')
    : '';
  const comparedDateDesc = comparedDate
    ? convertPeriod(comparedDate.from, comparedDate.during, 'EN')
    : '';
  result.push(
    'expenses',
    'incomes',
    'savings',
    `${currentDateDesc} savings`,
    `${comparedDateDesc} savings`,
    `${currentDateDesc} expenses`,
    `${comparedDateDesc} expenses`,
    `${currentDateDesc} incomes`,
    `${comparedDateDesc} incomes`,
  );
  return result;
}

export function createGradientColors(categories, currentDate, comparedDate) {
  let result = {};
  categories.forEach((category) => {
    //eslint-disable-next-line
    const desc = category.description.replaceAll(/[ \(\)]/g, '_');
    Object.assign(result, {
      [desc]: category.color,
    });
  });
  const currentDateDesc = currentDate
    ? convertPeriod(currentDate.from, currentDate.during, 'EN')
    : '';
  const comparedDateDesc = comparedDate
    ? convertPeriod(comparedDate.from, comparedDate.during, 'EN')
    : '';
  return Object.assign(
    result,
    { expenses: chartsColors.expenses },
    { incomes: chartsColors.incomes },
    { [`${currentDateDesc}_savings`]: chartsColors.savings },
    { [`${comparedDateDesc}_savings`]: chartsColors.comparedSavings },
    { [`${currentDateDesc}_expenses`]: chartsColors.expenses },
    { [`${comparedDateDesc}_expenses`]: chartsColors.comparedExpenses },
    { [`${currentDateDesc}_incomes`]: chartsColors.incomes },
    { [`${comparedDateDesc}_incomes`]: chartsColors.comparedIncomes },
  );
}

export function renderGradients(gradientsColors) {
  let result = [];
  for (let key in gradientsColors) {
    result.push(
      linearGradientDef(
        key.replaceAll(/[ ()]/g, '_'),
        [
          { offset: 0, color: gradientsColors[key][0] },
          { offset: 100, color: gradientsColors[key][1] },
        ],
        {
          gradientTransform: 'rotate(-45 0.5 0.5)',
        },
      ),
    );
  }
  return result;
}

export function renderMatchs(descriptions, currentDate, comparedDate) {
  let result = descriptions.map((desc) => {
    return { match: { id: desc }, id: desc.replaceAll(/[ ()]/g, '_') };
  });
  const currentDateMatch = currentDate
    ? convertPeriod(currentDate.from, currentDate.during, 'EN')
    : '';
  const comparedDateMatch = comparedDate
    ? convertPeriod(comparedDate.from, comparedDate.during, 'EN')
    : '';
  return Object.assign(
    result,
    { match: 'expenses', id: 'expenses' },
    { match: 'incomes', id: 'incomes' },
    { match: 'savings', id: 'savings' },
    { match: `${currentDateMatch} savings`, id: `${currentDateMatch}_savings` },
    {
      match: `${comparedDateMatch} savings`,
      id: `${comparedDateMatch}_savings`,
    },
    {
      match: `${currentDateMatch} expenses`,
      id: `${currentDateMatch}_expenses`,
    },
    {
      match: `${comparedDateMatch} expenses`,
      id: `${comparedDateMatch}_expenses`,
    },
    { match: `${currentDateMatch} incomes`, id: `${currentDateMatch}_incomes` },
    {
      match: `${comparedDateMatch} incomes`,
      id: `${comparedDateMatch}_incomes`,
    },
  );
}
