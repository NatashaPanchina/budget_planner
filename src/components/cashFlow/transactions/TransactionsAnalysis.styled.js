import { MenuItem, styled } from '@mui/material';
import { Header } from '../../../theme/global';

export const FlexContainer = styled('div')(() => ({
  display: 'flex',
  alignItems: 'center',
}));

export const AnalysisHeader = styled(Header)(() => ({
  position: 'sticky',
  top: 0,
  zIndex: 10,
}));

export const HeaderTitle = styled(FlexContainer)((props) => ({
  justifyContent: 'center',
  width: '100%',
  fontSize: '1.3rem',
  '@media (min-width: 900px)': {
    width: 'fit-content',
    marginRight: props.theme.spacing(14),
  },
}));

export const FilterSvg = styled('svg')((props) => ({
  height: 18,
  width: 18,
  marginRight: props.theme.spacing(3),
  '& path': {
    fill: props.theme.colors.main.violet,
  },
  '@media (min-width: 600px)': {
    '& path': {
      fill: props.theme.colors.main.violet,
    },
  },
  '@media (min-width: 768px)': {
    margin: 0,
  },
  '@media (min-width: 1000px)': {
    marginRight: props.theme.spacing(3),
    '& path': {
      fill: props.theme.colors.main.violet,
    },
  },
}));

export const ToggleSvg = styled('svg')((props) => ({
  height: 18,
  width: 18,
  '& path': {
    fill: props.theme.colors.text.darkest,
  },
}));

export const FilterCalendarSvg = styled('svg')((props) => ({
  height: 18,
  width: 18,
  margin: 0,
  marginRight: props.theme.spacing(2),
  '& path': {
    fill: props.theme.colors.text.darkest,
  },
}));

export const AccountsMenuItem = styled(MenuItem)((props) => ({
  borderRadius: props.theme.borderRadius,
  backgroundColor: props.theme.colors.background.primary,
  color: props.theme.colors.text.primary,
  fontSize: '0.875rem',
}));

export const PeriodsContainer = styled(FlexContainer)((props) => ({
  borderBottom: `1px solid ${props.theme.colors.border.title}`,
  zIndex: 9,
  backgroundColor: props.theme.colors.background.body,
  width: '100%',
}));

export const PeriodLink = styled(FlexContainer, {
  shouldForwardProp: (prop) => prop !== '$isActive',
})((props) => ({
  height: 50,
  width: '33.3%',
  fontSize: '0.9375rem',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  color: props.$isActive
    ? props.theme.colors.text.primary
    : props.theme.colors.text.darker,
  borderBottom: props.$isActive
    ? `2px solid ${props.theme.colors.main.gold}`
    : 'none',
  '&:hover': {
    color: props.theme.colors.text.primary,
  },
}));

export const CalendarContainer = styled(FlexContainer)((props) => ({
  color: props.theme.colors.text.darker,
  margin: props.theme.spacing(3),
  marginLeft: 'auto',
  marginRight: 'auto',
  '@media (min-width: 600px)': {
    display: 'none',
  },
}));

export const Container = styled('div')((props) => ({
  boxSizing: 'border-box',
  borderRadius: props.theme.borderRadius,
  backgroundColor: props.theme.colors.background.primary,
  position: 'relative',
}));

export const CommonInfoContainer = styled('div')((props) => ({
  display: 'flex',
  alignItems: 'center',
  overflowX: 'scroll',
  width: '100%',
  position: 'relative',
  background: props.theme.colors.background.primary,
  '&::-webkit-scrollbar': {
    width: 1,
    height: 2,
  },
  '&::-webkit-scrollbar-thumb': {
    background: props.theme.colors.background.ordinary,
    borderRadius: props.theme.borderRadius,
  },
  '@media (min-width: 600px)': {
    overflowX: 'hidden',
    marginBottom: props.theme.spacing(4),
    borderRadius: props.theme.borderRadius,
    border: `1px solid ${props.theme.colors.border.item}`,
  },
  '@media (min-width: 900px)': {
    display: 'block',
    background: 'none',
    border: 'none',
    maxHeight: 520,
  },
}));

export const CommonInfoItemDiv = styled(FlexContainer)((props) => ({
  padding: props.theme.spacing(3),
  '@media (min-width: 600px)': {
    padding: 0,
    width: `100%`,
    justifyContent: 'center',
  },
}));

export const Stripe = styled('div', {
  shouldForwardProp: (prop) => prop !== '$type',
})((props) => ({
  height: 5,
  width: '100%',
  backgroundColor: props.theme.colors[props.$type],
  borderRadius: props.theme.borderRadius * 2,
  marginTop: props.theme.spacing(2),
  '@media (min-width: 600px)': {
    marginTop: props.theme.spacing(4),
  },
  '@media (min-width: 900px)': {
    marginBottom: props.theme.spacing(3),
  },
}));

export const AverageInfoItem = styled('div')((props) => ({
  borderRight: `1px solid ${props.theme.colors.border.item}`,
  backgroundColor: props.theme.colors.background.primary,
  padding: props.theme.spacing(3),
  textAlign: 'center',
  '@media (min-width: 600px)': {
    border: `1px solid ${props.theme.colors.border.item}`,
    borderRadius: props.theme.borderRadius,
    boxShadow: `0px 4px 10px ${props.theme.colors.boxShadow}`,
  },
}));

