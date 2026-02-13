"use client";
import React, { useState } from "react";

export type PaymentMethodType = "whatsapp" | "cash" | "card" | "wallet";

export interface PaymentMethodSelectionProps {
  selectedMethod?: PaymentMethodType;
  onSelect: (method: PaymentMethodType) => void;
  onNext: () => void;
  onBack?: () => void;
}

const PaymentMethodSelection: React.FC<PaymentMethodSelectionProps> = ({
  selectedMethod: initialMethod,
  onSelect,
  onNext,
  onBack,
}) => {
  const [selected, setSelected] = useState<PaymentMethodType>(initialMethod || "whatsapp");

  const handleSelect = (method: PaymentMethodType) => {
    setSelected(method);
    onSelect(method);
  };

  const paymentOptions = [
    {
      id: "whatsapp" as PaymentMethodType,
      title: "طلب عبر واتساب",
      description: "تأكيد الطلب عبر واتساب",
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
        </svg>
      ),
      color: "bg-[#25D366] hover:bg-[#1EAA52]",
      borderColor: "border-[#25D366]",
    },
    {
      id: "cash" as PaymentMethodType,
      title: "الدفع عند الاستلام",
      description: "ادفع نقداً عند التسليم",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
      ),
      color: "bg-gray-100 hover:bg-gray-200",
      borderColor: "border-gray-300",
      textColor: "text-gray-700",
    },
    {
      id: "card" as PaymentMethodType,
      title: "بطاقة ائتمان",
      description: "ادفع بالبطاقة الائتمانية",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
          />
        </svg>
      ),
      color: "bg-[#3C50E0] hover:bg-[#2633A8]",
      borderColor: "border-[#3C50E0]",
    },
    {
      id: "wallet" as PaymentMethodType,
      title: "محفظة إلكترونية",
      description: "ادفع عبر المحفظة الإلكترونية",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
          />
        </svg>
      ),
      color: "bg-purple-500 hover:bg-purple-600",
      borderColor: "border-purple-500",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {paymentOptions.map((option) => (
          <button
            key={option.id}
            type="button"
            onClick={() => handleSelect(option.id)}
            className={`
              relative p-6 rounded-lg border-2 transition-all duration-200
              ${
                selected === option.id
                  ? `${option.borderColor} bg-opacity-10`
                  : "border-gray-300 hover:border-gray-400"
              }
              hover:shadow-md
            `}
          >
            {/* Radio Indicator */}
            <div className="absolute top-4 right-4">
              <div
                className={`
                  w-5 h-5 rounded-full border-2 flex items-center justify-center
                  ${selected === option.id ? option.borderColor : "border-gray-400"}
                `}
              >
                {selected === option.id && (
                  <div className={`w-3 h-3 rounded-full ${option.color}`} />
                )}
              </div>
            </div>

            {/* Icon */}
            <div
              className={`
                w-12 h-12 rounded-full flex items-center justify-center mb-3
                ${option.id === "whatsapp" ? "text-white" : option.textColor || "text-white"}
                ${option.color}
              `}
            >
              {option.icon}
            </div>

            {/* Title & Description */}
            <h4 className="font-semibold text-lg text-gray-800 dark:text-gray-200 mb-1">
              {option.title}
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">{option.description}</p>
          </button>
        ))}
      </div>

      {/* Trust Indicators */}
      <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 flex items-start gap-3">
        <svg
          className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
          />
        </svg>
        <div>
          <p className="text-sm font-medium text-blue-900 dark:text-blue-200">دفع آمن ومشفر</p>
          <p className="text-xs text-blue-700 dark:text-blue-300 mt-1">
            جميع المعاملات محمية بتقنية SSL
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 pt-4">
        {onBack && (
          <button
            type="button"
            onClick={onBack}
            className="w-full sm:w-auto px-6 py-3 rounded-md border-2 border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-colors dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800"
          >
            رجوع
          </button>
        )}
        <button
          type="button"
          onClick={onNext}
          className="w-full sm:flex-1 px-6 py-3 rounded-md bg-[#3C50E0] text-white font-medium hover:bg-[#2633A8] transition-colors shadow-md hover:shadow-lg"
        >
          التالي
        </button>
      </div>
    </div>
  );
};

export default PaymentMethodSelection;
