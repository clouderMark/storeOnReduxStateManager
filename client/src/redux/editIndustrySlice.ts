import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import type {RootState} from './store';
import {catalogApi} from './catalogApi';

export enum EType {
  id = 'id',
  reset = 'reset',

  name = 'name',
  valid = 'valid',

  cardImage = 'cardImage',
  cardImageUrl = 'cardImageUrl',
}

interface IInitialState {
  [EType.id]: number | null;

  [EType.name]: string;
  [EType.valid]: null | boolean;

  [EType.cardImage]: File | null;
  [EType.cardImageUrl]: string;
}

const initialState: IInitialState = {
  [EType.id]: null,

  [EType.name]: '',
  [EType.valid]: null,

  [EType.cardImage]: null,
  [EType.cardImageUrl]: '',
};

export const editIndustrySlice = createSlice({
  name: 'editIndustry',
  initialState,
  reducers: {
    setId: (state, action: PayloadAction<IInitialState[EType.id]>) => {
      state[EType.id] = action.payload;
    },
    setCardImage: (state, action: PayloadAction<FileList | null>) => {
      const files = action.payload;

      if (files) {
        const file = files[0];

        state[EType.cardImage] = file;
        state[EType.cardImageUrl] = URL.createObjectURL(file);
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
