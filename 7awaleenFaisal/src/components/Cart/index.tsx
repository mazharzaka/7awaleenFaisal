"use client";
import React from "react";
import Discount from "./Discount";
import OrderSummary from "./OrderSummary";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { useEffect } from "react";
import { useGetUserCartQuery, useClearBackendCartMutation } from "@/redux/features/Api.slice";
import { syncCartWithBackend, removeAllItemsFromCart } from "@/redux/features/cart-slice";
import SingleItem from "./SingleItem";
import Breadcrumb from "../Common/Breadcrumb";
import Link from "next/link";
import EmptyState from "../UI/EmptyState";
import toast from "react-hot-toast";

const Cart = () => {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state) => state.cartReducer.items);
  const { token } = useAppSelector((state) => state.auth);

  // Fetch cart if authenticated
  const { data: backendCart, isLoading } = useGetUserCartQuery(undefined, {
    skip: !token,
  });

  const [clearBackendCart] = useClearBackendCartMutation();

  // Sync backend cart with Redux
  useEffect(() => {
    if (backendCart?.success && backendCart.data?.items) {
      const formattedItems = backendCart.data.items.map((item: any) => ({
        id: item.productId._id || item.productId,
        title: item.productId.name,
        price: item.price,
        discountedPrice: item.discountedPrice,
        quantity: item.quantity,
        imgs: {
          thumbnails: item.productId.imageURL || [],
          previews: item.productId.imageURL || [],
        },
      }));
      dispatch(syncCartWithBackend(formattedItems));
    }
  }, [backendCart, dispatch]);

  const handleClearCart = async () => {
    dispatch(removeAllItemsFromCart());
    if (token) {
      try {
        await clearBackendCart().unwrap();
        toast.success("تم تفريغ السلة بنجاح");
      } catch (err) {
        console.error("Failed to clear backend cart:", err);
      }
    } else {
      toast.success("تم تفريغ السلة بنجاح");
    }
  };

  return (
    <>
      {/* <!-- ===== Breadcrumb Section Start ===== --> */}
      <section>
        <Breadcrumb title={"Cart"} pages={["Cart"]} />
      </section>
      {/* <!-- ===== Breadcrumb Section End ===== --> */}
      {cartItems.length > 0 ? (
        <section className="overflow-hidden py-20 bg-gray-2">
          <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
            <div className="flex flex-wrap items-center justify-between gap-5 mb-7.5">
              <h2 className="font-medium  text-dark dark:text-[#8b8b8b] dark:text-[#E0E0E0]  text-2xl">
                Your Cart
              </h2>
              <button 
                onClick={handleClearCart}
                className="text-blue hover:underline"
              >
                Clear Shopping Cart
              </button>
            </div>

            <div className="bg-white  dark:bg-[#121212]   rounded-[10px] shadow-1">
              <div className="w-full overflow-x-auto">
                <div className="min-w-[1170px]">
                  {/* <!-- table header --> */}
                  <div className="flex items-center py-5.5 px-7.5">
                    <div className="min-w-[400px]">
                      <p className=" text-dark dark:text-[#8b8b8b] dark:text-[#E0E0E0] ">
                        Product
                      </p>
                    </div>

                    <div className="min-w-[180px]">
                      <p className=" text-dark dark:text-[#8b8b8b] dark:text-[#E0E0E0] ">
                        Price
                      </p>
                    </div>

                    <div className="min-w-[275px]">
                      <p className=" text-dark dark:text-[#8b8b8b] dark:text-[#E0E0E0] ">
                        Quantity
                      </p>
                    </div>

                    <div className="min-w-[200px]">
                      <p className=" text-dark dark:text-[#8b8b8b] dark:text-[#E0E0E0] ">
                        Subtotal
                      </p>
                    </div>

                    <div className="min-w-[50px]">
                      <p className=" text-dark dark:text-[#8b8b8b] dark:text-[#E0E0E0]  text-right">
                        Action
                      </p>
                    </div>
                  </div>

                  {/* <!-- cart item --> */}
                  {cartItems.length > 0 &&
                    cartItems.map((item, key) => (
                      <SingleItem item={item} key={key} />
                    ))}
                </div>
              </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-7.5 xl:gap-11 mt-9">
              <Discount />
              <OrderSummary />
            </div>
          </div>
        </section>
      ) : (
        <section className="overflow-hidden py-20 bg-gray-2">
          <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
            <EmptyState
              title="سلة التسوق فارغة"
              description="لم تقم بإضافة أي منتجات إلى سلة التسوق بعد. ابدأ التسوق الآن!"
              icon={
                <svg
                  className="mx-auto w-32 h-32 text-gray-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              }
              actionLabel="تصفح المنتجات"
              actionHref="/shop-with-sidebar"
            />
          </div>
        </section>
      )}
    </>
  );
};

export default Cart;
