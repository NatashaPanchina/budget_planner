import { MenuItem, Popper, alpha, css, styled } from '@mui/material';
import { SearchField } from '../../../theme/global';
import { Link } from 'react-router-dom';

export const FlexContainer = styled('div')(() => ({
  display: 'flex',
  alignItems: 'center',
}));

export const GlobalSearchPopper = styled(Popper)((props) => ({
  zIndex: 350,
  width: '100%',
  marginTop: `${props.theme.spacing(2)} !important`,
  padding: props.theme.spacing(2),
  border: `1px solid ${props.theme.colors.border.item}`,
  borderRadius: props.theme.borderRadius,
  backgroundColor: props.theme.colors.background.primary,
  boxShadow: `0 2px 4px ${props.theme.colors.tooltipShadow}`,
  overflowY: 'auto',
  '&::-webkit-scrollbar': {
    width: 5,
  },
  '&::-webkit-scrollbar-thumb': {
    background: props.theme.colors.background.ordinary,
    borderRadius: props.theme.borderRadius,
  },
  '@media (min-width: 600px)': {
    width: '40%',
    minWidth: 365,
    height: 550,
  },
  '@media (min-width: 900px)': {
    width: '30%',
  },
}));

export const GlobalSearchField = styled(SearchField)((props) => ({
  display: 'none',
  marginBottom: 0,
  marginLeft: props.theme.spacing(4),
  '@media (min-width: 600px)': {
    display: 'flex',
    borderRadius: props.theme.borderRadius,
    backgroundColor: props.theme.colors.background.body,
    color: props.theme.colors.text.primary,
    '& .MuiInputAdornment-root': {
      margin: 0,
    },
    '& .MuiOutlinedInput-root': {
      '& .MuiInputBase-input': {
        padding: props.theme.spacing(2),
        backgroundColor: props.theme.colors.background.body,
        '&::placeholder': {
          fontStyle: 'italic',
          color: props.theme.colors.text.darker,
        },
      },
    },
  },
}));

export const GlobalSearchSvg = styled('svg')(() => ({
  height: 24,
  width: 24,
}));

export const ShowResults = styled(Link)((props) => ({
  display: 'block',
  width: '100%',
  padding: `${props.theme.spacing(3)} 0px`,
  color: props.theme.colors.main.violet,
  borderRadius: props.theme.borderRadius,
  '&:hover': {
    backgroundColor: props.theme.colors.background.ordinary,
  },
}));

export const ResultsTitle = styled(FlexContainer)((props) => ({
  width: '100%',
  padding: `${props.theme.spacing(3)} 0px`,
  fontWeight: 500,
}));

export const ResultsCount = styled('span')((props) => ({
  paddingLeft: props.theme.spacing(1),
  color: props.theme.colors.text.darker,
  fontWeight: 500,
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
}));

export const TransactionInfo = styled(FlexContainer)(() => ({
  gridArea: 'description',
}));

export const CategorySvg = styled('svg')((props) => ({
  marginLeft: props.theme.spacing(2),
  marginRight: props.theme.spacing(2),
  minWidth: 38,
}));

export const TransactionInfoAccount = styled('div')(() => ({
  fontSize: '0.8125rem',
}));

export const MobTransactionDate = styled(FlexContainer)((props) => ({
  width: '100%',
  height: 30,
  color: props.theme.colors.text.darker,
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

export const ListItemContainer = styled('div')(() => ({
  position: 'relative',
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
  display: 'block',
  height: 15,
  marginRight: props.theme.spacing(2),
  cursor: 'pointer',
  '& path': {
    fill: props.theme.colors.text.primary,
  },
}));

export const DeleteButtonSvg = styled(EditButtonSvg)((props) => ({
  '& path': {
    fill: props.theme.colors.expense,
  },
}));

export const DeleteMenuItem = styled(MenuItem)((props) => ({
  color: props.theme.colors.expense,
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

export const CategoriesListItem = styled('div')((props) => ({
  width: '100%',
  paddingTop: props.theme.spacing(2),
  paddingBottom: props.theme.spacing(2),
  marginBottom: props.theme.spacing(4),
  background: props.theme.colors.background.primary,
  border: `1px solid ${props.theme.colors.border.item}`,
  boxShadow: `0px 4px 10px ${props.theme.colors.boxShadow}`,
  borderRadius: props.theme.borderRadius,
  display: 'grid',
  gridTemplateAreas: '"desc" "notes"',
  gridTemplateColumns: '1fr',
  gap: props.theme.spacing(3),
  alignItems: 'center',
  color: props.theme.colors.text.primary,
  position: 'relative',
}));

export const CategoriesDescription = styled(FlexContainer)(() => ({
  gridArea: 'desc',
}));

export const CategoriesSvg = styled('svg')((props) => ({
  marginLeft: props.theme.spacing(2),
  marginRight: props.theme.spacing(2),
  minWidth: 38,
}));

export const CashListItem = styled('div')((props) => ({
  position: 'relative',
  alignItems: 'start',
  marginTop: props.theme.spacing(3),
  marginBottom: props.theme.spacing(7),
}));

export const Card = styled('div', {
  shouldForwardProp: (prop) =>
    prop !== '$cardBackground' && prop !== '$from' && prop !== '$to',
})((props) => ({
  height: 197,
  width: 310,
  borderRadius: props.theme.borderRadius,
  background: `url(${props.$cardBackground}) 0% 0% / cover no-repeat, linear-gradient(90deg, ${props.$from} 0%, ${props.$to} 100%)`,
  boxShadow: `0px 7px 20px ${alpha(props.$from, 0.4)}`,
  color: props.theme.colors.white,
}));

export const CardName = styled('div')((props) => ({
  fontSize: '0.875rem',
  width: `calc(100% - ${props.theme.spacing(4 * 2)})`,
  height: '10%',
  paddingTop: props.theme.spacing(2),
  paddingLeft: props.theme.spacing(4),
  paddingRight: props.theme.spacing(4),
}));

export const CardBalanceContainer = styled(FlexContainer)(() => ({
  flexDirection: 'column',
  justifyContent: 'center',
  height: '74%',
}));

export const CardBalance = styled('div')(() => ({
  fontSize: '1.375rem',
}));

export const CurrentBalance = styled('div')(() => ({
  fontSize: '0.75rem',
}));

export const BackLink = styled(Link)(() => ({
  height: 60,
  display: 'flex',
  alignItems: 'center',
}));

export const SvgContainer = styled('div')((props) => ({
  position: 'relative',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: 38,
  height: 38,
  minWidth: 38,
  marginLeft: props.theme.spacing(2),
  marginRight: props.theme.spacing(2),
}));

export const Emoji = styled('div')(() => ({
  position: 'absolute',
}));
