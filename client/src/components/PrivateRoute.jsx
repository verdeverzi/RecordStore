import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { DataContext } from '../store/context';

const PrivateRoute = () => {
  const { isUserLoggedIn } = useContext(DataContext);

  if (!isUserLoggedIn) return <Navigate to="/login" replace />;

  return <Outlet />;
};

export default PrivateRoute;
