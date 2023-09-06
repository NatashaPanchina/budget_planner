import { alpha, styled } from '@mui/material';
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
  height: 35,
  width: 35,
  minWidth: 35,
  marginRight: props.theme.spacing(2),
  fill: 'inherit',
  '& circle': {
    fill: 'inherit',
    transition: 'fill 0.3s ease-out',
  },
}));

export const AddCategoryTitle = styled(TitleLink, {
  shouldForwardProp: (prop) => prop !== '$titleType',
})((props) => ({
  fill: 'url(#not_active)',
  '&.active': {
    borderBottom: `2px solid ${props.theme.colors.main.violet}`,
    color: props.theme.colors[props.$titleType],
    fill: `url(#${props.$titleType}_active)`,
    '& svg': {
      filter: `drop-shadow( 0px 3px 5px ${alpha(
        props.theme.colors.linear[props.$titleType].from,
        0.4,
      )})`,
    },
  },
  '&:hover': {
    color: props.theme.colors[props.$titleType],
    fill: `url(#${props.$titleType}_active)`,
    '& svg': {
      filter: `drop-shadow( 0px 3px 5px ${alpha(
        props.theme.colors.linear[props.$titleType].from,
        0.4,
      )})`,
    },
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
    fill: props.theme.colors.text.darker,
  },
  '@media (min-width: 600px)': {
    display: 'none',
  },
}));