export const CommonInfoItem = styled('div')((props) => ({
  marginTop: props.theme.spacing(2),
  marginBottom: props.theme.spacing(2),
  display: 'flex',
  minWidth: '50%',
  whiteSpace: 'no-wrap',
  justifyContent: 'center',
  alignItems: 'center',
  textAlign: 'center',
  borderRight: `1px solid ${props.theme.colors.svg.pending}`,
  '@media (min-width: 600px)': {
    padding: props.theme.spacing(3),
    minWidth: `calc(33.3333333333% - ${props.theme.spacing(3 * 2)})`,
    display: 'block',
    backgroundColor: props.theme.colors.background.primary,
  },
  '@media (min-width: 900px)': {
    borderRadius: props.theme.borderRadius,
    border: `1px solid ${props.theme.colors.border.item}`,
  },
}));

export const AverangeInfoHeader = styled('div')((props) => ({
  width: `100%`,
  paddingBottom: props.theme.spacing(3),
}));

export const AverageInfoContainer = styled('div')((props) => ({
  display: 'grid',
  gridTemplateAreas: '"income expense"',
  width: '100%',
  position: 'relative',
  background: props.theme.colors.background.primary,
  columnGap: props.theme.spacing(2),
  paddingTop: props.theme.spacing(4),
  marginBottom: props.theme.spacing(7),
  '@media (min-width: 600px)': {
    paddingTop: 0,
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
    marginLeft: 'auto',
    marginRight: 'auto',
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
  width: '100%',
  maxHeight: 600,
  backgroundColor: props.theme.colors.background.primary,
  position: 'relative',
  '@media (min-width: 600px)': {
    border: `1px solid ${props.theme.colors.border.item}`,
    boxShadow: `0px 4px 10px ${props.theme.colors.boxShadow}`,
    borderRadius: props.theme.borderRadius,
    marginBottom: props.theme.spacing(4),
    maxHeight: 520,
  },
}));

export const PieChartContainer = styled(ChartsContainer)(() => ({
  '@media (min-width: 600px)': {
    height: 450,
    maxHeight: 450,
  },
}));

export const BarChartContainer = styled(ChartsContainer)((props) => ({
  '@media (min-width: 900px)': {
    marginTop: props.theme.spacing(2),
  },
}));

export const ChartHeader = styled(FlexContainer)((props) => ({
  width: `calc(100% - ${props.theme.spacing(3 * 2)})`,
  padding: props.theme.spacing(3),
  paddingBottom: props.theme.spacing(5),
  paddingTop: props.theme.spacing(10),
  fontWeight: 500,
  fontSize: '1.2rem',
  justifyContent: 'center',
  '@media (min-width: 600px)': {
    width: `calc(100% - ${props.theme.spacing(5 * 2)})`,
    padding: props.theme.spacing(5),
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

export const CountTransactionsItem = styled(CommonInfoItem)((props) => ({
  display: 'none',
  '@media (min-width: 600px)': {
    display: 'flex',
    padding: 0,
    width: `100%`,
    marginTop: props.theme.spacing(4),
    borderRadius: props.theme.borderRadius,
    border: `1px solid ${props.theme.colors.border.item}`,
  },
  '@media (min-width: 900px)': {
    display: 'none',
  },
}));

export const CountTransaction = styled(FlexContainer)((props) => ({
  padding: props.theme.spacing(3),
  width: `calc(33.33% - ${props.theme.spacing(3 * 2)})`,
  justifyContent: 'center',
}));

export const CountItemHeader = styled('div')((props) => ({
  fontSize: '0.95rem',
  color: props.theme.colors.text.darker,
}));

export const CountNumber = styled('div')((props) => ({
  marginLeft: props.theme.spacing(1),
  color: props.theme.colors.text.primary,
}));

export const CommonInfoHeader = styled('div')((props) => ({
  width: `100%`,
  display: 'none',
  '@media (min-width: 600px)': {
    display: 'block',
    fontSize: '0.85rem',
    color: props.theme.colors.text.darker,
  },
  '@media (min-width: 900px)': {
    textAlign: 'center',
  },
}));

export const MobCommonInfoHeader = styled('div')((props) => ({
  fontSize: '0.85rem',
  color: props.theme.colors.text.darker,
  marginRight: props.theme.spacing(2),
  '@media (min-width: 600px)': {
    display: 'none',
  },
}));

export const CalcInfoAmount = styled(InfoAmount, {
  shouldForwardProp: (prop) => prop !== '$type',
})((props) => ({
  color: props.$type
    ? props.theme.colors[props.$type]
    : props.theme.colors.text.primary,
  fontWeight: 500,
  fontSize: '1.4rem',
  marginRight: props.theme.spacing(2),
}));

export const RatesContainer = styled('div')(() => ({
  display: 'flex',
  justifyContent: 'center',
  fontSize: '0.85rem',
  flexWrap: 'wrap',
  '@media (min-width: 600px)': {
    fontSize: '1rem',
  },
  '@media (min-width: 1000px)': {
    display: 'flex',
    alignItems: 'center',
  },
}));

export const RatesSvg = styled('svg')(() => ({
  display: 'none',
  width: 16,
  height: 16,
  '@media (min-width: 600px)': {
    display: 'flex',
  },
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
