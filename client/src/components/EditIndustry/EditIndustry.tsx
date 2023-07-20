import {FormEvent, useEffect} from 'react';
import {Box, Button, DialogActions} from '@mui/material';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {reset, selectEditIndustry, setData} from '../../redux/editIndustrySlice';
import {useCreateIndustryMutation, useGetIndustryMutation, useUpdateIndystryMutation} from '../../redux/catalogApi';
import DialogWithTitle from '../DialogWithTitle';
import {setShow} from '../../redux/dialogWithTitleSlice';
import {selectUser} from '../../redux/userSlice';

const EditIndustry = () => {
  const dispatch = useAppDispatch();
  const {id} = useAppSelector(selectEditIndustry);
  const {token} = useAppSelector(selectUser);
  const [createItem, {isSuccess: isSuccessCreate}] = useCreateIndustryMutation();
  const [getItem, {data: getedData, isSuccess: isSuccessData}] = useGetIndustryMutation();
  const [updateItem, {isSuccess: isSuccessUpdate}] = useUpdateIndystryMutation();

  useEffect(() => {
    if (id) {
      getItem(id);
    }
  }, []);

  useEffect(() => {
    if (isSuccessData && getedData) {
      dispatch(
        setData({
          name: getedData.name,
          valid: getedData.name !== '',
          cardImageUrl: getedData.cardImage ? process.env.REACT_APP_IMG_URL + getedData.cardImage : '',
        }),
      );
    }
  }, [isSuccessData]);

  useEffect(() => {
    if (isSuccessCreate || isSuccessUpdate) {
      dispatch(setShow(''));
      dispatch(reset());
    }
  }, [isSuccessCreate, isSuccessUpdate]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (token) {
      if (id) {
        updateItem({token, body: new FormData(), id});
      } else {
        createItem({token, body: new FormData()});
      }
    }
  };

  return (
    <DialogWithTitle
      child={
        <Box component="form" noValidate onSubmit={handleSubmit}>
          <DialogActions>
            <Button type="submit" variant="outlined">
              Сохранить
            </Button>
          </DialogActions>
        </Box>
      }
    />
  );
};

export default EditIndustry;
