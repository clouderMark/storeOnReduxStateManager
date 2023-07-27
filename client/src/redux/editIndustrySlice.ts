import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import type {RootState} from './store';
import {catalogApi} from './catalogApi';

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
    setCardImage: (state, action: PayloadAction<IInitialState[EType.cardImage]>) => {
      if (action.payload) {
        state[EType.cardImage] = action.payload;
        state[EType.cardImageUrl] = URL.createObjectURL(action.payload);
      }
    },
    setName: (state, action: PayloadAction<IInitialState[EType.name]>) => {
      state[EType.name] = action.payload;
      state[EType.valid] = state[EType.name] !== '';
    },

    [EType.reset]: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(catalogApi.endpoints.getIndustry.matchFulfilled, (state, action) => {
        state[EType.name] = action.payload[EType.name];
        state[EType.valid] = action.payload[EType.name] !== '';
        state[EType.cardImageUrl] = action.payload[EType.cardImage]
          ? process.env.REACT_APP_IMG_URL + action.payload[EType.cardImage]
          : '';
      })
      .addMatcher(catalogApi.endpoints.createIndustry.matchFulfilled, () => initialState)
      .addMatcher(catalogApi.endpoints.updateIndystry.matchFulfilled, () => initialState);
  },
});

export const selectEditIndustry = (state: RootState) => state.editIndustry;

export const {setId, setCardImage, setName, reset} = editIndustrySlice.actions;
