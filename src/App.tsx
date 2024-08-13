import { Suspense, lazy, useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import ECommerce from './pages/Dashboard/ECommerce';
import SignIn from './pages/Authentication/SignIn';
import ForgotPassword from './pages/Authentication/ForgotPassword';

import SignUp from './pages/Authentication/SignUp';
import Loader from './common/Loader';
import routes from './routes';
import NotFound from './components/NotFound';
import PrivateRoute from './auth/PrivateRoute';
import PublicRoute from './auth/PublicRoute';

const DefaultLayout = lazy(() => import('./layout/DefaultLayout'));

function App() {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <>
      <Toaster
        position="top-center"
        reverseOrder={false}
        containerClassName="overflow-auto"
      />
      <Routes>
        {/* Public routes - accessible without authentication */}
        <Route path="/auth/signin" element={<PublicRoute element={SignIn} />} />
        <Route path="/auth/signup" element={<PublicRoute element={SignUp} />} />
        <Route path="/auth/forgotpassword" element={<PublicRoute element={ForgotPassword} />} />


        {/* Protected routes - accessible only with authentication */}
        <Route element={<PrivateRoute element={DefaultLayout} />}>
          <Route index element={<ECommerce />} />
          {routes.map((route, index) => {
            const { path, component: Component } = route;
            return (
              <Route
                key={index}
                path={path}
                element={
                  <Suspense fallback={<Loader />}>
                    <Component />
                  </Suspense>
                }
              />
            );
          })}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
