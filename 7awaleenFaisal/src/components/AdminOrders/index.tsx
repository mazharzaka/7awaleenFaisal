"use client";
import React, { useState, useMemo } from "react";
import { 
  useGetAllOrdersQuery, 
  useUpdateOrderStatusMutation,
  useGetGeustOrderQuery,
  useGeustOrderstatusMutation
} from "@/redux/features/Api.slice";
import Breadcrumb from "../Common/Breadcrumb";
import { 
  Search, 
  Filter, 
  ChevronDown, 
  Calendar, 
  User, 
  Package, 
  CreditCard,
  ExternalLink,
  Loader2,
  AlertCircle,
  MoreVertical,
  ArrowUpDown,
  CheckCircle2,
  Clock,
  Truck,
  XCircle,
  RefreshCcw,
  MessageCircle
} from "lucide-react";
import dayjs from "dayjs";
import toast from "react-hot-toast";
import Image from "next/image";

const statusColors: any = {
  // Main Orders
  placed: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  confirmed: "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400",
  preparing: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  out_for_delivery: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
  delivered: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
  cancelled: "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400",
  refunded: "bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400",
  
  // Guest Orders
  new: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  contacted: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  done: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
  rejected: "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400",
};

const statusLabels: any = {
  placed: "طلب جديد",
  confirmed: "تم التأكيد",
  preparing: "جاري التجهيز",
  out_for_delivery: "خرج للتوصيل",
  delivered: "تم التوصيل",
  cancelled: "ملغي",
  refunded: "مسترجع",
  
  new: "جديد (واتساب)",
  contacted: "تم التواصل",
  done: "مكتمل",
  rejected: "مرفوض",
};

