import {Box, Typography} from '@mui/material';
import CardInputImageText from '../CardInputImageText';
import {useAppSelector} from '../../redux/hooks';
import {selectEditIndustry, setCardImage, setName} from '../../redux/editIndustrySlice/editIndustrySlice';

const Card = () => {
  const {name, valid, cardImageUrl} = useAppSelector(selectEditIndustry);

  return (
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
  );
};

export default Card;
