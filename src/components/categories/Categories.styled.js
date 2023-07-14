import { styled } from 'styled-components';
import { NavLink } from 'react-router-dom';
import { ColorsContainer } from '../../theme/global';

export const CategoroiesContainer = styled.div((props) => ({
  marginTop: props.theme.spacing(14),
  marginLeft: '22%',
  marginRight: '5%',
  display: 'flex',
  justifyContent: 'space-between',
}));

export const MoreInformationContainer = styled.div((props) => ({
  width: '20%',
  minWidth: 170,
  height: '100vh',
  marginRight: props.theme.spacing(5),
  position: 'fixed',
  zIndex: 10,
}));

export const BarChartInfo = styled.div((props) => ({
  marginTop: props.theme.spacing(5),
  textAlign: 'center',
}));

export const TotalCategoriesCount = styled.div((props) => ({
  marginTop: props.theme.spacing(2),
  marginBottom: props.theme.spacing(3),
  color: props.theme.colors.main.violet,
}));

export const BarChartInfoItem = styled.div((props) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: 80,
  width: '90%',
  marginBottom: props.theme.spacing(3),
  marginLeft: 'auto',
  marginRight: 'auto',
  background: props.theme.colors.background.primary,
  border: `1px solid ${props.theme.colors.border.item}`,
  boxShadow: `0px 4px 10px ${props.theme.colors.boxShadow}`,
  borderRadius: props.theme.borderRadius,
  textAlign: 'left',
  fontSize: '0.875rem',
}));

export const Img = styled.img((props) => ({
  height: 30,
  marginLeft: props.theme.spacing(2),
  marginRight: props.theme.spacing(2),
}));

export const ExpensesCategoriesCount = styled.div((props) => ({
  fontSize: '1rem',
  color: props.theme.colors.expense,
}));

export const IncomesCategoriesCount = styled.div((props) => ({
  fontSize: '1rem',
  color: props.theme.colors.income,
}));

export const MainInformationContainer = styled.div(() => ({
  marginLeft: '30%',
  width: '70%',
}));

export const Header = styled.div(() => ({
  display: 'flex',
  position: 'relative',
  alignItems: 'center',
  justifyContent: 'flex-end',
  height: 50,
}));

export const HeaderTitle = styled.div(() => ({
  marginRight: 'auto',
}));

export const CategoriesTitleContainer = styled.div((props) => ({
  display: 'flex',
  marginBottom: props.theme.spacing(4),
  borderBottom: `1px solid ${props.theme.colors.border.title}`,
  position: 'sticky',
  top: 56,
  zIndex: 9,
  backgroundColor: props.theme.colors.background.body,
}));

export const CategoriesTitleLink = styled(NavLink)((props) => ({
  height: 50,
  width: '25%',
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

export const CategoryColorsContainer = styled(ColorsContainer)(() => ({
  top: 130,
  right: 0,
}));

export const IconsContainer = styled.div((props) => ({
  overflowY: 'auto',
  height: 300,
  width: '70%',
  minWidth: 364,
  position: 'absolute',
  zIndex: 5,
  padding: props.theme.spacing(2),
  border: `1px solid ${props.theme.colors.border.item}`,
  borderRadius: props.theme.borderRadius,
  backgroundColor: props.theme.colors.background.primary,
  top: 200,
  right: 0,
  paddingBottom: 0,
  '&::-webkit-scrollbar': {
    width: 5,
  },
  '&::-webkit-scrollbar-thumb': {
    background: `linear-gradient(109.86deg, ${props.theme.colors.main.purple} -2.35%, ${props.theme.colors.main.violet} 81.35%)`,
    borderRadius: props.theme.borderRadius * 2,
  },
}));

export const CategoriesIcons = styled.div(() => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(9, 11.11%)',
}));

export const IconsButtonContainer = styled.div((props) => ({
  display: 'flex',
  paddingTop: props.theme.spacing(2),
  justifyContent: 'space-evenly',
  position: 'sticky',
  bottom: 0,
  paddingBottom: props.theme.spacing(2),
  backgroundColor: props.theme.colors.background.primary,
}));

export const IconsButton = styled.button((props) => ({
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
