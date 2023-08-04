import { styled } from 'styled-components';

export const ChartsInfoContainer = styled.div((props) => ({
  marginBottom: props.theme.spacing(7),
  '@media (min-width: 768px)': {
    display: 'flex',
    alignItems: 'center',
  },
}));

export const Chart = styled.div(() => ({
  width: '100%',
  height: 300,
  '@media (min-width: 600px)': {
    height: 400,
  },
  '@media (min-width: 768px)': {
    width: '70%',
  },
}));
