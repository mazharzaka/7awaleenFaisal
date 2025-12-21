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
  tagTypes: ["Products"],
  endpoints: (builder) => ({
    getstores: builder.query<Store[], void>({
      query: () => "/store",
    }),
    getGeustOrder: builder.query<any, void>({
      query: () => ({
        url: "/order/guest",
      }),
    }),
    getproducts: builder.query<
      { count: number; products: IProductDocument[] },
      void
    >({
      query: () => "/product",
    }),
    getadvertisedproducts: builder.query<IProductDocument[], void>({
      query: () => "/product/advertised",
    }),
    getFilteredProducts: builder.query({
      query: ({ category, subCategory, minPrice, maxPrice }) => {
        const params = new URLSearchParams();
        if (category) params.append("category", category);
        if (subCategory) params.append("subCategory", subCategory);
        if (minPrice) params.append("minPrice", minPrice);
        if (maxPrice) params.append("maxPrice", maxPrice);
        console.log(params.toString());

        return `/product?${params.toString()}`;
      },
      providesTags: ["Products"],
    }),
    DeleteProduct: builder.mutation({
      query: ({ id, deleted }) => {
        const params = new URLSearchParams();
        if (id) params.append("id", id);
        if (deleted) params.append("deleted", deleted);

        return {
          url: `/product?${params.toString()}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["Products"],
    }),
    Advertiseing: builder.mutation({
      query: ({ id }) => {
        const params = new URLSearchParams();
        if (id) params.append("id", id);

        return {
          url: `/product/advertising?${params.toString()}`,
          method: "POST",
        };
      },
    }),
    EditProduct: builder.mutation({
      query: ({ id, formData }: { id: string; formData: FormData }) => {
        console.log(`/product/edit/${id}`);
        return {
          url: `/product/edit/${id}`,
          method: "POST",
          body: formData,
        };
      },
    }),

    getcategories: builder.query<any, void>({
      query: () => "/product/categories",
    }),
    getsubcategories: builder.query<any, string>({
      query: (sub: string) => `/product/subcategories/?category=${sub}`,
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
  useGetFilteredProductsQuery,
  useGetadvertisedproductsQuery,
  useGetproductsQuery,
  useGetproductQuery,
  useGetcategoriesQuery,
  useEditProductMutation,
  useDeleteProductMutation,
  useAdvertiseingMutation,
  useGetsubcategoriesQuery,
  useLoginMutation,
  useAddstoreMutation,
  useGetGeustOrderQuery,
  useAddProdectMutation,
  useGeustOrderMutation,
} = apiSlice;
