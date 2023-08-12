import { Link, NavLink } from 'react-router-dom';
import { ColorsContainer } from '../../theme/global';
import { css, styled } from '@mui/material';

export const FlexContainer = styled('div')(() => ({
  display: 'flex',
  alignItems: 'center',
}));

export const MoreInformationContainer = styled('div')((props) => ({
  display: 'flex',
  flexWrap: 'wrap',
  marginBottom: props.theme.spacing(4),
  '@media (min-width: 900px)': {
    display: 'block',
    minWidth: 170,
    height: '100vh',
    position: 'sticky',
    top: props.theme.spacing(14),
    zIndex: 5,
    overflowY: 'auto',
    '&::-webkit-scrollbar': {
      width: 5,
    },
    '&::-webkit-scrollbar-thumb': {
      background: props.theme.colors.background.ordinary,
      borderRadius: props.theme.borderRadius,
    },
  },
}));

export const BarChartInfo = styled(FlexContainer)((props) => ({
  flexWrap: 'wrap',
  width: '100%',
  '@media (min-width: 600px)': {
    marginTop: props.theme.spacing(5),
    width: '70%',
  },
  '@media (min-width: 900px)': {
    marginTop: 0,
    width: '100%',
  },
}));

export const BarChartContainer = styled('div')(() => ({
  display: 'none',
  '@media (min-width: 600px)': {
    display: 'block',
    width: '20%',
    height: 200,
    marginLeft: 0,
    marginRight: 'auto',
  },
  '@media (min-width: 900px)': {
    width: '80%',
    height: '40%',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
}));

export const Tooltip = styled(FlexContainer)((props) => ({
  padding: props.theme.spacing(3),
  background: props.theme.colors.background.primary,
  border: `1px solid ${props.theme.colors.border.item}`,
  borderRadius: props.theme.borderRadius,
  fontSize: '0.875rem',
}));

export const TooltipSvg = styled('svg')((props) => ({
  minWidth: 20,
  marginRight: props.theme.spacing(1),
}));

export const TooltipValue = styled('span')((props) => ({
  fontWeight: 700,
  marginLeft: props.theme.spacing(1),
}));

export const TotalCategoriesCount = styled(FlexContainer)((props) => ({
  width: '100%',
  textAlign: 'center',
  justifyContent: 'center',
  marginLeft: 'auto',
  marginRight: 'auto',
  paddingBottom: props.theme.spacing(2),
  '@media (min-width: 900px)': {
    height: 74,
  },
}));

const CountTransactions = styled('div')(() => ({
  fontSize: '1rem',
}));

export const CountInfo = styled(CountTransactions)((props) => {
  switch (props.$countType) {
    case 'total':
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
        color: ${props.theme.colors.main.violet};
      `;
  }
});

export const BarChartInfoItem = styled('div')((props) => ({
  width: '40%',
  marginLeft: 'auto',
  marginRight: 'auto',
  padding: props.theme.spacing(3),
  background: props.theme.colors.background.primary,
  border: `1px solid ${props.theme.colors.border.item}`,
  boxSizing: 'border-box',
  boxShadow: `0px 4px 10px ${props.theme.colors.boxShadow}`,
  borderRadius: props.theme.borderRadius,
  textAlign: 'center',
  fontSize: '0.875rem',
  '@media (min-width: 768px)': {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'left',
    padding: `${props.theme.spacing(5)} ${props.theme.spacing(3)}`,
  },
  '@media (min-width: 900px)': {
    marginBottom: props.theme.spacing(5),
    width: '90%',
  },
}));

export const Svg = styled('svg')((props) => ({
  height: 30,
  width: 30,
  minWidth: 30,
  '@media (min-width: 768px)': {
    marginRight: props.theme.spacing(3),
  },
}));

export const CommonFilter = styled('span')(() => ({
  display: 'flex',
  '@media (min-width: 600px)': {
    display: 'none',
  },
}));

export const CategoriesTitleContainer = styled(FlexContainer)((props) => ({
  marginBottom: props.theme.spacing(4),
  borderBottom: `1px solid ${props.theme.colors.border.title}`,
  position: 'sticky',
  top: props.theme.spacing(14),
  zIndex: 9,
  backgroundColor: props.theme.colors.background.body,
}));

export const CategoriesTitleLink = styled(NavLink)((props) => ({
  height: 50,
  width: '33.33%',
  fontSize: '0.9375rem',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  color: props.theme.colors.text.darker,
  '&:hover': {
    color: props.theme.colors.text.primary,
  },
  '&.active': {
    color: props.theme.colors.text.primary,
    borderBottom: `2px solid ${props.theme.colors.main.violet}`,
  },
}));

export const CategoryColorsContainer = styled(ColorsContainer)((props) => ({
  top: props.theme.spacing(33),
  right: 0,
}));

export const IconsContainer = styled('div')((props) => ({
  overflowY: 'auto',
  height: 300,
  width: `calc(100% - ${props.theme.spacing(2 * 2)})`,
  position: 'absolute',
  zIndex: 5,
  padding: props.theme.spacing(2),
  border: `1px solid ${props.theme.colors.border.item}`,
  borderRadius: props.theme.borderRadius,
  backgroundColor: props.theme.colors.background.primary,
  top: props.theme.spacing(55),
  right: 0,
  paddingBottom: 0,
  '&::-webkit-scrollbar': {
    width: 5,
  },
  '&::-webkit-scrollbar-thumb': {
    background: `linear-gradient(109.86deg, ${props.theme.colors.main.purple} -2.35%, ${props.theme.colors.main.violet} 81.35%)`,
    borderRadius: props.theme.borderRadius * 2,
  },
  '@media (min-width: 600px)': {
    width: '40%',
    minWidth: 365,
    top: props.theme.spacing(50),
  },
}));

export const CategoriesIcons = styled('div')(() => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(9, 11.11%)',
}));

export const IconsButtonContainer = styled(FlexContainer)((props) => ({
  paddingTop: props.theme.spacing(2),
  justifyContent: 'space-evenly',
  position: 'sticky',
  bottom: 0,
  paddingBottom: props.theme.spacing(2),
  backgroundColor: props.theme.colors.background.primary,
}));

export const IconsButton = styled('button')((props) => ({
  color: props.theme.colors.text.primary,
  border: 'none',
  borderRadius: props.theme.borderRadius,
  width: '25%',
  minWidth: 70,
  height: 30,
  backgroundColor: props.theme.colors.button.pending,
  '&:hover': {
    backgroundColor: props.theme.colors.button.hover,
  },
}));

export const ListItemContainer = styled('div')(() => ({
  position: 'relative',
}));

export const CategoriesListItem = styled('div')((props) => ({
  width: '100%',
  paddingTop: props.theme.spacing(2),
  paddingBottom: props.theme.spacing(2),
  marginBottom: props.theme.spacing(4),
  background: props.theme.colors.background.primary,
  border: `1px solid ${props.theme.colors.border.item}`,
  boxShadow: `0px 4px 10px ${props.theme.colors.boxShadow}`,
  borderRadius: props.theme.borderRadius,
  display: 'grid',
  gridTemplateAreas: '"desc" "notes"',
  gridTemplateColumns: '1fr',
  gap: props.theme.spacing(3),
  alignItems: 'center',
  color: props.theme.colors.text.primary,
  position: 'relative',
}));

export const CategoriesDescription = styled(FlexContainer)(() => ({
  gridArea: 'desc',
}));

export const CategoriesSvg = styled('svg')((props) => ({
  marginLeft: props.theme.spacing(2),
  marginRight: props.theme.spacing(2),
  minWidth: 38,
  '@media (min-width: 600px)': {
    marginLeft: props.theme.spacing(5),
    marginRight: props.theme.spacing(4),
  },
}));

export const EditButtons = styled(FlexContainer)((props) => ({
  position: 'absolute',
  top: props.theme.spacing(4),
  right: 0,
}));

export const EditLinkContainer = styled(Link)((props) => ({
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  color: props.theme.colors.text.primary,
}));

export const EditButtonSvg = styled('svg')((props) => ({
  display: 'none',
  '@media (min-width: 600px)': {
    display: 'block',
    height: 15,
    marginRight: props.theme.spacing(2),
    cursor: 'pointer',
    '& path': {
      fill: props.theme.colors.text.primary,
    },
  },
}));

export const MobItemButtonSvg = styled('svg')((props) => ({
  height: 25,
  width: 25,
  paddingRight: props.theme.spacing(1),
  cursor: 'pointer',
  '& path': {
    fill: props.theme.colors.text.darker,
  },
  '&:hover': {
    '& circle': {
      fill: props.theme.colors.background.ordinary,
    },
  },
}));
