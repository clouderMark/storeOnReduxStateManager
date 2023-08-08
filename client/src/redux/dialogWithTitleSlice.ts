import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import type {RootState} from './store';
import {catalogApi} from './catalogApi';

export enum EType {
  title = 'title',
  id = 'id',

  reset = 'reset',
}

interface IInitialState {
  [EType.title]: string;
  [EType.id]: number | undefined;
}

const initialState: IInitialState = {
  [EType.title]: '',
  [EType.id]: undefined,
};

export const dialogWithTitleSlice = createSlice({
  name: 'dialogWithTitle',
  initialState,
  reducers: {
    setShow: (state, action: PayloadAction<{title: IInitialState[EType.title]; id?: IInitialState[EType.id]}>) => {
      state[EType.title] = action.payload.title;
      state[EType.id] = action.payload.id;
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
