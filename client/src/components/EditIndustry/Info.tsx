import {ChangeEvent} from 'react';
import {Box, TextField, Typography} from '@mui/material';
import TwoColumnsContainer from '../TwoColumnsContainer/TwoColumnsContainer';
import CardInputImage from '../CardInputImage/CardInputImage';
import {
  appendInfoListItem,
  appendInfoParagraph,
  changeInfoListItem,
  changeInfoParagraph,
  removeInfoListItem,
  removeInfoParagraph,
  selectEditIndustry,
  setInfoHeader,
  setInfoImage,
  setInfoListTitle,
  setInfoTitle,
} from '../../redux/editIndustrySlice';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import AppendInput from '../AppendInput';

const textFielStyles = {
  width: '100%',
  mt: '30px',
};

const Info = () => {
  const {infoImageUrl, infoTitle, infoHeader, infoListTitle, infoListItems, infoParagraphs} =
    useAppSelector(selectEditIndustry);
  const dispatch = useAppDispatch();

  return (
    <Box sx={{mt: '30px'}}>
      <Typography sx={{mb: '-40px'}}>Дополнительная информация</Typography>
      <TwoColumnsContainer
        firstColumn={<CardInputImage value={infoImageUrl} action={setInfoImage} />}
        secondColumn={
          <>
            <TextField
              value={infoTitle}
              onChange={(e: ChangeEvent<HTMLInputElement>) => dispatch(setInfoTitle(e.target.value))}
              placeholder="Заголовок"
              sx={textFielStyles}
            />
            <TextField
              value={infoHeader}
              onChange={(e: ChangeEvent<HTMLInputElement>) => dispatch(setInfoHeader(e.target.value))}
              placeholder="Подзаголовок"
              sx={textFielStyles}
            />
            <TextField
              multiline
              rows={4}
              value={infoListTitle}
              onChange={(e: ChangeEvent<HTMLInputElement>) => dispatch(setInfoListTitle(e.target.value))}
              placeholder="Заголовок списка"
              sx={textFielStyles}
            />
            <AppendInput
              title="Добавить пункт"
              inputs={infoListItems}
              appendAction={appendInfoListItem}
              changeAction={changeInfoListItem}
              deleteAction={removeInfoListItem}
            />
            <AppendInput
              title="Добавить параграф"
              inputs={infoParagraphs}
              appendAction={appendInfoParagraph}
              changeAction={changeInfoParagraph}
              deleteAction={removeInfoParagraph}
            />
          </>
        }
      />
    </Box>
  );
};

export default Info;
