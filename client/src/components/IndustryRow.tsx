import {useEffect} from 'react';
import {Button, TableCell, TableRow} from '@mui/material';
import {useDeleteIndustryMutation} from '../redux/catalogApi';
import {useAppDispatch, useAppSelector} from '../redux/hooks';
import {selectUser} from '../redux/userSlice';
import {showAlert} from '../redux/alertSlice';
import {setShow} from '../redux/dialogWithTitleSlice';
import {setId} from '../redux/editIndustrySlice';

interface IProps {
  id: number;
  name: string;
}

const IndustryRow = (props: IProps) => {
  const {id, name} = props;
  const {token} = useAppSelector(selectUser);
  const [deleteItem, {data: deleteData, isSuccess: isDeleteSuccess, isError: isDeleteError, error: deleteError}] =
    useDeleteIndustryMutation();
  const dispatch = useAppDispatch();

  const handleUpdateClick = () => {
    dispatch(setShow('Редактирование индустрии'));
    dispatch(setId(id));
  };

  const handleDeleteClick = () => {
    if (token) {
      deleteItem({id, token});
    }
  };

  useEffect(() => {
    if (isDeleteSuccess && deleteData) {
      dispatch(showAlert({message: `Индустрия "${deleteData.name}"удалена`, statusCode: 200}));
    }
  }, [isDeleteSuccess]);

  useEffect(() => {
    if (isDeleteError && 'data' in deleteError!) {
      dispatch(showAlert({message: deleteError.data.message, statusCode: deleteError.status}));
    }
  }, [isDeleteError]);

  return (
    <TableRow hover>
      <TableCell>{name}</TableCell>
      <TableCell>
        <Button variant="outlined" color="success" onClick={handleUpdateClick}>
          Редактировать
        </Button>
      </TableCell>
      <TableCell>
        <Button variant="outlined" color="error" onClick={handleDeleteClick}>
          Удалить
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default IndustryRow;
