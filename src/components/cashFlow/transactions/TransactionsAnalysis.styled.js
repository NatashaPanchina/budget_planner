import { MenuItem, TextField, alpha, styled } from '@mui/material';
import { Header } from '../../../theme/global';

export const FlexContainer = styled('div')(() => ({
  display: 'flex',
  alignItems: 'center',
}));

export const AnalysisHeader = styled(Header)(() => ({
  position: 'static',
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

export const FilterSvg = styled('svg')((props) => ({
  height: 18,
  width: 18,
  margin: `0px ${props.theme.spacing(2)}`,
}));

export const AccountsFieldFilter = styled(TextField)((props) => ({
  width: '12em',
  '@media (min-width: 768px)': {
    width: '15em',
  },
  margin: 0,
  '& .MuiInputAdornment-root': {
    margin: 0,
  },
  '& .MuiOutlinedInput-root': {
    paddingLeft: 0,
    '& fieldset': {
      border: `1px solid ${props.theme.colors.background.primary}`,
      padding: 0,
      boxShadow: 'none',
    },
    '&.Mui-focused fieldset': {
      border: `1px solid ${props.theme.colors.background.primary}`,
    },
    '& .MuiInputBase-input': {
      fontSize: '0.875rem',
      padding: 0,
      display: 'flex',
      justifyContent: 'center',
      color: props.theme.colors.text.darker,
      '&:hover': {
        color: props.theme.colors.text.primary,
      },
    },
  },
}));

export const AccountsMenuItem = styled(MenuItem)((props) => ({
  borderRadius: props.theme.borderRadius,
  backgroundColor: props.theme.colors.background.primary,
  color: props.theme.colors.text.primary,
  fontSize: '0.875rem',
}));

export const Container = styled('div')((props) => ({
  boxSizing: 'border-box',
  borderRadius: props.theme.borderRadius,
  backgroundColor: props.theme.colors.background.primary,
  position: 'relative',
}));

export const CommonInfoContainer = styled('div')((props) => ({
  display: 'grid',
  gridTemplateAreas: '"saldo saldo" "expense income"',
  marginBottom: props.theme.spacing(7),
  width: '100%',
  position: 'relative',
  background: props.theme.colors.background.primary,
  '@media (min-width: 600px)': {
    background: 'none',
    rowGap: props.theme.spacing(3),
    columnGap: props.theme.spacing(3),
    gridTemplateAreas:
      '"transactions transactions transactions" "saldo income expense"',
  },
  '@media (min-width: 900px)': {
    height: 520,
    rowGap: props.theme.spacing(4),
    columnGap: 0,
    gridTemplateAreas: '"transactions" "saldo" "income" "expense"',
  },
}));

export const CommonInfoItemDiv = styled(FlexContainer)((props) => ({
  padding: props.theme.spacing(3),
  width: `calc(100% - ${props.theme.spacing(3 * 2)})`,
  '@media (min-width: 600px)': {
    padding: 0,
  },
}));

export const CommonInfoItem = styled('div', {
  shouldForwardProp: (prop) => prop !== '$type',
})((props) => ({
  gridArea: props.$type,
  marginLeft: 'auto',
  marginRight: 'auto',
  display: 'flex',
  '@media (min-width: 600px)': {
    padding: props.theme.spacing(3),
    margin: 0,
    maxWidth: '100%',
    display: 'block',
    border: `1px solid ${props.theme.colors.border.item}`,
    boxShadow: `0px 4px 10px ${props.theme.colors.boxShadow}`,
    borderRadius: props.theme.borderRadius,
    backgroundColor: props.theme.colors.background.primary,
  },
}));

export const CommonInfoSvg = styled('svg')((props) => ({
  width: 40,
  height: 40,
  marginRight: props.theme.spacing(2),
  '@media (min-width: 768px)': {
    width: 50,
    height: 50,
    minWidth: 50,
    marginRight: props.theme.spacing(3),
  },
}));

export const AverageInfoContainer = styled('div')((props) => ({
  display: 'grid',
  gridTemplateAreas: '"income expense"',
  marginBottom: props.theme.spacing(7),
  width: '100%',
  position: 'relative',
  background: props.theme.colors.background.primary,
  '@media (min-width: 600px)': {
    background: 'none',
    rowGap: props.theme.spacing(3),
    columnGap: props.theme.spacing(3),
  },
  '@media (min-width: 900px)': {
    rowGap: props.theme.spacing(6),
    columnGap: 0,
    gridTemplateAreas: '"income" "expense"',
  },
}));

export const AverageInfoSvg = styled('svg')((props) => ({
  width: '90%',
  height: 70,
  minWidth: 50,
  display: 'none',
  '@media (min-width: 600px)': {
    display: 'flex',
  },
  '@media (min-width: 768px)': {
    width: '70%',
    minWidth: 35,
  },
  '@media (min-width: 1000px)': {
    paddingRight: props.theme.spacing(3),
    width: `calc(50% - ${props.theme.spacing(3)})`,
  },
}));

const InfoAmount = styled('div')(() => ({
  fontSize: '1.1rem',
  lineHeight: '2',
}));

export const ChartsContainer = styled('div')((props) => ({
  marginBottom: props.theme.spacing(7),
  width: '100%',
  maxHeight: 600,
  border: `1px solid ${props.theme.colors.border.item}`,
  boxShadow: `0px 4px 10px ${props.theme.colors.boxShadow}`,
  borderRadius: props.theme.borderRadius,
  backgroundColor: props.theme.colors.background.primary,
  position: 'relative',
  '@media (min-width: 600px)': {
    height: 520,
    maxHeight: 520,
  },
}));

export const ChartHeader = styled(FlexContainer)((props) => ({
  overflowX: 'scroll',
  width: `calc(100% - ${props.theme.spacing(3 * 2)})`,
  padding: props.theme.spacing(3),
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
    justifyContent: 'center',
    width: `calc(100% - ${props.theme.spacing(5 * 2)})`,
    padding: props.theme.spacing(5),
  },
}));

export const ChartButton = styled(FlexContainer, {
  shouldForwardProp: (prop) => prop !== '$isActive',
})((props) => ({
  cursor: 'pointer',
  borderRadius: props.theme.borderRadius,
  padding: `${props.theme.spacing(1)} ${props.theme.spacing(4)}`,
  marginLeft: props.theme.spacing(4),
  marginRight: props.theme.spacing(4),
  whiteSpace: 'nowrap',
  color: props.$isActive
    ? props.theme.colors.main.violet
    : props.theme.colors.text.primary,
  opacity: props.$isActive ? 1 : 0.4,
  '&:hover': {
    opacity: 1,
    transition: 'opacity 0.3s ease-out',
  },
}));

export const ToggleButtonsContainer = styled(FlexContainer)((props) => ({
  margin: `${props.theme.spacing(5)} ${props.theme.spacing(7)}`,
  justifyContent: 'center',
}));

export const ToggleChartButton = styled(FlexContainer, {
  shouldForwardProp: (prop) => prop !== '$isActive',
})((props) => ({
  cursor: 'pointer',
  backgroundColor: props.theme.colors.background.primary,
  boxShadow: `0px 4px 10px ${props.theme.colors.boxShadow}`,
  borderRadius: props.theme.borderRadius * 2,
  fontSize: '0.875rem',
  color: props.$isActive
    ? props.theme.colors.text.primary
    : props.theme.colors.text.darker,
  justifyContent: 'center',
  padding: props.theme.spacing(2),
  margin: `0px ${props.theme.spacing(3)}`,
  '&:hover': {
    color: props.theme.colors.text.primary,
  },
}));

export const CalendarChartButton = styled(ToggleChartButton)((props) => ({
  backgroundColor: alpha(props.theme.colors.main.violet, 0.1),
  color: props.theme.colors.main.violet,
}));

export const CountTransactionsItem = styled(CommonInfoItem)((props) => ({
  display: 'none',
  '@media (min-width: 600px)': {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr',
    gridArea: 'transactions',
    columnGap: props.theme.spacing(3),
  },
  '@media (min-width: 900px)': {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gridArea: 'transactions',
  },
}));

export const CountItemHeader = styled('div')((props) => ({
  fontSize: '0.95rem',
  color: props.theme.colors.text.darker,
}));

export const CountNumber = styled('div', {
  shouldForwardProp: (prop) => prop !== '$type',
})((props) => ({
  marginLeft: props.theme.spacing(1),
  color: props.theme.colors[props.$type],
}));

export const CommonInfoHeader = styled('div')((props) => ({
  width: `100%`,
  paddingBottom: props.theme.spacing(3),
  display: 'none',
  '@media (min-width: 600px)': {
    display: 'block',
  },
}));

export const MobCommonInfoHeader = styled('div')(() => ({
  fontSize: '0.85rem',
  '@media (min-width: 600px)': {
    display: 'none',
  },
}));

export const CalcInfoAmount = styled(InfoAmount, {
  shouldForwardProp: (prop) => prop !== '$type',
})((props) => ({
  color: props.theme.colors[props.$type],
}));

export const RatesContainer = styled('div')(() => ({
  display: 'block',
  fontSize: '0.85rem',
  '@media (min-width: 600px)': {
    fontSize: '1rem',
  },
  '@media (min-width: 1000px)': {
    display: 'flex',
    alignItems: 'center',
  },
}));

export const RatesSvg = styled('svg')(() => ({
  width: 16,
  height: 16,
}));

export const RatesInfo = styled('div')((props) => ({
  display: 'none',
  '@media (min-width: 600px)': {
    display: 'block',
    color: props.theme.colors.text.ordinary,
    fontSize: '0.9rem',
    marginLeft: props.theme.spacing(1),
  },
  '@media (min-width: 1000px)': {
    marginLeft: props.theme.spacing(1),
  },
}));
