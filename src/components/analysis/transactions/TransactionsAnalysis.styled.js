import { css, styled } from 'styled-components';

const FlexContainer = styled.div(() => ({
  display: 'flex',
  alignItems: 'center',
}));

export const AnalysisHeader = styled(FlexContainer)((props) => ({
  justifyContent: 'center',
  flexWrap: 'wrap',
  padding: `${props.theme.spacing(2)}px 0`,
  position: 'sticky',
  top: 56,
  zIndex: 9,
  backgroundColor: props.theme.colors.background.body,
  '@media (min-width: 768px)': {
    flexWrap: 'nowrap',
  },
}));

export const HeaderTitle = styled(FlexContainer)(() => ({
  justifyContent: 'center',
  width: '100%',
  fontSize: '1.3rem',
  '@media (min-width: 768px)': {
    display: 'block',
    width: '33.33%',
  },
}));

export const Filter = styled(FlexContainer)((props) => ({
  position: 'relative',
  justifyContent: 'center',
  borderRadius: props.theme.borderRadius * 1.5,
  height: 'fit-content',
  width: `calc(50% - ${props.theme.spacing(2) * 2}px)`,
  padding: props.theme.spacing(2),
  fontSize: '0.875rem',
  color: props.theme.colors.text.darker,
  cursor: 'pointer',
  '&:hover': {
    color: props.theme.colors.text.primary,
  },
  '@media (min-width: 768px)': {
    width: '33.33%',
  },
}));

export const FilterSvg = styled.svg((props) => ({
  height: 18,
  width: 18,
  margin: `0px ${props.theme.spacing(2)}px`,
}));

export const AccountsList = styled.div((props) => ({
  position: 'absolute',
  top: 75,
  left: `calc(25% - 6em)`,
  width: '12em',
  color: props.theme.colors.text.primary,
  backgroundColor: props.theme.colors.background.primary,
  border: `1px solid${props.theme.colors.border.item}`,
  borderRadius: props.theme.borderRadius,
  '@media (min-width: 768px)': {
    width: '15em',
    top: 45,
    left: `calc(50% - 7.5em)`,
  },
}));

export const Container = styled.div((props) => ({
  boxSizing: 'border-box',
  border: `1px solid ${props.theme.colors.border.item}`,
  borderRadius: props.theme.borderRadius,
  backgroundColor: props.theme.colors.background.primary,
  boxShadow: `0px 4px 10px ${props.theme.colors.boxShadow}`,
  position: 'relative',
}));

export const CommonInfoContainer = styled(Container)((props) => ({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  rowGap: props.theme.spacing(4),
  justifyContent: 'center',
  width: '100%',
  paddingTop: props.theme.spacing(5),
  paddingBottom: props.theme.spacing(5),
  '@media (min-width: 600px)': {
    gridTemplateColumns: '1fr 1fr 1fr',
    rowGap: 0,
    paddingBottom: 0,
  },
}));

export const CommonInfoItemDiv = styled.div((props) => ({
  justifySelf: 'center',
  width: '80%',
  boxSizing: 'border-box',
  border: `1px solid ${props.theme.colors.border.item}`,
  borderRadius: props.theme.borderRadius,
  textAlign: 'center',
  backgroundColor: props.theme.colors.background.body,
  padding: props.theme.spacing(4),
  '@media (min-width: 768px)': {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: `${props.theme.spacing(5)}px ${props.theme.spacing(4)}px`,
  },
}));

