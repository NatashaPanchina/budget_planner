import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './locales';
import { darkTheme, lightTheme } from './theme';
import { mode } from './utils/constants/mode';
import { ThemeProvider, createTheme } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { inputGlobalStyles } from './theme/global';
import { router } from './routes';
import './configs/firebaseConfigs';

function App() {
  const { i18n } = useTranslation();
  const header = useSelector((state) => state.header);
  const { language } = header;

  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language, i18n]);

  return (
    <ThemeProvider
      theme={
        header.mode === mode.light
          ? createTheme(lightTheme)
          : createTheme(darkTheme)
      }
    >
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        {inputGlobalStyles}
        <RouterProvider router={router} />
      </LocalizationProvider>
    </ThemeProvider>
  );
}

export default App;
