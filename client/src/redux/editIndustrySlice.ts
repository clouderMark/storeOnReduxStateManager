import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import uuid from 'react-uuid';
import type {RootState} from './store';
import {catalogApi} from './catalogApi';
import {IParagraphs} from '../interfaces/interfaces';

export enum EType {
  id = 'id',
  reset = 'reset',

  name = 'name',
  valid = 'valid',

  cardImage = 'cardImage',
  cardImageUrl = 'cardImageUrl',

  sliderImage = 'sliderImage',
  sliderImageUrl = 'sliderImageUrl',

  headerImage = 'headerImage',
  headerImageUrl = 'headerImageUrl',

  title = 'title',
  paragraphs = 'paragraphs',
}

interface IInitialState {
  [EType.id]: number | null;

  [EType.name]: string;
  [EType.valid]: null | boolean;

  [EType.cardImage]: File | null;
  [EType.cardImageUrl]: string;

  [EType.sliderImage]: File | null;
  [EType.sliderImageUrl]: string;

  [EType.headerImage]: File | null;
  [EType.headerImageUrl]: string;

  [EType.title]: string;

  [EType.paragraphs]: IParagraphs[];
}

const initialState: IInitialState = {
  [EType.id]: null,

  [EType.name]: '',
  [EType.valid]: null,

  [EType.cardImage]: null,
  [EType.cardImageUrl]: '',

  [EType.sliderImage]: null,
  [EType.sliderImageUrl]: '',

  [EType.headerImage]: null,
  [EType.headerImageUrl]: '',

  [EType.title]: '',
  [EType.paragraphs]: [],
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
    setSliderImage: (state, action: PayloadAction<FileList | null>) => {
      const files = action.payload;

      if (files) {
        const file = files[0];

        state[EType.sliderImage] = file;
        state[EType.sliderImageUrl] = URL.createObjectURL(file);
      }
    },

    setHeaderImage: (state, action: PayloadAction<FileList | null>) => {
      const files = action.payload;

      if (files) {
        const file = files[0];

        state[EType.headerImage] = file;
        state[EType.headerImageUrl] = URL.createObjectURL(file);
      }
    },

    setTitle: (state, action: PayloadAction<IInitialState[EType.title]>) => {
      state[EType.title] = action.payload;
    },

    appendParagraph: (state) => {
      state[EType.paragraphs].push({id: null, value: '', unique: uuid()});
    },
    removeParagraph: (state, action: PayloadAction<string>) => {
      state[EType.paragraphs] = state[EType.paragraphs].filter((elem) => elem.unique !== action.payload);
    },
    // prettier-ignore
    changeParagraph: (state, action: PayloadAction<{value: string, unique: string}>) => {
      state[EType.paragraphs] = state[EType.paragraphs].map((item) => (item.unique === action.payload.unique
        ?
        {...item, value: action.payload.value}
        :
        item));
    },

    [EType.reset]: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(catalogApi.endpoints.getIndustry.matchFulfilled, (state, action) => {
        const {payload} = action;

        state[EType.name] = payload[EType.name];
        state[EType.valid] = payload[EType.name] !== '';
        state[EType.cardImageUrl] = payload[EType.cardImage]
          ? process.env.REACT_APP_IMG_URL + payload[EType.cardImage]
          : '';
        state[EType.sliderImageUrl] = payload[EType.sliderImage]
          ? process.env.REACT_APP_IMG_URL + payload[EType.sliderImage]
          : '';
        state[EType.title] = payload[EType.title];
        state[EType.headerImageUrl] = payload[EType.headerImage]
          ? process.env.REACT_APP_IMG_URL + payload[EType.headerImage]
          : '';
        state[EType.paragraphs] = payload[EType.paragraphs].map((item) => ({...item, unique: uuid()}));
      })
      .addMatcher(catalogApi.endpoints.createIndustry.matchFulfilled, () => initialState)
      .addMatcher(catalogApi.endpoints.updateIndystry.matchFulfilled, () => initialState);
  },
});

export const selectEditIndustry = (state: RootState) => state.editIndustry;

export const {
  setId,
  setCardImage,
  setName,
  setSliderImage,
  setHeaderImage,
  setTitle,
  appendParagraph,
  removeParagraph,
  changeParagraph,
  reset,
} = editIndustrySlice.actions;
