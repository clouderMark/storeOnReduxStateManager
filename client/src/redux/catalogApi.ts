import {createApi, fetchBaseQuery, BaseQueryFn, FetchArgs} from '@reduxjs/toolkit/query/react';
import {ICustomError, IAreaResponse} from '../interfaces/interfaces';

interface IData {
  body: FormData;
  token?: string;
}

const BASE_URL = process.env.REACT_APP_API_URL;

export const catalogApi = createApi({
  reducerPath: 'catalogApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}industry`,
    credentials: 'include',
  }) as BaseQueryFn<string | FetchArgs, unknown, ICustomError, {}>,
  endpoints: (builder) => ({
    createIndustry: builder.query<IAreaResponse, IData>({
      query: (data) => {
        const req: FetchArgs = {
          url: '/create',
          method: 'POST',
          body: {...data.body},
        };

        if (data.token) req.headers = {authorization: `Bearer ${data.token}`};

        return req;
      },
    }),
    getIndustries: builder.query<IAreaResponse[], void>({
      query: () => ({
        url: '/getall',
        method: 'GET',
      }),
    }),
    getSubIndustries: builder.query<IAreaResponse[], void>({
      query: () => ({
        url: '/getall',
        method: 'GET',
      }),
    }),
  }),
});

export const {useCreateIndustryQuery, useGetIndustriesQuery, useGetSubIndustriesQuery} = catalogApi;
