import React from 'react';
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { pages } from '../utils/constants/pages';

//how to navigate to signin page not auth user
function PrivateRoute({ Component }) {
  const header = useSelector((state) => state.header);

  return header.profile ? (
    <Component />
  ) : (
    <Navigate replace to={pages.signin} />
  );
}

PrivateRoute.propTypes = {
  Component: PropTypes.func,
};

export default PrivateRoute;
