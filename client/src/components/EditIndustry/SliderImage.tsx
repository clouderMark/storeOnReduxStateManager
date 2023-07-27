import {Box, Typography} from '@mui/material';
import CardInputImage from '../CardInputImage/CardInputImage';
import {useAppSelector} from '../../redux/hooks';
import {selectEditIndustry, setSliderImage} from '../../redux/editIndustrySlice';

const SliderImage = () => {
  const {sliderImageUrl} = useAppSelector(selectEditIndustry);

  return (
    <Box sx={{flexGrow: 1, display: 'flex', ml: '30px'}}>
      <Typography sx={{mr: '10px', writingMode: 'vertical-rl'}}>Изображние для слайдера</Typography>
      <CardInputImage value={sliderImageUrl} action={setSliderImage} sx={{flexGrow: 1}} />
    </Box>
  );
};

export default SliderImage;
