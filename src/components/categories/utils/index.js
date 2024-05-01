export const showCheckMark = (key) => {
  const allMarks = document.querySelectorAll('.checkMarkIcon');
  for (let mark of allMarks) {
    if (!mark.classList.contains('none')) {
      mark.classList.add('none');
    }
  }
  document.querySelector(`.${key}`).classList.toggle('none');
};

export function toggleElement(ref) {
  ref.current.classList.toggle('none');
}

export function createFilterType(filterType) {
  switch (filterType) {
    case 'expenses':
      return 'expense';
    case 'incomes':
      return 'income';
    default:
      return 'all';
  }
}

export function filterCategories(filterType, categories) {
  return filterType === 'all'
    ? categories
    : categories.filter((category) => category.type === filterType);
}

export function createLocaleCategories(NAME, count) {
  if (count === 0) {
    return `${NAME}.CATEGORIES.MORE_THAN_FIVE`;
  } else if (count === 1) {
    return `${NAME}.CATEGORIES.ONE`;
  } else if (count < 5) {
    return `${NAME}.CATEGORIES.LESS_THAN_FIVE`;
  } else if (count >= 5) {
    return `${NAME}.CATEGORIES.MORE_THAN_FIVE`;
  } else {
    return `${NAME}.CATEGORIES.MORE_THAN_FIVE`;
  }
}

export const getFiltersTitle = (sort) => {
  switch (sort) {
    case 'By date':
      return 'CATEGORIES_FILTERS.BY_DATE';
    case 'By adding':
      return 'CATEGORIES_FILTERS.BY_ADDING';
    case 'By alphabet':
      return 'CATEGORIES_FILTERS.BY_ALPHABET';
    default:
      return 'By date';
  }
};
