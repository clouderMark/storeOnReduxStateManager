import {createSlice} from '@reduxjs/toolkit';
import type {RootState} from './store';
import {userApi} from './userApi';
import {catalogApi} from './catalogApi';
import {subscriptionApi} from './subscriptionApi';

interface IInitialState {
  isOpen: boolean;
}

const initialState: IInitialState = {
  isOpen: false,
};

export const loaderSlice = createSlice({
  name: 'loader',
  initialState,
  reducers: {
    showLoader: (state) => {
      state.isOpen = true;
    },
    closeLoader: (state) => {
      state.isOpen = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(userApi.endpoints.checkUser.matchPending, (state) => {
        state.isOpen = true;
      })
      .addMatcher(userApi.endpoints.checkUser.matchFulfilled, (state) => {
        state.isOpen = false;
      })
      .addMatcher(userApi.endpoints.checkUser.matchRejected, (state) => {
        state.isOpen = false;
      })
      .addMatcher(catalogApi.endpoints.getNavigation.matchPending, (state) => {
        state.isOpen = true;
      })
      .addMatcher(catalogApi.endpoints.getNavigation.matchFulfilled, (state) => {
        state.isOpen = false;
      })
      .addMatcher(catalogApi.endpoints.getNavigation.matchRejected, (state) => {
        state.isOpen = false;
      })
      .addMatcher(subscriptionApi.endpoints.adminDeleteSubscription.matchPending, (state) => {
        state.isOpen = true;
      })
      .addMatcher(subscriptionApi.endpoints.adminDeleteSubscription.matchFulfilled, (state) => {
        state.isOpen = false;
      })
      .addMatcher(subscriptionApi.endpoints.adminDeleteSubscription.matchRejected, (state) => {
        state.isOpen = false;
      });
  },
});

export const selectLoader = (state: RootState) => state.loader;
export const {showLoader, closeLoader} = loaderSlice.actions;
