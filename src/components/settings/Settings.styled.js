import { FormControlLabel, Radio, Switch, alpha, styled } from '@mui/material';
import { NavLink } from 'react-router-dom';

export const FlexContainer = styled('div')(() => ({
  display: 'flex',
  alignItems: 'center',
}));

export const MainOption = styled('div')((props) => ({
  display: 'flex',
  alignItems: 'center',
  padding: props.theme.spacing(2),
  paddingBottom: props.theme.spacing(4),
  color: props.theme.colors.text.darker,
  fontSize: '0.95rem',
  '@media (min-width: 600px)': {
    fontSize: '1rem',
    color: props.theme.colors.text.primary,
    padding: props.theme.spacing(2),
  },
}));

export const FirstMainOption = styled(MainOption)((props) => ({
  marginTop: props.theme.spacing(1),
}));

export const OptionsContainer = styled('div')((props) => ({
  padding: props.theme.spacing(2),
  color: props.theme.colors.text.primary,
  backgroundColor: props.theme.colors.background.primary,
  borderRadius: props.theme.borderRadius,
  '@media (min-width: 600px)': {
    display: 'flex',
    flexWrap: 'wrap',
    fontSize: '0.95rem',
    paddingLeft: props.theme.spacing(4),
    color: props.theme.colors.text.darker,
    backgroundColor: props.theme.colors.background.body,
  },
  '&:hover': {
    color: props.theme.colors.text.darkest,
  },
}));

export const OptionContainer = styled(NavLink)((props) => ({
  display: 'flex',
  alignItems: 'center',
  padding: props.theme.spacing(3),
  paddingBottom: props.theme.spacing(4),
  fill: props.theme.colors.main.gold,
  color: props.theme.colors.text.primary,
  transition: 'all 0.3s ease-out',
  '&:hover': {
    boxShadow: `0px 4px 10px ${props.theme.colors.boxShadow}`,
    color: props.theme.colors.text.primary,
    transform: 'scale(1.05)',
  },
  '@media (min-width: 600px)': {
    flexWrap: 'wrap',
    textAlign: 'center',
    backgroundColor: props.theme.colors.background.primary,
    marginBottom: props.theme.spacing(4),
    marginRight: props.theme.spacing(3),
    borderRadius: props.theme.borderRadius * 2,
    width: `calc(50% - ${props.theme.spacing(3 * 2)})`,
    padding: props.theme.spacing(3),
  },
  '@media (min-width: 768px)': {
    width: `calc(33.33% - ${props.theme.spacing(3 * 2)})`,
  },
  '@media (min-width: 1000px)': {
    width: `calc(25% - ${props.theme.spacing(5 * 2)})`,
  },
}));

export const SvgContainer = styled(FlexContainer)(() => ({
  '@media (min-width: 600px)': {
    width: '100%',
    justifyContent: 'center',
  },
}));

export const OptionSvg = styled('svg')((props) => ({
  fill: 'inherit',
  paddingRight: props.theme.spacing(2),
  '& path': {
    fill: 'inherit',
  },
  '@media (min-width: 600px)': {
    padding: 0,
  },
}));

export const OptionDesc = styled('div')((props) => ({
  '@media (min-width: 600px)': {
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: props.theme.spacing(2),
  },
}));

export const MainContainer = styled('div')((props) => ({
  fontSize: '0.95rem',
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
  backgroundColor: props.theme.colors.background.primary,
  padding: `${props.theme.spacing(5)} ${props.theme.spacing(2)}`,
  width: `calc(100% - ${props.theme.spacing(2 * 2)})`,
  height: `calc(100vh - ${props.theme.spacing(5 * 2)})`,
  '@media (min-width: 600px)': {
    background: 'none',
    marginBottom: 0,
    padding: 0,
  },
}));

export const Title = styled('div')((props) => ({
  fontSize: '1.1rem',
  fontWeight: 500,
  padding: props.theme.spacing(4),
  paddingTop: props.theme.spacing(6),
  paddingBottom: props.theme.spacing(3),
  '@media (min-width: 600px)': {
    padding: props.theme.spacing(4),
    paddingLeft: 0,
  },
}));

export const FirstTitle = styled(Title)(() => ({
  paddingTop: 0,
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
  padding: props.theme.spacing(2),
  paddingTop: 0,
  paddingLeft: props.theme.spacing(4),
  '@media (min-width: 600px)': {
    paddingTop: props.theme.spacing(2),
    borderTop: `1px solid ${props.theme.colors.text.ordinary}`,
    borderBottom: `1px solid ${props.theme.colors.text.ordinary}`,
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
  '@media (min-width: 600px)': {
    border: `1px solid ${props.theme.colors.main.violet}`,
    padding: props.theme.spacing(1.5),
    paddingLeft: props.theme.spacing(3),
    paddingRight: props.theme.spacing(3),
    borderRadius: props.theme.borderRadius,
    width: 'fit-content',
    '&:hover': {
      boxShadow: `0px 4px 10px ${alpha(props.theme.colors.main.violet, 0.2)}`,
      transition: 'box-shadow 0.3s ease-out',
    },
  },
}));

export const DeleteButton = styled(EditButton)((props) => ({
  padding: props.theme.spacing(1.5),
  paddingLeft: props.theme.spacing(3),
  paddingRight: props.theme.spacing(3),
  borderRadius: props.theme.borderRadius,
  width: 'fit-content',
  border: `1px solid ${props.theme.colors.expense}`,
  color: props.theme.colors.expense,
  transition: 'box-shadow 0.3s ease-out',
  '&:hover': {
    boxShadow: `0px 4px 10px ${alpha(props.theme.colors.expense, 0.2)}`,
  },
  '@media (min-width: 600px)': {
    border: `1px solid ${props.theme.colors.expense}`,
  },
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

export const SettingInfoContainer = styled('div')((props) => ({
  padding: props.theme.spacing(4),
  backgroundColor: props.theme.colors.background.primary,
  marginBottom: props.theme.spacing(4),
  borderRadius: props.theme.borderRadius,
  '@media (min-width: 600px)': {
    paddingLeft: props.theme.spacing(8),
    paddingRight: props.theme.spacing(5),
    paddingTop: 0,
  },
}));
