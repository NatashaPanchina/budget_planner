import { css, styled } from 'styled-components';

export const AnalysisContainer = styled.div((props) => ({
  marginTop: props.theme.spacing(14),
  marginLeft: '25%',
  marginRight: '8%',
}));

export const AnalysisHeader = styled.div((props) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: 50,
  position: 'sticky',
  top: 56,
  zIndex: 9,
  paddingLeft: '25%',
  paddingRight: '8%',
  backgroundColor: props.theme.colors.background.body,
}));

export const HeaderTitle = styled.div(() => ({
  width: '33.33%',
}));

export const Filter = styled.div((props) => ({
  display: 'flex',
  position: 'relative',
  alignItems: 'center',
  borderRadius: props.theme.borderRadius * 1.5,
  height: 'fit-content',
  width: '33.33%',
  padding: props.theme.spacing(2),
  fontSize: '0.875rem',
  color: props.theme.colors.text.darker,
  cursor: 'pointer',
  '&:hover': {
    color: props.theme.colors.text.primary,
  },
}));

export const FilterSvg = styled.svg((props) => ({
  height: 18,
  width: 18,
  margin: `0px ${props.theme.spacing(1)}px`,
}));

export const Container = styled.div((props) => ({
  marginTop: props.theme.spacing(7),
  border: `1px solid ${props.theme.colors.border.item}`,
  borderRadius: props.theme.borderRadius,
  backgroundColor: props.theme.colors.background.primary,
  boxShadow: `0px 4px 10px ${props.theme.colors.boxShadow}`,
  position: 'relative',
}));

export const CommonInfoContainer = styled(Container)(() => ({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr 1fr',
  justifyContent: 'center',
  height: 220,
}));

export const CommonInfoItem = styled.div((props) => ({
  justifySelf: 'center',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: 100,
  width: '70%',
  marginTop: props.theme.spacing(5),
  minWidth: 160,
  border: `1px solid ${props.theme.colors.border.item}`,
  borderRadius: props.theme.borderRadius,
  textAlign: 'center',
  backgroundColor: props.theme.colors.background.body,
}));

export const CommonInfoSvg = styled.svg((props) => ({
  width: 30,
  height: 30,
  marginRight: props.theme.spacing(1),
}));

export const CommonInfoTitle = styled.div((props) => ({
  fontSize: '0.75rem',
  color: props.theme.colors.text.darker,
}));

export const CommonInfoAmount = styled.div((props) => {
  switch (props.$amountType) {
    case 'expense':
      return css(() => ({
        color: props.theme.colors.expense,
      }));
    case 'income':
      return css(() => ({
        color: props.theme.colors.income,
      }));
    case 'saldo':
      return css(() => ({
        color: props.theme.colors.saldo,
      }));
    case 'all':
      return css(() => ({
        color: props.theme.colors.main.violet,
      }));
    default:
      return css(() => ({
        color: props.theme.colors.expense,
      }));
  }
});

export const CommonInfoCount = styled.div(() => ({
  fontSize: '0.875rem',
}));

export const CommonCalcItem = styled.div(() => ({
  justifySelf: 'center',
  textAlign: 'center',
  height: 50,
  width: '70%',
  minWidth: 160,
}));

export const ChartsContainer = styled.div((props) => ({
  marginTop: props.theme.spacing(7),
  border: `1px solid ${props.theme.colors.border.item}`,
  borderRadius: props.theme.borderRadius,
  backgroundColor: props.theme.colors.background.primary,
  boxShadow: `0px 4px 10px ${props.theme.colors.boxShadow}`,
  position: 'relative',
}));

export const ChartButtonsContainer = styled.div((props) => ({
  minWidth: 510,
  display: 'flex',
  justifyContent: 'space-around',
  padding: `${props.theme.spacing(5)}px 10%`,
  borderBottom: `1px solid ${props.theme.colors.border.title}`,
}));

export const ChartButton = styled.button((props) => ({
  height: 35,
  borderRadius: props.theme.borderRadius,
  paddingLeft: props.theme.spacing(4),
  paddingRight: props.theme.spacing(4),
  color: props.theme.colors.text.darker,
  backgroundColor: props.theme.colors.background.ordinary,
  '&:hover': {
    color: props.theme.colors.text.primary,
  },
  '&.active': {
    border: `1px solid ${props.theme.colors.main.violet}`,
    backgroundColor: props.theme.colors.background.primary,
    color: props.theme.colors.text.primary,
  },
}));

export const ToggleButtonsContainer = styled.div(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

export const ToggleChartButton = styled.button((props) => ({
  backgroundColor: props.theme.colors.background.primary,
  color: props.theme.colors.text.darker,
  height: 50,
}));
