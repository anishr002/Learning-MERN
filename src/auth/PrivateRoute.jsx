import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ element: Element }) => {
  const Token = useSelector((state) => state.auth.authData.accessToken);

  return Token ? <Element /> : <Navigate to="/auth/signin" replace />;
};

export default PrivateRoute;
