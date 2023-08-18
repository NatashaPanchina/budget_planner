import { css, styled } from '@mui/material';

const FlexContainer = styled('div')(() => ({
  display: 'flex',
  alignItems: 'center',
}));

export const AnalysisHeader = styled(FlexContainer)((props) => ({
  justifyContent: 'center',
  flexWrap: 'wrap',
  padding: `${props.theme.spacing(2)} 0`,
  position: 'sticky',
  top: 0,
  zIndex: 9,
  backgroundColor: props.theme.colors.background.body,
  '@media (min-width: 768px)': {
    top: props.theme.spacing(14),
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
  width: `calc(50% - ${props.theme.spacing(2 * 2)})`,
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

export const FilterSvg = styled('svg')((props) => ({
  height: 18,
  width: 18,
  margin: `0px ${props.theme.spacing(2)}`,
}));

export const AccountsList = styled('div')((props) => ({
  position: 'absolute',
  top: props.theme.spacing(22),
  left: `calc(25% - 6em)`,
  width: '12em',
  color: props.theme.colors.text.primary,
  backgroundColor: props.theme.colors.background.primary,
  border: `1px solid${props.theme.colors.border.item}`,
  borderRadius: props.theme.borderRadius,
  '@media (min-width: 768px)': {
    width: '15em',
    top: props.theme.spacing(11),
    left: `calc(50% - 7.5em)`,
  },
}));

export const Container = styled('div')((props) => ({
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

export const CommonInfoItemDiv = styled('div')((props) => ({
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
    padding: `${props.theme.spacing(5)} ${props.theme.spacing(4)}`,
  },
}));

export const CommonInfoItem = styled(CommonInfoItemDiv, {
  shouldForwardProp: (prop) => prop !== '$itemType',
})((props) => {
  switch (props.$itemType) {
    case 'totalExpense':
      return css`
        grid-column: 1 / 2;
        grid-row: 1 / 2;
        @media (min-width: 600px) {
          grid-column: 1 / 2;
          grid-row: 1 / 2;
        }
      `;
    case 'totalIncome':
      return css`
        grid-column: 1 / 2;
        grid-row: 2 / 3;
        @media (min-width: 600px) {
          grid-column: 2 / 3;
          grid-row: 1 / 2;
        }
      `;
    case 'saldo':
      return css`
        grid-column: 1 / 2;
        grid-row: 3 / 4;
        @media (min-width: 600px) {
          grid-column: 3 / 4;
          grid-row: 1 / 2;
        }
      `;
    default:
      return css`
        grid-column: 1 / 2;
        grid-row: 1 / 2;
        @media (min-width: 600px) {
          grid-column: 1 / 2;
          grid-row: 1 / 2;
        }
      `;
  }
});

export const CommonInfoSvg = styled('svg')((props) => ({
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

export const CommonInfoTitle = styled('div')((props) => ({
  fontSize: '0.75rem',
  color: props.theme.colors.text.darker,
}));

export const CommonInfoAmount = styled('div', {
  shouldForwardProp: (prop) => prop !== '$amountType',
})((props) => ({
  color:
    props.$amountType === 'all'
      ? props.theme.colors.main.violet
      : props.theme.colors[props.$amountType],
}));

export const CommonInfoCount = styled('div')(() => ({
  fontSize: '0.875rem',
}));

const CommonCalcDiv = styled('div')((props) => ({
  justifySelf: 'center',
  textAlign: 'center',
  width: '80%',
  padding: props.theme.spacing(4),
  '@media (min-width: 600px)': {
    display: 'block',
  },
  '@media (min-width: 768px)': {
    padding: `${props.theme.spacing(6)} ${props.theme.spacing(4)}`,
  },
}));

export const CommonCalcItem = styled(CommonCalcDiv, {
  shouldForwardProp: (prop) => prop !== '$itemType',
})((props) => {
  switch (props.$itemType) {
    case 'averageExpense':
      return css`
        grid-column: 2 / 3;
        grid-row: 1 / 2;
        @media (min-width: 600px) {
          grid-column: 1 / 2;
          grid-row: 2 / 3;
        }
      `;
    case 'averageIncome':
      return css`
        grid-column: 2 / 3;
        grid-row: 2 / 3;
        @media (min-width: 600px) {
          grid-column: 2 / 3;
          grid-row: 2 / 3;
        }
      `;
    case 'totalCount':
      return css`
        grid-column: 2 / 3;
        grid-row: 3 / 4;
        @media (min-width: 600px) {
          grid-column: 3 / 4;
          grid-row: 2 / 3;
        }
      `;
    default:
      return css`
        grid-column: 2 / 3;
        grid-row: 1 / 2;
        @media (min-width: 600px) {
          grid-column: 1 / 2;
          grid-row: 2 / 3;
        }
      `;
  }
});

export const ChartsContainer = styled('div')((props) => ({
  marginTop: props.theme.spacing(7),
  width: '100%',
  border: `1px solid ${props.theme.colors.border.item}`,
  borderRadius: props.theme.borderRadius,
  backgroundColor: props.theme.colors.background.primary,
  boxShadow: `0px 4px 10px ${props.theme.colors.boxShadow}`,
  position: 'relative',
}));

export const ChartSvg = styled('svg')((props) => ({
  display: 'none',
  '@media (min-width: 768px)': {
    display: 'flex',
    position: 'absolute',
    top: props.theme.spacing(5),
    left: props.theme.spacing(5),
    width: 35,
    height: 35,
    minWidth: 35,
  },
}));

export const ChartHeader = styled(FlexContainer)((props) => ({
  overflowX: 'scroll',
  width: `calc(100% - ${props.theme.spacing(5 * 2)})`,
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

export const ChartButton = styled('button', {
  shouldForwardProp: (prop) => prop !== '$isActive',
})((props) => ({
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

export const ToggleChartButton = styled(FlexContainer, {
  shouldForwardProp: (prop) => prop !== '$isActive',
})((props) => ({
  cursor: 'pointer',
  backgroundColor: props.theme.colors.background.primary,
  fontSize: '0.875rem',
  color: props.$isActive
    ? props.theme.colors.text.primary
    : props.theme.colors.text.darker,
  height: 50,
  justifyContent: 'center',
  paddingLeft: props.theme.spacing(2),
  paddingRight: props.theme.spacing(2),
  '&:hover': {
    color: props.theme.colors.text.primary,
  },
}));
