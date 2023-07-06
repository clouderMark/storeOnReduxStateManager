import {createApi, fetchBaseQuery, BaseQueryFn, FetchArgs} from '@reduxjs/toolkit/query/react';
import {ICustomError, IAreaResponse, IIdAndName} from '../interfaces/interfaces';

interface IData {
  body: FormData;
  token?: string;
}

const BASE_URL = process.env.REACT_APP_API_URL;

export const catalogApi = createApi({
  reducerPath: 'catalogApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}`,
    credentials: 'include',
  }) as BaseQueryFn<string | FetchArgs, unknown, ICustomError, {}>,
  endpoints: (builder) => ({
    createIndustry: builder.query<IAreaResponse, IData>({
      query: (data) => {
        const req: FetchArgs = {
          url: '/industry/create',
          method: 'POST',
          body: {...data.body},
        };

        if (data.token) req.headers = {authorization: `Bearer ${data.token}`};

        return req;
      },
    }),
    getIndustries: builder.query<IAreaResponse[], void>({
      query: () => ({
        url: '/industry/getall',
        method: 'GET',
      }),
    }),
    getSubIndustries: builder.query<IAreaResponse[], void>({
      query: () => ({
        url: '/subindustry/getall',
        method: 'GET',
      }),
    }),
    getSolutions: builder.query<IIdAndName[], void>({
      query: () => ({
        url: '/solution/getall',
        method: 'GET',
      }),
    }),
  }),
});

export const {useCreateIndustryQuery, useGetIndustriesQuery, useGetSubIndustriesQuery, useGetSolutionsQuery} =
  catalogApi;
