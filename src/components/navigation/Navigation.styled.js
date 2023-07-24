import { NavLink } from 'react-router-dom';
import { styled } from 'styled-components';

export const FlexContainer = styled.div(() => ({
  display: 'flex',
  alignItems: 'center',
}));

export const NavigationContainer = styled(FlexContainer)((props) => ({
  width: '100%',
  height: 56,
  paddingLeft: props.theme.spacing(2),
  paddingRight: props.theme.spacing(2),
  boxSizing: 'border-box',
  position: 'fixed',
  bottom: 0,
  left: 0,
  zIndex: 10,
  backgroundColor: props.theme.colors.background.primary,
  borderTop: `1px solid ${props.theme.colors.border.ordinary}`,
  '@media only screen and (min-width: 600px)': {
    display: 'block',
    width: 48,
    padding: 0,
    height: `calc(100vh - ${props.theme.spacing(14)}px)`,
    marginTop: props.theme.spacing(14),
    top: 0,
    left: 0,
    borderTop: 0,
    borderRight: `1px solid ${props.theme.colors.border.ordinary}`,
  },
  '@media only screen and (min-width: 768px)': {
    width: 64,
  },
  '@media only screen and (min-width: 1200px)': {
    width: 208,
  },
}));

export const Nav = styled.nav((props) => ({
  display: 'flex',
  width: '100%',
  alignItems: 'center',
  '& div:nth-child(3)': {
    display: 'none',
  },
  '& div:nth-child(7)': {
    display: 'none',
  },
  '@media only screen and (min-width: 600px)': {
    display: 'block',
    width: '90%',
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingTop: props.theme.spacing(3),
    fontSize: '0.9375rem',
    '& div:nth-child(3)': {
      display: 'flex',
    },
    '& div:nth-child(7)': {
      display: 'flex',
    },
    '& div:nth-child(4) a:hover svg path': {
      fill: props.theme.colors.white,
    },
    '& div:nth-child(4) a.active svg path': {
      fill: props.theme.colors.white,
    },
  },
}));

export const LinkContainer = styled(FlexContainer)(() => ({
  justifyContent: 'center',
  height: 50,
  width: '20%',
  '@media only screen and (min-width: 600px)': {
    width: '100%',
  },
  '@media only screen and (min-width: 1200px)': {
    justifyContent: 'flex-start',
  },
}));

export const Svg = styled.svg((props) => ({
  width: 28,
  height: 28,
  marginRight: props.theme.spacing(3),
  marginLeft: props.theme.spacing(3),
  fill: 'inherit',
  '& path': {
    fill: 'inherit',
  },
  '@media only screen and (min-width: 600px)': {
    width: 22,
    height: 22,
    marginRight: props.theme.spacing(2),
    marginLeft: props.theme.spacing(2),
  },
}));

export const NewTransactionSvg = styled.svg((props) => ({
  width: 42,
  marginLeft: props.theme.spacing(2),
  marginRight: props.theme.spacing(2),
  filter: 'drop-shadow(0px 2px 4px rgba(109, 115, 255, 0.5))',
  '& path': {
    fill: props.theme.colors.white,
  },
  '&:hover g path': {
    fill: props.theme.colors.white,
  },
  '@media only screen and (min-width: 600px)': {
    width: 32,
  },
}));

export const Link = styled(NavLink)((props) => ({
  display: 'flex',
  color: props.theme.colors.text.darker,
  fill: props.theme.colors.text.darker,
  height: 45,
  width: '100%',
  alignItems: 'center',
  justifyContent: 'center',
  '&:hover': {
    color: props.theme.colors.main.violet,
    fill: props.theme.colors.main.violet,
    backgroundColor: props.theme.colors.background.navigation,
    borderRadius: props.theme.borderRadius,
  },
  '&.active': {
    color: props.theme.colors.main.violet,
    fill: props.theme.colors.main.violet,
    backgroundColor: props.theme.colors.background.navigation,
    borderRadius: props.theme.borderRadius,
  },
  '@media only screen and (min-width: 600px)': {
    width: 'inherit',
    justifyContent: 'center',
  },
  '@media only screen and (min-width: 1200px)': {
    justifyContent: 'flex-start',
  },
}));

export const LinkTitle = styled.span(() => ({
  display: 'none',
  '@media only screen and (min-width: 1200px)': {
    display: 'flex',
  },
}));

export const MoreContainer = styled(FlexContainer)((props) => ({
  color: props.theme.colors.text.darker,
}));
