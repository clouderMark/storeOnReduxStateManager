import {ChangeEvent} from 'react';
import {ActionCreatorWithPayload} from '@reduxjs/toolkit';
import {Box, Button} from '@mui/material';
import {cardInputImage as styles} from './styles/cardInputImage';
import {useAppDispatch} from '../../redux/hooks';

interface IProps {
  value: string | null;
  action: ActionCreatorWithPayload<FileList | null>;
  sx?: any; // eslint-disable-line
  error?: boolean | null;
}

const CardInputImage = (props: IProps) => {
  const dispatch = useAppDispatch();
  const {value, action} = props;
  let error;

  if (typeof props.error === 'boolean') {
    error = props.error;
  } else error = true;

  return (
    <Box sx={[styles.card, props.sx, !error ? {border: '1.5px solid red'} : {border: 0}]}>
      <Box sx={styles.img} component="img" src={value || ''} />
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
          onChange={(e: ChangeEvent<HTMLInputElement>) => dispatch(action(e.target.files))}
          placeholder="Фото ..."
          hidden
          accept="image/*"
          aria-label="upload picture"
        />
        {`${value ? 'Изменить' : 'Добавить'} фото`}
      </Button>
    </Box>
  );
};

export default CardInputImage;
