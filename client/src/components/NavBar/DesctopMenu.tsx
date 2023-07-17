import {NavLink, useNavigate} from 'react-router-dom';
import {Menu, MenuItem, Button, List, ListItem, ListItemButton, ListItemText, Box} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';
import {useEffect, useState} from 'react';
import {desctopMenu as styles} from './styles/desctopMenu';
import {IArticle} from './types';
import {alignC, dFlex, justifySB} from '../../styles/flex';
import {articles} from './articles';
import {IconTextField} from '../IconTextField';
import {EPath} from '../../enums/EPath';
import {useGetIndustriesQuery, useGetSolutionsQuery} from '../../redux/catalogApi';

const DesctopMenu = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [item, setItem] = useState<IArticle>();
  const {data: industriesData, isSuccess: successIndustries} = useGetIndustriesQuery();
  const {data: solutionsData, isSuccess: successSolutions} = useGetSolutionsQuery();

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>, element: EPath) => {
    setAnchorEl(event.currentTarget);

    setItem(() => {
      const item = articles.find((el) => el.link === element);
      let result: IArticle;

      if (item?.link === EPath.Industries && successIndustries) {
        result = {
          ...item,
          list: [
            {link: item.link, content: item.title},
            ...industriesData.map((el) => ({link: `${el.id}`, content: el.name})),
          ],
        };
      } else if (item?.link === EPath.Solutions && successSolutions) {
        result = {
          ...item,
          list: [
            {link: item.link, content: item.title},
            ...solutionsData.map((el) => ({link: `${el.id}`, content: el.name})),
          ],
        };
      } else {
        result = item!;
      }

      return result;
    });
  };

  useEffect(() => {
    if (item?.list.length === 0) {
      navigate(item.link);
    }
  }, [item]);

  return (
    <Box sx={[{mt: 1.2}, dFlex, justifySB, alignC, {width: '100%'}]}>
      <List sx={styles.list}>
        {articles.map((article) => (
          <ListItem key={article.link} sx={styles.list.item}>
            <ListItemButton onClick={(e) => handleOpenMenu(e, article.link)}>
              <ListItemText primary={article.title} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <IconTextField
        label="Введите строку поиска"
        variant="standard"
        sx={{width: 410, height: 63}}
        icon={<SearchIcon />}
      />
      {anchorEl && item?.list.length ? (
        <Menu
          open={Boolean(anchorEl)}
          onClose={handleCloseMenu}
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
          marginThreshold={0}
          PaperProps={{
            style: styles.paper,
          }}
          MenuListProps={{
            'aria-labelledby': 'lock-button',
            role: 'listbox',
          }}
          sx={styles.menu}
        >
          {item.list.map((el, i) => (
            <MenuItem key={i} sx={i === 0 ? styles.header.wrapper(item.list.length) : styles.item.wrapper}>
              <Button
                component={NavLink}
                to={i === 0 ? item.link : `${item.link}/${el.link}`}
                onClick={handleCloseMenu}
                sx={i === 0 ? styles.header : styles.item}
                endIcon={<ArrowForwardIosOutlinedIcon />}
              >
                {el.content}
              </Button>
            </MenuItem>
          ))}
        </Menu>
      ) : null}
    </Box>
  );
};

export default DesctopMenu;
