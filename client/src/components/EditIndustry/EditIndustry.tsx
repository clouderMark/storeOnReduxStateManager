import {FormEvent, useEffect} from 'react';
import {Box, Button, DialogActions, Typography} from '@mui/material';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {
  appendParagraph,
  changeParagraph,
  removeParagraph,
  reset,
  selectEditIndustry,
  setCardImage,
  setHeaderImage,
  setName,
  setSliderImage,
  setTitle,
} from '../../redux/editIndustrySlice';
import {useCreateIndustryMutation, useGetIndustryMutation, useUpdateIndystryMutation} from '../../redux/catalogApi';
import DialogWithTitle from '../DialogWithTitle';
import {selectDialogWithTitle, setShow} from '../../redux/dialogWithTitleSlice';
import {selectUser} from '../../redux/userSlice';
import CardInputImage from '../CardInputImage/CardInputImage';
import CardInputImageText from '../CardInputImageText';
import AppendInput from '../AppendInput';

const EditIndustry = () => {
  const {
    id,
    name,
    valid,
    cardImageUrl,
    sliderImageUrl,
    headerImageUrl,
    title: headerTitle,
    paragraphs,
  } = useAppSelector(selectEditIndustry);
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
            <Box display={'flex'}>
              <Typography sx={{mr: '10px', writingMode: 'vertical-rl'}}>Карточка с названием</Typography>
              <Box sx={{width: '335px'}}>
                <CardInputImageText
                  imageValue={cardImageUrl}
                  imageAction={setCardImage}
                  textValue={name}
                  textAction={setName}
                  textValid={valid}
                />
              </Box>
            </Box>
            <Box sx={{flexGrow: 1, display: 'flex', ml: '30px'}}>
              <Typography sx={{mr: '10px', writingMode: 'vertical-rl'}}>Изображние для слайдера</Typography>
              <CardInputImage value={sliderImageUrl} action={setSliderImage} sx={{flexGrow: 1}} />
            </Box>
          </Box>
          <Box>
            <CardInputImageText
              imageValue={headerImageUrl}
              imageAction={setHeaderImage}
              textValue={headerTitle}
              textAction={setTitle}
            />
            <AppendInput
              title="Абзацы в шапке"
              inputs={paragraphs}
              appendAction={appendParagraph}
              changeAction={changeParagraph}
              deleteAction={removeParagraph}
            />
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
