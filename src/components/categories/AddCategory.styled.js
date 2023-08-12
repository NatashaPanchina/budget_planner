import { styled } from '@mui/material';
import { BackLink, BackLinkSvg } from '../../theme/global';
import { NavLink } from 'react-router-dom';

export const TitleLink = styled(NavLink)((props) => ({
  height: 60,
  width: '33.3%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  boxSizing: 'border-box',
  color: props.theme.colors.text.darker,
}));

export const TitleLinkSvg = styled('svg')((props) => ({
  height: 23,
  marginRight: props.theme.spacing(1.5),
}));

export const AddCategoryTitle = styled(TitleLink, {
  shouldForwardProp: (prop) => prop !== '$titleType',
})((props) => ({
  '& svg rect': {
    fill: 'url(#not_active)',
  },
  '&:hover': {
    color: props.theme.colors[props.$titleType],
  },
  '&:hover svg rect': {
    fill: `url(#${props.$titleType}_active)`,
  },
  '&.active': {
    borderBottom: `2px solid ${props.theme.colors.main.violet}`,
    color: props.theme.colors[props.$titleType],
  },
  '&.active svg rect': {
    fill: `url(#${props.$titleType}_active)`,
  },
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
    fill: props.theme.colors.white,
  },
  '@media (min-width: 600px)': {
    display: 'none',
  },
}));
