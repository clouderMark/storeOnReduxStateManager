import {useEffect, useState} from 'react';
import {NavLink, useNavigate} from 'react-router-dom';
import {Box, IconButton, Menu, MenuItem, Button, Collapse, List, ListItemButton} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import MenuIcon from '@mui/icons-material/Menu';
import {articles} from './articles';
import {tabletMenu} from './styles/tabletMenu';
import {IconTextField} from '../IconTextField';
import {IArticle} from './types';
import {EPath} from '../../enums/EPath';
import {useGetIndustriesQuery, useGetSolutionsQuery} from '../../redux/catalogApi';

const TabletMenu = () => {
  const navigate = useNavigate();
  const [item, setItem] = useState<IArticle>();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [open, setOpen] = useState<{[key: string]: boolean}>({});
  const {data: industriesData, isSuccess: successIndustries} = useGetIndustriesQuery();
  const {data: solutionsData, isSuccess: successSolutions} = useGetSolutionsQuery();

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
    setOpen({});
  };

  const handleOpenCollapse = (element: EPath) => {
    setOpen(open[element] ? {[element]: false} : {[element]: true});
    setItem(undefined);
  };

  useEffect(() => {
    setItem(() => {
      const item = articles.find((el) => el.link === Object.keys(open)[0]);
      let result: IArticle;

      if (item?.link === EPath.Industries && successIndustries) {
        result = {
          ...item,
          list: [
            {link: item.link, content: item.title},
            ...industriesData.map((el) => ({link: `${item.link}/${el.id}`, content: el.name})),
          ],
        };
      } else if (item?.link === EPath.Solutions && successSolutions) {
        result = {
          ...item,
          list: [
            {link: item.link, content: item.title},
            ...solutionsData.map((el) => ({link: `${item.link}/${el.id}`, content: el.name})),
          ],
        };
      } else {
        result = item!;
      }

      return result;
    });
  }, [open]);

  useEffect(() => {
    if (item?.list.length === 0) {
      navigate(item.link);
      setAnchorEl(null);
      setOpen({});
    }
  }, [item]);

  return (
    <Box sx={[tabletMenu.box]}>
      <IconButton
        aria-label="открыть меню"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        color="success"
        disableRipple={true}
        onClick={handleOpenMenu}
      >
        <MenuIcon sx={{fontSize: '40px'}} />
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
        sx={[tabletMenu.fullWidth]}
        marginThreshold={0}
        PaperProps={{
          style: tabletMenu.paper,
        }}
      >
        {articles.map((article) => (
          <MenuItem key={article.link} sx={[tabletMenu.fullWidth, tabletMenu.item]}>
            <Button onClick={() => handleOpenCollapse(article.link)} sx={tabletMenu.button}>
              {article.title}
              {open[article.link] ? <ExpandLess /> : <ExpandMore />}
            </Button>
            <Collapse in={open[article.link]} timeout="auto" unmountOnExit sx={tabletMenu.submenu}>
              {item?.list.length ? (
                <List sx={tabletMenu.submenu}>
                  {item.list.map((el, i) => (
                    <ListItemButton
                      component={NavLink}
                      to={el.link}
                      onClick={handleCloseMenu}
                      key={i}
                      sx={tabletMenu.submenu.item}
                    >
                      {el.content}
                    </ListItemButton>
                  ))}
                </List>
              ) : null}
            </Collapse>
          </MenuItem>
        ))}
        <MenuItem>
          <IconTextField label="Введите строку поиска" variant="standard" sx={tabletMenu.icon} icon={<SearchIcon />} />
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default TabletMenu;
