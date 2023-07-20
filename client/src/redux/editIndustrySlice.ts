import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import type {RootState} from './store';

export enum EType {
  id = 'id',

  reset = 'reset',

  valid = 'valid',
  name = 'name',
  cardImage = 'cardImage',
  cardImageUrl = 'cardImageUrl',
  sliderImage = 'sliderImage',
  sliderImageUrl = 'sliderImageUrl',
}

interface IInitialState {
  [EType.id]: number | null;

  [EType.name]: string;
  [EType.cardImage]: File | null;
  [EType.cardImageUrl]: string;
  [EType.sliderImage]: File | null;
  [EType.sliderImageUrl]: string;
  [EType.valid]: null | boolean;
}

const initialState: IInitialState = {
  [EType.id]: null,

  [EType.name]: '',
  [EType.cardImage]: null,
  [EType.cardImageUrl]: '',
  [EType.sliderImage]: null,
  [EType.sliderImageUrl]: '',
  [EType.valid]: null,
};

export const editIndustrySlice = createSlice({
  name: 'editIndustry',
  initialState,
  reducers: {
    setId: (state, action: PayloadAction<IInitialState[EType.id]>) => {
      state[EType.id] = action.payload;
    },
    setData: (
      state,
      action: PayloadAction<{
        [EType.name]: IInitialState[EType.name];
        [EType.valid]: IInitialState[EType.valid];
        [EType.cardImageUrl]: IInitialState[EType.cardImageUrl];
      }>,
    ) => {
      state[EType.name] = action.payload[EType.name];
      state[EType.valid] = action.payload[EType.valid];
      state[EType.cardImageUrl] = action.payload[EType.cardImageUrl];
    },

    [EType.reset]: () => initialState,
  },
});

export const selectEditIndustry = (state: RootState) => state.editIndustry;

export const {setId, setData, reset} = editIndustrySlice.actions;
