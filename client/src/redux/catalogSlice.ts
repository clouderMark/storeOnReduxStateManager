import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import type {RootState} from './store';
// import {IProductWithProps} from '../interfaces/interfaces';

interface IInitialState {
  // industries: IAreaResponse[];
  // subIndustries: IAreaResponse[];
  // solutions: IIdAndName[];
  // areas: IIdAndName[];
  // products: IProductWithProps[];
  industry: number[];
  solution: number[];
  area: number[];
  page: number;
  count: number;
  limit: number;
}

const initialState: IInitialState = {
  // industries: [],
  // subIndustries: [],
  // solutions: [],
  // areas: [],
  // products: [],
  industry: [],
  solution: [],
  area: [],
  page: 1,
  count: 0,
  limit: 5,
};

export const catalogSlice = createSlice({
  name: 'catalog',
  initialState,
  reducers: {
    // setIndustries: (state, action: PayloadAction<IAreaResponse[]>) => {
    //   state.industries = action.payload;
    // },
    // setSubIndustries: (state, action: PayloadAction<IAreaResponse[]>) => {
    //   state.subIndustries = action.payload;
    // },
    // setSolutions: (state, action: PayloadAction<IIdAndName[]>) => {
    //   state.solutions = action.payload;
    // },
    // setAreas: (state, action: PayloadAction<IIdAndName[]>) => {
    //   state.areas = action.payload;
    // },
    // setProducts: (state, action: PayloadAction<IProductWithProps[]>) => {
    //   state.products = action.payload;
    // },
    setIndustry: (state, action: PayloadAction<number[]>) => {
      state.industry = action.payload;
    },
    setSolution: (state, action: PayloadAction<number[]>) => {
      state.solution = action.payload;
    },
    setArea: (state, action: PayloadAction<number[]>) => {
      state.area = action.payload;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    setCount: (state, action: PayloadAction<number>) => {
      state.count = action.payload;
    },
    setLimit: (state, action: PayloadAction<number>) => {
      state.limit = action.payload;
    },
  },
});

export const selectCatalog = (state: RootState) => state.catalog;
export const {setArea, setIndustry, setSolution, setPage, setCount} = catalogSlice.actions;

export const selectPages = (state: RootState) => Math.ceil(state.catalog.count / state.catalog.limit);
