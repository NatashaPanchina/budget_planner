import { MenuItem, alpha, styled } from '@mui/material';
import { TextInputField } from '../../theme/global';
import { Link } from 'react-router-dom';

export const FlexContainer = styled('div')(() => ({
  display: 'flex',
  alignItems: 'center',
  height: '100%',
}));

export const HeaderContainer = styled(FlexContainer)((props) => ({
  display: 'none',
  '@media (min-width: 600px)': {
    display: 'flex',
    width: '100%',
    height: 48,
    marginTop: 0,
    position: 'fixed',
    zIndex: 300,
    top: 0,
    background: props.theme.colors.background.primary,
    borderBottom: `1px solid ${props.theme.colors.border.ordinary}`,
  },
}));

export const LogoContainer = styled(FlexContainer)((props) => ({
  justifyContent: 'left',
  height: 48,
  background: 'none',
  '@media (min-width: 600px)': {
    width: 64,
    background: `linear-gradient(109.86deg, ${props.theme.colors.main.purple} -2.35%, ${props.theme.colors.main.violet} 81.35%)`,
  },
  '@media (min-width: 768px)': {
    width: 64,
  },
  '@media (min-width: 1200px)': {
    width: 208,
  },
}));

export const Logo = styled('svg')((props) => ({
  height: 36,
  width: 36,
  marginLeft: props.theme.spacing(3),
  '@media (min-width: 600px)': {
    display: 'block',
  },
}));

export const LogoTitle = styled('svg')((props) => ({
  width: 100,
  display: 'none',
  '@media (min-width: 1200px)': {
    display: 'block',
    marginLeft: props.theme.spacing(2),
  },
}));

export const ThemeContainer = styled(FlexContainer)(() => ({
  display: 'none',
  '@media (min-width: 600px)': {
    display: 'flex',
    justifyContent: 'center',
  },
}));

export const Container = styled(FlexContainer)((props) => ({
  justifyContent: 'center',
  width: '33.3%',
  color: props.theme.colors.text.primary,
  '@media (min-width: 1200px)': {
    width: '25%',
  },
}));

export const LanguagesMenu = styled(TextInputField)((props) => ({
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      border: `1px solid ${props.theme.colors.background.primary}`,
      padding: 0,
      boxShadow: 'none',
    },
    '&:hover fieldset': {
      border: `1px solid ${props.theme.colors.background.primary}`,
    },
    '&.Mui-focused fieldset': {
      border: `1px solid ${props.theme.colors.background.primary}`,
    },
    '& .MuiSelect-icon': {
      display: 'none',
    },
    '& .MuiInputBase-input': {
      padding: 0,
      paddingRight: '0px !important',
      display: 'flex',
      justifyContent: 'center',
      '&:hover': {
        color: alpha(props.theme.colors.text.primary, 0.7),
      },
    },
  },
}));

export const LanguagesMenuItem = styled(MenuItem)((props) => ({
  borderRadius: props.theme.borderRadius,
  backgroundColor: props.theme.colors.background.primary,
  color: props.theme.colors.text.primary,
}));

export const Svg = styled('svg')(() => ({
  height: 30,
  width: 30,
  cursor: 'pointer',
}));

export const SvgMode = styled(Svg)((props) => ({
  cursor: 'pointer',
  '&:hover circle': {
    fill: props.theme.colors.background.ordinary,
    transition: 'fill 0.4s ease-out',
  },
}));

export const Profile = styled(FlexContainer)((props) => ({
  display: 'none',
  '@media (min-width: 600px)': {
    display: 'flex',
    paddingRight: props.theme.spacing(2),
    marginLeft: 'auto',
  },
}));

export const Username = styled('span')(() => ({
  display: 'none',
  '@media (min-width: 900px)': {
    display: 'flex',
  },
}));

export const LogOut = styled(FlexContainer)(() => ({
  display: 'none',
  '@media (min-width: 768px)': {
    display: 'flex',
  },
}));

export const SvgCurrency = styled('svg')(() => ({
  height: 20,
  width: 20,
}));

export const SignIn = styled(Link)((props) => ({
  textAlign: 'center',
  padding: `${props.theme.spacing(1)} ${props.theme.spacing(2)}`,
  border: `1px solid ${props.theme.colors.main.violet}`,
  textDecoration: 'none',
  color: props.theme.colors.main.violet,
  borderRadius: props.theme.borderRadius,
  marginLeft: 'auto',
}));

export const ProfilePicture = styled('img')((props) => ({
  height: 40,
  marginRight: props.theme.spacing(2),
}));
