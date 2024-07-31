import { TextField, alpha, styled } from '@mui/material';
import { Link } from 'react-router-dom';

export const FlexContainer = styled('div')(() => ({
  display: 'flex',
  alignItems: 'center',
}));

export const Container = styled('div')((props) => ({
  textAlign: 'center',
  width: `calc(100% - ${props.theme.spacing(3 * 2)})`,
  minHeight: `calc(100vh - ${props.theme.spacing(3 * 2)})`,
  padding: props.theme.spacing(3),
  background: `linear-gradient(109.86deg, ${props.theme.colors.main.purple} -2.35%, ${props.theme.colors.main.violet} 81.35%)`,
  color: props.theme.colors.white,
  '@media (min-width: 600px)': {
    width: `calc(100% - ${props.theme.spacing(5 * 2)})`,
    padding: props.theme.spacing(5),
    minHeight: `calc(100vh - ${props.theme.spacing(5 * 2)})`,
  },
}));

export const LogoContainer = styled(FlexContainer)(() => ({
  justifyContent: 'center',
  width: '100%',
}));

export const Logo = styled('svg')(() => ({
  height: 45,
  width: 45,
  '@media (min-width: 600px)': {
    display: 'block',
    margin: 0,
  },
}));

export const LogoTitle = styled('svg')((props) => ({
  width: 200,
  height: 20,
  display: 'none',
  '@media (min-width: 600px)': {
    display: 'block',
    marginLeft: props.theme.spacing(2),
  },
}));

export const SignInContainer = styled('div')((props) => ({
  textAlign: 'center',
  width: `calc(100% - ${props.theme.spacing(2 * 2)})`,
  minHeight: 448,
  padding: `${props.theme.spacing(5)} ${props.theme.spacing(2)}`,
  marginLeft: 'auto',
  marginRight: 'auto',
  marginTop: props.theme.spacing(3),
  background: props.theme.colors.background.body,
  color: props.theme.colors.text.primary,
  borderRadius: props.theme.borderRadius * 2,
  '@media (min-width: 600px)': {
    marginTop: props.theme.spacing(5),
    padding: props.theme.spacing(5),
    width: `calc(80% - ${props.theme.spacing(5 * 2)})`,
  },
  '@media (min-width: 768px)': {
    width: `calc(50% - ${props.theme.spacing(5 * 2)})`,
    maxWidth: 450,
    maxHeight: 470,
    minHeight: 400,
  },
}));

export const SignInTitle = styled('div')((props) => ({
  fontSize: '1.5rem',
  fontWeight: 500,
  paddingBottom: props.theme.spacing(6),
  '@media (min-width: 600px)': {
    paddingBottom: props.theme.spacing(4),
  },
}));

export const SignInWithAcc = styled(FlexContainer)((props) => ({
  cursor: 'pointer',
  justifyContent: 'center',
  padding: props.theme.spacing(4),
  marginBottom: props.theme.spacing(6),
  width: `calc(100% - ${props.theme.spacing(4 * 2)})`,
  border: `1px solid ${props.theme.colors.main.violet}`,
  borderRadius: props.theme.borderRadius,
  '&:hover': {
    boxShadow: `0px 4px 10px ${alpha(props.theme.colors.main.violet, 0.2)}`,
    transition: 'all 0.3s ease-out',
  },
  '@media (min-width: 600px)': {
    padding: props.theme.spacing(3),
    width: `calc(100% - ${props.theme.spacing(3 * 2)})`,
    marginBottom: props.theme.spacing(4),
  },
}));

export const SignInWithoutAcc = styled(FlexContainer)((props) => ({
  fontSize: '0.85rem',
  cursor: 'pointer',
  justifyContent: 'center',
  padding: props.theme.spacing(2),
  color: alpha(props.theme.colors.text.primary, 0.8),
  '&:hover': {
    color: props.theme.colors.text.primary,
  },
  '@media (min-width: 600px)': {},
}));

export const ProviderSvg = styled('svg')((props) => ({
  marginLeft: props.theme.spacing(3),
  height: 15,
  width: 15,
}));

