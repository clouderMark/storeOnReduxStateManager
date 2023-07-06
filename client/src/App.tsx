import {CssBaseline} from '@mui/material';
import {useEffect, useState} from 'react';
import {BrowserRouter} from 'react-router-dom';
import AppRouter from './components/AppRouter';
import {useCheckUserMutation} from './redux/userApi';
import {useAppDispatch, useAppSelector} from './redux/hooks';
import {login, logout, getToken, selectUser} from './redux/userSlice';
import {useGetBasketQuery} from './redux/basketApi';
import {setProds} from './redux/basketSlice';
import Loader from './components/LinearDeterminate';
import AlertLine from './components/AlertLine/AlertLine';
import NavBar from './components/NavBar/NavBar';

const App = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useAppDispatch();
  const [checkUser, {data: checkUserData, isSuccess: isCheckUserSuccess, isError: isCheckUserError}] =
    useCheckUserMutation();
  const {data: basketData, isSuccess: isBasketSuccess} = useGetBasketQuery();
  const {token} = useAppSelector(selectUser);

  useEffect(() => {
    if (token) {
      checkUser(token);
    }
  }, [token]);

  useEffect(() => {
    dispatch(getToken());
  }, []);

  useEffect(() => {
    if (isCheckUserSuccess) {
      dispatch(login({token: checkUserData!.token}));
      if (isBasketSuccess && isBasketSuccess) setLoading(false);
    }
  }, [isCheckUserSuccess]);

  useEffect(() => {
    if (isBasketSuccess) {
      dispatch(setProds(basketData!.products));
      if (isBasketSuccess && isBasketSuccess) setLoading(false);
    }
  }, [isBasketSuccess]);

  useEffect(() => {
    if (isCheckUserError) {
      dispatch(logout());
    }
  }, [isCheckUserError]);

  if (loading) {
    return <Loader />;
  }

  return (
    <BrowserRouter>
      <CssBaseline />
      <NavBar />
      <AppRouter />
      <AlertLine />
    </BrowserRouter>
  );
};

export default App;
