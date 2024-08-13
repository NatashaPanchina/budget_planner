import { FormControlLabel, Radio, RadioGroup, styled } from '@mui/material';

export const RadioGroupContainer = styled(RadioGroup)((props) => ({
  marginTop: props.theme.spacing(4),
  display: 'block',
}));

export const LabelContainer = styled(FormControlLabel)((props) => ({
  padding: `0 0 ${props.theme.spacing(3)} 0`,
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
  color: props.theme.colors.grey[500],
  '& + span': {
    color: props.theme.colors.grey[500],
  },
  '&.Mui-checked': {
    color: props.theme.colors.main.gold,
  },
  '&.Mui-checked + span': {
    color: props.theme.colors.white,
  },
  '&.MuiButtonBase-root': {
    padding: 0,
    paddingRight: props.theme.spacing(2),
  },
}));
