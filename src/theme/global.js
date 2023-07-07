import { Link } from "react-router-dom";
import { css, styled, createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle((props) => ({
  body: {
    background: props.theme.colors.background.body,
    margin: 0,
    boxSizing: "border-box",
    color: props.theme.colors.text.primary,
    fontFamily:
      "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
    "-webkit-font-smoothing": "antialiased",
    "-moz-osx-font-smoothing": "grayscale",
  },
  input: {
    fontFamily:
      "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
    "-webkit-font-smoothing": "antialiased",
    "-moz-osx-font-smoothing": "grayscale",
    border: "none",
    alignItems: "center",
    outline: "none",
  },
  a: {
    textDecoration: "none",
  },
  ul: {
    listStyleType: "none",
  },
  button: {
    cursor: "pointer",
  },
  "input::-webkit-outer-spin-button": {
    "-webkit-appearance": "none",
    margin: "0",
  },
  "input::-webkit-inner-spin-button": {
    "-webkit-appearance": "none",
    margin: "0",
  },
  'input[type="text"]::-webkit-input-placeholder': {
    fontSize: "0.875rem",
    fontStyle: "italic",
    color: "#d9d9d9",
  },
  ".none": {
    display: "none",
  },
}));

export const ArchivedTrash = styled.div(() => ({
  position: "absolute",
  right: "0",
}));

export const Trash = styled.svg((props) => ({
  height: "35px",
  width: "35px",
  "& circle": {
    fill: props.theme.colors.background.primary,
  },
  filter: `drop-shadow(0px 4px 4px ${props.theme.colors.boxShadow})`,
}));

export const TrashCount = styled.div(() => ({
  position: "absolute",
  right: "0",
  top: "0",
  fontSize: "0.625rem",
  color: "#fff",
  backgroundColor: "#a57fff",
  borderRadius: "50%",
  padding: "5% 10%",
}));

export const Search = styled.div((props) => ({
  width: "100%",
  height: "45px",
  background: props.theme.colors.background.ordinary,
  borderRadius: "5px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
}));

export const SearchInput = styled.input((props) => ({
  marginLeft: "20px",
  fontSize: "0.875rem",
  color: props.theme.colors.text.primary,
  background: props.theme.colors.background.ordinary,
  width: "100%",
}));

export const SearchImg = styled.img(() => ({
  height: "20px",
  marginRight: "20px",
}));

export const AddButton = styled(Link)(() => ({
  height: "60px",
  width: "100%",
  display: "flex",
  alignItems: "center",
  color: "#6D73FF",
  "&:hover": {
    color: "#a57fff",
  },
  "&:hover svg path": {
    fill: "#a57fff",
  },
}));

export const AddFormContainer = styled.div(() => ({
  width: "50%",
  minWidth: "461px",
  marginTop: "56px",
  marginLeft: "33.5%",
  marginRight: "16.5%",
}));

export const AddFormHeader = styled.div((props) => ({
  display: "flex",
  height: "60px",
  marginBottom: "35px",
  alignItems: "center",
  justifyContent: "center",
  borderBottom: `1px solid ${props.theme.colors.border.title}`,
  position: "sticky",
  top: "56px",
  backgroundColor: props.theme.colors.background.body,
  zIndex: "9",
}));

export const AddFormHeaderTitles = styled.div((props) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderBottom: `1px solid ${props.theme.colors.border.title}`,
  paddingLeft: "15px",
  width: "100%",
  background: props.theme.colors.background.body,
}));

export const BackLink = styled(Link)((props) => ({
  height: "60px",
  position: "absolute",
  left: "0",
  display: "flex",
  alignItems: "center",
  "& svg": {
    width: "40px",
    height: "40px",
  },
  "&:hover svg circle": {
    fill: props.theme.colors.background.ordinary,
  },
}));

export const FormFieldsContainer = styled.div(() => ({
  position: "relative",
}));

export const FormFieldDiv = styled.div((props) => ({
  display: "flex",
  alignItems: "center",
  height: "60px",
  marginBottom: "12px",
  border: `1px solid ${props.theme.colors.border.item}`,
  backgroundColor: props.theme.colors.background.primary,
  boxShadow: `0px 4px 10px ${props.theme.colors.boxShadow}`,
  borderRadius: "5px",
  fontSize: "0.875rem",
  color: props.theme.colors.text.ordinary,
  "& input": {
    width: "75%",
    background: props.theme.colors.background.primary,
    color: props.theme.colors.text.primary,
    fontSize: "1rem",
  },
}));

export const FormField = styled(FormFieldDiv)((props) => {
  if (props.$isActive) {
    switch (props.$formType) {
      case "income":
        return css(() => ({
          border: `1px solid ${props.theme.colors.income}`,
          color: props.theme.colors.income,
          boxShadow: "0px 4px 10px rgba(110, 189, 10, 0.1)",
        }));
      case "expense":
        return css(() => ({
          border: `1px solid ${props.theme.colors.expense}`,
          color: props.theme.colors.expense,
          boxShadow: "0px 4px 10px rgba(244, 57, 91, 0.1)",
        }));
      case "transfer":
        return css(() => ({
          border: `1px solid ${props.theme.colors.transfer}`,
          color: props.theme.colors.transfer,
          boxShadow: "0px 4px 10px rgba(13, 195, 180, 0.1)",
        }));
      default:
        return css(() => ({
          border: `1px solid ${props.theme.colors.expense}`,
          color: props.theme.colors.expense,
          boxShadow: "0px 4px 10px rgba(244, 57, 91, 0.1)",
        }));
    }
  }
});

