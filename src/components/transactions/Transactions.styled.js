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
  height: 40,
  justifyContent: 'center',
  textAlign: 'center',
  fontSize: '0.9375rem',
  color: props.theme.colors.text.darker,
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
  display: 'block',
  height: 197,
  width: 310,
  borderRadius: props.theme.borderRadius,
  background: `url(${props.$background}) 0% 0% / cover no-repeat, linear-gradient(90deg, ${props.$from} 0%, ${props.$to} 100%)`,
  boxShadow: `0px 10px 30px ${alpha(props.$from, 0.3)}`,
  color: props.theme.colors.white,
  '@media (min-width: 600px)': {
    height: 171,
    width: 269,
    boxShadow: `0px 10px 25px ${alpha(props.$from, 0.3)}`,
  },
  '@media (min-width: 900px)': {
    height: 130,
    width: 205,
    boxShadow: `0px 10px 20px ${alpha(props.$from, 0.3)}`,
  },
}));

export const CardName = styled('div')((props) => ({
  fontSize: '1rem',
  width: '100%',
  height: '10%',
  paddingTop: props.theme.spacing(2),
  paddingLeft: props.theme.spacing(4),
  '@media (min-width: 900px)': {
    fontSize: '0.875rem',
  },
}));

export const CardBalanceContainer = styled(FlexContainer)(() => ({
  flexDirection: 'column',
  justifyContent: 'center',
  height: '74%',
}));

export const CardBalance = styled('div')(() => ({
  fontSize: '1.2rem',
  '@media (min-width: 900px)': {
    fontSize: '1rem',
  },
}));

export const CurrentBalance = styled('div')(() => ({
  fontSize: '0.875rem',
  '@media (min-width: 900px)': {
    fontSize: '0.625rem',
  },
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

export const CountTransactionsContainer = styled(FlexContainer)((props) => ({
  flexWrap: 'wrap',
  marginTop: props.theme.spacing(5),
  '@media (min-width: 900px)': {
    marginTop: 0,
  },
}));

export const CountTransactionsBlock = styled('div')((props) => ({
  width: '40%',
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

export const ExpenseCountSvg = styled('svg')((props) => ({
  height: 40,
  width: 40,
  filter: `drop-shadow( 0px 3px 5px ${alpha(
    props.theme.colors.linear.expense.from,
    0.4,
  )})`,
  display: 'none',
  '@media (min-width: 600px)': {
    display: 'flex',
  },
  '@media (min-width: 900px)': {
    marginRight: props.theme.spacing(3),
  },
}));

export const IncomeCountSvg = styled('svg')((props) => ({
  height: 40,
  width: 40,
  filter: `drop-shadow( 0px 3px 5px ${alpha(
    props.theme.colors.linear.income.from,
    0.4,
  )})`,
  display: 'none',
  '@media (min-width: 600px)': {
    display: 'flex',
  },
  '@media (min-width: 900px)': {
    marginRight: props.theme.spacing(3),
  },
}));

export const TransferCountSvg = styled('svg')((props) => ({
  height: 40,
  width: 40,
  filter: `drop-shadow( 0px 3px 5px ${alpha(
    props.theme.colors.linear.transfer.from,
    0.4,
  )})`,
  display: 'none',
  '@media (min-width: 600px)': {
    display: 'flex',
  },
  '@media (min-width: 900px)': {
    marginRight: props.theme.spacing(3),
  },
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
  position: 'sticky',
  top: props.theme.spacing(14),
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
}));

export const TransactionItem = styled('div')((props) => ({
  display: 'grid',
  gridTemplateAreas: '"description amount" "notes notes"',
  gridTemplateColumns: '1.5fr 1fr 29px',
  gap: props.theme.spacing(3),
  alignItems: 'center',
  width: '100%',
  marginBottom: props.theme.spacing(1),
  paddingTop: props.theme.spacing(2),
  paddingBottom: props.theme.spacing(2),
  fontSize: '1rem',
  color: props.theme.colors.text.primary,
  background: props.theme.colors.background.primary,
  border: `1px solid ${props.theme.colors.border.item}`,
  boxShadow: `0px 4px 10px ${props.theme.colors.boxShadow}`,
  borderRadius: props.theme.borderRadius,
  boxSizing: 'border-box',
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

export const TransactionInfoAccount = styled('div')(() => ({
  fontSize: '0.8125rem',
}));

export const Amount = styled('div', {
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
  position: 'absolute',
  right: 0,
  top: props.theme.spacing(3),
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
