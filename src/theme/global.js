import { Link } from 'react-router-dom';
import { css, styled, createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle((props) => ({
  body: {
    background: props.theme.colors.background.body,
    margin: 0,
    boxSizing: 'border-box',
    color: props.theme.colors.text.primary,
    fontFamily:
      "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
    '-webkit-font-smoothing': 'antialiased',
    '-moz-osx-font-smoothing': 'grayscale',
  },
  input: {
    fontFamily:
      "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
    '-webkit-font-smoothing': 'antialiased',
    '-moz-osx-font-smoothing': 'grayscale',
    border: 'none',
    alignItems: 'center',
    outline: 'none',
  },
  a: {
    textDecoration: 'none',
  },
  ul: {
    listStyleType: 'none',
  },
  button: {
    cursor: 'pointer',
  },
  'input::-webkit-outer-spin-button': {
    '-webkit-appearance': 'none',
    margin: 0,
  },
  'input::-webkit-inner-spin-button': {
    '-webkit-appearance': 'none',
    margin: 0,
  },
  'input[type="text"]::placeholder': {
    fontSize: '0.875rem',
    fontStyle: 'italic',
    color: props.theme.colors.placeholder,
  },
  '.none': {
    display: 'none',
  },
}));

export const ArchivedTrash = styled.div((props) => ({
  position: 'relative',
  marginLeft: props.theme.spacing(5),
  '@media (min-width: 600px)': {
    display: 'flex',
    position: 'absolute',
    right: 0,
  },
}));

export const Trash = styled.svg((props) => ({
  height: 35,
  width: 35,
  '& circle': {
    fill: props.theme.colors.background.primary,
  },
  filter: `drop-shadow(0px 4px 4px ${props.theme.colors.boxShadow})`,
}));

export const TrashCount = styled.div((props) => ({
  position: 'absolute',
  right: 0,
  top: 0,
  fontSize: '0.625rem',
  color: props.theme.colors.white,
  backgroundColor: props.theme.colors.main.purple,
  borderRadius: '50%',
  padding: '1px 2px',
}));

export const Search = styled.div((props) => ({
  width: '100%',
  height: 45,
  background: props.theme.colors.background.ordinary,
  borderRadius: props.theme.borderRadius,
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
}));

export const SearchInput = styled.input((props) => ({
  marginLeft: props.theme.spacing(5),
  fontSize: '0.875rem',
  color: props.theme.colors.text.primary,
  background: props.theme.colors.background.ordinary,
  width: '100%',
  '&[type="text"]::placeholder': {
    color: props.theme.colors.text.ordinary,
  },
}));

export const SearchImg = styled.img((props) => ({
  height: 20,
  marginRight: props.theme.spacing(5),
}));

export const AddButton = styled(Link)((props) => ({
  height: 60,
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  color: props.theme.colors.main.violet,
  fill: props.theme.colors.main.violet,
  '&:hover': {
    color: props.theme.colors.main.purple,
    fill: props.theme.colors.main.purple,
  },
}));

export const AddButtonSvg = styled.svg((props) => ({
  height: 18,
  marginRight: props.theme.spacing(1),
  fill: 'inherit',
  '& path': {
    fill: 'inherit',
  },
}));

export const Header = styled.div((props) => ({
  display: 'flex',
  position: 'relative',
  alignItems: 'center',
  height: 60,
  justifyContent: 'space-between',
  backgroundColor: props.theme.colors.background.body,
  '@media (min-width: 600px)': {
    justifyContent: 'center',
    height: 70,
  },
}));

export const TrashHeader = styled(Header)(() => ({
  justifyContent: 'center',
}));

export const HeaderTitle = styled.div((props) => ({
  fontSize: '1.3rem',
  '@media (min-width: 600px)': {
    marginRight: props.theme.spacing(14),
  },
}));

export const MobHeaderTitle = styled.div((props) => ({
  height: 60,
  width: '100vw',
  color: props.theme.colors.white,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'fixed',
  top: 0,
  left: 0,
  zIndex: 150,
  backgroundColor:
    props.theme.colors[props.$titleType ? props.$titleType : 'expense'],
  '@media (min-width: 600px)': {
    display: 'none',
  },
}));

export const MobInfoHeaderTitle = styled(MobHeaderTitle)((props) => ({
  color: props.theme.colors.text.primary,
}));

export const TrashContainer = styled.div((props) => ({
  '@media (min-width: 600px)': {
    paddingLeft: props.theme.spacing(8),
    paddingRight: props.theme.spacing(8),
  },
  '@media (min-width: 768px)': {
    paddingLeft: props.theme.spacing(15),
    paddingRight: props.theme.spacing(15),
  },
  '@media (min-width: 900px)': {
    paddingLeft: props.theme.spacing(30),
    paddingRight: props.theme.spacing(30),
  },
}));

export const AddContainer = styled.div((props) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  zIndex: 100,
  backgroundColor: props.theme.colors.background.body,
  height: `calc(100vh - ${props.theme.spacing(18) * 2}px)`,
  overflow: 'scroll',
  width: `calc(100% - ${props.theme.spacing(2) * 2}px)`,
  padding: `${props.theme.spacing(18)}px ${props.theme.spacing(2)}px`,
  '@media (min-width: 600px)': {
    position: 'static',
    overflow: 'visible',
    height: 'initial',
    width: 'initial',
    padding: `0px ${props.theme.spacing(8)}px`,
  },
  '@media (min-width: 768px)': {
    paddingLeft: props.theme.spacing(15),
    paddingRight: props.theme.spacing(15),
  },
  '@media (min-width: 900px)': {
    paddingLeft: props.theme.spacing(30),
    paddingRight: props.theme.spacing(30),
  },
}));

