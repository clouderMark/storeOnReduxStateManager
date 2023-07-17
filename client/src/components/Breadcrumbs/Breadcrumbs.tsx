import {useEffect, useState} from 'react';
import {useLocation} from 'react-router-dom';
import {Container, Box} from '@mui/material';
import Page from './Page';
import {EPath} from '../../enums/EPath';

const Breadcrumbs = () => {
  const [show, setShow] = useState(false);
  const isMain = useLocation().pathname === EPath.Main;

  useEffect(() => {
    if (isMain) {
      setShow(false);
    } else {
      setShow(true);
    }
  }, [isMain]);

  return (
    <>
      {show ? (
        <Container maxWidth={false} sx={{mb: '90px'}}>
          <Box sx={{display: 'flex', flexDirection: 'column', m: '16px 10px 16px 0'}}>
            <Page />
          </Box>
        </Container>
      ) : null}
    </>
  );
};

export default Breadcrumbs;
