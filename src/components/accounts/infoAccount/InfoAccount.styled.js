import { styled } from '@mui/material';
import { CardView } from '../Accounts.styled';

export const CommonInfoContainer = styled('div')((props) => ({
  display: 'flex',
  width: '100%',
  marginTop: props.theme.spacing(2),
  '@media (min-width: 600px)': {
    width: 'auto',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: 227,
    maxHeight: 227,
    marginTop: 0,
    marginRight: props.theme.spacing(5),
  },
  '@media (min-width: 900px)': {
    maxHeight: 227,
  },
}));

export const CommonInfoItem = styled('div')((props) => ({
  marginTop: props.theme.spacing(3),
  textAlign: 'center',
  padding: `${props.theme.spacing(3)} ${props.theme.spacing(6)}`,
  width: `calc(45% - ${props.theme.spacing(6 * 2)})`,
  backgroundColor: props.theme.colors.background.primary,
  borderRadius: props.theme.borderRadius,
  border: `1px solid ${props.theme.colors.border.item}`,
  marginLeft: 'auto',
  marginRight: 'auto',
  '@media (min-width: 600px)': {
    width: 'auto',
    margin: 0,
    padding: `${props.theme.spacing(3)} ${props.theme.spacing(4)}`,
    display: 'block',
  },
}));

export const CardViewContainer = styled(CardView)(() => ({
  cursor: 'unset',
  marginBottom: 0,
  '@media (min-width: 600px)': {
    marginLeft: 0,
    marginRight: 0,
  },
}));