export const AddFormHeader = styled.div((props) => ({
  display: 'none',
  '@media (min-width: 600px)': {
    display: 'flex',
    top: 56,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: props.theme.spacing(8),
    borderBottom: `1px solid ${props.theme.colors.border.title}`,
    position: 'sticky',
    zIndex: 9,
    backgroundColor: props.theme.colors.background.body,
    boxSizing: 'border-box',
  },
}));

export const AddFormHeaderTitles = styled.div((props) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderBottom: `1px solid ${props.theme.colors.border.title}`,
  width: '100%',
  background: props.theme.colors.background.body,
}));

export const BackLink = styled(Link)(() => ({
  height: 60,
  position: 'absolute',
  left: 0,
  display: 'flex',
  alignItems: 'center',
}));

export const BackLinkSvg = styled.svg((props) => ({
  width: 40,
  height: 40,
  '&:hover circle': {
    fill: props.theme.colors.background.primary,
  },
}));

export const FormFieldsContainer = styled.div(() => ({
  position: 'relative',
}));

export const FormFieldDiv = styled.div((props) => ({
  display: 'flex',
  alignItems: 'center',
  height: 60,
  marginTop: props.theme.spacing(5),
  marginBottom: props.theme.spacing(5),
  border: `1px solid ${props.theme.colors.border.item}`,
  backgroundColor: props.theme.colors.background.primary,
  boxShadow: `0px 4px 10px ${props.theme.colors.boxShadow}`,
  borderRadius: props.theme.borderRadius,
  fontSize: '0.875rem',
  color: props.theme.colors.text.darker,
  '@media only screen and (min-width: 600px)': {
    height: 60,
    marginTop: 0,
    marginBottom: props.theme.spacing(3),
    fontSize: '0.875rem',
  },
}));

export const FormField = styled(FormFieldDiv)((props) => {
  if (props.$isActive) {
    switch (props.$formType) {
      case 'income':
        return css(() => ({
          border: `1px solid ${props.theme.colors.income}`,
          color: props.theme.colors.income,
          boxShadow: '0px 4px 10px rgba(110, 189, 10, 0.1)',
        }));
      case 'expense':
        return css(() => ({
          border: `1px solid ${props.theme.colors.expense}`,
          color: props.theme.colors.expense,
          boxShadow: '0px 4px 10px rgba(244, 57, 91, 0.1)',
        }));
      case 'transfer':
        return css(() => ({
          border: `1px solid ${props.theme.colors.transfer}`,
          color: props.theme.colors.transfer,
          boxShadow: '0px 4px 10px rgba(13, 195, 180, 0.1)',
        }));
      case 'cash':
        return css(() => ({
          border: `1px solid ${props.theme.colors.main.violet}`,
          color: props.theme.colors.main.violet,
          boxShadow: '0px 4px 10px rgba(110, 189, 10, 0.1)',
        }));
      default:
        return css(() => ({
          border: `1px solid ${props.theme.colors.expense}`,
          color: props.theme.colors.expense,
          boxShadow: '0px 4px 10px rgba(244, 57, 91, 0.1)',
        }));
    }
  }
});

export const FieldDescription = styled.div((props) => ({
  width: 'calc(20% - 30px)',
  minWidth: 70,
  paddingLeft: props.theme.spacing(5),
  paddingRight: props.theme.spacing(2),
}));

export const FieldInput = styled.input((props) => ({
  width: '75%',
  background: props.theme.colors.background.primary,
  color: props.theme.colors.text.primary,
  fontSize: '1rem',
}));

export const SelectButton = styled.div((props) => ({
  cursor: 'pointer',
  marginLeft: 'auto',
  marginRight: props.theme.spacing(5),
  color: props.theme.colors.main.violet,
  '&:hover': {
    color: props.theme.colors.main.purple,
  },
}));

export const SelectedColor = styled.div(() => ({
  cursor: 'pointer',
}));

