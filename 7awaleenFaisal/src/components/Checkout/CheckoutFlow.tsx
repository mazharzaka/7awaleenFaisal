"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAppSelector, useAppDispatch } from "@/redux/store";
import { selectCartItems, selectTotalPrice, removeAllItemsFromCart } from "@/redux/features/cart-slice";
import { useCreateOrderMutation, useClearBackendCartMutation } from "@/redux/features/Api.slice";
import Breadcrumb from "../Common/Breadcrumb";
import ProgressBar from "../UI/ProgressBar";
import CustomerInfo, { type CustomerInfoData } from "./CustomerInfo";
import PaymentMethodSelection, { type PaymentMethodType, type PaymentMethodDetails } from "./PaymentMethodSelection";
import OrderReview from "./OrderReview";
import EmptyState from "../UI/EmptyState";

const CheckoutFlow = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector(selectCartItems);
  const totalPrice = useAppSelector(selectTotalPrice);
  
  const [createOrder, { isLoading: isCreatingOrder }] = useCreateOrderMutation();

  const [currentStep, setCurrentStep] = useState(1);
  const [customerInfo, setCustomerInfo] = useState<CustomerInfoData | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethodType>("whatsapp");
  const [paymentDetails, setPaymentDetails] = useState<PaymentMethodDetails | null>(null);

  const { token } = useAppSelector((state) => state.auth);
  const [clearBackendCart] = useClearBackendCartMutation();

  const steps = ["معلومات التوصيل", "طريقة الدفع", "مراجعة الطلب"];

  // If cart is empty, show empty state
  if (cartItems.length === 0) {
    return (
      <>
        <Breadcrumb title="إتمام الطلب" pages={["checkout"]} />
        <section className="overflow-hidden py-20 bg-gray-2">
          <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
            <EmptyState
              title="سلة التسوق فارغة"
              description="يجب إضافة منتجات إلى سلة التسوق أولاً قبل إتمام الطلب"
              actionLabel="تصفح المنتجات"
              actionHref="/shop-with-sidebar"
            />
          </div>
        </section>
      </>
    );
  }

  const handleCustomerInfoNext = (data: CustomerInfoData) => {
    setCustomerInfo(data);
    setCurrentStep(2);
  };

  const handlePaymentMethodNext = (details?: PaymentMethodDetails) => {
    if (details) setPaymentDetails(details);
    setCurrentStep(3);
  };


  const handleSubmitOrder = async () => {
    if (!customerInfo) return;

    try {
      // Prepare order data
      const orderData = {
        items: cartItems.map((item) => ({
          productId: item.id,
          qty: item.quantity,
          price: item.discountedPrice,
        })),
        total: totalPrice,
        customerInfo: {
          name: customerInfo.name,
          phone: customerInfo.phone,
          address: customerInfo.address,
        },
        paymentMethod,
        paymentDetails: paymentDetails || {},
        note: customerInfo.notes || "",
        storeId: "000000000000000000000000", // Default store ID, update as needed
      };

      // Create order via API
      const response = await createOrder(orderData).unwrap();
      
      // Clear cart after successful order
      dispatch(removeAllItemsFromCart());

      // If authenticated, clear backend cart too
      if (token) {
        try {
          await clearBackendCart().unwrap();
        } catch (err) {
          console.error("Failed to clear backend cart after order:", err);
        }
      }

      // Redirect to success page with order ID and WhatsApp link
      const orderId = response.order?._id || "unknown";
      router.push(`/order-success?orderId=${orderId}&method=${paymentMethod}`);
    } catch (error) {
      console.error("Order creation failed:", error);
      const errorMessage = error?.data?.error || "حدث خطأ أثناء معالجة طلبك";
      router.push(`/order-failed?error=${encodeURIComponent(errorMessage)}`);
    }
  };

  return (
    <>
      <Breadcrumb title="إتمام الطلب" pages={["checkout"]} />
      <section className="overflow-hidden py-20 bg-gray-2">
        <div className="max-w-[900px] w-full mx-auto px-4 sm:px-8 xl:px-0">
          {/* Progress Bar */}
          <div className="mb-10">
            <ProgressBar currentStep={currentStep} totalSteps={3} steps={steps} />
          </div>

          {/* Step Content */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 sm:p-8">
            {currentStep === 1 && (
              <CustomerInfo
                initialData={customerInfo || undefined}
                onNext={handleCustomerInfoNext}
              />
            )}

            {currentStep === 2 && (
              <PaymentMethodSelection
                selectedMethod={paymentMethod}
                onSelect={(method, details) => {
                  setPaymentMethod(method);
                  if (details) setPaymentDetails(details);
                }}
                onNext={handlePaymentMethodNext}
                onBack={() => setCurrentStep(1)}
              />
            )}

            {currentStep === 3 && customerInfo && (
              <OrderReview
                customerInfo={customerInfo}
                paymentMethod={paymentMethod}
                onSubmit={handleSubmitOrder}
                onBack={() => setCurrentStep(2)}
                isLoading={isCreatingOrder}
              />
            )}
          </div>

          {/* Security Badge */}
          <div className="mt-6 text-center">
            <div className="inline-flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <svg
                className="w-5 h-5 text-green-500"
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
              <span>عملية شراء آمنة ومشفرة</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CheckoutFlow;
