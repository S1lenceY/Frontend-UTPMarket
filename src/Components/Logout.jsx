import {useEffect} from 'react';
import {useAuthContext} from '../Auth/authContext';

function Logout() {
  const {logout} = useAuthContext();
  useEffect(() => logout());
  return null;
}

export default Logout;