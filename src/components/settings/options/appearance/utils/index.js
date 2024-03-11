import { changeMode } from '../../../../../actions/Actions';

export const marks = [
  {
    value: 12,
    label: '12px',
  },
  {
    value: 13,
    label: '13px',
  },
  {
    value: 14,
    label: '14px',
  },
  {
    value: 15,
    label: '15px',
  },
  {
    value: 16,
    label: '16px',
  },
  {
    value: 17,
    label: '17px',
  },
  {
    value: 18,
    label: '18px',
  },
  {
    value: 19,
    label: '19px',
  },
  {
    value: 20,
    label: '20px',
  },
];

export const setMode = (mode, setActiveMode, dispatch) => {
  setActiveMode(mode);
  localStorage.setItem('mode', mode);
  dispatch(changeMode(mode));
};

export const valuetext = (value) => {
  return `${value}px`;
};
