import {Box, TextField, Typography} from '@mui/material';
import {ActionCreatorWithPayload, ActionCreatorWithoutPayload} from '@reduxjs/toolkit';
import AddButton from './AddButton';
import {IParagraphs} from '../interfaces/interfaces';
import {useAppDispatch} from '../redux/hooks';
import DeleteButton from './DeleteButton';

interface IProps {
  title: string;
  inputs: IParagraphs[];
  appendAction: ActionCreatorWithoutPayload;
  changeAction: ActionCreatorWithPayload<{value: string, unique: string}>;
  deleteAction: ActionCreatorWithPayload<string>;
}

const AppendInput = (props: IProps) => {
  const {title, inputs, appendAction, changeAction, deleteAction} = props;
  const dispatch = useAppDispatch();

  return (
    <>
      <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: '30px'}}>
        <Typography component="span">{title}</Typography>
        <AddButton action={appendAction} />
      </Box>
      {inputs.map((el) => (
        <Box sx={{display: 'flex', alignItems: 'flex-start', mt: '30px'}} key={el.unique}>
          <TextField
            value={el.value}
            onChange={(e) => dispatch(changeAction({value: e.target.value, unique: el.unique}))}
            multiline
            rows={4}
            placeholder="Добавить абзац"
            sx={{width: '100%'}}
          />
          <DeleteButton action={deleteAction} payload={el.unique} />
        </Box>
      ))}
    </>
  );
};

export default AppendInput;