export const ColorsContainer = styled.div((props) => ({
  width: `calc(100% - ${props.theme.spacing(2) * 2}px)`,
  position: 'absolute',
  zIndex: 5,
  padding: props.theme.spacing(2),
  border: `1px solid ${props.theme.colors.border.item}`,
  borderRadius: props.theme.borderRadius,
  backgroundColor: props.theme.colors.background.primary,
  '@media (min-width: 600px)': {
    width: '70%',
    minWidth: 365,
  },
}));

export const ColorsPalette = styled.div((props) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(9, 11.11%)',
  '& svg': {
    margin: props.theme.spacing(1.5),
    cursor: 'pointer',
  },
}));

export const ColorsPaletteButtonContainer = styled.div((props) => ({
  display: 'flex',
  paddingTop: props.theme.spacing(2),
  justifyContent: 'space-evenly',
}));

export const ColorsPaletteButton = styled.button((props) => ({
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

export const AddFormButtonsContainer = styled.div((props) => ({
  position: 'fixed',
  bottom: 20,
  width: '100%',
  marginTop: props.theme.spacing(7),
  display: 'flex',
  marginLeft: 'auto',
  marginRight: 'auto',
  borderRadius: props.theme.borderRadius,
  '@media only screen and (min-width: 600px)': {
    position: 'static',
  },
}));

export const AddFormButton = styled(Link)((props) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 50,
  height: 50,
  borderRadius: '50%',
  fontSize: '0.875rem',
  marginLeft: 'auto',
  marginRight: 'auto',
  '@media (min-width: 600px)': {
    width: 200,
    height: 40,
    borderRadius: props.theme.borderRadius,
    marginBottom: props.theme.spacing(7),
  },
}));

export const DoneButton = styled(AddFormButton)((props) => {
  switch (props.$buttonType) {
    case 'income':
      return css(() => ({
        color: props.theme.colors.white,
        background: props.theme.colors.income,
        boxShadow: '0px 4px 10px rgba(110, 189, 10, 0.5)',
        '&:hover': {
          background: '#80ca20',
        },
      }));
    case 'expense':
      return css(() => ({
        color: props.theme.colors.white,
        background: props.theme.colors.expense,
        boxShadow: '0px 4px 10px rgba(244, 57, 91, 0.5)',
        '&:hover': {
          background: '#fe5070',
        },
      }));
    case 'transfer':
      return css(() => ({
        color: props.theme.colors.white,
        background: props.theme.colors.transfer,
        boxShadow: '0px 4px 10px rgba(13, 195, 180, 0.5)',
        '&:hover': {
          background: '#24d5c6',
        },
      }));
    case 'cash':
      return css(() => ({
        color: props.theme.colors.white,
        background: props.theme.colors.main.violet,
        boxShadow: '0px 4px 10px rgba(65, 159, 255, 0.5)',
        '&:hover': {
          background: props.theme.colors.main.purple,
          boxShadow: '0px 4px 10px rgba(174, 139, 255, 0.5)',
        },
      }));
    default:
      return css(() => ({
        color: props.theme.colors.white,
        background: props.theme.colors.expense,
        boxShadow: '0px 4px 10px rgba(244, 57, 91, 0.5)',
        '&:hover': {
          background: '#fe5070',
        },
      }));
  }
});

export const CancelButton = styled(AddFormButton)((props) => ({
  border: `1px solid ${props.theme.colors.border.item}`,
  backgroundColor: props.theme.colors.grey[800],
  filter: `drop-shadow(0px 2px 5px ${props.theme.colors.boxShadow})`,
  '&:hover': {
    backgroundColor: props.theme.colors.button.hover,
  },
  '@media only screen and (min-width: 600px)': {
    color: props.theme.colors.text.primary,
    backgroundColor: props.theme.colors.button.pending,
  },
}));

export const ButtonTitle = styled.span(() => ({
  display: 'none',
  '@media only screen and (min-width: 600px)': {
    display: 'flex',
  },
}));

export const ButtonSvg = styled.svg((props) => ({
  height: 25,
  width: 25,
  '& path': {
    fill: props.theme.colors.white,
  },
  '@media only screen and (min-width: 600px)': {
    display: 'none',
  },
}));

export const Filter = styled.div((props) => ({
  display: 'none',
  '@media only screen and (min-width: 600px)': {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: props.theme.colors.background.primary,
    boxShadow: `0px 4px 10px ${props.theme.colors.boxShadow}`,
    borderRadius: props.theme.borderRadius * 1.5,
    height: 'fit-content',
    padding: props.theme.spacing(2),
    marginRight: props.theme.spacing(14),
    fontSize: '0.875rem',
    color: props.theme.colors.text.ordinary,
  },
}));

export const FilterSvg = styled.svg((props) => ({
  height: 22,
  width: 22,
  marginLeft: props.theme.spacing(5),
  '@media only screen and (min-width: 600px)': {
    height: 18,
    width: 18,
    margin: `0px ${props.theme.spacing(1)}px`,
  },
}));

export const CommonFilter = styled.span(() => ({
  display: 'flex',
  '@media only screen and (min-width: 600px)': {
    display: 'none',
  },
}));
