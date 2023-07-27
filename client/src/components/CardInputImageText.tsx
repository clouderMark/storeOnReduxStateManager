import {ActionCreatorWithPayload} from '@reduxjs/toolkit';
import {ChangeEvent} from 'react';
import {Box, TextField} from '@mui/material';
import CardInputImage from './CardInputImage/CardInputImage';
import {useAppDispatch} from '../redux/hooks';

interface IProps {
  imageValue: string;
  imageAction: ActionCreatorWithPayload<FileList | null>;
  textValue: string;
  textAction: ActionCreatorWithPayload<string>;
  textValid?: null | boolean;
}

const CardInputImageText = (props: IProps) => {
  const dispatch = useAppDispatch();
  const {imageValue, imageAction, textValue, textAction, textValid} = props;

  return (
    <Box>
      <CardInputImage value={imageValue} action={imageAction} />
      <TextField
        value={textValue}
        onChange={(e: ChangeEvent<HTMLInputElement>) => dispatch(textAction(e.target.value))}
        required
        error={textValid === false}
        color={textValid ? 'success' : 'primary'}
        placeholder={'Название...'}
        className="mb-3"
        sx={{width: '100%'}}
      />
    </Box>
  );
};

export default CardInputImageText;
