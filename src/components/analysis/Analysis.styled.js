import { styled } from 'styled-components';

export const ChartsInfoContainer = styled.div((props) => ({
  height: 350,
  marginBottom: props.theme.spacing(7),
  display: 'flex',
  alignItems: 'center',
}));

export const Chart = styled.div(() => ({
  width: '70%',
  height: '100%',
}));
