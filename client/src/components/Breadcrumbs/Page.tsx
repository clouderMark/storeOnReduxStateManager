import * as React from 'react';
import {useLocation} from 'react-router-dom';
import {Typography, Breadcrumbs} from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import LinkRouter from './LinkRouter';
import {styles} from './styles/styles';
import getName from './getName';

const Page = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  return (
    <Breadcrumbs aria-label="breadcrumb" separator={<NavigateNextIcon fontSize="small" />}>
      <LinkRouter underline="hover" sx={styles.notLast} color="inherit" to="/">
        Главная
      </LinkRouter>
      {pathnames.map((_, index) => {
        const last = index === pathnames.length - 1;
        const to = `/${pathnames.slice(0, index + 1).join('/')}`;

        return last ? (
          <Typography key={to} sx={styles.last}>
            {getName(to)}
          </Typography>
        ) : (
          <LinkRouter underline="hover" sx={styles.notLast} to={to} key={to}>
            {getName(to)}
          </LinkRouter>
        );
      })}
    </Breadcrumbs>
  );
};

export default Page;
