import { MenuItem, alpha, css, styled } from '@mui/material';
import { Link, NavLink } from 'react-router-dom';
import { AddButton } from '../../theme/global';

export const FlexContainer = styled('div')(() => ({
  display: 'flex',
  alignItems: 'center',
}));

export const MoreInfoContainer = styled('div')((props) => ({
  display: 'flex',
  flexWrap: 'wrap',
  '@media (min-width: 900px)': {
    display: 'block',
    height: `calc(100vh - ${props.theme.spacing(14)})`,
    minWidth: 180,
    overflowY: 'auto',
    position: 'sticky',
    top: props.theme.spacing(14),
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
  display: 'none',
  height: 40,
  justifyContent: 'center',
  textAlign: 'center',
  fontSize: '0.9375rem',
  color: props.theme.colors.text.darker,
  '@media (min-width: 600px)': {
    display: 'flex',
  },
  '@media (min-width: 768px)': {
    height: 50,
  },
}));

export const AddAccount = styled(AddButton)(() => ({
  justifyContent: 'center',
}));

export const CardContainer = styled(FlexContainer)(() => ({
  justifyContent: 'center',
}));

export const Card = styled(Link, {
  shouldForwardProp: (prop) =>
    prop !== '$background' && prop !== '$from' && prop !== '$to',
})((props) => ({
  position: 'relative',
  display: 'block',
  paddingTop: '60%',
  width: '100%',
  marginLeft: props.theme.spacing(5),
  marginRight: props.theme.spacing(5),
  borderRadius: props.theme.borderRadius,
  background: `url(${props.$background}) 0% 0% / cover no-repeat, linear-gradient(90deg, ${props.$from} 0%, ${props.$to} 100%)`,
  boxShadow: `0px 10px 30px ${alpha(props.$from, 0.3)}`,
  color: props.theme.colors.white,
  '@media (min-width: 600px)': {
    marginLeft: props.theme.spacing(4),
    marginRight: props.theme.spacing(4),
    boxShadow: `0px 10px 25px ${alpha(props.$from, 0.3)}`,
  },
  '@media (min-width: 900px)': {
    boxShadow: `0px 10px 20px ${alpha(props.$from, 0.3)}`,
  },
  '@media (min-width: 1400px)': {
    marginLeft: props.theme.spacing(5),
    marginRight: props.theme.spacing(5),
  },
}));

export const CardName = styled('div')((props) => ({
  position: 'absolute',
  top: 0,
  fontSize: '1rem',
  paddingTop: props.theme.spacing(2),
  paddingLeft: props.theme.spacing(4),
  '@media (min-width: 900px)': {
    fontSize: '0.875rem',
  },
}));

export const CardBalanceContainer = styled(FlexContainer)(() => ({
  position: 'absolute',
  top: '45%',
  width: '100%',
  flexDirection: 'column',
  justifyContent: 'center',
}));

export const CardBalance = styled('div')(() => ({
  fontSize: '1.5rem',
  fontWeight: 500,
  '@media (min-width: 900px)': {
    fontSize: '1.2rem',
  },
  '@media (min-width: 1200px)': {
    fontSize: '1.6rem',
  },
}));

export const CurrentBalance = styled('div')(() => ({
  fontSize: '0.875rem',
  '@media (min-width: 900px)': {
    fontSize: '0.625rem',
  },
}));

export const MobCount = styled('div')((props) => ({
  fontSize: '0.8rem',
  textAlign: 'end',
  color: props.theme.colors.text.darker,
  '@media (min-width: 600px)': {
    display: 'none',
  },
}));

export const TotalCountTransactions = styled(FlexContainer)((props) => ({
  height: 74,
  width: '40%',
  textAlign: 'center',
  justifyContent: 'center',
  marginLeft: 'auto',
  marginRight: 'auto',
  color: props.theme.colors.text.darker,
  '@media (min-width: 900px)': {
    padding: props.theme.spacing(2),
    width: '100%',
  },
}));

export const CountTransactionsContainer = styled(FlexContainer)((props) => ({
  display: 'none',
  flexWrap: 'wrap',
  '@media (min-width: 600px)': {
    display: 'flex',
    marginTop: props.theme.spacing(11),
  },
  '@media (min-width: 900px)': {
    marginTop: 0,
  },
}));

export const CountTransactionsBlock = styled('div')((props) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
  width: '45%',
  marginBottom: props.theme.spacing(5),
  marginLeft: 'auto',
  marginRight: 'auto',
  padding: props.theme.spacing(3),
  background: props.theme.colors.background.primary,
  border: `1px solid ${props.theme.colors.border.item}`,
  boxSizing: 'border-box',
  boxShadow: `0px 4px 10px ${props.theme.colors.boxShadow}`,
  borderRadius: props.theme.borderRadius,
  fontSize: '0.875rem',
  color: props.theme.colors.text.darker,
  '@media (min-width: 900px)': {
    textAlign: 'left',
    paddingBottom: props.theme.spacing(5),
    paddingTop: props.theme.spacing(5),
    width: '90%',
    maxWidth: 260,
  },
}));

