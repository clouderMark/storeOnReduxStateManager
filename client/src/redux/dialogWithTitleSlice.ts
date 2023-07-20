import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import type {RootState} from './store';

export enum EType {
  title = 'title',

  reset = 'reset',
}

interface IInitialState {
  [EType.title]: string;
}

const initialState: IInitialState = {
  [EType.title]: '',
};

export const dialogWithTitleSlice = createSlice({
  name: 'editIndustry',
  initialState,
  reducers: {
    setShow: (state, action: PayloadAction<IInitialState[EType.title]>) => {
      state[EType.title] = action.payload;
    },

    [EType.reset]: () => initialState,
  },
});

export const selectDialogWithTitle = (state: RootState) => state.dialogWithTitle;

export const {setShow} = dialogWithTitleSlice.actions;