export const TextInputField = styled(TextField)((props) => ({
  width: '100%',
  backgroundColor: props.theme.colors.background.primary,
  borderRadius: props.theme.borderRadius,
  '& label': {
    color: props.theme.colors.text.darker,
  },
  '& label.Mui-focused': {
    color: props.theme.colors.main.violet,
  },
  '& .MuiFormHelperText-root': {
    backgroundColor: props.theme.colors.background.body,
    marginLeft: 0,
    marginRight: 0,
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderRadius: props.theme.borderRadius,
      border: `1px solid ${props.theme.colors.border.item}`,
    },
    '&:hover fieldset': {
      border: `1px solid ${props.theme.colors.border.item}`,
    },
    '&.Mui-focused fieldset': {
      border: `1px solid ${props.theme.colors.main.violet}`,
    },
    '& .MuiInputBase-input': {
      color: props.theme.colors.text.primary,
      borderRadius: props.theme.borderRadius,
      backgroundColor: props.theme.colors.background.primary,
    },
    '& .MuiSelect-icon': {
      fill: props.theme.colors.text.darker,
    },
  },
}));

export const MainButton = styled('div')((props) => ({
  cursor: 'pointer',
  margin: `${props.theme.spacing(6)} 0`,
  padding: props.theme.spacing(3),
  background: `linear-gradient(109.86deg, ${props.theme.colors.main.purple} -2.35%, ${props.theme.colors.main.violet} 81.35%)`,
  color: props.theme.colors.white,
  fontWeight: 500,
  borderRadius: props.theme.borderRadius,
  '&:hover': {
    boxShadow: `0px 4px 10px ${alpha(props.theme.colors.main.violet, 0.4)}`,
    transition: 'all 0.3s ease-out',
  },
  '@media (min-width: 600px)': {
    margin: `${props.theme.spacing(4)} 0`,
    padding: props.theme.spacing(2),
  },
}));

export const FooterMessage = styled('div')((props) => ({
  padding: props.theme.spacing(4),
  marginTop: props.theme.spacing(2),
}));

export const FooterMessageLink = styled(Link)((props) => ({
  textDecoration: 'none',
  color: alpha(props.theme.colors.black, 0.7),
  '&:hover': {
    color: props.theme.colors.black,
  },
}));

export const OrdinaryText = styled('div')((props) => ({
  fontSize: '0.85rem',
  color: alpha(props.theme.colors.text.primary, 0.7),
  marginBottom: props.theme.spacing(2),
}));

export const SelectContainer = styled(FlexContainer)((props) => ({
  position: 'relative',
  flexDirection: 'column',
  justifyContent: 'center',
  width: `calc(100% - ${props.theme.spacing(2 * 2)})`,
  height: `calc(100vh - ${props.theme.spacing(31.25)})`,
  padding: `${props.theme.spacing(5)} ${props.theme.spacing(2)}`,
  marginLeft: 'auto',
  marginRight: 'auto',
  color: props.theme.colors.white,
  borderRadius: props.theme.borderRadius * 2,
  '@media (min-width: 600px)': {
    padding: props.theme.spacing(5),
    width: `calc(80% - ${props.theme.spacing(5 * 2)})`,
  },
  '@media (min-width: 768px)': {
    width: `calc(50% - ${props.theme.spacing(5 * 2)})`,
    maxWidth: 450,
  },
}));

export const NextLinkContainer = styled('div')((props) => ({
  cursor: 'pointer',
  textDecoration: 'none',
  position: 'absolute',
  bottom: 0,
  width: '100%',
  '&:hover': {
    color: alpha(props.theme.colors.white, 0.7),
  },
}));

export const TextInfo = styled('div')(() => ({
  width: '100%',
}));

export const ErrorHelperText = styled('div', {
  shouldForwardProp: (prop) => prop !== '$isShowError',
})((props) => ({
  display: props.$isShowError ? 'block' : 'none',
  color: props.theme.colors.error,
}));

export const ProgressCotainer = styled(FlexContainer)(() => ({
  height: 200,
  width: '100%',
  justifyContent: 'center',
}));
