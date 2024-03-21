import { styled } from '@mui/material';
import { CashListItem } from '../../../accounts/Accounts.styled';
import { Link } from 'react-router-dom';

export const FlexContainer = styled('div')(() => ({
  display: 'flex',
  alignItems: 'center',
}));

export const Header = styled(FlexContainer)(() => ({
  width: '100%',
  height: 60,
  justifyContent: 'center',
  position: 'relative',
}));

export const ShowAll = styled(Link)((props) => ({
  width: '100%',
  padding: `${props.theme.spacing(2)} 0px`,
  display: 'flex',
  justifyContent: 'end',
  color: props.theme.colors.main.violet,
  '&:hover': {
    color: props.theme.colors.main.purple,
  },
}));

export const CashWrapper = styled('div')(() => ({
  display: 'block',
}));

export const CashListItemWrapper = styled(CashListItem)((props) => ({
  marginRight: props.theme.spacing(3),
}));
