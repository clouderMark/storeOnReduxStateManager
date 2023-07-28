import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import type {RootState} from './store';
import {catalogApi} from './catalogApi';

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
  name: 'dialogWithTitle',
  initialState,
  reducers: {
    setShow: (state, action: PayloadAction<IInitialState[EType.title]>) => {
      state[EType.title] = action.payload;
    },

    reset: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(catalogApi.endpoints.createIndustry.matchFulfilled, () => initialState)
      .addMatcher(catalogApi.endpoints.updateIndystry.matchFulfilled, () => initialState);
  },
});

export const selectDialogWithTitle = (state: RootState) => state.dialogWithTitle;

export const {setShow, reset} = dialogWithTitleSlice.actions;
