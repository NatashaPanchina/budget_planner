import { Link, NavLink } from 'react-router-dom';
import { css, styled } from 'styled-components';

export const Container = styled.div((props) => ({
  marginTop: props.theme.spacing(14),
  marginLeft: '19%',
  marginRight: '3%',
  display: 'flex',
  justifyContent: 'space-between',
}));

export const MoreInfoContainer = styled.div((props) => ({
  width: '20%',
  height: '90vh',
  overflowY: 'auto',
  marginRight: props.theme.spacing(5),
  position: 'fixed',
  '&::-webkit-scrollbar': {
    width: 5,
  },
  '&::-webkit-scrollbar-thumb': {
    background: props.theme.colors.background.ordinary,
    borderRadius: props.theme.borderRadius,
  },
}));

export const MoreInfoHeader = styled.div((props) => ({
  height: 50,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
  fontSize: '0.9375rem',
  color: props.theme.colors.text.darker,
}));

export const SliderContainer = styled.div((props) => ({
  position: 'relative',
  marginTop: props.theme.spacing(4),
  width: '100%',
  height: 130,
  overflow: 'hidden',
}));

export const Slide = styled.div(() => ({
  transition: 'transform 0.5s linear',
}));

const SliderSvg = styled.svg((props) => ({
  position: 'absolute',
  zIndex: 1,
  height: 28,
  bottom: 'calc(50% - 14px)',
  opacity: 0.7,
  cursor: 'pointer',
  '& circle': {
    fill: props.theme.colors.background.ordinary,
  },
  '& path': {
    fill: props.theme.colors.text.darker,
  },
  '&:hover': {
    opacity: 1,
  },
}));

export const SliderNextSvg = styled(SliderSvg)(() => ({
  right: 0,
}));

export const SliderPrevSvg = styled(SliderSvg)(() => ({
  left: 0,
}));

export const SlidesContainer = styled.div(() => ({
  display: 'flex',
  overflow: 'hidden',
}));

export const Card = styled(Link)((props) => ({
  display: 'block',
  height: 130,
  width: 205,
  marginLeft: props.theme.spacing(7),
  borderRadius: props.theme.borderRadius,
  background: `url(${props.$cardBackground}) 0% 0% / cover no-repeat, linear-gradient(90deg, ${props.$from} 0%, ${props.$to} 100%)`,
  boxShadow: `0px 4px 10px ${props.theme.colors.boxShadow}`,
  color: props.theme.colors.white,
}));

export const CardName = styled.div((props) => ({
  fontSize: '0.875rem',
  width: '100%',
  height: '10%',
  paddingTop: props.theme.spacing(2),
  paddingLeft: props.theme.spacing(4),
}));

export const CardBalanceContainer = styled.div(() => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '74%',
}));

export const CardBalance = styled.div(() => ({
  fontSize: '1rem',
}));

export const CurrentBalance = styled.div(() => ({
  fontSize: '0.625rem',
}));

export const CountTransactionsContainer = styled.div((props) => ({
  marginTop: props.theme.spacing(3),
  textAlign: 'center',
}));

export const CountTransactionsBlock = styled.div((props) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: 100,
  width: '80%',
  marginTop: props.theme.spacing(3),
  marginBottom: props.theme.spacing(5),
  marginLeft: 'auto',
  marginRight: 'auto',
  background: props.theme.colors.background.primary,
  border: `1px solid ${props.theme.colors.border.item}`,
  boxShadow: `0px 4px 10px ${props.theme.colors.boxShadow}`,
  borderRadius: 10,
  textAlign: 'left',
  fontSize: '0.875rem',
}));

export const CountTransactionsSvg = styled.svg((props) => ({
  height: 30,
  width: 30,
  marginLeft: props.theme.spacing(3),
  marginRight: props.theme.spacing(3),
}));

const CountTransactions = styled.div(() => ({
  fontSize: '1rem',
}));

export const CountInfo = styled(CountTransactions)((props) => {
  switch (props.$countType) {
    case 'total':
      return css(() => ({
        color: props.theme.colors.main.violet,
      }));
    case 'expense':
      return css(() => ({
        color: props.theme.colors.expense,
      }));
    case 'income':
      return css(() => ({
        color: props.theme.colors.income,
      }));
    case 'transfer':
      return css(() => ({
        color: props.theme.colors.transfer,
      }));
    default:
      return css(() => ({
        color: props.theme.colors.main.violet,
      }));
  }
});

