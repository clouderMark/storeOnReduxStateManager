import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import uuid from 'react-uuid';
import type {RootState} from '../store';
import {catalogApi} from '../catalogApi';
import {EType} from './EType';
import {IInitialState} from './IInitialState';
import {initialState} from './initialState';
import {dialogWithTitleSlice} from '../dialogWithTitleSlice';

export const editIndustrySlice = createSlice({
  name: 'editIndustry',
  initialState,
  reducers: {
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
    },
    setValid: (state) => {
      state[EType.valid] = state[EType.name].trim() !== '';
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

    setOpinionTitle: (state, action: PayloadAction<IInitialState[EType.opinionTitle]>) => {
      state[EType.opinionTitle] = action.payload;
    },
    appendOpinionParagraph: (state) => {
      state[EType.opinionParagraphs].push({id: null, value: '', unique: uuid()});
    },
    removeOpinionParagraph: (state, action: PayloadAction<string>) => {
      state[EType.opinionParagraphs] = state[EType.opinionParagraphs].filter((elem) => elem.unique !== action.payload);
    },
    // prettier-ignore
    changeOpinionParagraph: (state, action: PayloadAction<{value: string; unique: string}>) => {
      // eslint-disable-next-line
      state[EType.opinionParagraphs] = state[EType.opinionParagraphs].map((item) =>
        item.unique === action.payload.unique ? {...item, value: action.payload.value} : item);
    },
    setOpinionListTitle: (state, action: PayloadAction<IInitialState[EType.opinionListTitle]>) => {
      state[EType.opinionListTitle] = action.payload;
    },
    appendOpinionListItem: (state) => {
      state[EType.opinionListItems].push({id: null, value: '', unique: uuid()});
    },
    removeOpinionListItem: (state, action: PayloadAction<string>) => {
      state[EType.opinionListItems] = state[EType.opinionListItems].filter((elem) => elem.unique !== action.payload);
    },
    // prettier-ignore
    changeOpinionListItem: (state, action: PayloadAction<{value: string; unique: string}>) => {
      // eslint-disable-next-line
      state[EType.opinionListItems] = state[EType.opinionListItems].map((item) =>
        item.unique === action.payload.unique ? {...item, value: action.payload.value} : item);
    },
    setOpinionImage: (state, action: PayloadAction<FileList | null>) => {
      const files = action.payload;

      if (files) {
        const file = files[0];

        state[EType.opinionImage] = file;
        state[EType.opinionImageUrl] = URL.createObjectURL(file);
      }
    },
    setOpinionName: (state, action: PayloadAction<IInitialState[EType.opinionName]>) => {
      state[EType.opinionName] = action.payload;
    },
    setOpinionPhone: (state, action: PayloadAction<IInitialState[EType.opinionPhone]>) => {
      state[EType.opinionPhone] = action.payload;
    },
    setOpinionFax: (state, action: PayloadAction<IInitialState[EType.opinionFax]>) => {
      state[EType.opinionFax] = action.payload;
    },
    setOpinionEmail: (state, action: PayloadAction<IInitialState[EType.opinionEmail]>) => {
      state[EType.opinionEmail] = action.payload;
    },

    [EType.reset]: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(dialogWithTitleSlice.actions.reset, () => initialState)
      .addCase(dialogWithTitleSlice.actions.setShow, (state, action) => {
        state.id = action.payload.id;
      })
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

        const {opinion} = payload;

        state[EType.opinionTitle] = opinion.title;
        state[EType.opinionListTitle] = opinion.listTitle;
        state[EType.opinionName] = opinion.name;
        state[EType.opinionPhone] = opinion.phone;
        state[EType.opinionFax] = opinion.fax;
        state[EType.opinionEmail] = opinion.email;
        state[EType.opinionImageUrl] = opinion.image ? process.env.REACT_APP_IMG_URL + opinion.image : '';
        state[EType.opinionParagraphs] = opinion.paragraphs.map((item) => ({...item, unique: uuid()}));
        state[EType.opinionListItems] = opinion.listItems.map((item) => ({...item, unique: uuid()}));
      })
      .addMatcher(catalogApi.endpoints.createIndustry.matchFulfilled, () => initialState)
      .addMatcher(catalogApi.endpoints.updateIndystry.matchFulfilled, () => initialState);
  },
});

export const selectEditIndustry = (state: RootState) => state.editIndustry;

export const {
  setCardImage,
  setName,
  setValid,
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

  setOpinionTitle,
  appendOpinionParagraph,
  removeOpinionParagraph,
  changeOpinionParagraph,
  setOpinionListTitle,
  appendOpinionListItem,
  removeOpinionListItem,
  changeOpinionListItem,
  setOpinionImage,
  setOpinionName,
  setOpinionPhone,
  setOpinionFax,
  setOpinionEmail,

  reset,
} = editIndustrySlice.actions;