export const CommonInfoItem = styled(CommonInfoItemDiv)((props) => {
  switch (props.$itemType) {
    case 'totalExpense':
      return css(() => ({
        gridColumn: '1 / 2',
        gridRow: '1 / 2',
        '@media (min-width: 600px)': {
          gridColumn: '1 / 2',
          gridRow: '1 / 2',
        },
      }));
    case 'totalIncome':
      return css(() => ({
        gridColumn: '1 / 2',
        gridRow: '2 / 3',
        '@media (min-width: 600px)': {
          gridColumn: '2 / 3',
          gridRow: '1 / 2',
        },
      }));
    case 'saldo':
      return css(() => ({
        gridColumn: '1 / 2',
        gridRow: '3 / 4',
        '@media (min-width: 600px)': {
          gridColumn: '3 / 4',
          gridRow: '1 / 2',
        },
      }));
    case 'averageExpense':
      return css(() => ({
        gridColumn: '2 / 3',
        gridRow: '1 / 2',
        '@media (min-width: 600px)': {
          gridColumn: '1 / 2',
          gridRow: '2 / 3',
        },
      }));
    case 'averageIncome':
      return css(() => ({
        gridColumn: '2 / 3',
        gridRow: '2 / 3',
        '@media (min-width: 600px)': {
          gridColumn: '2 / 3',
          gridRow: '2 / 3',
        },
      }));
    case 'totalCount':
      return css(() => ({
        gridColumn: '2 / 3',
        gridRow: '3 / 4',
        '@media (min-width: 600px)': {
          gridColumn: '3 / 4',
          gridRow: '2 / 3',
        },
      }));
    default:
      return css(() => ({
        gridColumn: '1 / 2',
        gridRow: '1 / 2',
      }));
  }
});

export const CommonInfoSvg = styled.svg((props) => ({
  width: 30,
  height: 30,
  minWidth: 30,
  '@media (min-width: 768px)': {
    width: 35,
    height: 35,
    minWidth: 35,
    marginRight: props.theme.spacing(3),
  },
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

export const CommonCalcItem = styled.div((props) => ({
  justifySelf: 'center',
  textAlign: 'center',
  width: '80%',
  padding: props.theme.spacing(4),
  '@media (min-width: 600px)': {
    display: 'block',
  },
  '@media (min-width: 768px)': {
    padding: `${props.theme.spacing(6)}px ${props.theme.spacing(4)}px`,
  },
}));

export const ChartsContainer = styled.div((props) => ({
  marginTop: props.theme.spacing(7),
  width: '100%',
  border: `1px solid ${props.theme.colors.border.item}`,
  borderRadius: props.theme.borderRadius,
  backgroundColor: props.theme.colors.background.primary,
  boxShadow: `0px 4px 10px ${props.theme.colors.boxShadow}`,
  position: 'relative',
}));

export const ChartSvg = styled.svg(() => ({
  display: 'none',
  '@media (min-width: 768px)': {
    display: 'flex',
    position: 'absolute',
    top: 20,
    left: 20,
    width: 35,
    height: 35,
    minWidth: 35,
  },
}));

export const ChartHeader = styled(FlexContainer)((props) => ({
  overflowX: 'scroll',
  width: `calc(100% - ${props.theme.spacing(5) * 2}px)`,
  padding: props.theme.spacing(5),
  borderBottom: `1px solid ${props.theme.colors.border.title}`,
  '&::-webkit-scrollbar': {
    width: 1,
    height: 2,
  },
  '&::-webkit-scrollbar-thumb': {
    background: props.theme.colors.background.ordinary,
    borderRadius: props.theme.borderRadius,
  },
  '@media (min-width: 600px)': {
    overflow: 'hidden',
    justifyContent: 'center',
  },
}));

export const ChartButton = styled.button((props) => ({
  height: 35,
  borderRadius: props.theme.borderRadius,
  paddingLeft: props.theme.spacing(4),
  paddingRight: props.theme.spacing(4),
  marginLeft: props.theme.spacing(4),
  marginRight: props.theme.spacing(4),
  whiteSpace: 'nowrap',
  color: props.$isActive
    ? props.theme.colors.text.primary
    : props.theme.colors.text.darker,
  backgroundColor: props.$isActive
    ? props.theme.colors.background.primary
    : props.theme.colors.background.ordinary,
  border: props.$isActive
    ? `1px solid ${props.theme.colors.main.violet}`
    : 'none',
  '&:hover': {
    color: props.theme.colors.text.primary,
  },
}));

export const ToggleButtonsContainer = styled(FlexContainer)(() => ({
  justifyContent: 'center',
}));

export const ToggleChartButton = styled.button((props) => ({
  backgroundColor: props.theme.colors.background.primary,
  color: props.$isActive
    ? props.theme.colors.text.primary
    : props.theme.colors.text.darker,
  height: 50,
  '&:hover': {
    color: props.theme.colors.text.primary,
  },
}));
