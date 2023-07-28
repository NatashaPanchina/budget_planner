import { Link, NavLink } from 'react-router-dom';
import { css, styled } from 'styled-components';

const FlexContainer = styled.div(() => ({
  display: 'flex',
  alignItems: 'center',
}));

export const MoreInfoContainer = styled.div((props) => ({
  display: 'flex',
  flexWrap: 'wrap',
  '@media (min-width: 900px)': {
    display: 'block',
    height: `calc(100vh - ${props.theme.spacing(14)}px)`,
    minWidth: 180,
    overflowY: 'auto',
    position: 'sticky',
    top: 56,
    '&::-webkit-scrollbar': {
      width: 5,
    },
    '&::-webkit-scrollbar-thumb': {
      background: props.theme.colors.background.ordinary,
      borderRadius: props.theme.borderRadius,
    },
  },
}));

export const MoreInfoHeader = styled(FlexContainer)((props) => ({
  height: 50,
  justifyContent: 'center',
  textAlign: 'center',
  fontSize: '0.9375rem',
  color: props.theme.colors.text.darker,
}));

export const SliderContainer = styled.div((props) => ({
  position: 'relative',
  width: '100%',
  height: 130,
  overflow: 'hidden',
  '@media (min-width: 768px)': {
    marginTop: props.theme.spacing(4),
  },
}));

export const Slide = styled.div((props) => ({
  transition: 'transform 0.5s linear',
  transform: `translate(-${props.$transforming}%)`,
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

export const SlidesContainer = styled(FlexContainer)(() => ({
  overflow: 'hidden',
}));

export const Card = styled(Link)((props) => ({
  display: 'block',
  height: 130,
  width: 205,
  marginRight: props.theme.spacing(7),
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

export const CardBalanceContainer = styled(FlexContainer)(() => ({
  flexDirection: 'column',
  justifyContent: 'center',
  height: '74%',
}));

export const CardBalance = styled.div(() => ({
  fontSize: '1rem',
}));

export const CurrentBalance = styled.div(() => ({
  fontSize: '0.625rem',
}));

export const TotalCountTransactions = styled(FlexContainer)((props) => ({
  height: 74,
  width: '40%',
  textAlign: 'center',
  justifyContent: 'center',
  marginLeft: 'auto',
  marginRight: 'auto',
  '@media (min-width: 900px)': {
    padding: props.theme.spacing(2),
    width: '100%',
  },
}));

export const CountTransactionsContainer = styled.div((props) => ({
  display: 'flex',
  flexWrap: 'wrap',
  marginTop: props.theme.spacing(5),
  '@media (min-width: 900px)': {
    marginTop: 0,
  },
}));

export const CountTransactionsBlock = styled.div((props) => ({
  width: '40%',
  marginBottom: props.theme.spacing(5),
  marginLeft: 'auto',
  marginRight: 'auto',
  padding: props.theme.spacing(3),
  background: props.theme.colors.background.primary,
  border: `1px solid ${props.theme.colors.border.item}`,
  boxSizing: 'border-box',
  boxShadow: `0px 4px 10px ${props.theme.colors.boxShadow}`,
  borderRadius: 10,
  fontSize: '0.875rem',
  textAlign: 'center',
  '@media (min-width: 900px)': {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'left',
    paddingBottom: props.theme.spacing(5),
    paddingTop: props.theme.spacing(5),
    width: '90%',
  },
}));

export const CountTransactionsSvg = styled.svg((props) => ({
  height: 30,
  width: 30,
  '@media (min-width: 900px)': {
    marginRight: props.theme.spacing(3),
  },
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

export const Header = styled(FlexContainer)((props) => ({
  height: 50,
  justifyContent: 'flex-end',
  backgroundColor: props.theme.colors.background.body,
}));

export const HeaderTitle = styled.div(() => ({
  marginRight: 'auto',
}));

export const TransactionsTitleContainer = styled(FlexContainer)((props) => ({
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
  display: 'none',
  '@media (min-width: 768px)': {
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
  },
}));

export const MobTransactionDate = styled(FlexContainer)((props) => ({
  width: '100%',
  height: 30,
  color: props.theme.colors.text.darker,
  '@media (min-width: 768px)': {
    display: 'none',
  },
}));

export const TransactionItem = styled.div((props) => ({
  display: 'grid',
  gridTemplateAreas: '"description amount" "notes notes"',
  gridTemplateColumns: '1.5fr 1fr',
  gap: '10px 5%',
  alignItems: 'center',
  position: 'relative',
  width: '100%',
  marginBottom: props.theme.spacing(1),
  paddingTop: props.theme.spacing(2),
  paddingBottom: props.theme.spacing(2),
  fontSize: '1rem',
  background: props.theme.colors.background.primary,
  border: `1px solid ${props.theme.colors.border.item}`,
  boxShadow: `0px 4px 10px ${props.theme.colors.boxShadow}`,
  borderRadius: props.theme.borderRadius,
  boxSizing: 'border-box',
  '@media (min-width: 768px)': {
    gridTemplateAreas:
      '"category account amount date" "notes notes notes notes"',
    gridTemplateColumns: '2fr 2fr 1.5fr 1.5fr',
    gap: '10px 5%',
    marginBottom: props.theme.spacing(4),
    '&:hover svg': {
      opacity: 1,
    },
  },
}));

export const Category = styled(FlexContainer)(() => ({
  display: 'none',
  '@media (min-width: 768px)': {
    display: 'flex',
    gridArea: 'category',
  },
}));

export const CategorySvg = styled.svg((props) => ({
  marginLeft: props.theme.spacing(2),
  marginRight: props.theme.spacing(2),
  '@media (min-width: 768px)': {
    marginLeft: props.theme.spacing(5),
    marginRight: props.theme.spacing(4),
  },
}));

export const Account = styled(FlexContainer)(() => ({
  display: 'none',
  '@media (min-width: 768px)': {
    display: 'flex',
    gridArea: 'account',
  },
}));

export const AccountSvg = styled.svg((props) => ({
  marginRight: props.theme.spacing(4),
}));

export const TransactionInfo = styled(FlexContainer)(() => ({
  gridArea: 'description',
  '@media (min-width: 768px)': {
    display: 'none',
  },
}));

export const TransactionInfoAccount = styled.div(() => ({
  fontSize: '0.8125rem',
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
  display: 'none',
  '@media (min-width: 768px)': {
    display: 'flex',
    gridArea: 'date',
  },
}));

export const Notes = styled(FlexContainer)((props) => ({
  gridArea: 'notes',
  color: props.theme.colors.text.darker,
}));

export const NotesSvg = styled.svg((props) => ({
  height: 15,
  width: 15,
  marginRight: props.theme.spacing(1),
  marginLeft: props.theme.spacing(2),
}));

export const ItemButtonsContainer = styled.div(() => ({
  display: 'flex',
  position: 'absolute',
  right: 0,
  top: 10,
}));

export const ItemButtonSvg = styled.svg((props) => ({
  display: 'none',
  '@media (min-width: 900px)': {
    display: 'block',
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
  },
}));

export const MobItemButtonSvg = styled.svg((props) => ({
  height: 25,
  width: 25,
  cursor: 'pointer',
  '& path': {
    fill: props.theme.colors.text.darker,
  },
  '@media (min-width: 900px)': {
    display: 'none',
  },
}));

export const MobItemButtonsContainer = styled.div((props) => ({
  backgroundColor: props.theme.colors.background.ordinary,
  position: 'absolute',
  left: '50%',
  top: '50%',
  zIndex: 20,
}));
