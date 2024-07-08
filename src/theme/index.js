export const lightTheme = {
  components: {
    MuiDrawer: {
      styleOverrides: {
        paper: {
          background: '#fff',
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          background: '#fff',
        },
      },
    },
    MuiPickersPopper: {
      styleOverrides: {
        paper: {
          background:
            'linear-gradient(109.86deg, #a57fff -2.35%, #6D73FF 81.35%)',
          color: '#fff',
        },
      },
    },
    MuiPickersToolbar: {
      styleOverrides: {
        root: {
          padding: 16,
          background:
            'linear-gradient(109.86deg, #a57fff -2.35%, #6D73FF 81.35%)',
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        overline: {
          display: 'none',
        },
      },
    },
    MuiDateCalendar: {
      styleOverrides: {
        viewTransitionContainer: {
          background: '#fff',
          color: '#000',
        },
      },
    },
    MuiDatePickerToolbar: {
      styleOverrides: {
        title: {
          color: '#fff',
        },
      },
    },
    MuiDayCalendar: {
      styleOverrides: {
        weekDayLabel: {
          color: '#6D73FF',
        },
        header: {
          background: '#fff',
        },
        slideTransition: {
          background: '#fff',
        },
      },
    },
    MuiPickersDay: {
      styleOverrides: {
        root: {
          '&.Mui-selected': {
            backgroundColor: '#6D73FF',
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          color: '#989393',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          color: '#6D73FF',
        },
      },
    },
    MuiMenu: {
      styleOverrides: {
        paper: {
          '@media (max-width: 600px)': {
            left: '10px !important',
          },
          background: '#fff',
          border: '1px solid #D9D9D9',
          borderRadius: 8,
          boxShadow: '0 2px 4px #E9E9E9',
          '&::-webkit-scrollbar': {
            width: 5,
          },
          '&::-webkit-scrollbar-thumb': {
            background: '#EAEAEA',
            borderRadius: 8,
          },
        },
        list: {
          paddingLeft: 8,
          paddingRight: 8,
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          margin: '8px 0px',
          paddingTop: 8,
          paddingBottom: 8,
          color: '#000',
          '&:hover': {
            background: '#EAEAEA',
            transition: 'background 0.4s ease-out',
          },
          '&.Mui-selected': {
            background: '#EAEAEA',
          },
          '&.Mui-selected:hover': {
            background: '#EAEAEA',
          },
        },
      },
    },
  },
  colors: {
    main: {
      violet: '#6D73FF',
      purple: '#B67FFF',
      gold: '#F0A330',
    },
    text: {
      primary: '#000',
      darker: '#ADADAD',
      darkest: '#373737',
      ordinary: '#ADADAD',
    },
    placeholder: '#D1D1D1',
    background: {
      body: '#F7F7FF',
      navigation: '#F3F3F3',
      search: '#edeeff',
      primary: '#fff',
      ordinary: '#EAEAEA',
    },
    boxShadow: '#efeded',
    tooltipShadow: '#E9E9E9',
    svg: {
      pending: '#D0D0D0',
      hover: '#989393',
    },
    button: {
      pending: '#e0e0e0',
      hover: '#eaeaea',
    },
    grey: {
      500: '#fff',
      600: '#FAFAFA',
      700: '#F3F3F3',
      800: '#c9c7c7',
    },
    black: '#000',
    white: '#fff',
    expense: '#F4395B',
    income: '#0ABB71',
    transfer: '#0DC3B4',
    saldo: '#419FFF',
    border: {
      ordinary: '#D5D5D5',
      title: '#D5D5D5',
      item: '#D9D9D9',
    },
    linear: {
      main: {
        from: '#B67FFF',
        to: '#6D73FF',
      },
      expense: {
        from: '#F66969',
        to: '#F4395B',
      },
      income: {
        from: '#49D971',
        to: '#0ABB71',
      },
      transfer: {
        from: '#31FFB5',
        to: '#07C8BD',
      },
      saldo: {
        from: '#53ffff',
        to: '#419fff',
      },
    },
    error: '#d32f2f',
  },
  borderRadius: 8,
  spacing: (multiple) => multiple * 4,
};

export const darkTheme = {
  components: {
    MuiDrawer: {
      styleOverrides: {
        paper: {
          background: '#333232',
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          background: '#333232',
          color: '#fff',
        },
      },
    },
    MuiPickersPopper: {
      styleOverrides: {
        paper: {
          background:
            'linear-gradient(109.86deg, #a57fff -2.35%, #6D73FF 81.35%)',
          color: '#fff',
        },
      },
    },
    MuiPickersToolbar: {
      styleOverrides: {
        root: {
          padding: 16,
          background:
            'linear-gradient(109.86deg, #a57fff -2.35%, #6D73FF 81.35%)',
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        overline: {
          display: 'none',
        },
      },
    },
    MuiDateCalendar: {
      styleOverrides: {
        viewTransitionContainer: {
          background: '#333232',
        },
      },
    },
    MuiDatePickerToolbar: {
      styleOverrides: {
        title: {
          color: '#fff',
        },
      },
    },
    MuiPickersDay: {
      styleOverrides: {
        root: {
          color: '#fff',
          '&.Mui-selected': {
            backgroundColor: '#6D73FF',
          },
        },
      },
    },
    MuiDayCalendar: {
      styleOverrides: {
        weekDayLabel: {
          color: '#6D73FF',
        },
        header: {
          background: '#333232',
        },
        slideTransition: {
          background: '#333232',
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          color: '#fff',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          color: '#6D73FF',
        },
      },
    },
    MuiMenu: {
      styleOverrides: {
        paper: {
          '@media (max-width: 600px)': {
            left: '10px !important',
          },
          background: '#333232',
          border: '1px solid #4B4B4B',
          borderRadius: 8,
          boxShadow: '0 2px 4px #202020',
          '&::-webkit-scrollbar': {
            width: 5,
          },
          '&::-webkit-scrollbar-thumb': {
            background: '#515151',
            borderRadius: 8,
          },
        },
        list: {
          paddingLeft: 8,
          paddingRight: 8,
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          margin: '8px 0px',
          paddingTop: 8,
          paddingBottom: 8,
          color: '#fff',
          '&:hover': {
            background: '#515151',
            transition: 'background 0.4s ease-out',
          },
          '&.Mui-selected': {
            background: '#515151',
          },
          '&.Mui-selected:hover': {
            background: '#515151',
          },
        },
      },
    },
  },
  colors: {
    main: {
      violet: '#8085fd',
      purple: '#B67FFF',
      gold: '#F0A330',
    },
    text: {
      primary: '#fff',
      darker: '#989393',
      darkest: '#EEEEEE',
      ordinary: '#818181',
    },
    placeholder: '#6D6D6D',
    background: {
      body: '#262626',
      navigation: '#383838',
      search: '#313149',
      primary: '#333232',
      ordinary: '#515151',
    },
    tooltipShadow: '#202020',
    svg: {
      pending: '#7D7C7C',
      hover: '#D3D3D3',
    },
    button: {
      pending: '#666666',
      hover: '#787878',
    },
    grey: {
      500: '#666666',
      600: '#515151',
      700: '#383838',
      800: '#333333',
    },
    black: '#000',
    white: '#fff',
    expense: '#F4395B',
    income: '#0ABB71',
    transfer: '#0DC3B4',
    saldo: '#419FFF',
    border: {
      ordinary: '#434343',
      title: '#4B4B4B',
      item: '#4B4B4B',
    },
    linear: {
      main: {
        from: '#B67FFF',
        to: '#6D73FF',
      },
      expense: {
        from: '#F66969',
        to: '#F4395B',
      },
      income: {
        from: '#49D971',
        to: '#0ABB71',
      },
      transfer: {
        from: '#31FFB5',
        to: '#07C8BD',
      },
      saldo: {
        from: '#53ffff',
        to: '#419fff',
      },
    },
    error: '#d32f2f',
  },
  borderRadius: 8,
  spacing: (multiple) => multiple * 4,
};
