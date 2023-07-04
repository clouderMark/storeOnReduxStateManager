import {CssBaseline} from '@mui/material';
import {useEffect, useState} from 'react';
import {BrowserRouter} from 'react-router-dom';
import AppRouter from './components/AppRouter';
import {useCheckUserMutation} from './redux/userApi';
import {useAppDispatch} from './redux/hooks';
import {login, logout} from './redux/userSlice';
import {useFetchBasketMutation} from './redux/basketApi';
import {setProds} from './redux/basketSlice';
import Loader from './components/LinearDeterminate';

const App = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useAppDispatch();
  const [checkUser, {data: checkUserData, isSuccess: isCheckUserSuccess, isError: isCheckUserError}] =
    useCheckUserMutation();
  const [fetchBasket, {data: basketData, isSuccess: isBasketSuccess}] = useFetchBasketMutation();
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (token) {
      checkUser(token);
    }
  }, [token]);

  useEffect(() => {
    fetchBasket();
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
      <AppRouter />
    </BrowserRouter>
  );
};

export default App;
