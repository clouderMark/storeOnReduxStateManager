import {ChangeEvent, Fragment} from 'react';
import {Box, TextField, Typography} from '@mui/material';
import TwoColumnsContainer from '../TwoColumnsContainer/TwoColumnsContainer';
import {
  appendOpinionListItem,
  appendOpinionParagraph,
  changeOpinionListItem,
  changeOpinionParagraph,
  removeOpinionListItem,
  removeOpinionParagraph,
  selectEditIndustry,
  setOpinionEmail,
  setOpinionFax,
  setOpinionImage,
  setOpinionListTitle,
  setOpinionName,
  setOpinionPhone,
  setOpinionTitle,
} from '../../redux/editIndustrySlice/editIndustrySlice';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import AppendInput from '../AppendInput';
import CardInputImage from '../CardInputImage/CardInputImage';

const Opinion = () => {
  const {
    opinionTitle,
    opinionParagraphs,
    opinionListTitle,
    opinionListItems,
    opinionImageUrl,
    opinionName,
    opinionPhone,
    opinionFax,
    opinionEmail,
  } = useAppSelector(selectEditIndustry);
  const dispatch = useAppDispatch();

  const secondColumn = [
    {
      value: opinionName,
      placeholder: 'Имя',
      onChange: setOpinionName,
    },
    {
      value: opinionPhone,
      placeholder: 'Телефон',
      onChange: setOpinionPhone,
    },
    {
      value: opinionFax,
      placeholder: 'Факс',
      onChange: setOpinionFax,
    },
    {
      value: opinionEmail,
      placeholder: 'E-mail',
      onChange: setOpinionEmail,
    },
  ];

  return (
    <Box>
      <Typography sx={{mb: '-40px', mt: '20px'}}>Экспертное мнение</Typography>
      <TwoColumnsContainer
        firstColumn={
          <>
            <TextField
              value={opinionTitle}
              onChange={(e: ChangeEvent<HTMLInputElement>) => dispatch(setOpinionTitle(e.target.value))}
              placeholder="Заголовок"
              sx={{width: '100%', mt: '30px'}}
            />
            <AppendInput
              title="Добавить абзац"
              inputs={opinionParagraphs}
              appendAction={appendOpinionParagraph}
              changeAction={changeOpinionParagraph}
              deleteAction={removeOpinionParagraph}
            />
            <TextField
              value={opinionListTitle}
              onChange={(e: ChangeEvent<HTMLInputElement>) => dispatch(setOpinionListTitle(e.target.value))}
              placeholder="Заголовок"
              sx={{width: '100%', mt: '30px'}}
            />
            <AppendInput
              title="Добавить пункт"
              inputs={opinionListItems}
              appendAction={appendOpinionListItem}
              changeAction={changeOpinionListItem}
              deleteAction={removeOpinionListItem}
            />
          </>
        }
        secondColumn={
          <>
            <CardInputImage value={opinionImageUrl} action={setOpinionImage} />
            {secondColumn.map((el, i) => (
              <Fragment key={i}>
                <TextField
                  value={el.value}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => dispatch(el.onChange(e.target.value))}
                  placeholder={el.placeholder}
                  sx={{width: '100%', mt: '30px'}}
                />
              </Fragment>
            ))}
          </>
        }
        firstColumnWidth={70}
      />
    </Box>
  );
};

export default Opinion;
