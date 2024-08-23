import { Link, NavLink } from 'react-router-dom';
import { BackLink, BackLinkSvg, MobItemButtonSvg } from '../../theme/global';
import { MenuItem, alpha, styled } from '@mui/material';

export const FlexContainer = styled('div')(() => ({
  display: 'flex',
  alignItems: 'center',
}));

export const MoreInformationContainer = styled(FlexContainer)((props) => ({
  display: 'none',
  flexWrap: 'wrap',
  maxHeight: 200,
  marginTop: props.theme.spacing(5),
  border: `1px solid ${props.theme.colors.border.item}`,
  borderRadius: props.theme.borderRadius,
  textAlign: 'center',
  backgroundColor: props.theme.colors.background.primary,
  boxShadow: `0px 4px 10px ${props.theme.colors.boxShadow}`,
  '@media (min-width: 900px)': {
    display: 'block',
    height: '85vh',
    maxHeight: '85vh',
    marginRight: props.theme.spacing(8),
    position: 'sticky',
    top: props.theme.spacing(18),
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

export const MobTotalBalance = styled(FlexContainer)((props) => ({
  color: props.theme.colors.text.darker,
  justifyContent: 'center',
  '@media (min-width: 768px)': {
    display: 'none',
  },
}));

export const MobBalance = styled('span')((props) => ({
  color: props.theme.colors.text.primary,
  fontWeight: 500,
  fontSize: '1.5rem',
  marginLeft: props.theme.spacing(2),
  '@media (min-width: 900px)': {
    display: 'none',
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
  fontSize: '1.3rem',
  fontWeight: 500,
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
    borderBottom: `2px solid ${props.theme.colors.main.gold}`,
  },
}));

export const CashListItem = styled('div')((props) => ({
  display: 'flex',
  position: 'relative',
  justifyContent: 'center',
  alignItems: 'start',
  marginTop: props.theme.spacing(3),
  marginBottom: props.theme.spacing(7),
  minHeight: 236,
  '@media (min-width: 900px)': {
    justifyContent: 'start',
  },
}));

export const CardButtonlink = styled(Link)((props) => ({
  color: props.theme.colors.text.primary,
  display: 'flex',
  alignItems: 'center',
}));

export const Card = styled('div', {
  shouldForwardProp: (prop) =>
    prop !== '$cardBackground' && prop !== '$from' && prop !== '$to',
})((props) => ({
  cursor: 'pointer',
  minHeight: 227,
  height: 227,
  width: 348,
  borderRadius: props.theme.borderRadius,
  background: `url(${props.$cardBackground}) 0% 0% / cover no-repeat, linear-gradient(90deg, ${props.$from} 0%, ${props.$to} 100%)`,
  boxShadow: `0px 7px 20px ${alpha(props.$from, 0.4)}`,
  color: props.theme.colors.white,
  transition: 'all 0.3s ease-out',
  '&:hover': {
    boxShadow: `0px 7px 20px ${alpha(props.$from, 0.6)}`,
    transform: 'scale(1.02)',
  },
}));

export const CardView = styled(Card)((props) => ({
  marginLeft: 'auto',
  marginRight: 'auto',
  marginBottom: props.theme.spacing(5),
  '@media (min-width: 600px)': {
    marginTop: props.theme.spacing(5),
    marginBottom: props.theme.spacing(5),
  },
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
  fontSize: '1.5rem',
  fontWeight: 500,
}));

export const CurrentBalance = styled('div')(() => ({
  fontSize: '0.75rem',
}));

export const CardButtonSvg = styled('svg')((props) => ({
  display: 'none',
  '@media (min-width: 600px)': {
    display: 'flex',
    height: 15,
    width: 15,
    '& path': {
      fill: props.theme.colors.text.primary,
    },
    marginRight: props.theme.spacing(2),
  },
}));

export const DeleteMenuItem = styled(MenuItem)((props) => ({
  color: props.theme.colors.expense,
}));

export const DeleteSvg = styled(CardButtonSvg)((props) => ({
  '& path': {
    fill: props.theme.colors.expense,
  },
}));

export const NumericInput = styled('input')((props) => ({
  color: props.theme.colors.text.primary,
  fontSize: '1rem',
  backgroundColor: props.theme.colors.background.primary,
}));

export const ToggleButtonSvg = styled(MobItemButtonSvg)(() => ({
  display: 'none',
  position: 'absolute',
  top: 0,
  right: 0,
  height: 30,
  width: 30,
  padding: 0,
  '@media (min-width: 900px)': {
    display: 'flex',
    position: 'static',
  },
}));

export const TrashToggleSvg = styled(MobItemButtonSvg)(() => ({
  height: 30,
  width: 30,
  padding: 0,
  '@media (min-width: 900px)': {
    display: 'flex',
    position: 'static',
  },
}));

export const CommonInfoContainer = styled('div')((props) => ({
  display: 'none',
  '@media (min-width: 600px)': {
    display: 'block',
    maxHeight: 227,
    marginRight: props.theme.spacing(3),
  },
  '@media (min-width: 900px)': {
    maxHeight: 227,
  },
}));

export const CommonInfoItem = styled('div', {
  shouldForwardProp: (prop) => prop !== '$type',
})((props) => ({
  marginTop: props.theme.spacing(3),
  textAlign: 'center',
  padding: `${props.theme.spacing(3)} ${props.theme.spacing(6)}`,
  width: `calc(45% - ${props.theme.spacing(6 * 2)})`,
  marginLeft: 'auto',
  marginRight: 'auto',
  borderBottom:
    props.$type === 'expense'
      ? `1px solid ${props.theme.colors.text.darker}`
      : 'none',
  '@media (min-width: 600px)': {
    width: 'auto',
    margin: 0,
    padding: `${props.theme.spacing(6)} ${props.theme.spacing(4)}`,
    display: 'block',
  },
}));

export const CommonInfoHeader = styled('div')((props) => ({
  width: `100%`,
  fontSize: '0.85rem',
  color: props.theme.colors.text.darker,
  '@media (min-width: 900px)': {
    textAlign: 'center',
  },
}));

export const CalcInfoAmount = styled('div')((props) => ({
  lineHeight: '2',
  color: props.theme.colors.text.primary,
  fontWeight: 500,
  fontSize: '1.2rem',
  marginRight: props.theme.spacing(2),
}));

export const Stripe = styled('div', {
  shouldForwardProp: (prop) => prop !== '$type',
})((props) => ({
  height: 5,
  width: '100%',
  backgroundColor: props.theme.colors[props.$type],
  borderRadius: props.theme.borderRadius * 2,
  marginBottom: props.theme.spacing(1),
}));

export const InfoCardContainer = styled(FlexContainer)((props) => ({
  justifyContent: 'center',
  flexDirection: 'column-reverse',
  marginBottom: props.theme.spacing(2),
  '@media (min-width: 600px)': {
    margin: 0,
    flexDirection: 'row',
  },
}));

export const Add = styled(FlexContainer)((props) => ({
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

export const TrashLink = styled(NavLink)(() => ({
  display: 'flex',
  width: '100%',
}));
