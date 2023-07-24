import {CssBaseline} from '@mui/material';
import {useEffect} from 'react';
import {BrowserRouter} from 'react-router-dom';
import AppRouter from './components/AppRouter';
import {useCheckUserMutation} from './redux/userApi';
import {useAppDispatch, useAppSelector} from './redux/hooks';
import {getToken, selectUser} from './redux/userSlice';
import {useGetBasketQuery} from './redux/basketApi';
import {setProds} from './redux/basketSlice';
import Loader from './components/Loader';
import AlertLine from './components/AlertLine/AlertLine';
import NavBar from './components/NavBar/NavBar';
import Breadcrumbs from './components/Breadcrumbs/Breadcrumbs';

const App = () => {
  const dispatch = useAppDispatch();
  const [checkUser] = useCheckUserMutation();
  const {data: basketData, isSuccess: isBasketSuccess} = useGetBasketQuery();
  const {token} = useAppSelector(selectUser);

  useEffect(() => {
    dispatch(getToken());
  }, []);

  useEffect(() => {
    if (token) {
      checkUser(token);
    }
  }, [token]);

  useEffect(() => {
    if (isBasketSuccess) {
      dispatch(setProds(basketData!.products));
    }
  }, [isBasketSuccess]);

  return (
    <BrowserRouter>
      <CssBaseline />
      <Loader />
      <NavBar />
      <Breadcrumbs />
      <AppRouter />
      <AlertLine />
    </BrowserRouter>
  );
};

export default App;
