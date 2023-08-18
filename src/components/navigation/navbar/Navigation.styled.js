import { styled } from '@mui/material';
import { NavLink } from 'react-router-dom';

export const FlexContainer = styled('div')(() => ({
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
  zIndex: 50,
  backgroundColor: props.theme.colors.background.primary,
  borderTop: `1px solid ${props.theme.colors.border.ordinary}`,
  '@media (min-width: 600px)': {
    display: 'block',
    width: 48,
    padding: 0,
    height: `calc(100vh - ${props.theme.spacing(14)})`,
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

export const Nav = styled('nav')((props) => ({
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

export const HiddenLinkContainer = styled(LinkContainer)(() => ({
  display: 'none',
  '@media (min-width: 600px)': {
    display: 'flex',
  },
}));

export const NewTransactionLinkContainer = styled(LinkContainer)(() => ({
  display: 'none',
  '@media (min-width: 600px)': {
    display: 'flex',
  },
}));

export const NewTransactionButton = styled(FlexContainer)(() => ({
  justifyContent: 'center',
  cursor: 'pointer',
  width: '20%',
  zIndex: 200,
  '@media (min-width: 600px)': {
    display: 'none',
  },
}));

export const MobileNavigationContainer = styled('div')(() => ({
  width: '100%',
  position: 'fixed',
  top: 0,
  left: 0,
  zIndex: 150,
  height: '100vh',
  '@media (min-width: 600px)': {
    display: 'none',
  },
}));

export const MobileNavigationBackground = styled(FlexContainer)((props) => ({
  backgroundColor: props.theme.colors.black,
  opacity: 0.7,
  justifyContent: 'center',
  width: '100%',
  height: '100%',
}));

export const MobileNavigationLink = styled(NavLink)((props) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: 50,
  width: 50,
  borderRadius: '50%',
  backgroundColor: props.theme.colors.background.primary,
  opacity: 'initial',
  position: 'absolute',
}));

export const MobileTransferLink = styled(MobileNavigationLink)((props) => ({
  left: 'calc(25% - 25px)',
  bottom: props.theme.spacing(15),
}));

export const MobileExpenseLink = styled(MobileNavigationLink)((props) => ({
  left: 'calc(50% - 25px)',
  bottom: props.theme.spacing(25),
}));

export const MobileIncomeLink = styled(MobileNavigationLink)((props) => ({
  right: 'calc(25% - 25px)',
  bottom: props.theme.spacing(15),
}));

export const MobileLinkSvg = styled('svg')(() => ({
  width: 23,
  height: 23,
}));

export const SettingsLinkContainer = styled('div')((props) => ({
  display: 'none',
  '@media (min-width: 600px)': {
    display: 'block',
    height: 50,
    width: '100%',
    marginBottom: props.theme.spacing(2),
    position: 'absolute',
    left: 0,
    bottom: 0,
    backgroundColor: props.theme.colors.background.primary,
    fill: props.theme.colors.text.darker,
    '&:hover': {
      fill: props.theme.colors.main.violet,
    },
  },
}));

export const Svg = styled('svg')((props) => ({
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

export const NewTransactionSvg = styled('svg')((props) => ({
  width: 45,
  height: 45,
  marginLeft: 'auto',
  marginRight: 'auto',
  filter: 'drop-shadow(0px 2px 4px rgba(109, 115, 255, 0.5))',
  '& path': {
    fill: props.theme.colors.white,
  },
  '&:hover g path': {
    fill: props.theme.colors.white,
  },
  '@media (min-width: 600px)': {
    width: 40,
    height: 40,
    marginRight: props.theme.spacing(3),
    marginLeft: props.theme.spacing(3),
  },
  '@media (min-width: 1200px)': {
    marginLeft: 0,
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

export const LinkTitle = styled('span')(() => ({
  display: 'none',
  '@media (min-width: 1200px)': {
    display: 'flex',
  },
}));

export const Profile = styled(FlexContainer)(() => ({
  display: 'none',
  '@media (min-width: 600px)': {
    display: 'flex',
    justifyContent: 'center',
  },
  '@media (min-width: 768px)': {
    display: 'none',
  },
}));

export const ProfileSvg = styled('svg')(() => ({
  width: 35,
  height: 35,
}));

export const MobMenu = styled(FlexContainer)((props) => ({
  justifyContent: 'center',
  fill: props.theme.colors.text.darker,
  width: '20%',
  height: 55,
  '@media (min-width: 600px)': {
    display: 'none',
  },
}));