export const MainInfoContainer = styled.div(() => ({
  marginLeft: '30%',
  width: '70%',
}));

export const Header = styled.div((props) => ({
  height: 50,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  backgroundColor: props.theme.colors.background.body,
}));

export const HeaderTitle = styled.div(() => ({
  marginRight: 'auto',
}));

export const TransactionsTitleContainer = styled.div((props) => ({
  display: 'flex',
  marginBottom: props.theme.spacing(4),
  borderBottom: `1px solid ${props.theme.colors.border.title}`,
  position: 'sticky',
  top: 56,
  zIndex: 9,
  backgroundColor: props.theme.colors.background.body,
}));

export const TransactionsTitleLink = styled(NavLink)((props) => ({
  color: props.theme.colors.text.darker,
  fontSize: '0.9375rem',
  height: 50,
  width: '25%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  '&:hover': {
    color: props.theme.colors.text.primary,
  },
  '&.active': {
    color: props.theme.colors.text.primary,
    borderBottom: `2px solid ${props.theme.colors.main.violet}`,
  },
}));

export const Description = styled.div((props) => ({
  display: 'grid',
  gridTemplateColumns: '2fr 2fr 1.5fr 1.5fr',
  gap: '10px 5%',
  width: '100%',
  height: 35,
  fontSize: '0.875rem',
  color: props.theme.colors.text.darker,
  '& span:first-child': {
    paddingLeft: props.theme.spacing(5),
  },
}));

export const TransactionItem = styled.div((props) => ({
  display: 'grid',
  gridTemplateAreas: '"category account amount date" "notes notes notes notes"',
  gridTemplateColumns: '2fr 2fr 1.5fr 1.5fr',
  gap: '10px 5%',
  alignItems: 'center',
  position: 'relative',
  width: '100%',
  marginBottom: props.theme.spacing(4),
  paddingTop: props.theme.spacing(2),
  paddingBottom: props.theme.spacing(2),
  fontSize: '0.875rem',
  background: props.theme.colors.background.primary,
  border: `1px solid ${props.theme.colors.border.item}`,
  boxShadow: `0px 4px 10px ${props.theme.colors.boxShadow}`,
  borderRadius: props.theme.borderRadius,
  '&:hover svg': {
    opacity: 1,
  },
}));

export const Category = styled.div(() => ({
  gridArea: 'category',
  display: 'flex',
  alignItems: 'center',
}));

export const CategorySvg = styled.svg((props) => ({
  marginLeft: props.theme.spacing(5),
  marginRight: props.theme.spacing(4),
}));

export const Account = styled.div(() => ({
  gridArea: 'account',
  display: 'flex',
  alignItems: 'center',
}));

export const AccountSvg = styled.svg((props) => ({
  marginRight: props.theme.spacing(4),
}));

export const Amount = styled.div((props) => {
  switch (props.$amountType) {
    case 'expense':
      return css(() => ({
        gridArea: 'amount',
        color: props.theme.colors.expense,
      }));
    case 'income':
      return css(() => ({
        gridArea: 'amount',
        color: props.theme.colors.income,
      }));
    case 'transfer':
      return css(() => ({
        gridArea: 'amount',
        color: props.theme.colors.transfer,
      }));
    default:
      return css(() => ({
        gridArea: 'amount',
        color: props.theme.colors.expense,
      }));
  }
});

export const TransactionDate = styled.div(() => ({
  gridArea: 'date',
}));

export const Notes = styled.div((props) => ({
  gridArea: 'notes',
  color: props.theme.colors.text.darker,
  display: 'flex',
  alignItems: 'center',
}));

export const NotesSvg = styled.svg((props) => ({
  height: 15,
  width: 15,
  marginRight: props.theme.spacing(1),
}));

export const ItemButtonsContainer = styled.div(() => ({
  position: 'absolute',
  right: 0,
  top: 10,
}));

export const ItemButtonSvg = styled.svg((props) => ({
  height: 30,
  width: 30,
  marginRight: props.theme.spacing(4),
  opacity: 0,
  cursor: 'pointer',
  '& path': {
    fill: props.theme.colors.text.darker,
  },
  '& circle': {
    fill: props.theme.colors.background.ordinary,
  },
  '&:hover path': {
    fill: props.theme.colors.text.primary,
  },
}));
