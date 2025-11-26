import { Store } from "@/types/stores";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "@/redux/store";
import { IProductDocument } from "@/types/product";
const baseUrl = process.env.NEXT_PUBLIC_API_URL;
export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      if (token) headers.set("authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getstores: builder.query<Store[], void>({
      query: () => "/store",
    }),
    getGeustOrder: builder.query<any, void>({
      query: () => ({
        url: "/order/guest",
      }),
    }),
    getproducts: builder.query<IProductDocument[], void>({
      query: () => "/product",
    }),
    getproduct: builder.query<IProductDocument, string>({
      query: (id: string) => `/product/${id}`,
    }),
    login: builder.mutation({
      query: (credentials) => ({
        url: "/user/login",
        method: "POST",
        body: credentials,
      }),
    }),
    addstore: builder.mutation({
      query: (credentials) => ({
        url: "/store",
        method: "POST",
        body: credentials,
      }),
    }),
    addProdect: builder.mutation({
      query: (credentials) => ({
        url: "/product",
        method: "POST",
        body: credentials,
      }),
    }),

    geustOrder: builder.mutation({
      query: (credentials) => ({
        url: "/order/guest",
        method: "POST",
        body: credentials,
      }),
    }),
  }),
});

export const {
  useGetstoresQuery,
  useGetproductsQuery,
  useGetproductQuery,
  useLoginMutation,
  useAddstoreMutation,
  useGetGeustOrderQuery,
  useAddProdectMutation,
  useGeustOrderMutation,
} = apiSlice;
