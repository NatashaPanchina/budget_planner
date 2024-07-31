import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../header/Header';
import Navigation from '../navigation/navbar/Navigation';
import { Grid } from '@mui/material';

export default function Root() {
  const gridStyles = {
    paddingLeft: 1,
    paddingRight: 1,
    paddingTop: 0,
    paddingBottom: 14,
    '@media (min-width: 600px)': {
      paddingTop: 12,
      paddingLeft: 20,
      paddingRight: 3,
    },
    '@media (min-width: 768px)': {
      paddingLeft: 20,
      paddingRight: 4,
    },
    '@media (min-width: 1200px)': {
      paddingLeft: 58,
      paddingRight: 6,
    },
  };
  return (
    <>
      <Header />
      <Navigation />
      <Grid
        container
        columnSpacing={{ xs: 0, sm: 2, md: 3, lg: 4 }}
        sx={gridStyles}
      >
        <Outlet />
      </Grid>
    </>
  );
}
