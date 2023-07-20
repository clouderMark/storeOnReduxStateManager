import {configureStore} from '@reduxjs/toolkit';
import {userApi} from './userApi';
import {userSlice} from './userSlice';
import {alertSlice} from './alertSlice';
import {loaderSlice} from './loaderSlice';
import {basketApi} from './basketApi';
import {basketSlice} from './basketSlice';
import {catalogSlice} from './catalogSlice';
import {catalogApi} from './catalogApi';
import {dialogWithTitleSlice} from './dialogWithTitleSlice';

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    [userApi.reducerPath]: userApi.reducer,
    basket: basketSlice.reducer,
    [basketApi.reducerPath]: basketApi.reducer,
    catalog: catalogSlice.reducer,
    [catalogApi.reducerPath]: catalogApi.reducer,
    alert: alertSlice.reducer,
    loader: loaderSlice.reducer,
    dialogWithTitle: dialogWithTitleSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userApi.middleware).concat(basketApi.middleware).concat(catalogApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