const MoreSvg = styled('svg')((props) => ({
  height: 40,
  width: 40,
  marginRight: props.theme.spacing(2),
  '@media (min-width: 900px)': {
    marginLeft: 0,
    marginRight: props.theme.spacing(3),
  },
}));

export const ExpenseCountSvg = styled(MoreSvg)((props) => ({
  filter: `drop-shadow( 0px 3px 5px ${alpha(
    props.theme.colors.linear.expense.from,
    0.4,
  )})`,
}));

export const IncomeCountSvg = styled(MoreSvg)((props) => ({
  filter: `drop-shadow( 0px 3px 5px ${alpha(
    props.theme.colors.linear.income.from,
    0.4,
  )})`,
}));

export const TransferCountSvg = styled(MoreSvg)((props) => ({
  filter: `drop-shadow( 0px 3px 5px ${alpha(
    props.theme.colors.linear.transfer.from,
    0.4,
  )})`,
}));

const CountTransactions = styled('div')(() => ({
  fontSize: '1rem',
}));

export const CountInfo = styled(CountTransactions, {
  shouldForwardProp: (prop) => prop !== '$countType',
})((props) => ({
  color:
    props.$countType === 'total'
      ? props.theme.colors.main.violet
      : props.theme.colors[props.$countType],
}));

export const TransactionsTitleContainer = styled(FlexContainer)((props) => ({
  marginBottom: props.theme.spacing(4),
  borderBottom: `1px solid ${props.theme.colors.border.title}`,
  zIndex: 9,
  backgroundColor: props.theme.colors.background.body,
}));

export const TransactionsTitleLink = styled(NavLink)((props) => ({
  color: props.theme.colors.text.ordinary,
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
    borderBottom: `2px solid ${props.theme.colors.main.gold}`,
  },
}));

export const Description = styled('div')((props) => ({
  display: 'none',
  '@media (min-width: 768px)': {
    display: 'grid',
    gridTemplateColumns: '2fr 2fr 1.5fr 1.5fr',
    gap: props.theme.spacing(3),
    width: '100%',
    height: 35,
    fontSize: '0.875rem',
    color: props.theme.colors.text.darker,
  },
}));

export const DescriptionCategory = styled('span')((props) => ({
  paddingLeft: props.theme.spacing(5),
}));

export const MobTransactionDate = styled(FlexContainer)((props) => ({
  width: '100%',
  height: 30,
  color: props.theme.colors.text.darker,
  '@media (min-width: 768px)': {
    display: 'none',
  },
}));

export const ListItemContainer = styled('div')(() => ({
  position: 'relative',
  cursor: 'pointer',
}));

