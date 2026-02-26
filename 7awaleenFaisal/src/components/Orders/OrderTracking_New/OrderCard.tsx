"use client";
import React from "react";
import Link from "next/link";
import { Badge, Button, Card } from "@/components/UI";
import { Calendar, Store, CreditCard, ExternalLink, MessageSquare } from "lucide-react";

export type OrderStatus = 
  | "placed" 
  | "confirmed" 
  | "preparing" 
  | "out_for_delivery" 
  | "delivered" 
  | "cancelled" 
  | "refunded";

export interface OrderCardProps {
  order: {
    _id: string;
    storeId?: { name: string };
    createdAt: string;
    total: number;
    paymentMethod: string;
    status: OrderStatus;
  };
}

export const statusConfig: Record<OrderStatus, { label: string; variant: "blue" | "orange" | "green" | "red" | "gray"; icon: React.ReactNode }> = {
  placed: { label: "تم الطلب", variant: "blue", icon: <Badge variant="info">تم الطلب</Badge> },
  confirmed: { label: "تم التأكيد", variant: "blue", icon: <Badge variant="info">تم التأكيد</Badge> },
  preparing: { label: "جاري التجهيز", variant: "orange", icon: <Badge variant="warning">جاري التجهيز</Badge> },
  out_for_delivery: { label: "جاري التوصيل", variant: "orange", icon: <Badge variant="warning">جاري التوصيل</Badge> },
  delivered: { label: "تم التوصيل", variant: "green", icon: <Badge variant="success">تم التوصيل</Badge> },
  cancelled: { label: "ملغي", variant: "red", icon: <Badge variant="danger">ملغي</Badge> },
  refunded: { label: "مسترجع", variant: "gray", icon: <Badge variant="neutral">مسترجع</Badge> },
};

const OrderCard: React.FC<OrderCardProps> = ({ order }) => {
  const config = statusConfig[order.status] || statusConfig.placed;

  return (
    <Card className="group overflow-hidden border-none shadow-sm hover:shadow-md transition-all duration-300 bg-white dark:bg-gray-800 rounded-2xl mb-6">
      <div className="p-0">
        {/* Header - Order # and Status */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-5 bg-gray-50/50 dark:bg-gray-700/20 border-b border-gray-100 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
              <span className="font-bold text-blue-600 dark:text-blue-400 text-sm">
                #{order._id.slice(-6).toUpperCase()}
              </span>
            </div>
            <div className="h-4 w-px bg-gray-200 dark:bg-gray-600 hidden sm:block"></div>
            {config.icon}
          </div>
          
          <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 text-sm">
            <Calendar size={14} />
            {new Date(order.createdAt).toLocaleDateString("ar-EG", {
              year: 'numeric',
              month: 'short',
              day: 'numeric'
            })}
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Store & Date Info */}
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-purple-50 dark:bg-purple-900/20 rounded-lg text-purple-600">
                  <Store size={18} />
                </div>
                <div>
                  <p className="text-xs text-gray-400 mb-0.5">المتجر</p>
                  <p className="font-bold text-dark dark:text-gray-200">
                    {order.storeId?.name || "متجر غير معروف"}
                  </p>
                </div>
              </div>
            </div>

            {/* Payment Info */}
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-amber-50 dark:bg-amber-900/20 rounded-lg text-amber-600">
                  <CreditCard size={18} />
                </div>
                <div>
                  <p className="text-xs text-gray-400 mb-0.5">وسيلة الدفع</p>
                  <p className="font-bold text-dark dark:text-gray-200">
                    {order.paymentMethod === "cash" ? "الدفع عند الاستلام (COD)" : "دفع إلكتروني (Online)"}
                  </p>
                </div>
              </div>
            </div>

            {/* Price Info */}
            <div className="md:col-span-2 lg:col-span-1 bg-blue-50/30 dark:bg-blue-900/10 p-4 rounded-xl border border-blue-50 dark:border-blue-900/20">
              <div className="flex justify-between items-center h-full">
                <div>
                  <p className="text-xs text-gray-400 mb-1">إجمالي المبلغ</p>
                  <p className="text-2xl font-black text-blue-600">
                    {order.total.toLocaleString("ar-EG")} <span className="text-sm font-normal text-gray-500">ج.م</span>
                  </p>
                </div>
                <div className="hidden lg:block w-px h-10 bg-blue-100 dark:bg-blue-800 mx-4"></div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-8 flex flex-col sm:flex-row items-center gap-4">
            <Link href={`/Orders/${order._id}`} className="w-full sm:flex-1">
              <Button 
                variant="primary" 
                className="w-full py-3.5 rounded-xl shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 transition-all flex items-center justify-center gap-2"
              >
                <ExternalLink size={18} />
                تتبع الطلب بالتفصيل
              </Button>
            </Link>
            
            <Button 
              variant="outline" 
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl border-green-500 text-green-600 hover:bg-green-50 flex items-center justify-center gap-2 group/wa"
              onClick={() => {
                const msg = encodeURIComponent(`مرحباً، أود الاستفسار عن حالة طلبي. رقم الطلب: ${order._id}`);
                window.open(`https://wa.me/201000000000?text=${msg}`, "_blank");
              }}
            >
              <MessageSquare size={18} className="group-hover/wa:scale-110 transition-transform" />
              تواصل عبر واتساب
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default OrderCard;

