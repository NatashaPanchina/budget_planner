import { css, styled } from 'styled-components';
import { BackLink, BackLinkSvg } from '../../theme/global';
import { NavLink } from 'react-router-dom';

export const TitleLink = styled(NavLink)((props) => ({
  height: 60,
  width: '33.3%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  boxSizing: 'border-box',
  color: props.theme.colors.text.darker,
}));

export const TitleLinkSvg = styled.svg((props) => ({
  height: 23,
  marginRight: props.theme.spacing(1.5),
}));

export const AddCategoryTitle = styled(TitleLink)((props) => {
  switch (props.$titleType) {
    case 'income':
      return css(() => ({
        '& svg rect': {
          fill: 'url(#not_active)',
        },
        '&:hover': {
          color: props.theme.colors.income,
        },
        '&:hover svg rect': {
          fill: 'url(#income_active)',
        },
        '&.active': {
          borderBottom: '2px solid #6D73FF',
          color: props.theme.colors.income,
        },
        '&.active svg rect': {
          fill: 'url(#income_active)',
        },
      }));
    case 'expense':
      return css(() => ({
        '& svg rect': {
          fill: 'url(#not_active)',
        },
        '&:hover': {
          color: props.theme.colors.expense,
        },
        '&:hover svg rect': {
          fill: 'url(#expense_active)',
        },
        '&.active': {
          borderBottom: '2px solid #6D73FF',
          color: props.theme.colors.expense,
        },
        '&.active svg rect': {
          fill: 'url(#expense_active)',
        },
      }));
    default:
      return css(() => ({
        '& svg rect': {
          fill: 'url(#not_active)',
        },
        '&:hover': {
          color: props.theme.colors.expense,
        },
        '&:hover svg rect': {
          fill: 'url(#expense_active)',
        },
        '&.active': {
          borderBottom: '2px solid #6D73FF',
          color: props.theme.colors.expense,
        },
        '&.active svg rect': {
          fill: 'url(#expense_active)',
        },
      }));
  }
});

export const Back = styled(BackLink)(() => ({
  zIndex: 200,
  position: 'fixed',
  top: 0,
  '@media (min-width: 600px)': {
    display: 'none',
  },
}));

export const BackSvg = styled(BackLinkSvg)((props) => ({
  '& path': {
    fill: props.theme.colors.white,
  },
  '@media (min-width: 600px)': {
    display: 'none',
  },
}));
