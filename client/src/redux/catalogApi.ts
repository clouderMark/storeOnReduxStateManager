import {createApi, fetchBaseQuery, BaseQueryFn, FetchArgs} from '@reduxjs/toolkit/query/react';
import {ICustomError, IAreaResponse, IIdAndName, IAllProducts, INavigation} from '../interfaces/interfaces';

interface IData {
  body: FormData;
  token?: string;
}

interface IReqProds {
  industryId: number[] | null;
  solutionId: number[] | null;
  areaId: number[] | null;
  page: number;
  limit: number;
}

const BASE_URL = process.env.REACT_APP_API_URL;

export const catalogApi = createApi({
  reducerPath: 'catalogApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}`,
    credentials: 'include',
  }) as BaseQueryFn<string | FetchArgs, unknown, ICustomError, {}>,
  endpoints: (builder) => ({
    getNavigation: builder.query<INavigation, void>({
      query: () => ({
        url: 'navigation/getall',
        method: 'GET',
      }),
    }),
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
    getAreas: builder.query<IIdAndName[], void>({
      query: () => ({
        url: '/area/getall',
        method: 'GET',
      }),
    }),
    getAllProds: builder.query<IAllProducts, IReqProds>({
      query: (data) => {
        const {industryId, solutionId, areaId, page, limit} = data;
        let url = '/product/getall';

        // фильтр товаров по индустриям и/или решению
        if (industryId) url = `${url}/industryId/${industryId}`;
        if (solutionId) url = `${url}/solutionId/${solutionId}`;
        if (areaId) url = `${url}/$areaId/${areaId}`;

        return {
          url,
          method: 'GET',
          params: {
            // GET-параметры для постраничной навигации
            page,
            limit,
          },
        };
      },
    }),
  }),
});

export const {
  useGetNavigationQuery,
  useCreateIndustryQuery,
  useGetIndustriesQuery,
  useGetSubIndustriesQuery,
  useGetSolutionsQuery,
  useGetAreasQuery,
  useGetAllProdsQuery,
} = catalogApi;
