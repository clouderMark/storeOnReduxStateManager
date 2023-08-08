import {createApi, fetchBaseQuery, BaseQueryFn, FetchArgs} from '@reduxjs/toolkit/query/react';
import {ICustomError, ISubscribe} from '../interfaces/interfaces';
import type {RootState} from './store';

const BASE_URL = process.env.REACT_APP_API_URL;

// prettier-ignore
export const subscriptionApi = createApi({
  reducerPath: 'subscriptionApi',
  tagTypes: ['Subscription'],
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}`,
    credentials: 'include',
    prepareHeaders: (headers, {getState}) => {
      const {token} = (getState() as RootState).user;

      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }

      return headers;
    },
  }) as BaseQueryFn<string | FetchArgs, unknown, ICustomError, {}>,
  endpoints: (builder) => ({
    adminGetAllSubscriptions: builder.query<ISubscribe[], void>({
      query: () => ({
        url: 'subscription/admin/getall',
        method: 'GET',
      }),
      providesTags: (result) => (
        result ? [...result.map(({id}) => ({type: 'Subscription' as const, id})), 'Subscription'] : ['Subscription']
      ),
    }),
    adminDeleteSubscription: builder.mutation<ISubscribe, number>({
      query: (id) => ({
        url: `subscription/admin/delete/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Subscription'],
    }),
  }),
});

export const {useAdminGetAllSubscriptionsQuery, useAdminDeleteSubscriptionMutation} = subscriptionApi;
