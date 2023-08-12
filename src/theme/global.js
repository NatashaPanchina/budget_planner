import React from 'react';
import {
  Menu,
  TextField,
  Tooltip,
  alpha,
  css,
  styled,
  tooltipClasses,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { GlobalStyles } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';

export const inputGlobalStyles = (
  <GlobalStyles
    styles={(theme) => ({
      body: {
        background: theme.colors.background.body,
        margin: 0,
        boxSizing: 'border-box',
        color: theme.colors.text.primary,
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
        color: theme.colors.placeholder,
      },
      '.none': {
        display: 'none',
      },
    })}
  />
);

export const ArchivedTrash = styled('div')((props) => ({
  position: 'relative',
  marginLeft: props.theme.spacing(5),
  '@media (min-width: 600px)': {
    display: 'flex',
    position: 'absolute',
    right: 0,
  },
}));

export const Trash = styled('svg')((props) => ({
  height: 35,
  width: 35,
  '& circle': {
    fill: props.theme.colors.background.primary,
  },
  filter: `drop-shadow(0px 4px 4px ${props.theme.colors.boxShadow})`,
}));

export const TrashCount = styled('div')((props) => ({
  position: 'absolute',
  right: 0,
  top: 0,
  fontSize: '0.625rem',
  color: props.theme.colors.white,
  backgroundColor: props.theme.colors.main.purple,
  borderRadius: '50%',
  padding: '1px 2px',
}));

export const Search = styled('div')((props) => ({
  width: '100%',
  height: 45,
  background: props.theme.colors.background.ordinary,
  borderRadius: props.theme.borderRadius,
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
}));

export const SearchInput = styled('input')((props) => ({
  marginLeft: props.theme.spacing(5),
  fontSize: '0.875rem',
  color: props.theme.colors.text.primary,
  background: props.theme.colors.background.ordinary,
  width: '100%',
  '&[type="text"]::placeholder': {
    color: props.theme.colors.text.darker,
  },
}));

export const SearchImg = styled('img')((props) => ({
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

export const AddButtonSvg = styled('svg')((props) => ({
  height: 18,
  marginRight: props.theme.spacing(1),
  fill: 'inherit',
  '& path': {
    fill: 'inherit',
  },
}));

export const Header = styled('div')((props) => ({
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

export const HeaderTitle = styled('div')((props) => ({
  fontSize: '1.3rem',
  '@media (min-width: 600px)': {
    marginRight: props.theme.spacing(14),
  },
}));

export const MobHeaderTitle = styled('div', {
  shouldForwardProp: (prop) => prop !== '$titleType',
})((props) => ({
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

export const TrashContainer = styled('div')((props) => ({
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

export const AddContainer = styled('div')((props) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  zIndex: 100,
  backgroundColor: props.theme.colors.background.body,
  height: `calc(100vh - ${props.theme.spacing(18 * 2)})`,
  overflow: 'scroll',
  width: `calc(100% - ${props.theme.spacing(2 * 2)})`,
  padding: `${props.theme.spacing(18)} ${props.theme.spacing(2)}`,
  '@media (min-width: 600px)': {
    position: 'static',
    overflow: 'visible',
    height: 'initial',
    width: 'initial',
    padding: `0px ${props.theme.spacing(8)}`,
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

export const AddFormHeader = styled('div')((props) => ({
  display: 'none',
  '@media (min-width: 600px)': {
    display: 'flex',
    top: props.theme.spacing(14),
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: props.theme.spacing(8),
    borderBottom: `1px solid ${props.theme.colors.border.title}`,
    position: 'sticky',
    zIndex: 9,
    backgroundColor: props.theme.colors.background.body,
    boxSizing: 'border-box',
    color: props.theme.colors.text.primary,
  },
}));

export const AddFormHeaderTitles = styled('div')((props) => ({
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

export const BackLinkSvg = styled('svg')((props) => ({
  width: 40,
  height: 40,
  '&:hover circle': {
    fill: props.theme.colors.background.ordinary,
    opacity: 0.5,
  },
}));

export const TextInputField = styled(TextField, {
  shouldForwardProp: (prop) => prop !== '$type',
})((props) => ({
  width: '100%',
  backgroundColor: props.theme.colors.background.primary,
  borderRadius: props.theme.borderRadius,
  '& label': {
    color: props.theme.colors.text.darker,
  },
  '& label.Mui-focused': {
    color:
      props.$type === 'common'
        ? props.theme.colors.main.violet
        : props.theme.colors[props.$type],
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderRadius: props.theme.borderRadius,
      border: `1px solid ${props.theme.colors.border.item}`,
      boxShadow: `0px 4px 10px ${props.theme.colors.boxShadow}`,
    },
    '&:hover fieldset': {
      border: `1px solid ${props.theme.colors.text.darker}`,
    },
    '&.Mui-focused fieldset': {
      border: `1px solid ${
        props.$type === 'common'
          ? props.theme.colors.main.violet
          : props.theme.colors[props.$type]
      }`,
      boxShadow: `${alpha(
        props.$type === 'common'
          ? props.theme.colors.main.violet
          : props.theme.colors[props.$type],
        0.1,
      )} 0 0 0 0.2rem`,
    },
    '& .MuiInputBase-input': {
      color: props.theme.colors.text.primary,
      borderRadius: props.theme.borderRadius,
      backgroundColor: props.theme.colors.background.primary,
    },
    '& .MuiSelect-icon': {
      fill: props.theme.colors.text.darker,
    },
  },
}));

export const DateField = styled(DatePicker, {
  shouldForwardProp: (prop) => prop !== '$type',
})((props) => ({
  width: '100%',
  marginTop: props.theme.spacing(4),
  marginBottom: props.theme.spacing(2),
  borderRadius: props.theme.borderRadius,
  '& label': {
    color: props.theme.colors.text.darker,
  },
  '& label.Mui-focused': {
    color:
      props.$type === 'common'
        ? props.theme.colors.main.violet
        : props.theme.colors[props.$type],
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderRadius: props.theme.borderRadius,
      border: `1px solid ${props.theme.colors.border.item}`,
      boxShadow: `0px 4px 10px ${props.theme.colors.boxShadow}`,
    },
    '&:hover fieldset': {
      border: `1px solid ${props.theme.colors.text.darker}`,
    },
    '&.Mui-focused fieldset': {
      border: `1px solid ${
        props.$type === 'common'
          ? props.theme.colors.main.violet
          : props.theme.colors[props.$type]
      }`,
      boxShadow: `${alpha(
        props.$type === 'common'
          ? props.theme.colors.main.violet
          : props.theme.colors[props.$type],
        0.1,
      )} 0 0 0 0.2rem`,
    },
    '& .MuiInputBase-input': {
      color: props.theme.colors.text.primary,
      borderRadius: props.theme.borderRadius,
      backgroundColor: props.theme.colors.background.primary,
    },
    '& .MuiSvgIcon-root': {
      fill: props.theme.colors.text.darker,
    },
  },
}));

export const FormFieldsContainer = styled('div')(() => ({
  position: 'relative',
}));

export const FormFieldDiv = styled('div')((props) => ({
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
  '@media (min-width: 600px)': {
    height: 60,
    marginTop: 0,
    marginBottom: props.theme.spacing(3),
    fontSize: '0.875rem',
  },
}));

export const FormField = styled(FormFieldDiv, {
  shouldForwardProp: (prop) => prop !== '$isActive' && prop !== '$formType',
})((props) => {
  if (props.$isActive) {
    switch (props.$formType) {
      case 'income':
        return css`
          border: 1px solid ${props.theme.colors.income};
          color: ${props.theme.colors.income};
          box-shadow: 0px 4px 10px rgba(110, 189, 10, 0.1);
        `;
      case 'expense':
        return css`
          border: 1px solid ${props.theme.colors.expense};
          color: ${props.theme.colors.expense};
          box-shadow: 0px 4px 10px rgba(244, 57, 91, 0.1);
        `;
      case 'transfer':
        return css`
          border: 1px solid ${props.theme.colors.transfer};
          color: ${props.theme.colors.transfer};
          box-shadow: 0px 4px 10px rgba(13, 195, 180, 0.1);
        `;
      case 'cash':
        return css`
          border: 1px solid ${props.theme.colors.main.violet};
          color: ${props.theme.colors.main.violet};
          box-shadow: 0px 4px 10px rgba(110, 189, 10, 0.1);
        `;
      default:
        return css`
          border: 1px solid ${props.theme.colors.expense};
          color: ${props.theme.colors.expense};
          box-shadow: 0px 4px 10px rgba(244, 57, 91, 0.1);
        `;
    }
  }
});

export const FieldDescription = styled('div')((props) => ({
  width: `calc(20% - ${props.theme.spacing(5)} + ${props.theme.spacing(2)})`,
  minWidth: 70,
  paddingLeft: props.theme.spacing(5),
  paddingRight: props.theme.spacing(2),
}));

export const FieldInput = styled('input')((props) => ({
  width: '75%',
  background: props.theme.colors.background.primary,
  color: props.theme.colors.text.primary,
  fontSize: '1rem',
}));

export const SelectButton = styled('div')((props) => ({
  cursor: 'pointer',
  marginLeft: 'auto',
  marginRight: props.theme.spacing(5),
  color: props.theme.colors.main.violet,
  '&:hover': {
    color: props.theme.colors.main.purple,
  },
}));

export const SelectedColor = styled('div')(() => ({
  cursor: 'pointer',
}));

export const ColorsContainer = styled('div')((props) => ({
  width: `calc(100% - ${props.theme.spacing(2 * 2)})`,
  position: 'absolute',
  zIndex: 5,
  padding: props.theme.spacing(2),
  border: `1px solid ${props.theme.colors.border.item}`,
  borderRadius: props.theme.borderRadius,
  backgroundColor: props.theme.colors.background.primary,
  '@media (min-width: 600px)': {
    width: '40%',
    minWidth: 365,
  },
}));

export const ColorsPalette = styled('div')((props) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(9, 11.11%)',
  '& svg': {
    margin: props.theme.spacing(1.5),
    cursor: 'pointer',
  },
}));

export const ColorsPaletteButtonContainer = styled('div')((props) => ({
  display: 'flex',
  paddingTop: props.theme.spacing(2),
  justifyContent: 'space-evenly',
}));

export const ColorsPaletteButton = styled('button')((props) => ({
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

export const AddFormButtonsContainer = styled('div')((props) => ({
  position: 'fixed',
  bottom: props.theme.spacing(5),
  width: '100%',
  marginTop: props.theme.spacing(7),
  display: 'flex',
  marginLeft: 'auto',
  marginRight: 'auto',
  borderRadius: props.theme.borderRadius,
  '@media (min-width: 600px)': {
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

export const DoneButton = styled(AddFormButton, {
  shouldForwardProp: (prop) => prop !== '$buttonType',
})((props) => {
  switch (props.$buttonType) {
    case 'income':
      return css`
        color: ${props.theme.colors.white};
        background: ${props.theme.colors.income};
        box-shadow: 0px 4px 10px rgba(110, 189, 10, 0.5);
        &:hover: {
          background: #80ca20;
        }
      `;
    case 'expense':
      return css`
        color: ${props.theme.colors.white};
        background: ${props.theme.colors.expense};
        box-shadow: 0px 4px 10px rgba(244, 57, 91, 0.5);
        &:hover: {
          background: #fe5070;
        }
      `;
    case 'transfer':
      return css`
        color: ${props.theme.colors.white};
        background: ${props.theme.colors.transfer};
        box-shadow: 0px 4px 10px rgba(13, 195, 180, 0.5);
        &:hover: {
          background: #24d5c6;
        }
      `;
    case 'cash':
      return css`
        color: ${props.theme.colors.white};
        background: ${props.theme.colors.main.violet};
        box-shadow: 0px 4px 10px rgba(65, 159, 255, 0.5);
        &:hover: {
          background: #24d5c6;
          boxshadow: 0px 4px 10px rgba(174, 139, 255, 0.5);
        }
      `;
    default:
      return css`
        color: ${props.theme.colors.white};
        background: ${props.theme.colors.expense};
        box-shadow: 0px 4px 10px rgba(244, 57, 91, 0.5);
        &:hover: {
          background: #fe5070;
        }
      `;
  }
});

export const CancelButton = styled(AddFormButton)((props) => ({
  border: `1px solid ${props.theme.colors.border.item}`,
  backgroundColor: props.theme.colors.grey[800],
  filter: `drop-shadow(0px 2px 5px ${props.theme.colors.boxShadow})`,
  '&:hover': {
    backgroundColor: props.theme.colors.button.hover,
  },
  '@media (min-width: 600px)': {
    color: props.theme.colors.text.primary,
    backgroundColor: props.theme.colors.button.pending,
  },
}));

export const ButtonTitle = styled('span')(() => ({
  display: 'none',
  '@media (min-width: 600px)': {
    display: 'flex',
  },
}));

export const ButtonSvg = styled('svg')((props) => ({
  height: 25,
  width: 25,
  '& path': {
    fill: props.theme.colors.white,
  },
  '@media (min-width: 600px)': {
    display: 'none',
  },
}));

export const Filter = styled('div')((props) => ({
  display: 'none',
  '@media (min-width: 600px)': {
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

export const FilterSvg = styled('svg')((props) => ({
  height: 22,
  width: 22,
  marginLeft: props.theme.spacing(5),
  '@media (min-width: 600px)': {
    height: 18,
    width: 18,
    margin: `0px ${props.theme.spacing(1)}`,
  },
}));

export const CommonFilter = styled('span')(() => ({
  display: 'flex',
  '@media (min-width: 600px)': {
    display: 'none',
  },
}));

export const CustomTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))((props) => ({
  display: 'none',
  '@media (min-width: 600px)': {
    display: 'block',
    [`& .${tooltipClasses.arrow}`]: {
      color: props.theme.colors.background.primary,
      '&::before': {
        backgroundColor: props.theme.colors.background.primary,
        border: `1px solid ${props.theme.colors.border.item}`,
      },
    },
    [`& .${tooltipClasses.tooltip}`]: {
      background: props.theme.colors.background.primary,
      color: props.theme.colors.text.primary,
      border: `1px solid ${props.theme.colors.border.item}`,
      borderRadius: props.theme.borderRadius,
      fontSize: '0.75rem',
      padding: props.theme.spacing(3),
    },
  },
  '@media (min-width: 1200px)': {
    display: 'none',
  },
}));

export const ToggleMenu = styled(Menu)((props) => ({
  '& .MuiPaper-root': {
    borderRadius: props.theme.borderRadius,
    border: `1px solid ${props.theme.colors.border.item}`,
    color: props.theme.colors.text.primary,
    backgroundColor: props.theme.colors.background.primary,
    boxShadow: `0 2px 4px ${props.theme.colors.tooltipShadow}`,
  },
  '& .MuiMenu-list': {
    padding: `${props.theme.spacing(1)} ${props.theme.spacing(2)}`,
  },
  '& .MuiMenuItem-root': {
    borderRadius: props.theme.borderRadius,
    margin: `${props.theme.spacing(2)} 0`,
  },
}));