export const FieldDescription = styled.div(() => ({
  width: "calc(20% - 30px)",
  minWidth: "70px",
  paddingLeft: "20px",
  paddingRight: "10px",
}));

export const SelectButton = styled.div(() => ({
  cursor: "pointer",
  marginLeft: "auto",
  marginRight: "20px",
  color: "#6D73FF",
  "&:hover": {
    color: "#a57fff",
  },
}));

export const SelectedColor = styled.div(() => ({
  cursor: "pointer",
}));

export const ColorsContainer = styled.div((props) => ({
  width: "70%",
  minWidth: "365px",
  position: "absolute",
  zIndex: "5",
  padding: "10px",
  border: `1px solid ${props.theme.colors.border.item}`,
  borderRadius: "5px",
  backgroundColor: props.theme.colors.background.primary,
  top: "130px",
  right: "0px",
}));

export const ColorsPalette = styled.div(() => ({
  display: "grid",
  gridTemplateColumns: "repeat(9, 11.11%)",
  "& svg": {
    margin: "5px 16%",
    cursor: "pointer",
  },
}));

export const ColorsPaletteButton = styled.div((props) => ({
  display: "flex",
  paddingTop: "10px",
  justifyContent: "space-evenly",
  "& button": {
    color: props.theme.colors.text.primary,
    border: "none",
    borderRadius: "10px",
    width: "25%",
    minWidth: "70px",
    height: "30px",
    backgroundColor: props.theme.colors.button.pending,
  },
  "& button:hover": {
    backgroundColor: props.theme.colors.button.hover,
  },
}));

export const IconsContainer = styled.div((props) => ({
  overflowY: "auto",
  height: "300px",
  width: "70%",
  minWidth: "365px",
  position: "absolute",
  zIndex: "5",
  padding: "10px",
  border: `1px solid ${props.theme.colors.border.item}`,
  borderRadius: "5px",
  backgroundColor: props.theme.colors.background.primary,
  top: "200px",
  right: "0px",
  paddingBottom: "0",
  "&::-webkit-scrollbar": {
    width: "5px",
  },
  "&::-webkit-scrollbar-thumb": {
    background: "linear-gradient(109.86deg, #D38BFF -2.35%, #6D73FF 81.35%)",
    borderRadius: "10px",
  },
  "& svg path": {
    fill: props.theme.colors.text.primary,
  },
}));

export const CategoriesIcons = styled.div(() => ({
  display: "grid",
  gridTemplateColumns: "repeat(9, 11.11%)",
  "& svg": {
    margin: "5px 18%",
    cursor: "pointer",
  },
}));

export const IconsButton = styled.div((props) => ({
  display: "flex",
  paddingTop: "10px",
  justifyContent: "space-evenly",
  position: "sticky",
  bottom: "0px",
  paddingBottom: "10px",
  backgroundColor: props.theme.colors.background.primary,
  "& button": {
    color: props.theme.colors.text.primary,
    border: "none",
    borderRadius: "10px",
    width: "25%",
    minWidth: "70px",
    height: "30px",
    backgroundColor: props.theme.colors.button.pending,
  },
  "& button:hover": {
    backgroundColor: props.theme.colors.button.hover,
  },
}));

export const AddButtonSvg = styled.svg(() => ({
  height: "18px",
  marginRight: "5px",
}));

export const AddFormButtonsContainer = styled.div(() => ({
  marginTop: "30px",
  display: "flex",
  marginLeft: "auto",
  marginRight: "auto",
  borderRadius: "10px",
}));

export const AddFormButton = styled(Link)(() => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "200px",
  height: "40px",
  marginBottom: "30px",
  marginLeft: "auto",
  marginRight: "auto",
  borderRadius: "10px",
  fontSize: "0.875rem",
}));

export const DoneButton = styled(AddFormButton)((props) => {
  switch (props.$buttonType) {
    case "income":
      return css(() => ({
        color: "white",
        background: "#6EBD0A",
        boxShadow: "0px 4px 10px rgba(110, 189, 10, 0.5)",
        "&:hover": {
          background: "#80ca20",
        },
      }));
    case "expense":
      return css(() => ({
        color: "white",
        background: "#F4395B",
        boxShadow: "0px 4px 10px rgba(244, 57, 91, 0.5)",
        "&:hover": {
          background: "#fe5070",
        },
      }));
    case "transfer":
      return css(() => ({
        color: "white",
        background: "#0DC3B4",
        boxShadow: "0px 4px 10px rgba(13, 195, 180, 0.5)",
        "&:hover": {
          background: "#24d5c6",
        },
      }));
    default:
      return css(() => ({
        color: "white",
        background: "#F4395B",
        boxShadow: "0px 4px 10px rgba(244, 57, 91, 0.5)",
        "&:hover": {
          background: "#fe5070",
        },
      }));
  }
});

export const CancelButton = styled(AddFormButton)((props) => ({
  color: props.theme.colors.text.primary,
  border: `1px solid ${props.theme.colors.border.item}`,
  backgroundColor: props.theme.colors.button.pending,
  filter: `drop-shadow(0px 2px 5px ${props.theme.colors.boxShadow})`,
  "&:hover": {
    background: props.theme.colors.button.hover,
  },
}));
