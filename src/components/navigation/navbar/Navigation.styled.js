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
  '@media (min-width: 600px)': {
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
  '@media (min-width: 768px)': {
    width: 64,
  },
  '@media (min-width: 1200px)': {
    width: 208,
  },
}));

export const Nav = styled.nav((props) => ({
  display: 'flex',
  width: '100%',
  height: '100%',
  alignItems: 'center',
  position: 'relative',
  '@media (min-width: 600px)': {
    display: 'block',
    width: '90%',
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingTop: props.theme.spacing(3),
    fontSize: '0.9375rem',
  },
}));

export const LinkContainer = styled(FlexContainer)(() => ({
  justifyContent: 'center',
  height: 55,
  width: '20%',
  '@media (min-width: 600px)': {
    width: '100%',
  },
  '@media (min-width: 1200px)': {
    justifyContent: 'flex-start',
  },
}));

export const CashLinkContainer = styled(LinkContainer)(() => ({
  display: 'none',
  '@media (min-width: 600px)': {
    display: 'flex',
  },
}));

export const MoreContainer = styled(FlexContainer)((props) => ({
  color: props.theme.colors.text.darker,
  display: 'none',
  '@media (min-width: 600px)': {
    display: 'flex',
  },
}));

export const SettingsLinkContainer = styled.div((props) => ({
  display: 'none',
  '@media (min-width: 600px)': {
    display: 'block',
    height: 50,
    width: '100%',
    marginBottom: props.theme.spacing(4),
    position: 'absolute',
    left: 0,
    bottom: 0,
    fill: props.theme.colors.text.darker,
    '&:hover': {
      fill: props.theme.colors.main.violet,
    },
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
  '@media (min-width: 600px)': {
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
  '@media (min-width: 600px)': {
    width: 32,
  },
}));

export const Link = styled(NavLink)((props) => ({
  display: 'flex',
  color: props.theme.colors.text.darker,
  fill: props.theme.colors.text.darker,
  height: 50,
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
  '@media (min-width: 600px)': {
    width: 'inherit',
    justifyContent: 'center',
  },
  '@media (min-width: 1200px)': {
    justifyContent: 'flex-start',
  },
}));

export const SettingsLink = styled(NavLink)((props) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: 'inherit',
  width: 'inherit',
  color: props.theme.colors.text.darker,
  '&:hover': {
    color: props.theme.colors.main.violet,
    fill: props.theme.colors.main.violet,
  },
  '&.active': {
    color: props.theme.colors.main.violet,
    fill: props.theme.colors.main.violet,
  },
  '@media (min-width: 1200px)': {
    justifyContent: 'flex-start',
  },
}));

export const LinkTitle = styled.span(() => ({
  display: 'none',
  '@media (min-width: 1200px)': {
    display: 'flex',
  },
}));
