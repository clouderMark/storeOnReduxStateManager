import {useState, useEffect} from 'react';
import {Container, Typography, TableCell, Button, TableRow} from '@mui/material';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {selectUser} from '../../redux/userSlice';
import {useAdminGetAllSubscriptionsMutation, useAdminDeleteSubscriptionMutation} from '../../redux/catalogApi';
import {Board} from '../../components/Board';
import {ISubscribe} from '../../interfaces/interfaces';
import TableCells from '../../components/TableCells/TableCells';
import {adminSubscriptionCells} from '../../components/TableCells/cells';
import {handleAlert} from '../../redux/alertSlice';
import {closeLoader, showLoader} from '../../redux/loaderSlice';

const AdminSubscription = () => {
  const dispatch = useAppDispatch();
  const {token} = useAppSelector(selectUser);
  const [getSubscriptions, {data: subscriptionsData, isSuccess: isSubscriptionsSuccess}] =
    useAdminGetAllSubscriptionsMutation();
  const [deleteItem, {data: deleteData, isSuccess: isDeleteSuccess, isLoading: isLoadingDelete}] =
    useAdminDeleteSubscriptionMutation();
  const [subscriptions, setSubscriptions] = useState<ISubscribe[]>();

  const handleDeleteClick = (id: number) => {
    if (token) {
      deleteItem({token, id});
    }
  };

  useEffect(() => {
    if (isDeleteSuccess) {
      setSubscriptions(subscriptions?.filter((el) => el.id !== deleteData!.id));
      dispatch(handleAlert({message: `Подписчик с email: ${deleteData!.email} удален`, statusCode: 200}));
    }
  }, [isDeleteSuccess]);

  useEffect(() => {
    if (token) getSubscriptions(token);
  }, [token]);

  useEffect(() => {
    if (isSubscriptionsSuccess) {
      setSubscriptions(subscriptionsData);
    }
  }, [isSubscriptionsSuccess]);

  useEffect(() => {
    if (isLoadingDelete) {
      dispatch(showLoader());
    } else {
      dispatch(closeLoader());
    }
  }, [isLoadingDelete]);

  return (
    <>
      {isSubscriptionsSuccess ? (
        <Container sx={{mt: 2, mb: 10}} maxWidth={false}>
          <Typography variant="h4">Все подписки</Typography>
          {subscriptions && subscriptions.length ? (
            <Board
              tableHeadCells={<TableCells cells={adminSubscriptionCells} />}
              tableBodyCells={
                <>
                  {subscriptions?.map((item) => (
                    <TableRow key={item.id} hover>
                      <TableCell scope="row">{item.id}</TableCell>
                      <TableCell>{item.email}</TableCell>
                      <TableCell>{item.createdAt.split('T')[0]}</TableCell>
                      <TableCell>
                        <Button variant="outlined" onClick={() => handleDeleteClick(item.id)} color="warning">
                          Удалить
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </>
              }
            />
          ) : 'Подписки отсутствуют'}
        </Container>
      ) : null}
    </>
  );
};

export default AdminSubscription;
