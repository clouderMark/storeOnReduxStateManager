import {useEffect} from 'react';
import {Container, Typography, TableCell, Button, TableRow} from '@mui/material';
import {useAppDispatch} from '../../redux/hooks';
import {useAdminGetAllSubscriptionsQuery, useAdminDeleteSubscriptionMutation} from '../../redux/subscriptionApi';
import {Board} from '../../components/Board';
import TableCells from '../../components/TableCells/TableCells';
import {adminSubscriptionCells} from '../../components/TableCells/cells';
import {showAlert} from '../../redux/alertSlice';

const AdminSubscription = () => {
  const dispatch = useAppDispatch();
  const {data: subscriptionsData, isSuccess: isSubscriptionsSuccess} = useAdminGetAllSubscriptionsQuery();
  const [deleteItem, {data: deleteData, isSuccess: isDeleteSuccess}] =
    useAdminDeleteSubscriptionMutation();

  const handleDeleteClick = (id: number) => {
    deleteItem(id);
  };

  useEffect(() => {
    if (isDeleteSuccess) {
      dispatch(showAlert({message: `Подписчик с email: ${deleteData!.email} удален`, statusCode: 200}));
    }
  }, [isDeleteSuccess]);

  return (
    <>
      {isSubscriptionsSuccess ? (
        <Container sx={{mt: 2, mb: 10}} maxWidth={false}>
          <Typography variant="h4">Все подписки</Typography>
          {isSubscriptionsSuccess && subscriptionsData.length ? (
            <Board
              tableHeadCells={<TableCells cells={adminSubscriptionCells} />}
              tableBodyCells={
                <>
                  {subscriptionsData?.map((item) => (
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
          ) : (
            'Подписки отсутствуют'
          )}
        </Container>
      ) : null}
    </>
  );
};

export default AdminSubscription;
