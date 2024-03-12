import { sortByDate } from '../../utils/sort';

describe('sortByDate', () => {
  it('check data is immutable and sort it by date', () => {
    const data = [
      {
        other: 'other_data',
        date: '02/27/2024',
      },
      {
        other: 'other_data',
        date: '01/30/2024',
      },
      {
        other: 'other_data',
        date: '02/05/2024',
      },
    ];
    expect(sortByDate(data)).toEqual([
      {
        other: 'other_data',
        date: '02/27/2024',
      },
      {
        other: 'other_data',
        date: '02/05/2024',
      },
      {
        other: 'other_data',
        date: '01/30/2024',
      },
    ]);
    expect(data).toEqual([
      {
        other: 'other_data',
        date: '02/27/2024',
      },
      {
        other: 'other_data',
        date: '01/30/2024',
      },
      {
        other: 'other_data',
        date: '02/05/2024',
      },
    ]);
  });

  it('sort an empty data', () => {
    expect(sortByDate([])).toEqual([]);
  });

  it('sort undefined data', () => {
    expect(sortByDate(null)).toEqual([]);
  });
});
