"use client";
import React from "react";
import { useAppSelector } from "@/redux/store";
import { selectCartItems, selectTotalPrice } from "@/redux/features/cart-slice";
import type { CustomerInfoData } from "./CustomerInfo";
import type { PaymentMethodType } from "./PaymentMethodSelection";
import Image from "next/image";

export interface OrderReviewProps {
  customerInfo: CustomerInfoData;
  paymentMethod: PaymentMethodType;
  onSubmit: () => void;
  onBack?: () => void;
  isLoading?: boolean;
}

const OrderReview: React.FC<OrderReviewProps> = ({
  customerInfo,
  paymentMethod,
  onSubmit,
  onBack,
  isLoading = false,
}) => {
  const cartItems = useAppSelector(selectCartItems);
  const totalPrice = useAppSelector(selectTotalPrice);

  const paymentMethodLabels: Record<PaymentMethodType, string> = {
    whatsapp: "طلب عبر واتساب",
    cash: "الدفع عند الاستلام",
    card: "بطاقة ائتمان",
    wallet: "محفظة إلكترونية",
  };

  return (
    <div className="space-y-6">
      {/* Cart Items Summary */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
          ملخص الطلب
        </h3>
        <div className="space-y-3">
          {cartItems.map((item) => (
            <div key={item.id} className="flex items-center gap-4 py-3 border-b border-gray-200 dark:border-gray-700 last:border-0">
              {/* Product Image */}
              {item.imgs?.thumbnails?.[0] && (
                <div className="w-16 h-16 rounded-md overflow-hidden bg-gray-100 flex-shrink-0">
                  <Image
                    src={item.imgs.thumbnails[0]}
                    alt={item.title}
                    width={64}
                    height={64}
                    className="object-cover w-full h-full"
                  />
                </div>
              )}
              
              {/* Product Info */}
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-gray-800 dark:text-gray-200 truncate">
                  {item.title}
                </h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  الكمية: {item.quantity}
                </p>
              </div>

              {/* Price */}
              <div className="text-right">
                <p className="font-semibold text-gray-800 dark:text-gray-200">
                  {(item.discountedPrice * item.quantity).toLocaleString("ar-EG")} جنيه
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Total */}
        <div className="mt-4 pt-4 border-t-2 border-gray-300 dark:border-gray-600">
          <div className="flex justify-between items-center">
            <span className="text-lg font-semibold text-gray-800 dark:text-gray-200">
              الإجمالي
            </span>
            <span className="text-2xl font-bold text-[#3C50E0]">
              {totalPrice.toLocaleString("ar-EG")} جنيه
            </span>
          </div>
        </div>
      </div>

      {/* Customer Info Summary */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
          معلومات التوصيل
        </h3>
        <div className="space-y-3">
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">الاسم</p>
            <p className="font-medium text-gray-800 dark:text-gray-200">{customerInfo.name}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">رقم الهاتف</p>
            <p className="font-medium text-gray-800 dark:text-gray-200" dir="ltr">
              {customerInfo.phone}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">العنوان</p>
            <p className="font-medium text-gray-800 dark:text-gray-200">{customerInfo.address}</p>
          </div>
          {customerInfo.notes && (
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">ملاحظات</p>
              <p className="font-medium text-gray-800 dark:text-gray-200">{customerInfo.notes}</p>
            </div>
          )}
        </div>
      </div>

      {/* Payment Method Summary */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
          طريقة الدفع
        </h3>
        <div className="flex items-center gap-3">
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center ${
              paymentMethod === "whatsapp"
                ? "bg-[#25D366] text-white"
                : paymentMethod === "card"
                ? "bg-[#3C50E0] text-white"
                : paymentMethod === "wallet"
                ? "bg-purple-500 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            {paymentMethod === "whatsapp" ? "📱" : paymentMethod === "cash" ? "💵" : paymentMethod === "card" ? "💳" : "💰"}
          </div>
          <p className="font-medium text-gray-800 dark:text-gray-200">
            {paymentMethodLabels[paymentMethod]}
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 pt-4">
        {onBack && (
          <button
            type="button"
            onClick={onBack}
            disabled={isLoading}
            className="w-full sm:w-auto px-6 py-3 rounded-md border-2 border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800"
          >
            رجوع
          </button>
        )}
        <button
          type="button"
          onClick={onSubmit}
          disabled={isLoading}
          className="w-full sm:flex-1 px-6 py-3 rounded-md bg-[#3C50E0] text-white font-medium hover:bg-[#2633A8] transition-colors shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              جاري المعالجة...
            </>
          ) : (
            "تأكيد الطلب"
          )}
        </button>
      </div>
    </div>
  );
};

export default OrderReview;
