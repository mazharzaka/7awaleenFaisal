"use client";
import React from "react";
import Image from "next/image";
import { Card } from "@/components/UI";
import { Package, MapPin, CreditCard, User, Phone, StickyNote, Tag, Receipt } from "lucide-react";

interface OrderDetailsContentProps {
  order: {
    items: Array<{
      productId: {
        name: string;
        imageURL: string[];
      };
      qty: number;
      price: number;
    }>;
    total: number;
    discount?: number;
    customerInfo: {
      name: string;
      phone: string;
      address: string;
    };
    paymentMethod: string;
    paymentStatus: string;
    transactionId?: string;
    note?: string;
  };
}

const OrderDetailsContent: React.FC<OrderDetailsContentProps> = ({ order }) => {
  const subtotal = order.items.reduce((acc, item) => acc + (item.price * item.qty), 0);
  const discount = order.discount || 0;

  return (
    <div className="space-y-8">
      {/* Products Section */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Package className="text-blue-600" size={20} />
          <h3 className="text-lg font-bold text-dark dark:text-gray-200">المنتجات المطلوبة</h3>
        </div>
        <Card className="overflow-hidden border-none shadow-sm bg-white dark:bg-gray-800 rounded-2xl">
          <div className="divide-y divide-gray-50 dark:divide-gray-700">
            {order.items.map((item, idx) => (
              <div key={idx} className="p-5 flex gap-5 items-center hover:bg-gray-50/50 dark:hover:bg-gray-700/20 transition-colors">
                <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-gray-100 shrink-0 border border-gray-100 dark:border-gray-700 shadow-sm">
                  <Image
                    src={item.productId?.imageURL?.[0] || "/images/default-product.png"}
                    alt={item.productId?.name || "Product"}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-dark dark:text-gray-100 mb-1 truncate">
                    {item.productId?.name}
                  </p>
                  <p className="text-sm text-gray-500 flex items-center gap-1">
                    <span>{item.qty} وحدة</span>
                    <span className="mx-1">×</span>
                    <span>{item.price.toLocaleString("ar-EG")} ج.م</span>
                  </p>
                </div>
                <div className="text-left font-black text-blue-600">
                  {(item.price * item.qty).toLocaleString("ar-EG")} ج.م
                </div>
              </div>
            ))}
          </div>
          
          {/* Order Summary in Footer */}
          <div className="p-6 bg-gray-50/80 dark:bg-gray-700/30 border-t border-gray-100 dark:border-gray-700 space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">المجموع الفرعي</span>
              <span className="font-medium">{subtotal.toLocaleString("ar-EG")} ج.م</span>
            </div>
            
            {discount > 0 && (
              <div className="flex justify-between text-sm text-green-600">
                <span className="flex items-center gap-1">
                  <Tag size={14} />
                  الخصم
                </span>
                <span className="font-medium">- {discount.toLocaleString("ar-EG")} ج.م</span>
              </div>
            )}

            <div className="flex justify-between items-center pt-3 border-t border-gray-200 dark:border-gray-600">
              <span className="font-bold text-dark dark:text-white">الإجمالي النهائي</span>
              <span className="text-2xl font-black text-blue-700 dark:text-blue-400">
                {order.total.toLocaleString("ar-EG")} ج.م
              </span>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Delivery Information */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <MapPin className="text-blue-600" size={20} />
            <h3 className="font-bold text-dark dark:text-gray-200">معلومات التوصيل</h3>
          </div>
          <Card className="p-6 bg-white dark:bg-gray-800 rounded-2xl border-none shadow-sm space-y-5">
            <div className="flex items-start gap-4">
              <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-blue-600">
                <User size={18} />
              </div>
              <div>
                <p className="text-xs text-gray-400 mb-0.5">اسم العميل</p>
                <p className="font-bold">{order.customerInfo?.name}</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-blue-600">
                <Phone size={18} />
              </div>
              <div>
                <p className="text-xs text-gray-400 mb-0.5">رقم الهاتف</p>
                <p className="font-bold font-sans">{order.customerInfo?.phone}</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-blue-600">
                <MapPin size={18} />
              </div>
              <div>
                <p className="text-xs text-gray-400 mb-0.5">عنوان التوصيل</p>
                <p className="font-bold leading-relaxed">{order.customerInfo?.address}</p>
              </div>
            </div>

            {order.note && (
              <div className="flex items-start gap-4 pt-4 border-t border-gray-50 dark:border-gray-700">
                <div className="p-2 bg-amber-50 dark:bg-amber-900/20 rounded-lg text-amber-600">
                  <StickyNote size={18} />
                </div>
                <div>
                  <p className="text-xs text-gray-400 mb-1">ملاحظات إضافية</p>
                  <p className="text-sm italic text-gray-600 dark:text-gray-400">{order.note}</p>
                </div>
              </div>
            )}
          </Card>
        </div>

        {/* Payment Information */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <CreditCard className="text-blue-600" size={20} />
            <h3 className="font-bold text-dark dark:text-gray-200">معلومات الدفع</h3>
          </div>
          <Card className="p-6 bg-white dark:bg-gray-800 rounded-2xl border-none shadow-sm space-y-5">
            <div className="flex items-start gap-4">
              <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-blue-600">
                <CreditCard size={18} />
              </div>
              <div className="flex-1">
                <p className="text-xs text-gray-400 mb-0.5">وسيلة الدفع</p>
                <div className="flex items-center justify-between">
                  <p className="font-bold">
                    {order.paymentMethod === "cash" ? "الدفع عند الاستلام (COD)" : "دفع إلكتروني (Online)"}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-blue-600">
                <Receipt size={18} />
              </div>
              <div className="flex-1">
                <p className="text-xs text-gray-400 mb-0.5">حالة الدفع</p>
                <div className="flex items-center">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    order.paymentStatus === "completed" 
                      ? "bg-green-100 text-green-700" 
                      : "bg-orange-100 text-orange-700"
                  }`}>
                    {order.paymentStatus === "completed" ? "تم الدفع بنجاح" : "معلق / في انتظار الدفع"}
                  </span>
                </div>
              </div>
            </div>

            {order.transactionId && (
              <div className="flex items-start gap-4 pt-4 border-t border-gray-50 dark:border-gray-700">
                <div className="p-2 bg-gray-50 dark:bg-gray-700 rounded-lg text-gray-500">
                  <Tag size={18} />
                </div>
                <div>
                  <p className="text-xs text-gray-400 mb-0.5">رقم المعاملة (Transaction ID)</p>
                  <p className="font-mono text-sm font-bold bg-gray-50 dark:bg-gray-700 px-2 py-1 rounded">
                    {order.transactionId}
                  </p>
                </div>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsContent;

