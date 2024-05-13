import {Navigate, Outlet} from 'react-router-dom';
import {CHAT, INICIO} from '../Path/Paths';
import {useAuthContext} from './authContext';

export default function PublicRoute() {
  const {isAuthenticated} = useAuthContext();

  if (isAuthenticated) {
    return <Navigate to={INICIO} />;
  }

  return  <Outlet />;
    
}