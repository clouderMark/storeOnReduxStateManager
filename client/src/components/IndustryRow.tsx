import {useEffect} from 'react';
import {Button, TableCell} from '@mui/material';
import {useDeleteIndustryMutation} from '../redux/catalogApi';
import {useAppDispatch, useAppSelector} from '../redux/hooks';
import {selectUser} from '../redux/userSlice';
import {showAlert} from '../redux/alertSlice';
import {setShow} from '../redux/dialogWithTitleSlice';

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
    dispatch(setShow({title: 'Редактирование индустрии', id: id}));
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
    <>
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
    </>
  );
};

export default IndustryRow;
