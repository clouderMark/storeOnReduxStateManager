import {FormEvent, useEffect} from 'react';
import {Box, Button, DialogActions} from '@mui/material';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {selectEditIndustry, checkValidAndIfIsTrueComposeData} from '../../redux/editIndustrySlice/editIndustrySlice';
import {useCreateIndustryMutation, useGetIndustryMutation, useUpdateIndystryMutation} from '../../redux/catalogApi';
import DialogWithTitle from '../DialogWithTitle';
import {selectUser} from '../../redux/userSlice';
import Card from './Card';
import SliderImage from './SliderImage';
import HeaderBlock from './HeaderBlock';
import Info from './Info';
import {showAlert} from '../../redux/alertSlice';
import Opinion from './Opinion';

const EditIndustry = () => {
  const dispatch = useAppDispatch();
  const {id, valid, data} = useAppSelector(selectEditIndustry);
  const {token} = useAppSelector(selectUser);
  const [createItem, {isError: isErrorCreate}] = useCreateIndustryMutation();
  const [getItem] = useGetIndustryMutation();
  const [updateItem, {isError: isErrorUpdate}] = useUpdateIndystryMutation();

  useEffect(() => {
    if (id) {
      getItem(id);
    }
  }, [id]);

  useEffect(() => {
    if (isErrorCreate || isErrorUpdate) {
      dispatch(showAlert({message: 'Что-то пошло не так', statusCode: 400}));
    }
  }, [isErrorCreate, isErrorUpdate]);

  useEffect(() => {
    if (valid) {
      if (token && data) {
        if (id) {
          updateItem({token, body: data, id});
        } else {
          createItem({token, body: data});
        }
      }
    }
  }, [valid]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    dispatch(checkValidAndIfIsTrueComposeData());
  };

  return (
    <DialogWithTitle
      child={
        <Box component="form" noValidate onSubmit={handleSubmit}>
          <Box display={'flex'}>
            <Card />
            <SliderImage />
          </Box>
          <HeaderBlock />
          <Info />
          <Opinion />
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
