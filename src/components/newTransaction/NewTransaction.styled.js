import { NavLink } from 'react-router-dom';
import { css, styled } from 'styled-components';
import { AddButton, BackLink, BackLinkSvg } from '../../theme/global';

export const FlexContainer = styled.div(() => ({
  display: 'flex',
  alignItems: 'center',
}));

export const HeaderTitle = styled(NavLink)((props) => ({
  height: 60,
  width: '33.3%',
  color: props.theme.colors.text.darker,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  '&.active': {
    borderBottom: `2px solid ${props.theme.colors.main.violet}`,
  },
}));

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

export const HeaderTitleLink = styled(HeaderTitle)((props) => {
  switch (props.$linkType) {
    case 'expense':
      return css(() => ({
        fill: 'url(#not_active)',
        '&:hover': {
          color: props.theme.colors.expense,
          fill: 'url(#expense_active)',
        },
        '&.active': {
          color: props.theme.colors.expense,
          fill: 'url(#expense_active)',
        },
      }));
    case 'income':
      return css(() => ({
        fill: 'url(#not_active)',
        '&:hover': {
          color: props.theme.colors.income,
          fill: 'url(#income_active)',
        },
        '&.active': {
          color: props.theme.colors.income,
          fill: 'url(#income_active)',
        },
      }));
    case 'transfer':
      return css(() => ({
        fill: 'url(#not_active)',
        '&:hover': {
          color: props.theme.colors.transfer,
          fill: 'url(#transfer_active)',
        },
        '&.active': {
          color: props.theme.colors.transfer,
          fill: 'url(#transfer_active)',
        },
      }));
    default:
      return css(() => ({
        fill: 'url(#not_active)',
        '&:hover': {
          color: props.theme.colors.expense,
          fill: 'url(#expense_active)',
        },
        '&.active': {
          color: props.theme.colors.expense,
          fill: 'url(#expense_active)',
        },
      }));
  }
});

export const HeaderSvg = styled.svg((props) => ({
  fill: 'inherit',
  height: 23,
  width: 23,
  marginRight: props.theme.spacing(2),
  '& rect': {
    fill: 'inherit',
  },
}));

export const NumericInput = styled.input((props) => ({
  color: props.theme.colors.text.primary,
  fontSize: '1rem',
  backgroundColor: props.theme.colors.background.primary,
}));

export const CategoriesList = styled.div((props) => ({
  position: 'absolute',
  right: 0,
  top: 60,
  zIndex: 1,
  backgroundColor: props.theme.colors.background.primary,
  width: `calc(100% - ${props.theme.spacing(3) * 2}px)`,
  padding: props.theme.spacing(3),
  maxHeight: 350,
  overflowY: 'auto',
  border: `1px solid ${props.theme.colors.border.item}`,
  borderRadius: props.theme.borderRadius,
  paddingBottom: props.theme.spacing(4),
  '@media (min-width: 600px)': {
    width: '80%',
  },
}));

export const AccountsList = styled.div((props) => ({
  position: 'absolute',
  top: 130,
  right: 0,
  zIndex: 1,
  backgroundColor: props.theme.colors.background.primary,
  width: `calc(100% - ${props.theme.spacing(3) * 2}px)`,
  padding: props.theme.spacing(3),
  maxHeight: 350,
  overflowY: 'auto',
  border: `1px solid ${props.theme.colors.border.item}`,
  borderRadius: props.theme.borderRadius,
  paddingBottom: props.theme.spacing(4),
  '&::-webkit-scrollbar': {
    width: 5,
  },
  '&::-webkit-scrollbar-thumb': {
    background: '#c4c4c4',
    borderRadius: props.theme.borderRadius,
  },
  '@media (min-width: 600px)': {
    width: '80%',
  },
}));

export const AddAccount = styled(AddButton)(() => ({
  justifyContent: 'center',
}));

export const Card = styled.div((props) => ({
  height: 197,
  width: 310,
  borderRadius: props.theme.borderRadius,
  background: `url(${props.$cardBackground}) 0% 0% / cover no-repeat, linear-gradient(90deg, ${props.$from} 0%, ${props.$to} 100%)`,
  boxShadow: `0px 4px 10px ${props.theme.colors.boxShadow}`,
  color: props.theme.colors.white,
}));

export const CardView = styled(Card)((props) => ({
  marginLeft: 'auto',
  marginRight: 'auto',
  marginBottom: props.theme.spacing(8),
}));

export const CardName = styled.div((props) => ({
  fontSize: '0.875rem',
  width: '100%',
  height: '10%',
  paddingTop: props.theme.spacing(2),
  paddingLeft: props.theme.spacing(4),
}));

export const CardBalanceContainer = styled(FlexContainer)(() => ({
  flexDirection: 'column',
  justifyContent: 'center',
  height: '74%',
}));

export const CardBalance = styled.div(() => ({
  fontSize: '1.375rem',
}));

export const CurrentBalance = styled.div(() => ({
  fontSize: '0.75rem',
}));

export const TransferCardsTitle = styled.div((props) => ({
  display: 'flex',
  justifyContent: 'space-between',
  color: props.theme.colors.text.darker,
  fontSize: '0.875rem',
}));

export const TransferCards = styled.div((props) => ({
  display: 'flex',
  justifyContent: 'space-between',
  marginBottom: props.theme.spacing(5),
}));

export const TransferCardSvg = styled.svg(() => ({
  width: 250,
}));

export const TransferArrow = styled.svg(() => ({
  height: 25,
  width: 25,
  alignSelf: 'center',
}));
