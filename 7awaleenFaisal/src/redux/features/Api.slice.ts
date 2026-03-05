import { Store } from "@/types/stores";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "@/redux/store";
import { IProductDocument } from "@/types/product";
import { setCredentials, logout } from "./Auth.slice";
const baseUrl = process.env.NEXT_PUBLIC_API_URL;
// "http://localhost:3000"
const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:3000",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.refreshToken;
    if (token) headers.set("authorization", `Bearer ${token}`);
    return headers;
  },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    // try to get a new token
    const refreshResult = await baseQuery(
      {
        url: "/user/refresh-token",
        method: "POST",
        body: { refreshToken: (api.getState() as RootState).auth.refreshToken },
      },
      api,
      extraOptions,
    );

    if (refreshResult.data) {
      // store the new token
      api.dispatch(
        setCredentials({
          ...(refreshResult.data as any),
          refreshToken: (api.getState() as RootState).auth.refreshToken,
        }),
      );
      // retry the initial query
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logout());
    }
  }
  return result;
};

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Products", "GuestOrder", "Cart", "Order", "User"],
  endpoints: (builder) => ({
    getstores: builder.query<Store[], void>({
      query: () => "/store",
    }),
    getGeustOrder: builder.query<any, void>({
      query: () => ({
        url: "/order/guest",
      }),
      providesTags: ["GuestOrder"],
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
    register: builder.mutation({
      query: (credentials) => ({
        url: "/user",
        method: "POST",
        body: credentials,
      }),
    }),
    googleLogin: builder.mutation({
      query: (credentials) => ({
        url: "/user/google-login",
        method: "POST",
        body: credentials,
      }),
    }),
    sendOtp: builder.mutation({
      query: (data) => ({
        url: "/user/send-otp",
        method: "POST",
        body: data,
      }),
    }),
    verifyOtp: builder.mutation({
      query: (data) => ({
        url: "/user/verify-otp",
        method: "POST",
        body: data,
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
      invalidatesTags: ["GuestOrder"],
    }),
    geustOrderstatus: builder.mutation({
      query: (credentials) => ({
        url: "/order/guest/status",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["GuestOrder"],
    }),

    // Create order (checkout)
    createOrder: builder.mutation({
      query: (orderData) => ({
        url: "/order/checkout",
        method: "POST",
        body: orderData,
      }),
    }),

    // Get single order by ID
    getOrderById: builder.query<any, string>({
      query: (orderId) => `/order/${orderId}`,
      providesTags: (result, error, id) => [{ type: "Order", id }],
    }),

    // Get user orders
    getUserOrders: builder.query<any[], void>({
      query: () => "/order/my-orders",
      providesTags: ["Order"],
    }),

    // --- Cart Endpoints ---
    getUserCart: builder.query<any, void>({
      query: () => "/cart",
      providesTags: ["Cart"],
    }),
    addToBackendCart: builder.mutation<any, any>({
      query: (itemData) => ({
        url: "/cart/add",
        method: "POST",
        body: itemData,
      }),
      invalidatesTags: ["Cart"],
    }),
    updateBackendCartQuantity: builder.mutation<any, any>({
      query: (updateData) => ({
        url: "/cart/update",
        method: "POST",
        body: updateData,
      }),
      invalidatesTags: ["Cart"],
    }),
    removeFromBackendCart: builder.mutation<any, string>({
      query: (productId) => ({
        url: "/cart/remove",
        method: "POST",
        body: { productId },
      }),
      invalidatesTags: ["Cart"],
    }),
    clearBackendCart: builder.mutation<any, void>({
      query: () => ({
        url: "/cart/clear",
        method: "DELETE",
      }),
      invalidatesTags: ["Cart"],
    }),
    syncBackendCart: builder.mutation<any, { items: any[] }>({
      query: (syncData) => ({
        url: "/cart/sync",
        method: "POST",
        body: syncData,
      }),
      invalidatesTags: ["Cart"],
    }),
    // Admin Orders
    getAllOrders: builder.query<any[], void>({
      query: () => "/order/Allorders",
      providesTags: ["Order"],
    }),
    updateOrderStatus: builder.mutation<
      any,
      { orderId: string; status: string }
    >({
      query: (data) => ({
        url: "/order/status",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Order"],
    }),
    getMe: builder.query<any, void>({
      query: () => "/user/me",
      providesTags: ["User"],
    }),
    updateProfile: builder.mutation<any, any>({
      query: (data) => ({
        url: "/user/update-profile",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
    updatePassword: builder.mutation<any, any>({
      query: (data) => ({
        url: "/user/update-password",
        method: "POST",
        body: data,
      }),
    }),
    getDashboardStats: builder.query<
      any,
      { days?: string; paymentMethod?: string }
    >({
      query: ({ days, paymentMethod }) => {
        const params = new URLSearchParams();
        if (days) params.append("days", days);
        if (paymentMethod) params.append("paymentMethod", paymentMethod);
        return `/dashboard/stats?${params.toString()}`;
      },
    }),
    getDrivers: builder.query<any[], void>({
      query: () => "/admin/drivers",
    }),
    updateDriverStatus: builder.mutation<
      any,
      { driverId: string; status: string }
    >({
      query: (data) => ({
        url: "/admin/drivers",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetDashboardStatsQuery,
  useGetstoresQuery,
  useGetFilteredProductsQuery,
  useGetadvertisedproductsQuery,
  useGetproductsQuery,
  useGetproductQuery,
  useGeustOrderstatusMutation,
  useGetcategoriesQuery,
  useEditProductMutation,
  useDeleteProductMutation,
  useAdvertiseingMutation,
  useGetsubcategoriesQuery,
  useLoginMutation,
  useRegisterMutation,
  useGoogleLoginMutation,
  useSendOtpMutation,
  useVerifyOtpMutation,
  useAddstoreMutation,
  useGetGeustOrderQuery,
  useAddProdectMutation,
  useGeustOrderMutation,
  useCreateOrderMutation,
  useGetOrderByIdQuery,
  useGetUserOrdersQuery,
  // Cart hooks
  useGetUserCartQuery,
  useAddToBackendCartMutation,
  useUpdateBackendCartQuantityMutation,
  useRemoveFromBackendCartMutation,
  useClearBackendCartMutation,
  useSyncBackendCartMutation,
  useGetAllOrdersQuery,
  useUpdateOrderStatusMutation,
  useGetMeQuery,
  useUpdateProfileMutation,
  useUpdatePasswordMutation,
  useGetDriversQuery,
  useUpdateDriverStatusMutation,
} = apiSlice;
