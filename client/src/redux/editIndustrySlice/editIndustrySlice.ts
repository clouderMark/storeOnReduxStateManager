import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import uuid from 'react-uuid';
import type {RootState} from '../store';
import {catalogApi} from '../catalogApi';
import {EType} from './EType';
import {IInitialState} from './IInitialState';
import {initialState} from './initialState';

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
    setInfoImage: (state, action: PayloadAction<FileList | null>) => {
      const files = action.payload;

      if (files) {
        const file = files[0];

        state[EType.infoImage] = file;
        state[EType.infoImageUrl] = URL.createObjectURL(file);
      }
    },
    setInfoTitle: (state, action: PayloadAction<IInitialState[EType.infoTitle]>) => {
      state[EType.infoTitle] = action.payload;
    },
    setInfoHeader: (state, action: PayloadAction<IInitialState[EType.infoHeader]>) => {
      state[EType.infoHeader] = action.payload;
    },
    setInfoListTitle: (state, action: PayloadAction<IInitialState[EType.infoListTitle]>) => {
      state[EType.infoListTitle] = action.payload;
    },

    appendInfoListItem: (state) => {
      state[EType.infoListItems].push({id: null, value: '', unique: uuid()});
    },
    removeInfoListItem: (state, action: PayloadAction<string>) => {
      state[EType.infoListItems] = state[EType.infoListItems].filter((elem) => elem.unique !== action.payload);
    },
    // prettier-ignore
    changeInfoListItem: (state, action: PayloadAction<{value: string, unique: string}>) => {
      state[EType.infoListItems] = state[EType.infoListItems].map((item) => (item.unique === action.payload.unique
        ?
        {...item, value: action.payload.value}
        :
        item));
    },

    appendInfoParagraph: (state) => {
      state[EType.infoParagraphs].push({id: null, value: '', unique: uuid()});
    },
    removeInfoParagraph: (state, action: PayloadAction<string>) => {
      state[EType.infoParagraphs] = state[EType.infoParagraphs].filter((elem) => elem.unique !== action.payload);
    },
    // prettier-ignore
    changeInfoParagraph: (state, action: PayloadAction<{value: string, unique: string}>) => {
      state[EType.infoParagraphs] = state[EType.infoParagraphs].map((item) => (item.unique === action.payload.unique
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

        const {info} = payload;

        state[EType.infoImageUrl] = info.image ? process.env.REACT_APP_IMG_URL + info.image : '';
        state[EType.infoTitle] = info.title;
        state[EType.infoHeader] = info.header;
        state[EType.infoListTitle] = info.listTitle;
        state[EType.infoListItems] = info.listItems.map((item) => ({...item, unique: uuid()}));
        state[EType.infoParagraphs] = info.paragraphs.map((item) => ({...item, unique: uuid()}));
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
  setInfoImage,
  setInfoTitle,
  setInfoHeader,
  setInfoListTitle,
  appendInfoListItem,
  changeInfoListItem,
  removeInfoListItem,
  appendInfoParagraph,
  removeInfoParagraph,
  changeInfoParagraph,
  reset,
} = editIndustrySlice.actions;
