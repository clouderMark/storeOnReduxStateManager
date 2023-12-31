// import {useEffect} from 'react';
import {
  Route,
  Routes,
  //  useLocation
} from 'react-router-dom';
import {EPath} from '../enums/EPath';
import {useAppSelector} from '../redux/hooks';
import {selectUser} from '../redux/userSlice';
import Login from '../views/Login';
import NotFound from '../views/NotFound';
import Admin from '../views/forAdmin/Admin/Admin';
import User from '../views/User';
import AdminSubscriptions from '../views/forAdmin/AdminSubscriptions';
import AdminIndustries from '../views/forAdmin/AdminIndustries';

enum ERoute {
  Path = 'path',
  Component = 'Component',
}

interface IRoute {
  [ERoute.Path]: EPath;
  [ERoute.Component](): JSX.Element;
}

const publicRoutes: IRoute[] = [
  {[ERoute.Path]: EPath.Login, [ERoute.Component]: Login},
  {[ERoute.Path]: EPath.Signup, [ERoute.Component]: Login},
  {[ERoute.Path]: EPath.NotFound, [ERoute.Component]: NotFound},
];

const authRoutes: IRoute[] = [
  {[ERoute.Path]: EPath.User, [ERoute.Component]: User},
];

const adminRoutes: IRoute[] = [
  {[ERoute.Path]: EPath.Admin, [ERoute.Component]: Admin},
  {[ERoute.Path]: EPath.AdminSubscriptions, [ERoute.Component]: AdminSubscriptions},
  {[ERoute.Path]: EPath.AdminIndustries, [ERoute.Component]: AdminIndustries},
];

const AppRouter = () => {
  const {isAuth, isAdmin} = useAppSelector(selectUser);
  // const location = useLocation();

  // useEffect(() => {
  //   window.scrollTo(0, 0);
  // }, [location]);

  return (
    <Routes>
      {publicRoutes.map(({path, Component}) => (
        <Route key={path} path={path} element={<Component />} />
      ))}
      {isAuth && authRoutes.map(({path, Component}) => <Route key={path} path={path} element={<Component />} />)}
      {isAdmin && adminRoutes.map(({path, Component}) => <Route key={path} path={path} element={<Component />} />)}
    </Routes>
  );
};

export default AppRouter;
