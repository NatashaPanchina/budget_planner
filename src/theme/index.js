export const lightTheme = {
  components: {
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
        },
      },
    },
  },
  colors: {
    main: {
      violet: '#6D73FF',
      purple: '#a57fff',
    },
    text: {
      primary: '#000',
      darker: '#989393',
      ordinary: '#ADADAD',
    },
    placeholder: '#D1D1D1',
    background: {
      body: '#F7F7F7',
      navigation: '#F3F3F3',
      primary: '#fff',
      ordinary: '#EAEAEA',
    },
    boxShadow: '#F3F3F3',
    tooltipShadow: '#E9E9E9',
    svg: {
      pending: '#B8B7B7',
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
    income: '#6EBD0A',
    transfer: '#0DC3B4',
    saldo: '#419FFF',
    border: {
      ordinary: '#D5D5D5',
      title: '#D5D5D5',
      item: '#D9D9D9',
    },
  },
  borderRadius: 8,
  spacing: (multiple) => multiple * 4,
};

export const darkTheme = {
  components: {
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
        },
      },
    },
  },
  colors: {
    main: {
      violet: '#6D73FF',
      purple: '#a57fff',
    },
    text: {
      primary: '#fff',
      darker: '#989393',
      ordinary: '#818181',
    },
    placeholder: '#6D6D6D',
    background: {
      body: '#262626',
      navigation: '#383838',
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
    expense: '#FF3358',
    income: '#6EBD0A',
    transfer: '#0DC3B4',
    saldo: '#419FFF',
    border: {
      ordinary: '#434343',
      title: '#4B4B4B',
      item: '#4B4B4B',
    },
  },
  borderRadius: 8,
  spacing: (multiple) => multiple * 4,
};