export const TransactionItem = styled('div')((props) => ({
  display: 'grid',
  gridTemplateAreas: '"description amount" "notes notes"',
  gridTemplateColumns: '1.5fr 1fr',
  gap: props.theme.spacing(3),
  alignItems: 'center',
  width: '100%',
  marginBottom: props.theme.spacing(2),
  paddingTop: props.theme.spacing(2),
  paddingBottom: props.theme.spacing(2),
  fontSize: '1rem',
  color: props.theme.colors.text.primary,
  background: props.theme.colors.background.primary,
  border: `1px solid ${props.theme.colors.border.item}`,
  boxShadow: `0px 4px 10px ${props.theme.colors.boxShadow}`,
  borderRadius: props.theme.borderRadius,
  boxSizing: 'border-box',
  transition: 'all 0.3s ease-out',
  '&:hover': {
    transform: 'scale(1.02)',
  },
  '@media (min-width: 768px)': {
    gridTemplateAreas:
      '"category account amount date" "notes notes notes notes"',
    gridTemplateColumns: '2fr 2fr 1.5fr 1.5fr',
    gap: props.theme.spacing(2),
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

export const Account = styled(FlexContainer)(() => ({
  display: 'none',
  '@media (min-width: 768px)': {
    display: 'flex',
    gridArea: 'account',
  },
}));

export const TransactionInfo = styled(FlexContainer)(() => ({
  gridArea: 'description',
  '@media (min-width: 768px)': {
    display: 'none',
  },
}));

export const TransactionInfoAccount = styled('div')((props) => ({
  fontSize: '0.9rem',
  color: props.theme.colors.text.darker,
}));

const CommonAmount = styled('div')((props) => ({
  marginLeft: 'auto',
  marginRight: props.theme.spacing(2),
  fontWeight: 500,
  '@media (min-width: 600px)': {
    marginLeft: 0,
  },
}));

export const Amount = styled(CommonAmount, {
  shouldForwardProp: (prop) => prop !== '$amountType',
})((props) => {
  switch (props.$amountType) {
    case 'expense':
      return css`
        grid-area: amount;
        color: ${props.theme.colors.expense};
      `;
    case 'income':
      return css`
        grid-area: amount;
        color: ${props.theme.colors.income};
      `;
    case 'transfer':
      return css`
        grid-area: amount;
        color: ${props.theme.colors.transfer};
      `;
    default:
      return css`
        grid-area: amount;
        color: ${props.theme.colors.expense};
      `;
  }
});

export const TransactionDate = styled(FlexContainer)(() => ({
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

export const NotesSvg = styled('svg')((props) => ({
  height: 15,
  width: 15,
  marginRight: props.theme.spacing(1),
  marginLeft: props.theme.spacing(2),
}));

export const DeleteMenuItem = styled(MenuItem)((props) => ({
  color: props.theme.colors.expense,
}));

export const ItemButtonsContainer = styled(FlexContainer)((props) => ({
  display: 'none',
  position: 'absolute',
  right: 0,
  top: props.theme.spacing(3),
  '@media (min-width: 600px)': {
    display: 'flex',
  },
}));

export const EditLinkContainer = styled(Link)((props) => ({
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  color: props.theme.colors.text.primary,
}));

export const EditButtonSvg = styled('svg')((props) => ({
  display: 'none',
  '@media (min-width: 600px)': {
    display: 'block',
    height: 15,
    marginRight: props.theme.spacing(2),
    cursor: 'pointer',
    '& path': {
      fill: props.theme.colors.text.primary,
    },
  },
}));

export const DeleteButtonSvg = styled(EditButtonSvg)((props) => ({
  '& path': {
    fill: props.theme.colors.expense,
  },
}));

export const MobItemButtonSvg = styled('svg')((props) => ({
  gridArea: 'button',
  height: 25,
  width: 25,
  paddingRight: props.theme.spacing(1),
  cursor: 'pointer',
  '& path': {
    fill: props.theme.colors.text.darker,
  },
  '&:hover': {
    '& circle': {
      fill: props.theme.colors.background.ordinary,
    },
  },
}));

export const TransactionsSpan = styled('span')(() => ({
  display: 'none',
  '@media (min-width: 900px)': {
    display: 'flex',
  },
}));

export const AddTransaction = styled(FlexContainer)((props) => ({
  justifyContent: 'center',
  color: props.theme.colors.main.violet,
  fill: props.theme.colors.main.violet,
  marginTop: props.theme.spacing(5),
  marginLeft: 'auto',
  marginRight: 'auto',
  cursor: 'pointer',
  width: 'fit-content',
  '&:hover': {
    color: props.theme.colors.main.purple,
    fill: props.theme.colors.main.purple,
  },
  '@media (min-width: 600px)': {
    fontSize: '1.2rem',
    fontWeight: 500,
  },
}));

export const AddText = styled('span')(() => ({
  display: 'none',
  '@media (min-width: 600px)': {
    display: 'flex',
  },
}));

export const AddSvg = styled('svg')((props) => ({
  fill: 'inherit',
  marginRight: props.theme.spacing(2),
  height: 20,
  '& path': {
    fill: 'inherit',
  },
}));

export const CalendarContainer = styled(FlexContainer)((props) => ({
  color: props.theme.colors.text.darker,
  marginBottom: props.theme.spacing(3),
  marginLeft: 'auto',
  marginRight: 'auto',
  '@media (min-width: 600px)': {
    display: 'none',
  },
}));

export const FilterCalendarSvg = styled('svg')((props) => ({
  height: 18,
  width: 18,
  margin: 0,
  marginRight: props.theme.spacing(2),
  '& path': {
    fill: props.theme.colors.main.gold,
  },
}));
