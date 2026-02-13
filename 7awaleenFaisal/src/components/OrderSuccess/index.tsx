"use client";
import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import type { PaymentMethodType } from "@/components/Checkout/PaymentMethodSelection";

const OrderSuccess = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const paymentMethod = (searchParams?.get("method") as PaymentMethodType) || "whatsapp";
  const orderId = searchParams?.get("orderId") || "12345";

  const handleWhatsAppConfirm = () => {
    // Generate WhatsApp message
    const message = `مرحباً، أريد تأكيد الطلب رقم: ${orderId}`;
    const whatsappUrl = `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "201000000000"}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <section className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full">
        {/* Success Animation Container */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 text-center">
          {/* Success Icon with Animation */}
          <div className="mx-auto w-20 h-20 mb-6 relative">
            <div className="absolute inset-0 bg-green-100 dark:bg-green-900/30 rounded-full animate-ping" />
            <div className="relative w-20 h-20 bg-green-500 rounded-full flex items-center justify-center">
              <svg
                className="w-10 h-10 text-white animate-check"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={3}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          </div>

          {/* Success Message */}
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
            تم استلام طلبك بنجاح! 🎉
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            شكراً لك! سيتم التواصل معك قريباً لتأكيد الطلب
          </p>

          {/* Order Details */}
          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-600 dark:text-gray-400">رقم الطلب</span>
              <span className="font-mono font-semibold text-gray-800 dark:text-white">
                #{orderId}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600 dark:text-gray-400">طريقة الدفع</span>
              <span className="font-medium text-gray-800 dark:text-white">
                {paymentMethod === "whatsapp" && "واتساب"}
                {paymentMethod === "cash" && "الدفع عند الاستلام"}
                {paymentMethod === "card" && "بطاقة ائتمان"}
                {paymentMethod === "wallet" && "محفظة إلكترونية"}
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            {paymentMethod === "whatsapp" && (
              <button
                onClick={handleWhatsAppConfirm}
                className="w-full bg-[#25D366] text-white font-medium py-3 px-6 rounded-lg hover:bg-[#1EAA52] transition-colors flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
                متابعة عبر واتساب
              </button>
            )}

            <Link
              href="/"
              className="block w-full bg-[#3C50E0] text-white font-medium py-3 px-6 rounded-lg hover:bg-[#2633A8] transition-colors text-center shadow-md hover:shadow-lg"
            >
              العودة للرئيسية
            </Link>

            <Link
              href="/shop-with-sidebar"
              className="block w-full border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium py-3 px-6 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-center"
            >
              متابعة التسوق
            </Link>
          </div>
        </div>

        {/* Additional Info */}
        <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-6">
          سيتم إرسال تفاصيل الطلب إلى رقم هاتفك المسجل
        </p>
      </div>

      <style jsx>{`
        @keyframes check {
          0% {
            transform: scale(0);
          }
          50% {
            transform: scale(1.2);
          }
          100% {
            transform: scale(1);
          }
        }
        .animate-check {
          animation: check 0.6s ease-out 0.2s both;
        }
      `}</style>
    </section>
  );
};

export default OrderSuccess;
