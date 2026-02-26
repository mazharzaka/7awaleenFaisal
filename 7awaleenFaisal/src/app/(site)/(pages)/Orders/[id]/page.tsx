"use client";
import React from "react";
import { useParams, useRouter } from "next/navigation";
import { useGetOrderByIdQuery } from "@/redux/features/Api.slice";
import TimelineStepper from "@/components/Orders/OrderTracking_New/TimelineStepper";
import OrderDetailsContent from "@/components/Orders/OrderTracking_New/OrderDetailsContent";
import Breadcrumb from "@/components/Common/Breadcrumb";
import { ArrowLeft, MessageSquare, HelpCircle, ShieldCheck, ShoppingBagIcon } from "lucide-react";
import PreLoader from "@/components/Common/PreLoader";
import Error from "@/components/Error";
import { Button } from "@/components/UI";

const OrderDetailsPage = () => {
  const { id } = useParams() as { id: string };
  const router = useRouter();
  const { data: order, error, isLoading } = useGetOrderByIdQuery(id);

  if (isLoading) return <PreLoader />;
  if (error || !order) return (
    <div className="py-20 text-center">
      <Error />
      <p className="mt-4 text-gray-500">حدث خطأ أثناء تحميل تفاصيل الطلب.</p>
      <Button variant="primary" className="mt-6" onClick={() => router.push("/Orders")}>العودة للطلبات</Button>
    </div>
  );

  return (
    <div className="bg-gray-50/50 dark:bg-gray-900/10 min-h-screen">
      <Breadcrumb title={`تتبع طلب #${order._id.slice(-6).toUpperCase()}`} pages={["Orders", "Details"]} />
      
      <div className="max-w-[1200px] mx-auto px-4 py-8">
        {/* Navigation Header */}
        <div className="flex items-center justify-between mb-8">
          <button 
            onClick={() => router.push("/Orders")}
            className="flex items-center gap-2 text-gray-500 hover:text-blue-600 font-medium transition-all group"
          >
            <div className="p-2 rounded-full group-hover:bg-blue-50 dark:group-hover:bg-blue-900/20 transition-colors">
              <ArrowLeft size={20} />
            </div>
            <span>العودة لقائمة الطلبات</span>
          </button>
          
          <div className="hidden sm:flex items-center gap-2 text-sm text-gray-400">
            <ShieldCheck size={16} className="text-green-500" />
            <span>تسوق آمن ومضمون 100%</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Timeline & Details (8 cols) */}
          <div className="lg:col-span-8 space-y-8">
            {/* Tracking Card */}
            <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-sm border border-gray-100/50 dark:border-gray-700">
              <div className="flex items-center justify-between mb-10">
                <h2 className="text-2xl font-black text-dark dark:text-white flex items-center gap-3">
                  <span className="w-2 h-8 bg-blue-600 rounded-full"></span>
                  حالة الطلب الآن
                </h2>
                <div className="px-4 py-1.5 bg-blue-50 dark:bg-blue-900/30 text-blue-600 rounded-full text-xs font-bold ring-4 ring-blue-50/50 dark:ring-blue-900/10">
                  مباشر
                </div>
              </div>
              <div className="px-4">
                <TimelineStepper currentStatus={order.status} />
              </div>
            </div>

            {/* Content Card */}
            <OrderDetailsContent order={order} />
          </div>

          {/* Right Column: Order ID & Actions (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            {/* Quick Summary Card */}
            {/* <div className="bg-blue-600 text-white p-8 rounded-3xl shadow-xl shadow-blue-500/20 relative overflow-hidden">
              <div className="absolute -right-4 -top-4 opacity-10">
                <ShoppingBagIcon size={120} />
              </div>
              <div className="relative z-10">
                <p className="text-blue-100 text-sm font-medium mb-1">رقم الطلب المرجعي</p>
                <h3 className="text-3xl font-black mb-6 tracking-wider">#{order._id.slice(-8).toUpperCase()}</h3>
                
                <div className="space-y-4 pt-6 border-t border-white/10">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-blue-100">تاريخ الطلب</span>
                    <span className="font-bold">{new Date(order.createdAt).toLocaleDateString("ar-EG")}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-blue-100">وقت الطلب</span>
                    <span className="font-bold">{new Date(order.createdAt).toLocaleTimeString("ar-EG", { hour: '2-digit', minute: '2-digit' })}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-blue-100">طريقة الدفع</span>
                    <span className="font-bold">{order.paymentMethod === "cash" ? "الدفع عند الاستلام" : "دفع إلكتروني"}</span>
                  </div>
                </div>
              </div>
            </div> */}

            {/* Support Card */}
            <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700">
              <div className="w-12 h-12 bg-amber-50 dark:bg-amber-900/20 rounded-2xl flex items-center justify-center text-amber-600 mb-6">
                <HelpCircle size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">هل واجهت مشكلة؟</h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-8">
                نحن هنا دائماً لمساعدتك. إذا كان لديك أي استفسار حول طلبك، تواصل معنا فوراً عبر الواتساب.
              </p>
              
              <Button 
                variant="primary" 
                className="w-full py-4 rounded-xl bg-[#25D366] hover:bg-[#1EAA52] border-none shadow-lg shadow-green-500/20 flex items-center justify-center gap-2 group"
                onClick={() => {
                  const msg = encodeURIComponent(`Hello, I want to check my order status. Order ID: ${order._id}`);
                  window.open(`https://wa.me/201000000000?text=${msg}`, "_blank");
                }}
              >
                <MessageSquare size={20} className="group-hover:scale-110 transition-transform" />
                تحدث مع المتجر الآن
              </Button>
              
              <p className="text-center text-[10px] text-gray-400 mt-4">نحن متواجدون للرد عليك على مدار الساعة</p>
            </div>

            {/* Return Policy */}
            <div className="p-6 rounded-3xl border border-dashed border-gray-200 dark:border-gray-700 flex items-start gap-4">
              <div className="p-2 bg-gray-50 dark:bg-gray-700/50 rounded-lg text-gray-400">
                <ShieldCheck size={20} />
              </div>
              <div>
                <h4 className="text-sm font-bold text-gray-600 dark:text-gray-300">سياسة الإرجاع</h4>
                <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                  يمكنك طلب إرجاع المنتجات خلال 14 يوم من تاريخ الاستلام وفق الشروط والأحكام.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsPage;

