import {createApi, fetchBaseQuery, BaseQueryFn, FetchArgs} from '@reduxjs/toolkit/query/react';
import {ICustomError, IAreaResponse, IIdAndName, IAllProducts, INavigation} from '../interfaces/interfaces';

interface IData {
  body: FormData;
  token?: string;
}

interface IUpdateData extends IData {
  id: number;
}

interface IIdToken {
  id: number;
  token: string;
}

interface IReqProds {
  industryId: number[] | null;
  solutionId: number[] | null;
  areaId: number[] | null;
  page: number;
  limit: number;
}

const BASE_URL = process.env.REACT_APP_API_URL;

// prettier-ignore
export const catalogApi = createApi({
  reducerPath: 'catalogApi',
  tagTypes: ['Navigation'],
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
      providesTags: (result) => (
        result
          ?
          [...[
            ...result.industries,
            ...result.solutions,
            ...result.subIndustries,
          ].map(({id}) => ({type: 'Navigation' as const, id})), 'Navigation']
          :
          ['Navigation']
      ),
    }),

    createIndustry: builder.mutation<IAreaResponse, IData>({
      query: (data) => {
        const req: FetchArgs = {
          url: '/industry/create',
          method: 'POST',
          body: {...data.body},
        };

        if (data.token) req.headers = {authorization: `Bearer ${data.token}`};

        return req;
      },
      invalidatesTags: ['Navigation'],
    }),
    updateIndystry: builder.mutation<IAreaResponse[], IUpdateData>({
      query: (data) => {
        const req: FetchArgs = {
          url: `/industry/update/${data.id}`,
          method: 'PUT',
          body: {...data.body},
        };

        if (data.token) req.headers = {authorization: `Bearer ${data.token}`};

        return req;
      },
      invalidatesTags: ['Navigation'],
    }),
    getIndustries: builder.query<IAreaResponse[], void>({
      query: () => ({
        url: '/industry/getall',
        method: 'GET',
      }),
    }),
    getIndustry: builder.mutation<IAreaResponse, number>({
      query: (id) => ({
        url: `/industry/getone/${id}`,
        method: 'GET',
      }),
    }),
    deleteIndustry: builder.mutation<IAreaResponse, IIdToken>({
      query: (data) => ({
        url: `/industry/delete/${data.id}`,
        method: 'DELETE',
        headers: {authorization: `Bearer ${data.token}`},
      }),
      invalidatesTags: ['Navigation'],
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

  useCreateIndustryMutation,
  useUpdateIndystryMutation,
  useDeleteIndustryMutation,
  useGetIndustriesQuery,
  useGetIndustryMutation,

  useGetSubIndustriesQuery,
  useGetSolutionsQuery,
  useGetAreasQuery,
  useGetAllProdsQuery,
} = catalogApi;
