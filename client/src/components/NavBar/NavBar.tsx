import React from 'react';
import {
  AppBar,
  Toolbar,
  Container,
  Box,
  Button,
  Divider,
} from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import {NavLink} from 'react-router-dom';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import AnchorIcon from '@mui/icons-material/Anchor';
import logoStyles from './styles/logo.module.css';
import {dFlex, justifySB, alignC} from '../../styles/flex';
import {ReactComponent as Icon} from '../../image/Logo.svg';
import {StyledBadge} from './StyledBadge';
import NavBarButton from './NavBarButton';
import TabletMenu from './TabletMenu';
import {navBar as styles} from './styles/navBar';
import {queryMobile, queryTablet, queryNews} from './query';
import DesctopMenu from './DesctopMenu';
import {EPath} from '../../enums/EPath';
import {useAppSelector} from '../../redux/hooks';
import {selectUser} from '../../redux/userSlice';
import {selectProdsCount} from '../../redux/basketSlice';

const NavBar = () => {
  const {isAuth, isAdmin} = useAppSelector(selectUser);
  const prodsInBasket = useAppSelector(selectProdsCount);

  const isDesctop = useMediaQuery(`(min-width:${queryTablet}px)`, {noSsr: true});
  const isNewsButton = useMediaQuery(`(min-width:${queryNews}px)`, {noSsr: true});
  const isMobile = useMediaQuery(`(min-width:${queryMobile}px)`, {noSsr: true});

  return (
    <>
      <Container maxWidth={false} sx={styles}>
        <AppBar color="inherit">
          <Toolbar>
            <Box sx={[dFlex, justifySB, alignC, {width: '100%'}]}>
              <Button component={NavLink} to={EPath.Main} sx={{color: 'inherit'}}>
                <Icon className={logoStyles.logo} />
              </Button>
              <Box sx={dFlex}>
                <NavBarButton title="Магазин" route={EPath.Shop} icon={<ShoppingCartOutlinedIcon />} />
                {isNewsButton ? <NavBarButton title="Новости" route={EPath.News} icon={<NewspaperIcon />} /> : null}
                {isAuth ? (
                  <NavBarButton title="Кабинет" route={EPath.User} icon={<PersonOutlineOutlinedIcon />} />
                ) : (
                  <NavBarButton title="Войти" route={EPath.Login} icon={<PersonOutlineOutlinedIcon />} />
                )}
                {isAdmin && isMobile ? (
                  <NavBarButton title="Управление" route={EPath.Admin} icon={<AnchorIcon />} />
                ) : null}
                <NavBarButton
                  title="Корзина"
                  route={EPath.Basket}
                  icon={
                    <StyledBadge badgeContent={prodsInBasket} color="secondary">
                      <ShoppingBagOutlinedIcon />
                    </StyledBadge>
                  }
                />
                {!isDesctop ? <TabletMenu /> : null}
              </Box>
            </Box>
            {isDesctop ? <DesctopMenu /> : null}
          </Toolbar>
        </AppBar>
      </Container>
      <Divider sx={{borderBottomWidth: 1.5}} />
    </>
  );
};

export default NavBar;
