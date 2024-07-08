import { styled } from '@mui/material';
import { BackLink, BackLinkSvg } from '../../theme/global';

export const AddCategoryTitle = styled('div', {
  shouldForwardProp: (prop) => prop !== '$isActive',
})((props) => ({
  cursor: 'pointer',
  width: '33.3%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  boxSizing: 'border-box',
  borderBottom: props.$isActive
    ? `2px solid ${props.theme.colors.main.violet}`
    : '',
  color: props.$isActive
    ? props.theme.colors.main.violet
    : props.theme.colors.text.darker,
  '&:hover': {
    color: props.theme.colors.main.violet,
  },
}));

export const AddFormTitle = styled('div')((props) => ({
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderBottom: props.$isActive
    ? `2px solid ${props.theme.colors.main.violet}`
    : '',
}));

export const Back = styled(BackLink)(() => ({
  zIndex: 200,
  position: 'fixed',
  top: 0,
  '@media (min-width: 600px)': {
    display: 'none',
  },
}));

export const BackSvg = styled(BackLinkSvg)((props) => ({
  '& path': {
    fill: props.theme.colors.text.darker,
  },
  '@media (min-width: 600px)': {
    display: 'none',
  },
}));
