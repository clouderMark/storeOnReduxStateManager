import {Box, Typography} from '@mui/material';
import CardInputImageText from '../CardInputImageText';
import {useAppSelector} from '../../redux/hooks';
import {
  appendParagraph,
  changeParagraph,
  removeParagraph,
  selectEditIndustry,
  setHeaderImage,
  setTitle,
} from '../../redux/editIndustrySlice/editIndustrySlice';
import AppendInput from '../AppendInput';

const HeaderBlock = () => {
  const {headerImageUrl, title: headerTitle, paragraphs} = useAppSelector(selectEditIndustry);

  return (
    <Box>
      <Typography sx={{fontSize: '20px', mb: 2, mt: '20px'}}>Заголовк страницы</Typography>
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
  );
};

export default HeaderBlock;
