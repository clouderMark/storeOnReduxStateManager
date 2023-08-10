import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import type {RootState} from './store';
import {IIdAndName} from '../interfaces/interfaces';
import {catalogApi} from './catalogApi';

interface IInitialState {
  industries: IIdAndName[];
  order: 'asc' | 'desc';
}

const initialState: IInitialState = {
  industries: [],
  order: 'asc',
};

export const industriesSlice = createSlice({
  name: 'catalog',
  initialState,
  reducers: {
    setIndustries: (state, action: PayloadAction<IIdAndName[]>) => {
      state.industries = action.payload;
    },
    setOrder: (state) => {
      state.order = state.order === 'asc' ? 'desc' : 'asc';
    },

    reset: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addMatcher(catalogApi.endpoints.getNavigation.matchFulfilled, (state, action) => {
      const {payload} = action;

      state.industries = payload.industries;
    });
  },
});

export const selectIndustries = (state: RootState) => state.industries;
export const selectSortedIndustries = (state: RootState) => {
  let result;

  if (state.industries.order === 'asc') {
    result = [...state.industries.industries].sort((a, b) => b.name.localeCompare(a.name));
  } else {
    result = [...state.industries.industries].sort((a, b) => a.name.localeCompare(b.name));
  }

  return result;
};

export const {setIndustries, setOrder, reset} = industriesSlice.actions;
