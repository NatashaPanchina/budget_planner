import React from 'react';
import {
  Menu,
  Popover,
  TextField,
  Tooltip,
  alpha,
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
        WebkitFontSmoothing: 'antialiased',
        MozOsxFontSmoothing: 'grayscale',
      },
      input: {
        fontFamily:
          "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
        WebkitFontSmoothing: 'antialiased',
        MozOsxFontSmoothing: 'grayscale',
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
        WebkitAppearance: 'none',
        margin: 0,
      },
      'input::-webkit-inner-spin-button': {
        WebkitAppearance: 'none',
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

export const ArchivedTrash = styled('div')(() => ({
  position: 'relative',
  '@media (min-width: 768px)': {
    display: 'flex',
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
  '&:hover': {
    filter: `drop-shadow(0px 4px 4px ${alpha(
      props.theme.colors.main.violet,
      0.2,
    )})`,
    transition: 'filter 0.3s ease-out',
  },
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

export const SearchField = styled(TextField)((props) => ({
  width: '100%',
  background: props.theme.colors.background.search,
  borderRadius: props.theme.borderRadius,
  marginBottom: props.theme.spacing(4),
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      border: `1px solid ${props.theme.colors.background.search}`,
    },
    '&.Mui-focused fieldset': {
      border: `1px solid ${props.theme.colors.main.violet}`,
    },
    '&:hover fieldset': {
      border: `1px solid ${props.theme.colors.main.violet}`,
    },
    '& .MuiInputBase-input': {
      color: props.theme.colors.text.primary,
      borderRadius: props.theme.borderRadius,
      backgroundColor: props.theme.colors.background.search,
      '&::placeholder': {
        fontStyle: 'italic',
        color: props.theme.colors.text.darker,
      },
    },
  },
}));

export const CancelSearchSvg = styled('svg')(() => ({
  cursor: 'pointer',
  '@media (min-width: 600px)': {
    opacity: 0.7,
    '&:hover': {
      opacity: 1,
      transition: 'opacity 0.3s ease-out',
    },
  },
}));

export const AddButton = styled(Link)((props) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'inherit',
  fill: props.theme.colors.white,
  cursor: 'pointer',
  height: 35,
  width: 35,
  marginRight: props.theme.spacing(2),
  background: `linear-gradient(to bottom right, ${props.theme.colors.linear.main.from}, ${props.theme.colors.linear.main.to})`,
  boxShadow: `0px 5px 15px ${alpha(props.theme.colors.linear.main.to, 0.2)}`,
  borderRadius: '50%',
  '@media (min-width: 600px)': {
    opacity: 0.8,
    marginRight: props.theme.spacing(5),
    color: props.theme.colors.white,
    '&:hover': {
      opacity: 1,
      boxShadow: `0px 4px 10px ${alpha(
        props.theme.colors.linear.main.to,
        0.4,
      )}`,
      transition: 'all 0.3s ease-out',
    },
  },
  '@media (min-width: 1000px)': {
    borderRadius: props.theme.borderRadius * 1.5,
    height: 'fit-content',
    width: 'fit-content',
    padding: props.theme.spacing(2),
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
  position: 'sticky',
  top: 0,
  zIndex: 9,
  alignItems: 'center',
  height: 60,
  width: '100%',
  justifyContent: 'space-between',
  backgroundColor: props.theme.colors.background.body,
  '@media (min-width: 768px)': {
    position: 'relative',
    justifyContent: 'center',
    height: 70,
  },
}));

export const TrashHeader = styled(Header)(() => ({
  justifyContent: 'center',
}));

export const HeaderTitle = styled('div')((props) => ({
  fontSize: '1.3rem',
  '@media (min-width: 768px)': {
    marginRight: props.theme.spacing(14),
  },
}));

export const MobHeaderTitle = styled('div')((props) => ({
  height: 60,
  width: '100vw',
  color: props.theme.colors.text.primary,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'fixed',
  top: 0,
  left: 0,
  zIndex: 150,
  backgroundColor: props.theme.colors.background.body,
  '@media (min-width: 768px)': {
    display: 'none',
  },
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

export const SelectHeader = styled('div')((props) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: props.theme.spacing(2),
  paddingBottom: props.theme.spacing(4),
  width: `calc(100% - ${props.theme.spacing(2 * 2)})`,
  color: props.theme.colors.text.primary,
}));

export const SelectHeaderButton = styled(Link)((props) => ({
  position: 'absolute',
  right: 0,
  fill: props.theme.colors.main.violet,
}));

export const TextInputField = styled(TextField)((props) => ({
  width: '100%',
  backgroundColor: props.theme.colors.background.primary,
  borderRadius: props.theme.borderRadius,
  '& label': {
    color: props.theme.colors.text.darker,
  },
  '& label.Mui-focused': {
    color: props.theme.colors.main.violet,
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
      border: `1px solid ${props.theme.colors.main.violet}`,
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

export const PopoverField = styled(TextInputField)(() => ({
  cursor: 'pointer',
  '& .MuiOutlinedInput-root': {
    cursor: 'pointer',
    '& .MuiInputBase-input': {
      cursor: 'pointer',
    },
  },
}));

export const DateField = styled(DatePicker)((props) => ({
  width: '100%',
  marginTop: props.theme.spacing(4),
  marginBottom: props.theme.spacing(2),
  borderRadius: props.theme.borderRadius,
  '& label': {
    color: props.theme.colors.text.darker,
  },
  '& label.Mui-focused': {
    color: props.theme.colors.main.violet,
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
      border: `1px solid ${props.theme.colors.main.violet}`,
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

export const SelectButton = styled('div')((props) => ({
  cursor: 'pointer',
  marginLeft: 'auto',
  marginRight: props.theme.spacing(5),
  color: props.theme.colors.main.violet,
  '&:hover': {
    color: props.theme.colors.main.purple,
  },
}));

export const ColorsPalette = styled('div')((props) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(9, 11.11%)',
  padding: props.theme.spacing(3),
  paddingBottom: 0,
  '& svg': {
    margin: props.theme.spacing(1.5),
    cursor: 'pointer',
  },
}));

export const ColorsPopoverPalette = styled(Popover)((props) => ({
  '& .MuiPopover-paper': {
    width: '100%',
    border: `1px solid ${props.theme.colors.border.item}`,
    borderRadius: props.theme.borderRadius,
    backgroundColor: props.theme.colors.background.primary,
    boxShadow: `0 2px 4px ${props.theme.colors.tooltipShadow}`,
    '@media (min-width: 600px)': {
      width: '40%',
      minWidth: 365,
      height: 300,
    },
    '@media (min-width: 900px)': {
      width: '30%',
    },
    '&::-webkit-scrollbar': {
      width: 5,
    },
    '&::-webkit-scrollbar-thumb': {
      background: `linear-gradient(109.86deg, ${props.theme.colors.main.purple} -2.35%, ${props.theme.colors.main.violet} 81.35%)`,
      borderRadius: props.theme.borderRadius * 2,
    },
  },
}));

export const ColorsPaletteButtonContainer = styled('div')((props) => ({
  display: 'flex',
  padding: props.theme.spacing(3),
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
  '@media (min-width: 600px)': {
    opacity: 0.7,
    '&:hover': {
      opacity: 1,
      transition: 'opacity 0.3s ease-out',
    },
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

export const DoneButton = styled(AddFormButton)((props) => ({
  color: props.theme.colors.white,
  background: `linear-gradient(to bottom right, ${props.theme.colors.linear.main.from}, ${props.theme.colors.linear.main.to})`,
  boxShadow: `0px 5px 15px ${alpha(props.theme.colors.linear.main.to, 0.4)}`,
  '@media (min-width: 600px)': {
    opacity: 0.9,
    '&:hover': {
      opacity: 1,
      transition: 'opacity 0.3s ease-out',
      boxShadow: `0px 5px 15px ${alpha(props.theme.colors.main.violet, 0.7)}`,
    },
  },
}));

export const CancelButton = styled(AddFormButton)((props) => ({
  border: `1px solid ${props.theme.colors.main.violet}`,
  color: props.theme.colors.text.primary,
  backgroundColor: props.theme.colors.background.primary,
  boxShadow: `0px 5px 15px ${alpha(props.theme.colors.main.violet, 0.2)}`,
  '@media (min-width: 600px)': {
    opacity: 0.8,
    '&:hover': {
      opacity: 1,
      transition: 'opacity 0.3s ease-out',
      boxShadow: `0px 5px 15px ${alpha(props.theme.colors.main.violet, 0.4)}`,
    },
  },
}));

export const ButtonTitle = styled('span')(() => ({
  display: 'none',
  '@media (min-width: 600px)': {
    display: 'flex',
  },
}));

export const ButtonSvg = styled('svg')(() => ({
  height: 20,
  width: 20,
  '@media (min-width: 600px)': {
    display: 'none',
  },
}));

export const FilterButtonsContainer = styled('div')(() => ({
  display: 'flex',
  '@media (min-width: 768px)': {
    position: 'absolute',
    right: 0,
  },
  '@media (min-width: 1000px)': {
    position: 'static',
  },
}));

export const SortButtonsContainer = styled('div')(() => ({
  display: 'none',
  '@media (min-width: 600px)': {
    display: 'flex',
  },
}));

export const MobileFilterButton = styled('div')((props) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: 35,
  width: 35,
  marginRight: props.theme.spacing(2),
  backgroundColor: props.theme.colors.background.primary,
  boxShadow: `0px 4px 10px ${props.theme.colors.boxShadow}`,
  borderRadius: '50%',
  fill: props.theme.colors.main.violet,
  '@media (min-width: 600px)': {
    display: 'none',
  },
}));

export const FilterButton = styled('div')((props) => ({
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: 35,
  width: 35,
  marginRight: props.theme.spacing(2),
  backgroundColor: props.theme.colors.background.primary,
  boxShadow: `0px 4px 10px ${props.theme.colors.boxShadow}`,
  borderRadius: '50%',
  fill: props.theme.colors.main.violet,
  '@media (min-width: 600px)': {
    marginRight: props.theme.spacing(5),
    color: props.theme.colors.text.darker,
    '&:hover': {
      color: props.theme.colors.text.primary,
      boxShadow: `0px 4px 10px ${alpha(props.theme.colors.main.violet, 0.2)}`,
      transition: 'all 0.3s ease-out',
    },
  },
  '@media (min-width: 1000px)': {
    borderRadius: props.theme.borderRadius * 1.5,
    height: 'fit-content',
    width: 'fit-content',
    padding: props.theme.spacing(2),
  },
}));

export const FilterTitle = styled('span')(() => ({
  display: 'none',
  '@media (min-width: 1000px)': {
    display: 'flex',
    fontSize: '0.875rem',
  },
}));

export const FilterSvg = styled('svg')((props) => ({
  height: 22,
  width: 22,
  fill: 'inherit',
  '& path': {
    fill: 'inherit',
  },
  '@media (min-width: 600px)': {
    height: 18,
    width: 18,
    margin: `0px ${props.theme.spacing(1)}`,
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

export const FilterTooltip = styled(CustomTooltip)(() => ({
  '@media (min-width: 1000px)': {
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
