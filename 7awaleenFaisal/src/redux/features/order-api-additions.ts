/**
 * Frontend API Enhancements for Orders
 * API slice additions for order creation with WhatsApp support
 */

// Add these mutations to your existing Api.slice.ts

export const orderApi = api.injectEndpoints({
  endpoints: (build) => ({
    // Create order for authenticated users
    createOrder: build.mutation({
      query: (orderData) => ({
        url: '/api/order/checkout',
        method: 'POST',
        body: orderData,
      }),
    }),

    // Create guest order (existing, but updated)
    createGuestOrder: build.mutation({
      query: (orderData) => ({
        url: '/api/order/guest-order',
        method: 'POST',
        body: orderData,
      }),
    }),

    // Get order by ID
    getOrderById: build.query({
      query: (orderId) => `/api/order/${orderId}`,
    }),

    // Get my orders (for authenticated users)
    getMyOrders: build.mutation({
      query: (userId) => ({
        url: '/api/order/my-orders',
        method: 'POST',
        body: { userId },
      }),
    }),

    // Get all orders (admin)
    getAllOrders: build.query({
      query: () => '/api/order/all',
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useCreateGuestOrderMutation,
  useGetOrderByIdQuery,
  useGetMyOrdersMutation,
  useGetAllOrdersQuery,
} = orderApi;
