import {CssBaseline} from '@mui/material';
import {useEffect} from 'react';
import {BrowserRouter} from 'react-router-dom';
import AppRouter from './components/AppRouter';
import {useCheckUserMutation} from './redux/userApi';
import {useAppDispatch} from './redux/hooks';
import {login, logout} from './redux/userSlice';

const App = () => {
  const dispatch = useAppDispatch();
  const [checkUser, {data: checkUserData, isSuccess: isCheckUserSuccess, isError: isCheckUserError}] =
    useCheckUserMutation();

  const token = localStorage.getItem('token');

  useEffect(() => {
    if (token) {
      checkUser(token);
    }
  }, [token]);

  useEffect(() => {
    if (isCheckUserSuccess) {
      dispatch(login({token: checkUserData!.token}));
    }
  }, [isCheckUserSuccess]);

  useEffect(() => {
    if (isCheckUserError) {
      dispatch(logout());
    }
  }, [isCheckUserError]);

  return (
    <BrowserRouter>
      <CssBaseline />
      <AppRouter />
    </BrowserRouter>
  );
};

export default App;
