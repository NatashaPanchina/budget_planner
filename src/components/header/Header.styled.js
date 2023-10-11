import { MenuItem, alpha, styled } from '@mui/material';
import { TextInputField } from '../../theme/global';

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
    height: 56,
    marginTop: 0,
    position: 'fixed',
    zIndex: 300,
    top: 0,
    background: props.theme.colors.background.primary,
    borderBottom: `1px solid ${props.theme.colors.border.ordinary}`,
  },
}));

export const LogoContainer = styled(FlexContainer)((props) => ({
  justifyContent: 'center',
  height: 56,
  background: 'none',
  '@media (min-width: 600px)': {
    width: 48,
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
  height: 45,
  width: 45,
  marginRight: 'auto',
  marginLeft: props.theme.spacing(2),
  '@media (min-width: 600px)': {
    display: 'block',
    margin: 0,
  },
}));

export const LogoTitle = styled('svg')((props) => ({
  width: 120,
  display: 'none',
  '@media (min-width: 1200px)': {
    display: 'block',
    marginLeft: props.theme.spacing(2),
  },
}));

export const Title = styled(FlexContainer)((props) => ({
  '@media (min-width: 600px)': {
    fontWeight: 450,
    fontSize: '1.25rem',
    paddingLeft: props.theme.spacing(5),
  },
  '@media (min-width: 768px)': {
    color: 'inherit',
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
      paddingLeft: 0,
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
  '@media (min-width: 768px)': {
    display: 'flex',
    paddingRight: props.theme.spacing(4),
    marginLeft: 'auto',
  },
}));

export const Username = styled('span')((props) => ({
  marginLeft: props.theme.spacing(2),
}));

export const LogOut = styled(FlexContainer)(() => ({
  display: 'none',
  '@media (min-width: 900px)': {
    display: 'flex',
  },
}));
