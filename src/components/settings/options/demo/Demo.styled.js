import { styled } from '@mui/material';

export const LoadingContainer = styled('div')(() => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexWrap: 'wrap',
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  zIndex: 350,
}));

export const Description = styled('div')((props) => ({
  position: 'relative',
  bottom: props.theme.spacing(10),
  zIndex: 110,
  color: props.theme.colors.white,
  width: '100%',
}));

export const ProgressContainer = styled('div')(() => ({
  textAlign: 'center',
}));
