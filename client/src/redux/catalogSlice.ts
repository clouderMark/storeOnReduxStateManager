import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import type {RootState} from './store';
import {IAreaResponse, IIdAndName, IProductWithProps} from '../interfaces/interfaces';

interface IInitialState {
  industries: IAreaResponse[];
  subIndustries: IAreaResponse[];
  solutions: IIdAndName[];
  areas: IIdAndName[];
  products: IProductWithProps[];
  industry: number[];
  solution: number[];
  area: number[];
  page: number;
  count: number;
  limit: number;
}

const initialState: IInitialState = {
  industries: [],
  subIndustries: [],
  solutions: [],
  areas: [],
  products: [],
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
    setIndustries: (state, action: PayloadAction<IAreaResponse[]>) => {
      state.industries = action.payload;
    },
    setSubIndustries: (state, action: PayloadAction<IAreaResponse[]>) => {
      state.subIndustries = action.payload;
    },
    setSolutions: (state, action: PayloadAction<IIdAndName[]>) => {
      state.solutions = action.payload;
    },
    setAreas: (state, action: PayloadAction<IIdAndName[]>) => {
      state.areas = action.payload;
    },
    setProducts: (state, action: PayloadAction<IProductWithProps[]>) => {
      state.products = action.payload;
    },
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

// export const selectIndustries = (state: RootState) => state.catalog.industries;
// export const selectSubIndustries = (state: RootState) => state.catalog.subIndustries;
// export const selectSolutions = (state: RootState) => state.catalog.solutions;
// export const selectAreas = (state: RootState) => state.catalog.areas;
// export const selectProducts = (state: RootState) => state.catalog.products;
// export const selectIndustry = (state: RootState) => state.catalog.industry;
// export const selectSolution = (state: RootState) => state.catalog.solution;
// export const selectArea = (state: RootState) => state.catalog.area;
// export const selectPage = (state: RootState) => state.catalog.page;
// export const selectCount = (state: RootState) => state.catalog.count;
// export const selectPages = (state: RootState) => Math.ceil(state.catalog.count / state.catalog.limit);
// export const selectLimit = (state: RootState) => state.catalog.limit;
