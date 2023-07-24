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

export const ArchivedTrash = styled.div(() => ({
  position: 'absolute',
  right: 0,
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

export const AddFormContainer = styled.div((props) => ({
  width: '50%',
  minWidth: 460,
  marginTop: props.theme.spacing(14),
  marginLeft: '33.5%',
  marginRight: '16.5%',
}));

export const AddFormHeader = styled.div((props) => ({
  display: 'flex',
  height: 60,
  marginBottom: props.theme.spacing(8),
  alignItems: 'center',
  justifyContent: 'center',
  borderBottom: `1px solid ${props.theme.colors.border.title}`,
  position: 'sticky',
  top: props.theme.spacing(14),
  backgroundColor: props.theme.colors.background.body,
  zIndex: 9,
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
  marginBottom: props.theme.spacing(3),
  border: `1px solid ${props.theme.colors.border.item}`,
  backgroundColor: props.theme.colors.background.primary,
  boxShadow: `0px 4px 10px ${props.theme.colors.boxShadow}`,
  borderRadius: props.theme.borderRadius,
  fontSize: '0.875rem',
  color: props.theme.colors.text.darker,
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
  width: '70%',
  minWidth: 365,
  position: 'absolute',
  zIndex: 5,
  padding: props.theme.spacing(2),
  border: `1px solid ${props.theme.colors.border.item}`,
  borderRadius: props.theme.borderRadius,
  backgroundColor: props.theme.colors.background.primary,
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
  marginTop: props.theme.spacing(7),
  display: 'flex',
  marginLeft: 'auto',
  marginRight: 'auto',
  borderRadius: props.theme.borderRadius,
}));

export const AddFormButton = styled(Link)((props) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 200,
  height: 40,
  marginBottom: props.theme.spacing(7),
  marginLeft: 'auto',
  marginRight: 'auto',
  borderRadius: props.theme.borderRadius,
  fontSize: '0.875rem',
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
  color: props.theme.colors.text.primary,
  border: `1px solid ${props.theme.colors.border.item}`,
  backgroundColor: props.theme.colors.button.pending,
  filter: `drop-shadow(0px 2px 5px ${props.theme.colors.boxShadow})`,
  '&:hover': {
    background: props.theme.colors.button.hover,
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