const AdminOrders = () => {
  const [activeTab, setActiveTab] = useState<"standard" | "guest">("standard");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState<{ field: string; direction: "asc" | "desc" }>({
    field: "createdAt",
    direction: "desc",
  });

  const { data: standardOrders, isLoading: loadingStandard, error: errorStandard } = useGetAllOrdersQuery();
  const { data: guestOrders, isLoading: loadingGuest, error: errorGuest } = useGetGeustOrderQuery();
  
  const [updateStandardStatus] = useUpdateOrderStatusMutation();
  const [updateGuestStatus] = useGeustOrderstatusMutation();

  const handleStatusUpdate = async (orderId: string, status: string, isGuest: boolean) => {
    try {
      if (isGuest) {
        await updateGuestStatus({ orderId, status }).unwrap();
      } else {
        await updateStandardStatus({ orderId, status }).unwrap();
      }
      toast.success("تم تحديث حالة الطلب بنجاح");
    } catch (err) {
      toast.error("فشل تحديث حالة الطلب");
    }
  };

  const filteredOrders = useMemo(() => {
    const orders = activeTab === "standard" ? standardOrders || [] : guestOrders || [];
    
    let result = orders.filter((order: any) => {
      const searchStr = searchTerm.toLowerCase();
      const customerName = (order.customerInfo?.name || order.name || "").toLowerCase();
      const orderId = order._id.toString().toLowerCase();
      const phone = (order.customerInfo?.phone || order.phone || "").toLowerCase();
      
      const matchesSearch = customerName.includes(searchStr) || orderId.includes(searchStr) || phone.includes(searchStr);
      const matchesStatus = statusFilter === "all" || order.status === statusFilter;
      
      return matchesSearch && matchesStatus;
    });

    // Sorting
    result = [...result].sort((a: any, b: any) => {
      const aValue = a[sortBy.field];
      const bValue = b[sortBy.field];
      
      if (sortBy.direction === "asc") {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    return result;
  }, [activeTab, standardOrders, guestOrders, searchTerm, statusFilter, sortBy]);

  const toggleSort = (field: string) => {
    setSortBy(prev => ({
      field,
      direction: prev.field === field && prev.direction === "desc" ? "asc" : "desc"
    }));
  };

  if (loadingStandard || loadingGuest) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="bg-gray-50 dark:bg-[#121212] min-h-screen pb-20">
      <Breadcrumb title="إدارة الطلبات" pages={["لوحة التحكم", "الطلبات"]} />
      
      <div className="max-w-[1170px] mx-auto px-4 sm:px-7.5 xl:px-0 mt-8">
        {/* Stats & Filters Row */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input 
              type="text" 
              placeholder="البحث برقم الطلب، اسم العميل، أو الهاتف..."
              className="w-full pr-12 pl-4 py-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#1e1e1e] outline-none focus:ring-2 focus:ring-blue-500 transition-all text-right"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex gap-4">
            <select 
              className="px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#1e1e1e] outline-none focus:ring-2 focus:ring-blue-500 text-right appearance-none font-medium"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">كل الحالات</option>
              {activeTab === "standard" ? (
                <>
                  <option value="placed">طلب جديد</option>
                  <option value="confirmed">تم التأكيد</option>
                  <option value="preparing">جاري التجهيز</option>
                  <option value="out_for_delivery">خرج للتوصيل</option>
                  <option value="delivered">تم التوصيل</option>
                  <option value="cancelled">ملغي</option>
                </>
              ) : (
                <>
                  <option value="new">جديد</option>
                  <option value="contacted">تم التواصل</option>
                  <option value="done">مكتمل</option>
                  <option value="rejected">مرفوض</option>
                </>
              )}
            </select>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 bg-white dark:bg-[#1e1e1e] p-1.5 rounded-2xl border border-gray-200 dark:border-gray-800 w-fit">
          <button 
            onClick={() => { setActiveTab("standard"); setStatusFilter("all"); }}
            className={`px-6 py-2.5 rounded-xl font-bold transition-all ${activeTab === "standard" ? "bg-blue-dark text-white shadow-lg" : "text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"}`}
          >
            طلبات الموقع
          </button>
          <button 
            onClick={() => { setActiveTab("guest"); setStatusFilter("all"); }}
            className={`px-6 py-2.5 rounded-xl font-bold transition-all ${activeTab === "guest" ? "bg-blue-dark text-white shadow-lg" : "text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"}`}
          >
            طلبات الواتساب
          </button>
        </div>

        {/* Orders Table */}
        <div className="bg-white dark:bg-[#1e1e1e] rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-right">
              <thead>
                <tr className="bg-gray-50 dark:bg-[#252525] border-b border-gray-200 dark:border-gray-800 text-gray-500 dark:text-gray-400">
                  <th className="px-6 py-4 font-bold text-sm">
                    <button onClick={() => toggleSort("_id")} className="flex items-center gap-2 mr-auto ml-0">
                      <ArrowUpDown className="h-4 w-4" />
                      الطلب
                    </button>
                  </th>
                  <th className="px-6 py-4 font-bold text-sm">العميل</th>
                  <th className="px-6 py-4 font-bold text-sm">التفاصيل</th>
                  <th className="px-6 py-4 font-bold text-sm">
                    <button onClick={() => toggleSort("total")} className="flex items-center gap-2 mr-auto ml-0">
                      <ArrowUpDown className="h-4 w-4" />
                      الإجمالي
                    </button>
                  </th>
                  <th className="px-6 py-4 font-bold text-sm">
                    <button onClick={() => toggleSort("createdAt")} className="flex items-center gap-2 mr-auto ml-0">
                      <ArrowUpDown className="h-4 w-4" />
                      التاريخ
                    </button>
                  </th>
                  <th className="px-6 py-4 font-bold text-sm text-center">الحالة</th>
                  <th className="px-6 py-4 font-bold text-sm text-center">الإجراء</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {filteredOrders.length > 0 ? (
                  filteredOrders.map((order: any) => (
                    <tr key={order._id} className="hover:bg-gray-50/50 dark:hover:bg-white/5 transition-colors group">
                      <td className="px-6 py-4">
                        <div className="font-bold text-blue-600 dark:text-blue-400">
                          #{order._id.toString().slice(-6).toUpperCase()}
                        </div>
                        <div className="text-xs text-gray-400 mt-0.5">
                          {activeTab === "standard" ? "طلب موقع" : "طلب واتساب"}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-600 font-bold">
                            {(order.customerInfo?.name || order.name || "A")[0]}
                          </div>
                          <div>
                            <div className="font-bold text-dark dark:text-white">
                              {order.customerInfo?.name || order.name}
                            </div>
                            <div className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                              <MessageCircle className="h-3 w-3" />
                              {order.customerInfo?.phone || order.phone}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm">
                          {activeTab === "standard" ? (
                            <>
                              <div className="text-gray-600 dark:text-gray-300">
                                {order.items?.length} منتجات
                              </div>
                              <div className="text-xs text-gray-400 mt-1 line-clamp-1">
                                {order.items?.map((i: any) => i.productId?.name).join(", ")}
                              </div>
                            </>
                          ) : (
                            <>
                              <div className="text-gray-600 dark:text-gray-300">
                                {order.quantity} × {order.productId?.name || "منتج"}
                              </div>
                            </>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-bold text-dark dark:text-white">
                          {order.total || order.finalPrice} ج.م
                        </div>
                        <div className="text-xs text-gray-400 mt-0.5">
                          {order.paymentMethod || "نقداً"}
                        </div>
                      </td>
                      <td className="px-6 py-4 font-medium text-gray-600 dark:text-gray-400">
                        {dayjs(order.createdAt).format("YYYY/MM/DD")}
                        <div className="text-xs font-normal opacity-60">
                          {dayjs(order.createdAt).format("HH:mm")}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${statusColors[order.status] || "bg-gray-100 text-gray-700"}`}>
                          {statusLabels[order.status] || order.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="relative group/actions inline-block">
                          <select 
                            className="bg-transparent border-none text-blue-600 dark:text-blue-400 font-bold text-sm outline-none cursor-pointer focus:ring-0"
                            value={order.status}
                            onChange={(e) => handleStatusUpdate(order._id, e.target.value, activeTab === "guest")}
                          >
                            {activeTab === "standard" ? (
                              <>
                                <option value="placed">تغيير الحالة</option>
                                <option value="confirmed">تأكيد الطلب</option>
                                <option value="preparing">بدء التجهيز</option>
                                <option value="out_for_delivery">خرج للتوصيل</option>
                                <option value="delivered">تم التوصيل</option>
                                <option value="cancelled">إلغاء الطلب</option>
                                <option value="refunded">إرجاع الطلب</option>
                              </>
                            ) : (
                              <>
                                <option value="new">تغيير الحالة</option>
                                <option value="contacted">تم التواصل</option>
                                <option value="done">تم الإغلاق</option>
                                <option value="rejected">رفض</option>
                              </>
                            )}
                          </select>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="px-6 py-20 text-center">
                      <div className="flex flex-col items-center gap-3 text-gray-400">
                        <Package className="h-12 w-12 opacity-20" />
                        <p className="font-medium text-lg">لا توجد طلبات تطابق بحثك</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminOrders;
