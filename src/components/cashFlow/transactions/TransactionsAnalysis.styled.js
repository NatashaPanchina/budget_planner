import { alpha, css, styled } from '@mui/material';

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
  borderRadius: props.theme.borderRadius,
  textAlign: 'center',
  padding: props.theme.spacing(4),
  color: props.theme.colors.white,
  fontSize: '0.75rem',
  '@media (min-width: 768px)': {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: `${props.theme.spacing(5)} ${props.theme.spacing(4)}`,
  },
}));

export const CommonInfoItem = styled(CommonInfoItemDiv, {
  shouldForwardProp: (prop) => prop !== '$itemType' && prop !== '$background',
})((props) => {
  switch (props.$itemType) {
    case 'totalExpense':
      return css`
        background:
          url(${props.$background}) 0% 0% / 40% no-repeat,
          linear-gradient(
            to bottom right,
            ${props.theme.colors.linear.expense.from},
            ${props.theme.colors.linear.expense.to}
          );
        box-shadow: 0px 5px 20px
          ${alpha(props.theme.colors.linear.expense.from, 0.4)};
        grid-column: 1 / 2;
        grid-row: 1 / 2;
        @media (min-width: 600px) {
          grid-column: 1 / 2;
          grid-row: 1 / 2;
        }
      `;
    case 'totalIncome':
      return css`
        background:
          url(${props.$background}) 0% 0% / 40% no-repeat,
          linear-gradient(
            to bottom right,
            ${props.theme.colors.linear.income.from},
            ${props.theme.colors.linear.income.to}
          );
        box-shadow: 0px 5px 20px
          ${alpha(props.theme.colors.linear.income.from, 0.4)};
        grid-column: 1 / 2;
        grid-row: 2 / 3;
        @media (min-width: 600px) {
          grid-column: 2 / 3;
          grid-row: 1 / 2;
        }
      `;
    case 'savings':
      return css`
        background:
          url(${props.$background}) 0% 0% / 40% no-repeat,
          linear-gradient(
            to bottom right,
            ${props.theme.colors.linear.saldo.from},
            ${props.theme.colors.linear.saldo.to}
          );
        box-shadow: 0px 5px 20px
          ${alpha(props.theme.colors.linear.saldo.from, 0.4)};
        grid-column: 1 / 2;
        grid-row: 3 / 4;
        @media (min-width: 600px) {
          grid-column: 3 / 4;
          grid-row: 1 / 2;
        }
      `;
    default:
      return css`
        background:
          url(${props.$background}) 0% 0% / 40% no-repeat,
          linear-gradient(
            to bottom right,
            ${props.theme.colors.linear.expense.from},
            ${props.theme.colors.linear.expense.to}
          );
        box-shadow: 0px 5px 20px
          ${alpha(props.theme.colors.linear.expense.from, 0.4)};
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
    width: 40,
    height: 40,
    minWidth: 40,
    marginRight: props.theme.spacing(3),
  },
}));

export const AverageInfoSvg = styled('svg')((props) => ({
  width: '90%',
  height: 70,
  minWidth: 50,
  '@media (min-width: 768px)': {
    width: '70%',
    minWidth: 35,
  },
  '@media (min-width: 1000px)': {
    paddingRight: props.theme.spacing(3),
    width: `calc(50% - ${props.theme.spacing(3)})`,
  },
}));

export const TotalTransactionsSvg = styled('svg')((props) => ({
  width: 35,
  height: 35,
  minWidth: 35,
  marginTop: props.theme.spacing(6),
  marginBottom: props.theme.spacing(2),
  '@media (min-width: 1000px)': {
    margin: 0,
    marginRight: props.theme.spacing(3),
  },
}));

export const CommonInfoTitle = styled('div')((props) => ({
  fontSize: '0.75rem',
  color: props.theme.colors.text.darker,
}));

const InfoAmount = styled('div')(() => ({
  fontSize: '1.1rem',
  lineHeight: '2',
}));

export const CommonInfoAmount = styled(InfoAmount, {
  shouldForwardProp: (prop) => prop !== '$amountType',
})((props) => {
  switch (props.$amountType) {
    case 'all':
      return css`
        color: ${props.theme.colors.main.violet};
      `;
    case 'expense':
      return css`
        color: ${props.theme.colors.expense};
      `;
    case 'income':
      return css`
        color: ${props.theme.colors.income};
      `;
    default:
      return css`
        color: ${props.theme.colors.white};
      `;
  }
});

const CommonCalcDiv = styled('div')((props) => ({
  justifySelf: 'center',
  textAlign: 'center',
  width: '80%',
  padding: props.theme.spacing(4),
  '@media (min-width: 768px)': {
    padding: `${props.theme.spacing(6)} ${props.theme.spacing(4)}`,
  },
  '@media (min-width: 1000px)': {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
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

export const ChartButton = styled(FlexContainer, {
  shouldForwardProp: (prop) => prop !== '$isActive',
})((props) => ({
  cursor: 'pointer',
  fontSize: '0.875rem',
  height: 35,
  borderRadius: props.theme.borderRadius,
  paddingLeft: props.theme.spacing(4),
  paddingRight: props.theme.spacing(4),
  marginLeft: props.theme.spacing(4),
  marginRight: props.theme.spacing(4),
  whiteSpace: 'nowrap',
  color: props.theme.colors.white,
  background: `linear-gradient(to bottom right, ${alpha(
    props.theme.colors.linear.main.from,
    0.8,
  )}, ${alpha(props.theme.colors.linear.main.to, 0.8)})`,
  opacity: props.$isActive ? 1 : 0.5,
  '&:hover': {
    opacity: 1,
    transition: 'opacity 0.3s ease-out',
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
