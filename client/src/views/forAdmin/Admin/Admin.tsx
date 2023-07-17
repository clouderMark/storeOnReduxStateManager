import {Container, Button, List, ListItem, ListItemButton, ListItemText, Typography} from '@mui/material';
import {Link, useNavigate} from 'react-router-dom';
import {EPath} from '../../../enums/EPath';
import {links} from './links';
import {useAppDispatch} from '../../../redux/hooks';
import {logout} from '../../../redux/userSlice';

const Admin = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = (): void => {
    dispatch(logout());
    navigate(EPath.Login, {replace: true});
  };

  return (
    <>
      <Container sx={{mt: 2, mb: 10}} maxWidth={false}>
        <Typography variant="h4">Панель управления</Typography>
        <Typography variant="body1">Это панель управления магазином для администратора</Typography>
        <List>
          {links.map((item, i) => (
            <ListItem disablePadding key={i}>
              <ListItemButton component={Link} to={item.address}>
                <ListItemText primary={item.content} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Button onClick={handleLogout} variant="outlined">
          Выйти
        </Button>
      </Container>
    </>
  );
};

export default Admin;
