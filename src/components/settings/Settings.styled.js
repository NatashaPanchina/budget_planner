import { FormControlLabel, Radio, Switch, styled } from '@mui/material';
import { NavLink } from 'react-router-dom';

export const MainOption = styled('div')((props) => ({
  display: 'flex',
  alignItems: 'center',
  marginTop: props.theme.spacing(5),
  padding: props.theme.spacing(2),
  color: props.theme.colors.text.darker,
  fontSize: '0.95rem',
  '@media (min-width: 600px)': {
    fontSize: '1rem',
    color: props.theme.colors.text.primary,
  },
}));

export const FirstMainOption = styled(MainOption)((props) => ({
  marginTop: props.theme.spacing(1),
}));

export const OptionsContainer = styled('div')((props) => ({
  marginBottom: props.theme.spacing(5),
  padding: props.theme.spacing(2),
  color: props.theme.colors.text.primary,
  backgroundColor: props.theme.colors.background.primary,
  borderRadius: props.theme.borderRadius,
  '@media (min-width: 600px)': {
    fontSize: '0.95rem',
    paddingLeft: props.theme.spacing(4),
    color: props.theme.colors.text.darker,
    backgroundColor: props.theme.colors.background.body,
  },
}));

export const OptionContainer = styled(NavLink)((props) => ({
  display: 'flex',
  alignItems: 'center',
  paddingTop: props.theme.spacing(3),
  paddingBottom: props.theme.spacing(3),
  color: 'inherit',
  fill: props.theme.colors.text.darker,
  '@media (min-width: 600px)': {
    paddingTop: props.theme.spacing(1.5),
    paddingBottom: props.theme.spacing(2),
  },
  '&.active': {
    fill: props.theme.colors.main.violet,
    color: props.theme.colors.main.violet,
  },
}));

export const OptionSvg = styled('svg')((props) => ({
  fill: 'inherit',
  paddingRight: props.theme.spacing(2),
  '& path': {
    fill: 'inherit',
  },
  '@media (min-width: 600px)': {
    display: 'none',
  },
}));

export const MainContainer = styled('div')((props) => ({
  fontSize: '0.95rem',
  marginTop: props.theme.spacing(5),
  marginBottom: props.theme.spacing(5),
  padding: `${props.theme.spacing(5)} ${props.theme.spacing(2)}`,
  height: `calc(100% - ${props.theme.spacing(5 * 2 + 5)})`,
  backgroundColor: props.theme.colors.background.primary,
  borderRadius: props.theme.borderRadius,
  ' @media (min-width: 600px)': {
    display: 'block',
    padding: props.theme.spacing(5),
    marginBottom: 0,
  },
  ' @media (min-width: 768px)': {
    padding: props.theme.spacing(8),
    height: `calc(100% - ${props.theme.spacing(8 * 2 + 5)})`,
  },
}));

export const MobContainer = styled('div')((props) => ({
  padding: `${props.theme.spacing(5)} ${props.theme.spacing(2)}`,
  width: '100%',
  ' @media (min-width: 600px)': {
    marginBottom: 0,
    padding: 0,
  },
}));

export const Title = styled('div')((props) => ({
  fontSize: '1.1rem',
  fontWeight: 500,
  padding: props.theme.spacing(4),
  paddingTop: props.theme.spacing(5),
  paddingLeft: 0,
}));

export const FirstTitle = styled(Title)(() => ({
  paddingTop: 0,
}));

export const FlexContainer = styled('div')(() => ({
  display: 'flex',
  alignItems: 'center',
}));

export const SingleContainer = styled(FlexContainer)((props) => ({
  padding: props.theme.spacing(2),
  paddingLeft: props.theme.spacing(4),
  justifyContent: 'space-between',
  '@media (min-width: 600px)': {
    paddingLeft: props.theme.spacing(8),
    paddingRight: props.theme.spacing(5),
  },
}));

export const MultilineContainer = styled('div')((props) => ({
  borderTop: `1px solid ${props.theme.colors.text.ordinary}`,
  borderBottom: `1px solid ${props.theme.colors.text.ordinary}`,
  padding: props.theme.spacing(2),
  paddingLeft: props.theme.spacing(4),
  '@media (min-width: 600px)': {
    paddingLeft: props.theme.spacing(8),
    paddingRight: props.theme.spacing(5),
  },
}));

export const BorderContainer = styled(SingleContainer)((props) => ({
  padding: props.theme.spacing(5),
  paddingLeft: props.theme.spacing(4),
  borderTop: `1px solid ${props.theme.colors.text.ordinary}`,
  borderBottom: `1px solid ${props.theme.colors.text.ordinary}`,
  '@media (min-width: 600px)': {
    paddingLeft: props.theme.spacing(8),
    paddingRight: props.theme.spacing(5),
  },
}));

export const ItemContainer = styled(FlexContainer)((props) => ({
  width: '100%',
  padding: `${props.theme.spacing(2)} 0px`,
  justifyContent: 'space-between',
}));

export const ItemTitle = styled(FlexContainer)((props) => ({
  color: props.theme.colors.text.darker,
  paddingBottom: props.theme.spacing(2),
}));

export const Button = styled(FlexContainer)((props) => ({
  color: props.theme.colors.main.violet,
  fontSize: '0.9rem',
  cursor: 'pointer',
}));

export const EditButton = styled(Button)((props) => ({
  border: `1px solid ${props.theme.colors.main.violet}`,
  padding: props.theme.spacing(1.5),
  paddingLeft: props.theme.spacing(3),
  paddingRight: props.theme.spacing(3),
  borderRadius: props.theme.borderRadius,
  width: 'fit-content',
}));

export const DeleteButton = styled(EditButton)((props) => ({
  border: `1px solid ${props.theme.colors.expense}`,
  color: props.theme.colors.expense,
}));

export const TextContainer = styled('div')((props) => ({
  paddingBottom: props.theme.spacing(4),
  paddingLeft: props.theme.spacing(4),
  '@media (min-width: 600px)': {
    paddingLeft: props.theme.spacing(8),
    paddingRight: props.theme.spacing(5),
  },
}));

export const LabelContainer = styled(FormControlLabel)(() => ({
  '& .MuiTypography-root': {
    fontSize: '0.9rem',
    fontFamily:
      "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
    WebkitFontSmoothing: 'antialiased',
    MozOsxFontSmoothing: 'grayscale',
  },
  '&.MuiFormControlLabel-root': {
    marginLeft: 0,
  },
}));

export const RadioContainer = styled(Radio)((props) => ({
  color: props.theme.colors.text.darker,
  '&.Mui-checked': {
    color: props.theme.colors.main.violet,
  },
  '&.MuiButtonBase-root': {
    padding: 0,
    paddingRight: props.theme.spacing(2),
  },
}));

export const CustomSwitch = styled(Switch)((props) => ({
  padding: props.theme.spacing(2),
  '& .MuiSwitch-switchBase': {
    '&.Mui-checked': {
      color: props.theme.colors.white,
      '& + .MuiSwitch-track': {
        backgroundColor: props.theme.colors.main.violet,
        opacity: 1,
        border: 0,
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: 0.5,
      },
    },
  },
  '& .MuiSwitch-track': {
    borderRadius: 22 / 2,
    '&:before, &:after': {
      content: '""',
      position: 'absolute',
      top: '50%',
      transform: 'translateY(-50%)',
      width: 16,
      height: 16,
    },
  },
  '& .MuiSwitch-thumb': {
    boxShadow: 'none',
    width: 16,
    height: 16,
    margin: 2,
  },
}));
