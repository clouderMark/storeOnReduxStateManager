import {ChangeEvent, FormEvent, useEffect} from 'react';
import {Box, Button, DialogActions, TextField, Typography} from '@mui/material';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {reset, selectEditIndustry, setCardImage, setName} from '../../redux/editIndustrySlice';
import {useCreateIndustryMutation, useGetIndustryMutation, useUpdateIndystryMutation} from '../../redux/catalogApi';
import DialogWithTitle from '../DialogWithTitle';
import {selectDialogWithTitle, setShow} from '../../redux/dialogWithTitleSlice';
import {selectUser} from '../../redux/userSlice';
import {cardInputImage as styles} from './styles/cardInputImage';

const EditIndustry = () => {
  const {id, name, valid, cardImageUrl} = useAppSelector(selectEditIndustry);
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
            <Typography sx={{mr: '10px', writingMode: 'vertical-rl'}}>Карточка с названием</Typography>
            <Box sx={{width: '335px'}}>
              <Box sx={styles.card}>
                <Box sx={styles.img} component="img" src={cardImageUrl} />
                <Button
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                  }}
                  aria-label="upload picture"
                  component="label"
                  color="first"
                  variant="contained"
                >
                  <input
                    type="file"
                    onChange={(e: ChangeEvent<HTMLInputElement>) => dispatch(setCardImage(e.target.files))}
                    placeholder="Фото ..."
                    hidden
                    accept="image/*"
                    aria-label="upload picture"
                  />
                  {`${id ? 'Изменить' : 'Добавить'} фото`}
                </Button>
              </Box>
              <TextField
                value={name}
                onChange={(e: ChangeEvent<HTMLInputElement>) => dispatch(setName(e.target.value))}
                required
                error={valid === false}
                color={valid ? 'success' : 'primary'}
                placeholder={'Название...'}
                className="mb-3"
                sx={{width: '100%'}}
              />
            </Box>
          </Box>
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
