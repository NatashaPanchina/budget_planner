import { linearGradientDef } from '@nivo/core';

export function createDescriptions(categories) {
  let result = categories.map((category) => category.description);
  result.push('expenses', 'incomes');
  return result;
}

export function createGradientColors(categories) {
  let result = {};
  categories.forEach((category) => {
    Object.assign(result, { [category.description]: category.color });
  });
  return Object.assign(
    result,
    { expenses: ['#FF599F', '#F4395B'] },
    { incomes: ['#B3FF53', '#6EBD0A'] },
  );
}

export function renderGradients(gradientsColors) {
  let result = [];
  for (let key in gradientsColors) {
    result.push(
      linearGradientDef(
        key,
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

export function renderMatchs(descriptions) {
  let result = descriptions.map((desc) => {
    return { match: { id: desc }, id: desc };
  });
  return Object.assign(
    result,
    { match: 'expenses', id: 'expenses' },
    { match: 'incomes', id: 'incomes' },
  );
}
