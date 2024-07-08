import { styled } from '@mui/material';

export const ChartsInfoContainer = styled('div')((props) => ({
  '@media (min-width: 600px)': {
    marginBottom: props.theme.spacing(3),
  },
  '@media (min-width: 768px)': {
    marginBottom: props.theme.spacing(7),
  },
}));

export const Chart = styled('div')((props) => ({
  width: '100%',
  height: 300,
  '@media (min-width: 600px)': {
    height: 320,
  },
  '@media (min-width: 768px)': {
    paddingLeft: props.theme.spacing(5),
    paddingRight: props.theme.spacing(5),
    width: `calc(100% - ${props.theme.spacing(5 * 2)})`,
  },
}));

export const Pie = styled('div')((props) => ({
  width: `calc(100% - ${props.theme.spacing(5 * 2)})`,
  paddingLeft: props.theme.spacing(5),
  paddingRight: props.theme.spacing(5),
  height: 300,
  '@media (min-width: 600px)': {
    width: `calc(100% - ${props.theme.spacing(5 * 2)})`,
    paddingLeft: props.theme.spacing(5),
    paddingRight: props.theme.spacing(5),
    height: 320,
  },
  '@media (min-width: 768px)': {
    paddingLeft: props.theme.spacing(5),
    paddingRight: props.theme.spacing(5),
    width: `calc(100% - ${props.theme.spacing(5 * 2)})`,
  },
  '@media (min-width: 900px)': {
    height: 280,
    paddingLeft: props.theme.spacing(5),
    paddingRight: props.theme.spacing(5),
    width: `calc(100% - ${props.theme.spacing(5 * 2)})`,
  },
}));
