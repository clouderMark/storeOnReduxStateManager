import {FormEvent, useEffect} from 'react';
import {Box, Button, DialogActions} from '@mui/material';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {selectEditIndustry, checkValidAndIfIsTrueSubmit} from '../../redux/editIndustrySlice/editIndustrySlice';
import {useCreateIndustryMutation, useGetIndustryMutation, useUpdateIndystryMutation} from '../../redux/catalogApi';
import DialogWithTitle from '../DialogWithTitle';
import {selectUser} from '../../redux/userSlice';
import Card from './Card';
import SliderImage from './SliderImage';
import HeaderBlock from './HeaderBlock';
import Info from './Info';
import {showAlert} from '../../redux/alertSlice';
import Opinion from './Opinion';
import {EType} from '../../redux/editIndustrySlice/EType';

const EditIndustry = () => {
  const dispatch = useAppDispatch();
  const {
    id,
    valid,
    name,
    cardImage,
    headerImage,
    title,
    paragraphs,
    opinionTitle,
    opinionListTitle,
    opinionName,
    opinionPhone,
    opinionFax,
    opinionEmail,
    opinionParagraphs,
    opinionListItems,
    opinionImage,
  } = useAppSelector(selectEditIndustry);
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
      const data = new FormData();

      data.append(EType.name, name.trim());
      data.append(EType.title, title.trim());
      if (cardImage) {
        data.append(EType.cardImage, cardImage, cardImage.name);
      }

      if (headerImage) {
        data.append(EType.headerImage, headerImage, headerImage.name);
      }

      if (paragraphs.length) {
        const items = paragraphs.map((el) => ({id: el.id, value: el.value}));

        if (items.length) {
          data.append(EType.paragraphs, JSON.stringify(items));
        }
      }

      data.append(EType.opinionTitle, opinionTitle.trim());
      data.append(EType.opinionListTitle, opinionListTitle.trim());
      data.append(EType.opinionName, opinionName.trim());
      data.append(EType.opinionPhone, opinionPhone.trim());
      data.append(EType.opinionFax, opinionFax.trim());
      data.append(EType.opinionEmail, opinionEmail.trim());
      if (opinionParagraphs.length) {
        const items = opinionParagraphs.map((el) => ({id: el.id, value: el.value}));

        if (items.length) {
          data.append(EType.opinionParagraphs, JSON.stringify(items));
        }
      }

      if (opinionListItems.length) {
        const items = opinionListItems.map((el) => ({id: el.id, value: el.value}));

        if (items.length) {
          data.append(EType.opinionListItems, JSON.stringify(items));
        }
      }

      if (opinionImage) {
        data.append(EType.opinionImage, opinionImage, opinionImage.name);
      }

      if (token) {
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

    dispatch(checkValidAndIfIsTrueSubmit());
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
