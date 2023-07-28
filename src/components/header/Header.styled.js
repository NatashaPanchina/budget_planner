import { css, styled } from 'styled-components';

export const FlexContainer = styled.div(() => ({
  display: 'flex',
  alignItems: 'center',
  height: '100%',
}));

export const HeaderContainer = styled(FlexContainer)((props) => ({
  width: '100%',
  height: 56,
  marginTop: 0,
  position: 'fixed',
  zIndex: 10,
  top: 0,
  background: `linear-gradient(109.86deg, ${props.theme.colors.main.purple} -2.35%, ${props.theme.colors.main.violet} 81.35%)`,
  '@media (min-width: 768px)': {
    background: props.theme.colors.background.primary,
    borderBottom: `1px solid ${props.theme.colors.border.ordinary}`,
  },
}));

export const LogoContainer = styled(FlexContainer)((props) => ({
  justifyContent: 'center',
  height: 56,
  background: 'none',
  '@media (min-width: 600px)': {
    width: 48,
  },
  '@media (min-width: 768px)': {
    width: 64,
    background: `linear-gradient(109.86deg, ${props.theme.colors.main.purple} -2.35%, ${props.theme.colors.main.violet} 81.35%)`,
  },
  '@media (min-width: 1200px)': {
    width: 208,
  },
}));

export const Logo = styled.svg((props) => ({
  height: 45,
  width: 45,
  marginRight: 'auto',
  marginLeft: props.theme.spacing(2),
  '@media (min-width: 600px)': {
    display: 'block',
    margin: 0,
  },
}));

export const LogoTitle = styled.svg((props) => ({
  width: 120,
  display: 'none',
  '@media (min-width: 1200px)': {
    display: 'block',
    marginLeft: props.theme.spacing(2),
  },
}));

export const Title = styled(FlexContainer)((props) => ({
  display: 'none',
  '@media (min-width: 600px)': {
    display: 'flex',
    fontWeight: 450,
    fontSize: '1.25rem',
    color: props.theme.colors.white,
    paddingLeft: props.theme.spacing(5),
  },
  '@media (min-width: 768px)': {
    color: 'inherit',
  },
}));

export const GlobalSearch = styled.div((props) => ({
  display: 'none',
  '@media (min-width: 768px)': {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    fontSize: '0.875rem',
    borderRadius: props.theme.borderRadius,
    backgroundColor: props.theme.colors.background.body,
  },
}));

export const GlobalSearchInput = styled.input((props) => ({
  height: 30,
  borderRadius: 'inherit',
  backgroundColor: 'inherit',
  color: props.theme.colors.text.primary,
  width: 'calc(100% - 28px)',
  '&[type="text"]::placeholder': {
    color: props.theme.colors.text.darker,
  },
}));

export const GlobalSearchImg = styled.img((props) => ({
  paddingLeft: props.theme.spacing(1),
  paddingRight: props.theme.spacing(1),
  marginLeft: 'auto',
  height: 20,
}));

export const ThemeContainer = styled(FlexContainer)(() => ({
  display: 'none',
  '@media (min-width: 768px)': {
    display: 'flex',
    justifyContent: 'center',
  },
}));

export const Container = styled(FlexContainer)((props) => ({
  justifyContent: 'center',
  width: '33.3%',
  cursor: 'pointer',
  color: props.theme.colors.text.primary,
  '@media (min-width: 1200px)': {
    width: '25%',
  },
}));

export const CurrentLng = styled.div((props) => ({
  '&:hover': {
    color: props.theme.colors.text.primary,
  },
}));

export const LanguagesMenu = styled.div((props) => ({
  position: 'absolute',
  top: 56,
  zIndex: 10,
  backgroundColor: props.theme.colors.background.primary,
  padding: props.theme.spacing(2),
  border: `1px solid ${props.theme.colors.border.ordinary}`,
  cursor: 'pointer',
}));

export const LanguagesMenuItem = styled.div((props) => ({
  padding: props.theme.spacing(2),
  '&:hover': {
    color: props.theme.colors.text.darker,
  },
}));

export const Svg = styled.svg(() => ({
  height: 30,
  width: 30,
}));

export const SvgMode = styled(Svg)((props) => ({
  '&:hover circle': {
    fill: props.theme.colors.background.ordinary,
  },
}));

export const Profile = styled(FlexContainer)((props) => ({
  display: 'none',
  '@media (min-width: 768px)': {
    display: 'flex',
    paddingRight: props.theme.spacing(4),
    marginLeft: 'auto',
  },
}));

export const Username = styled.span((props) => ({
  marginLeft: props.theme.spacing(2),
}));

export const LogOut = styled(FlexContainer)(() => ({
  display: 'none',
  '@media (min-width: 900px)': {
    display: 'flex',
  },
}));

export const Hamburger = styled.div((props) => {
  if (props.$isActive) {
    return css(() => ({
      'span:nth-of-type(1)': {
        transform: 'rotate(45deg) translate(7px, 9px)',
        width: 30,
      },
      'span:nth-of-type(2)': {
        opacity: 0,
        pointerEvents: 'none',
      },
      'span:nth-of-type(3)': {
        transform: 'rotate(-45deg) translate(6px, -9px)',
        width: 30,
      },
      marginLeft: 'auto',
      cursor: 'pointer',
      '@media (min-width: 600px)': {
        display: 'none',
      },
    }));
  } else {
    return css(() => ({
      marginLeft: 'auto',
      cursor: 'pointer',
      '@media (min-width: 600px)': {
        display: 'none',
      },
    }));
  }
});

export const Bar = styled.span((props) => ({
  display: 'block',
  width: 30,
  height: 2,
  marginTop: 9,
  marginBottom: 9,
  backgroundColor: props.theme.colors.white,
  transition: 'all 0.1s cubic-bezier(0.645, 0.045, 0.355, 1)',
}));
