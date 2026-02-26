"use client";
import React from "react";
import OrderCard from "./OrderTracking_New/OrderCard";
import Breadcrumb from "../Common/Breadcrumb";
import { useGetUserOrdersQuery } from "@/redux/features/Api.slice";
import Error from "../Error";
import PreLoader from "../Common/PreLoader";
import EmptyState from "../UI/EmptyState";
import LoadingSkeleton from "../UI/LoadingSkeleton";
import { ShoppingBag, Search } from "lucide-react";

const OrdersItems = () => {
  const { data: orders, error, isLoading } = useGetUserOrdersQuery();

  if (error) {
    return (
      <div className="py-20 text-center">
        <div className="max-w-[400px] mx-auto mb-8">
           <Error />
        </div>
        <p className="mt-4 text-gray-500">حدث خطأ أثناء تحميل الطلبات. يرجى المحاولة مرة أخرى.</p>
      </div>
    );
  }

  return (
    <>
      <Breadcrumb title={"طلباتي"} pages={["Orders"]} />
      <section className="overflow-hidden py-12 px-4 sm:px-8 xl:px-10 bg-gray-50/50 dark:bg-gray-900/10 min-h-[calc(100vh-350px)]">
        <div className="max-w-[1000px] mx-auto w-full">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10">
            <div>
              <h2 className="text-3xl font-black text-dark dark:text-white flex items-center gap-3">
                <div className="p-2 bg-blue-600 rounded-lg text-white">
                  <ShoppingBag size={24} />
                </div>
                تتبع طلباتك
              </h2>
              <p className="text-gray-500 mt-2">شاهد حالة جميع طلباتك الحالية والسابقة في مكان واحد</p>
            </div>
            
            {!isLoading && orders && orders.length > 0 && (
              <div className="bg-white dark:bg-gray-800 px-6 py-3 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
                <span className="text-sm text-gray-500 block">إجمالي عدد الطلبات</span>
                <span className="text-xl font-black text-blue-600">{orders.length} طلبات</span>
              </div>
            )}
          </div>

          {isLoading ? (
            <div className="space-y-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 animate-pulse">
                  <div className="flex justify-between items-start mb-6">
                    <div className="flex-1 space-y-4">
                      <div className="h-6 w-1/4 bg-gray-200 dark:bg-gray-700 rounded-md" />
                      <div className="h-4 w-1/2 bg-gray-100 dark:bg-gray-700/50 rounded-md" />
                    </div>
                    <div className="h-10 w-24 bg-gray-200 dark:bg-gray-700 rounded-full" />
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="h-20 bg-gray-50 dark:bg-gray-700/30 rounded-xl" />
                    <div className="h-20 bg-gray-50 dark:bg-gray-700/30 rounded-xl" />
                    <div className="h-20 bg-gray-50 dark:bg-gray-700/30 rounded-xl" />
                  </div>
                </div>
              ))}
            </div>
          ) : orders && orders.length > 0 ? (
            <div className="grid grid-cols-1 gap-6">
              {orders.map((order) => (
                <OrderCard key={order._id} order={order} />
              ))}
            </div>
          ) : (
            <div className="bg-white dark:bg-gray-800 rounded-3xl p-12 shadow-sm border border-gray-100 dark:border-gray-700 text-center">
              <EmptyState
                title="لا توجد طلبات حتى الآن"
                description="يبدو أنك لم تقم بطلب أي منتجات بعد. ابدأ الآن بتصفح أحدث الخصومات والمنتجات المتاحة في المتجر."
                icon={
                  <div className="relative mx-auto w-32 h-32 mb-8">
                    <div className="absolute inset-0 bg-blue-50 dark:bg-blue-900/20 rounded-full animate-pulse" />
                    <div className="relative w-32 h-32 bg-white dark:bg-gray-800 rounded-full border-4 border-dashed border-gray-200 dark:border-gray-700 flex items-center justify-center">
                      <Search size={48} className="text-gray-300 dark:text-gray-600" />
                    </div>
                  </div>
                }
                actionLabel="تصفح المتجر الآن"
                actionHref="/shop-with-sidebar"
              />
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default OrdersItems;

