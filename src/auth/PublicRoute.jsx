import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PublicRoute = ({ element: Element }) => {
  const Token = useSelector((state) => state.auth.authData.accessToken);

  return Token ? <Navigate to="/users" replace /> : <Element />;
};

export default PublicRoute;
