import {FormEvent, useEffect} from 'react';
import {Box, Button, DialogActions} from '@mui/material';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {reset, selectEditIndustry} from '../../redux/editIndustrySlice/editIndustrySlice';
import {useCreateIndustryMutation, useGetIndustryMutation, useUpdateIndystryMutation} from '../../redux/catalogApi';
import DialogWithTitle from '../DialogWithTitle';
import {selectDialogWithTitle, setShow} from '../../redux/dialogWithTitleSlice';
import {selectUser} from '../../redux/userSlice';
import Card from './Card';
import SliderImage from './SliderImage';
import HeaderBlock from './HeaderBlock';
import Info from './Info';

const EditIndustry = () => {
  const {id} = useAppSelector(selectEditIndustry);
  const {title} = useAppSelector(selectDialogWithTitle);
  const dispatch = useAppDispatch();
  const {token} = useAppSelector(selectUser);
  const [createItem] = useCreateIndustryMutation();
  const [getItem] = useGetIndustryMutation();
  const [updateItem] = useUpdateIndystryMutation();

  useEffect(() => {
    if (id) {
      getItem(id);
    }
  }, [id]);

  useEffect(() => {
    if (!title) {
      resetForm();
    }
  }, [title]);

  const resetForm = () => {
    dispatch(setShow(''));
    dispatch(reset());
  };

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
          <Box display={'flex'}>
            <Card />
            <SliderImage />
          </Box>
          <HeaderBlock />
          <Info />
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
