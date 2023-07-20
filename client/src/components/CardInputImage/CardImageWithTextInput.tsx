import {ChangeEvent} from 'react';
import {Box, TextField, Typography} from '@mui/material';
import CardInputImage from './CardInputImage';

interface IProps {
  imageValue: string;
  onChangeImage(event: ChangeEvent<HTMLInputElement>): void;
  textInputValue: string;
  onChangeText(event: ChangeEvent<HTMLInputElement>): void;
  validText: boolean | null;
}

const CardImageWithTextInput = (props: IProps) => {
  const {imageValue, onChangeImage, textInputValue, onChangeText, validText} = props;

  return (
    <Box display={'flex'}>
      <Typography sx={{mr: '10px', writingMode: 'vertical-rl'}}>Карточка с названием</Typography>
      <Box sx={{width: '335px'}}>
        <CardInputImage value={imageValue} onChange={onChangeImage} />
        <TextField
          autoFocus={true}
          value={textInputValue}
          onChange={onChangeText}
          required
          error={validText === false}
          color={validText ? 'success' : 'primary'}
          placeholder={'Название...'}
          className="mb-3"
          sx={{width: '100%'}}
        />
      </Box>
    </Box>
  );
};

export default CardImageWithTextInput;
