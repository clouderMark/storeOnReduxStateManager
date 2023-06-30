import {createApi, fetchBaseQuery, BaseQueryFn, FetchArgs} from '@reduxjs/toolkit/query/react';
import {ICustomError} from '../interfaces/interfaces';

const BASE_URL = process.env.REACT_APP_API_URL;

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/user`,
    credentials: 'include',
  }) as BaseQueryFn<string | FetchArgs, unknown, ICustomError, {}>,
  endpoints: (builder) => ({
    signupUser: builder.mutation({
      query: (data: {email: string; password: string}) => ({
        url: '/signup',
        method: 'POST',
        body: {...data, role: 'USER'},
      }),
    }),
    loginUser: builder.mutation({
      query: (data: {email: string; password: string}) => ({
        url: '/login',
        method: 'POST',
        body: {...data, role: 'USER'},
      }),
    }),
    checkUser: builder.mutation({
      query: () => ({
        url: '/check',
        method: 'GET',
        prepareHeaders: (headers: Headers) => {
          const token = localStorage.getItem('token');

          if (token) {
            headers.set('authorization', `Bearer ${token}`);
          }

          return headers;
        },
      }),
    }),
  }),
});

export const {useSignupUserMutation, useLoginUserMutation, useCheckUserMutation} = userApi;
