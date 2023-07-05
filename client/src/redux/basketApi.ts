import {BaseQueryFn, FetchArgs, createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {IBasket, ICustomError} from '../interfaces/interfaces';

const BASE_URL = process.env.REACT_APP_API_URL;

export const basketApi = createApi({
  reducerPath: 'basketApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}basket`,
    credentials: 'include',
  }) as BaseQueryFn<string | FetchArgs, unknown, ICustomError, {}>,
  endpoints: (builder) => ({
    getBasket: builder.query<IBasket, void>({
      query: () => ({
        url: '/getone',
        method: 'GET',
      }),
    }),
    appendInBasket: builder.mutation<IBasket, number>({
      query: (id) => ({
        url: `/product/${id}/append/1`,
        method: 'PUT',
      }),
    }),
    incrementInBasket: builder.mutation<IBasket, number>({
      query: (id) => ({
        url: `/product/${id}/increment/1`,
        method: 'PUT',
      }),
    }),
    decrementInBasket: builder.mutation<IBasket, number>({
      query: (id) => ({
        url: `/product/${id}/decrement/1`,
        method: 'PUT',
      }),
    }),
    removeInBasket: builder.mutation<IBasket, number>({
      query: (id) => ({
        url: `/product/${id}/remove/1`,
        method: 'PUT',
      }),
    }),
    clearBasket: builder.query<IBasket, void>({
      query: () => ({
        url: '/product/clear',
        method: 'PUT',
      }),
    }),
  }),
});

export const {
  useGetBasketQuery,
  useAppendInBasketMutation,
  useIncrementInBasketMutation,
  useDecrementInBasketMutation,
  useRemoveInBasketMutation,
  useClearBasketQuery,
} = basketApi;
