import {ChangeEvent, FormEvent, useEffect} from 'react';
import {Box, Button, DialogActions} from '@mui/material';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {reset, selectEditIndustry, setCardImage, setData, setName} from '../../redux/editIndustrySlice';
import {useCreateIndustryMutation, useGetIndustryMutation, useUpdateIndystryMutation} from '../../redux/catalogApi';
import DialogWithTitle from '../DialogWithTitle';
import {selectDialogWithTitle, setShow} from '../../redux/dialogWithTitleSlice';
import {selectUser} from '../../redux/userSlice';
import CardImageWithTextInput from '../CardInputImage/CardImageWithTextInput';

const EditIndustry = () => {
  const {id, cardImageUrl, name, valid} = useAppSelector(selectEditIndustry);
  const {title} = useAppSelector(selectDialogWithTitle);
  const dispatch = useAppDispatch();
  const {token} = useAppSelector(selectUser);
  const [createItem, {isSuccess: isSuccessCreate}] = useCreateIndustryMutation();
  const [getItem, {data: getedData, isSuccess: isSuccessData}] = useGetIndustryMutation();
  const [updateItem, {isSuccess: isSuccessUpdate}] = useUpdateIndystryMutation();

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
      resetForm();
    }
  }, [isSuccessCreate, isSuccessUpdate]);

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

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const file = event.target.files[0];

      dispatch(setCardImage(file));
    }
  };

  return (
    <DialogWithTitle
      child={
        <Box component="form" noValidate onSubmit={handleSubmit}>
          <CardImageWithTextInput
            imageValue={cardImageUrl}
            onChangeImage={handleImageChange}
            textInputValue={name}
            onChangeText={(e) => dispatch(setName(e.target.value))}
            validText={valid}
          />
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
