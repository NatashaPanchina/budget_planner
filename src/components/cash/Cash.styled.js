import { Link, NavLink } from 'react-router-dom';
import {
  AddButton,
  BackLink,
  BackLinkSvg,
  ColorsContainer,
} from '../../theme/global';
import { styled } from '@mui/material';

export const FlexContainer = styled('div')(() => ({
  display: 'flex',
  alignItems: 'center',
}));

export const MoreInformationContainer = styled(FlexContainer)((props) => ({
  flexWrap: 'wrap',
  maxHeight: 200,
  marginTop: props.theme.spacing(5),
  border: `1px solid ${props.theme.colors.border.item}`,
  borderRadius: props.theme.borderRadius,
  textAlign: 'center',
  backgroundColor: props.theme.colors.background.primary,
  boxShadow: `0px 4px 10px ${props.theme.colors.boxShadow}`,
  '@media (min-width: 600px)': {
    height: 250,
    maxHeight: 250,
  },
  '@media (min-width: 900px)': {
    display: 'block',
    height: '85vh',
    maxHeight: '85vh',
    marginRight: props.theme.spacing(8),
    position: 'sticky',
    top: props.theme.spacing(14),
    zIndex: 9,
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
    fill: props.theme.colors.text.darker,
  },
  '@media (min-width: 600px)': {
    display: 'none',
  },
}));

export const TotalBalance = styled('div')((props) => ({
  display: 'none',
  '@media (min-width: 900px)': {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: props.theme.spacing(3),
    width: `calc(100% - ${props.theme.spacing(3 * 2)})`,
  },
}));

export const PieChartContainer = styled('div')((props) => ({
  display: 'none',
  '@media (min-width: 600px)': {
    display: 'flex',
    width: `calc(40% - ${props.theme.spacing(3 * 2)})`,
    height: `calc(100% - ${props.theme.spacing(3 * 2)})`,
    padding: props.theme.spacing(3),
  },
  '@media (min-width: 900px)': {
    display: 'block',
    width: `calc(100% - ${props.theme.spacing(5 * 2)})`,
    height: `calc(50% - ${props.theme.spacing(5 * 2)})`,
    padding: props.theme.spacing(5),
  },
}));

export const CenterText = styled('text')((props) => ({
  fill: props.theme.colors.text.primary,
}));

export const Tooltip = styled(FlexContainer)((props) => ({
  padding: props.theme.spacing(3),
  zIndex: 10,
  background: props.theme.colors.background.primary,
  border: `1px solid ${props.theme.colors.border.item}`,
  borderRadius: props.theme.borderRadius,
  fontSize: '0.875rem',
}));

export const TooltipSvg = styled('svg')((props) => ({
  marginRight: props.theme.spacing(1),
}));

export const TooltipValue = styled('span')((props) => ({
  fontWeight: 700,
  marginLeft: props.theme.spacing(1),
}));

export const LegendsContainer = styled(FlexContainer)((props) => ({
  height: `calc(80% - ${props.theme.spacing(3 * 2)})`,
  width: `calc(100% - ${props.theme.spacing(3 * 2)})`,
  overflowY: 'auto',
  fontSize: '0.875rem',
  padding: props.theme.spacing(3),
  '&::-webkit-scrollbar': {
    width: 5,
  },
  '&::-webkit-scrollbar-thumb': {
    background: 'rgba(196, 196, 196, 0.3)',
    borderRadius: props.theme.borderRadius,
  },
  '@media (min-width: 600px)': {
    height: `calc(80% - ${props.theme.spacing(3 * 2)})`,
    width: `calc(60% - ${props.theme.spacing(3 * 2)})`,
  },
  '@media (min-width: 900px)': {
    display: 'block',
    padding: props.theme.spacing(5),
    height: `calc(40% - ${props.theme.spacing(5 * 2)})`,
    width: `calc(100% - ${props.theme.spacing(5 * 2)})`,
  },
}));

export const CashTitleContainer = styled(FlexContainer)((props) => ({
  marginBottom: props.theme.spacing(4),
  borderBottom: `1px solid ${props.theme.colors.border.title}`,
  position: 'sticky',
  top: props.theme.spacing(14),
  zIndex: 9,
  backgroundColor: props.theme.colors.background.body,
}));

export const CashTitleLink = styled(NavLink)((props) => ({
  height: 50,
  width: '33.3%',
  fontSize: '0.9375rem',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  color: props.theme.colors.text.darker,
  '&:hover': {
    color: props.theme.colors.text.primary,
  },
  '&.active': {
    color: props.theme.colors.text.primary,
    borderBottom: `2px solid ${props.theme.colors.main.violet}`,
  },
}));

export const CommonFilter = styled('span')(() => ({
  display: 'flex',
  '@media (min-width: 600px)': {
    display: 'none',
  },
}));

export const AddCashButton = styled(AddButton)(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  '@media (min-width: 600px)': {
    justifyContent: 'start',
  },
}));

export const CashListItem = styled(FlexContainer)((props) => ({
  justifyContent: 'center',
  marginBottom: props.theme.spacing(10),
  '@media (min-width: 600px)': {
    justifyContent: 'start',
  },
}));

export const CardButtonlink = styled(Link)((props) => ({
  color: props.theme.colors.svg.pending,
  display: 'flex',
  alignItems: 'center',
}));

export const CardButtonTitle = styled('span')(() => ({
  display: 'none',
  '@media (min-width: 600px)': {
    display: 'block',
  },
}));

export const Card = styled('div', {
  shouldForwardProp: (prop) =>
    prop !== '$cardBackground' && prop !== '$from' && prop !== '$to',
})((props) => ({
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

export const CardName = styled('div')((props) => ({
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

export const CardBalance = styled('div')(() => ({
  fontSize: '1.375rem',
}));

export const CurrentBalance = styled('div')(() => ({
  fontSize: '0.75rem',
}));

export const CashColorsContainer = styled(ColorsContainer)((props) => ({
  top: props.theme.spacing(50),
  right: 0,
}));

export const CardButton = styled(FlexContainer)((props) => ({
  marginTop: props.theme.spacing(7),
  marginBottom: props.theme.spacing(7),
  color: props.theme.colors.svg.pending,
  fill: props.theme.colors.svg.pending,
  cursor: 'pointer',
  '&:hover': {
    color: props.theme.colors.svg.hover,
    fill: props.theme.colors.svg.hover,
  },
  '&:hover a': {
    color: props.theme.colors.svg.hover,
    fill: props.theme.colors.svg.hover,
  },
  '@media (min-width: 600px)': {
    marginTop: props.theme.spacing(6),
    marginBottom: props.theme.spacing(6),
  },
}));

export const CardButtonSvg = styled('svg')((props) => ({
  height: 18,
  width: 18,
  marginLeft: props.theme.spacing(4),
  fill: 'inherit',
  '& path': {
    fill: 'inherit',
  },
  '@media (min-width: 600px)': {
    marginLeft: props.theme.spacing(7),
    marginRight: props.theme.spacing(2),
  },
}));

export const NumericInput = styled('input')((props) => ({
  color: props.theme.colors.text.primary,
  fontSize: '1rem',
  backgroundColor: props.theme.colors.background.primary,
}));
