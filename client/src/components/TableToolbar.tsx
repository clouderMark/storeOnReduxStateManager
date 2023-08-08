import DeleteIcon from '@mui/icons-material/Delete';
import {Box, IconButton, Toolbar, Tooltip, Typography, alpha} from '@mui/material';

interface ITableToolbar {
  numSelected: number;
  showWhenIsNotSelected: JSX.Element;
  handleDeleteClick?(): void;
}

const TableToolbar = (props: ITableToolbar) => {
  const {numSelected, showWhenIsNotSelected, handleDeleteClick} = props;

  return (
    <Toolbar
      sx={{
        ...(numSelected > 0 && {
          bgcolor: (theme) => alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Box sx={{width: '100%', display: 'flex', alignItems: 'center', pl: {sm: 3}, pr: {xs: 1, sm: 1}, mt: 1}}>
          <Typography sx={{flex: '1 1 100%'}} color="inherit" variant="subtitle1" component="div">
            {numSelected} выбран{numSelected > 1 ? 'о' : null}
          </Typography>
          <Tooltip title="Delete">
            <IconButton onClick={handleDeleteClick}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </Box>
      ) : (
        <Box sx={{width: '100%'}}>{showWhenIsNotSelected}</Box>
      )}
    </Toolbar>
  );
};

export default TableToolbar;
