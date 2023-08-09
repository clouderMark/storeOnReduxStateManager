import {ChangeEvent, useEffect, useState} from 'react';
import {Button, Checkbox, Container, Paper, TableCell, TableRow, TableSortLabel} from '@mui/material';
import {editDeleteCells, nameCell} from '../../components/TableCells/cells';
import {Board} from '../../components/Board';
import TableCells from '../../components/TableCells/TableCells';
import {useDeleteIndustryMutation, useGetNavigationQuery} from '../../redux/catalogApi';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import IndustryRow from '../../components/IndustryRow';
import EditIndustry from '../../components/EditIndustry/EditIndustry';
import {setShow} from '../../redux/dialogWithTitleSlice';
import TableToolbar from '../../components/TableToolbar';
import {selectUser} from '../../redux/userSlice';
import {showAlert} from '../../redux/alertSlice';
import {IIdAndName} from '../../interfaces/interfaces';

type Order = 'asc' | 'desc';

const AdminIndustries = () => {
  const dispatch = useAppDispatch();
  const [deleteItem, {data: deleteData, isSuccess: isDeleteSuccess, isError: isDeleteError, error: deleteError}] =
    useDeleteIndustryMutation();
  const {token} = useAppSelector(selectUser);
  const {data, isSuccess} = useGetNavigationQuery();
  const [selected, setSelected] = useState<readonly number[]>([]);
  const [order, setOrder] = useState<Order>('asc');
  const [industries, setIndustries] = useState<IIdAndName[]>();

  useEffect(() => {
    if (isSuccess) {
      setIndustries([...data.industries]);
    }
  }, [isSuccess]);

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
    if (event.target.checked && data?.industries) {
      const newSelected = data.industries.map((n) => n.id);

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

  const sortHandler = () => {
    if (industries) {
      setIndustries(
        industries.sort((a, b) => (order === 'asc' ? b.name.localeCompare(a.name) : a.name.localeCompare(b.name))),
      );
    }

    setOrder(order === 'asc' ? 'desc' : 'asc');
  };

  return (
    <>
      <Container maxWidth={false}>
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
          {industries ? (
            <Board
              tableHeadCells={
                <>
                  <TableCell>
                    <Checkbox color="primary" onChange={onSelectAllClick} checked={Boolean(selected.length)} />
                  </TableCell>
                  <TableCell>
                    <TableSortLabel
                      active={true}
                      direction={order}
                      onClick={() => sortHandler()}
                    >
                      {nameCell.value}
                    </TableSortLabel>
                  </TableCell>
                  <TableCells cells={editDeleteCells} />
                </>
              }
              tableBodyCells={
                <>
                  {industries.map((row) => {
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
      </Container>
      <EditIndustry />
    </>
  );
};

export default AdminIndustries;
