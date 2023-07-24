import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../header/Header';
import Navigation from '../navigation/Navigation';
import { Grid } from '@mui/material';

export default function Root() {
  const gridStyles = {
    paddingLeft: 1,
    paddingRight: 1,
    paddingTop: 7,
    paddingBottom: 8,
    '@media only screen and (min-width: 600px)': {
      paddingLeft: 9,
      paddingRight: 3,
    },
    '@media only screen and (min-width: 768px)': {
      paddingLeft: 12,
      paddingRight: 4,
    },
    '@media only screen and (min-width: 1200px)': {
      paddingLeft: 32,
      paddingRight: 6,
    },
  };
  return (
    <React.Fragment>
      <Header />
      <Navigation />
      <Grid
        container
        columnSpacing={{ xs: 0, sm: 2, md: 3, lg: 4 }}
        sx={gridStyles}
      >
        <Outlet />
      </Grid>
    </React.Fragment>
  );
}
