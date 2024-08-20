import {
  AddButton,
  AddFormHeader,
  BackLink,
  BackLinkSvg,
} from '../../theme/global';
import { alpha, styled } from '@mui/material';

export const FlexContainer = styled('div')(() => ({
  display: 'flex',
  alignItems: 'center',
}));

export const Header = styled(AddFormHeader)(() => ({
  display: 'flex',
  '@media (min-width: 600px)': {
    padding: 0,
  },
}));

export const HeaderTitle = styled('div')(() => ({
  height: 60,
  width: '33.3%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  fontWeight: 500,
  fontSize: '1.2rem',
  cursor: 'pointer',
}));

export const HeaderTitleLink = styled(HeaderTitle, {
  shouldForwardProp: (prop) => prop !== '$isActive' && prop !== '$linkType',
})((props) => ({
  '&:hover': {
    color: props.theme.colors[props.$linkType],
    fill: `url(#${props.$linkType}_active)`,
    '& svg': {
      filter: `drop-shadow( 0px 3px 5px ${alpha(
        props.theme.colors.linear[props.$linkType].from,
        0.4,
      )})`,
    },
  },
  color: props.$isActive
    ? props.theme.colors[props.$linkType]
    : props.theme.colors.text.darker,
  fill: props.$isActive
    ? `url(#${props.$linkType}_active)`
    : 'url(#not_active)',
  '& svg': {
    filter: props.$isActive
      ? `drop-shadow( 0px 3px 5px ${alpha(
          props.theme.colors.linear[props.$linkType].from,
          0.4,
        )})`
      : '',
  },
  borderBottom: props.$isActive
    ? `2px solid ${props.theme.colors.main.gold}`
    : '',
}));

export const TitleSpan = styled('span')((props) => ({
  display: 'none',
  '@media (min-width: 600px)': {
    display: 'flex',
    marginRight: props.theme.spacing(2),
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

export const HeaderSvg = styled('svg')((props) => ({
  fill: 'inherit',
  height: 35,
  width: 35,
  minWidth: 35,
  marginRight: props.theme.spacing(2),
  '& circle': {
    fill: 'inherit',
    transition: 'fill 0.3s ease-out',
  },
}));

export const AddAccount = styled(AddButton)(() => ({
  justifyContent: 'center',
}));

export const Card = styled('div')((props) => ({
  height: 197,
  width: 310,
  borderRadius: props.theme.borderRadius,
  background: `url(${props.$cardBackground}) 0% 0% / cover no-repeat, linear-gradient(90deg, ${props.$from} 0%, ${props.$to} 100%)`,
  color: props.theme.colors.white,
}));

export const CardView = styled(Card)(() => ({
  marginLeft: 'auto',
  marginRight: 'auto',
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
