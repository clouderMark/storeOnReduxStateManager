import {ChangeEvent, useEffect, useState} from 'react';
import {shallowEqual} from 'react-redux';
import {Button, Checkbox, Paper, TableCell, TableRow, TableSortLabel} from '@mui/material';
import {editDeleteCells, nameCell} from './TableCells/cells';
import {Board} from './Board';
import TableCells from './TableCells/TableCells';
import {useDeleteIndustryMutation} from '../redux/catalogApi';
import {useAppDispatch, useAppSelector} from '../redux/hooks';
import IndustryRow from './IndustryRow';
import {setShow} from '../redux/dialogWithTitleSlice';
import TableToolbar from './TableToolbar';
import {selectUser} from '../redux/userSlice';
import {showAlert} from '../redux/alertSlice';
import {selectIndustries, selectSortedIndustries, setOrder} from '../redux/industriesSlice';

const IndustriesTable = () => {
  const dispatch = useAppDispatch();
  const [deleteItem, {data: deleteData, isSuccess: isDeleteSuccess, isError: isDeleteError, error: deleteError}] =
    useDeleteIndustryMutation();
  const {token} = useAppSelector(selectUser);
  const {order} = useAppSelector(selectIndustries);
  const sortedIndustries = useAppSelector(selectSortedIndustries, shallowEqual);
  const [selected, setSelected] = useState<readonly number[]>([]);

  const handleCreateClick = () => {
    dispatch(setShow({title: 'Создание индустрии'}));
  };

  const handleDeleteClick = async () => {
    if (token) {
      selected.forEach((el) => {
        deleteItem({token, id: el});
      });
    }

    setSelected([]);
  };

  useEffect(() => {
    if (isDeleteSuccess && deleteData) {
      dispatch(showAlert({message: 'Выбранные индустрии удалены', statusCode: 200}));
    }
  }, [isDeleteSuccess]);

  useEffect(() => {
    if (isDeleteError && 'data' in deleteError!) {
      dispatch(showAlert({message: deleteError.data.message, statusCode: deleteError.status}));
    }
  }, [isDeleteError]);

  const onSelectAllClick = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked && sortedIndustries) {
      const newSelected = sortedIndustries.map((n) => n.id);

      setSelected(newSelected);

      return;
    }

    setSelected([]);
  };

  const handleClick = (id: number) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: readonly number[] = [];

    if (selectedIndex === -1) {
      newSelected = [...selected, id];
    } else if (selectedIndex === 0) {
      newSelected = [...selected.slice(1)];
    } else if (selectedIndex === selected.length - 1) {
      newSelected = selected.slice(0, -1);
    } else if (selectedIndex > 0) {
      newSelected = [...selected.slice(0, selectedIndex), ...selected.slice(selectedIndex + 1)];
    }

    setSelected(newSelected);
  };

  const isSelected = (id: number) => selected.indexOf(id) !== -1;

  return (
    <Paper sx={{width: '100%', mb: 2}}>
      <TableToolbar
        numSelected={selected.length}
        showWhenIsNotSelected={
          <Button variant="outlined" onClick={handleCreateClick}>
            Создать индустрию
          </Button>
        }
        handleDeleteClick={handleDeleteClick}
      />
      {sortedIndustries ? (
        <Board
          tableHeadCells={
            <>
              <TableCell>
                <Checkbox color="primary" onChange={onSelectAllClick} checked={Boolean(selected.length)} />
              </TableCell>
              <TableCell>
                <TableSortLabel active={true} direction={order} onClick={() => dispatch(setOrder())}>
                  {nameCell.value}
                </TableSortLabel>
              </TableCell>
              <TableCells cells={editDeleteCells} />
            </>
          }
          tableBodyCells={
            <>
              {sortedIndustries.map((row) => {
                const isItemSelected = isSelected(row.id);

                return (
                  <TableRow
                    hover
                    key={row.id}
                    selected={isItemSelected}
                    role="checkbox"
                    onClick={() => handleClick(row.id)}
                  >
                    <TableCell>
                      <Checkbox color="primary" checked={isItemSelected} />
                    </TableCell>
                    <IndustryRow id={row.id} name={row.name} />
                  </TableRow>
                );
              })}
            </>
          }
        />
      ) : null}
    </Paper>
  );
};

export default IndustriesTable;
