"use client";
import React, { useState, useMemo } from "react";
import { 
  useGetAllOrdersQuery, 
  useGetGeustOrderQuery 
} from "@/redux/features/Api.slice";
import Breadcrumb from "../Common/Breadcrumb";
import { 
  Search, 
  Filter, 
  ChevronDown, 
  Calendar, 
  CreditCard,
  Loader2,
  ArrowUpDown,
  Package,
  TrendingUp,
  DollarSign,
  ShoppingCart,
  CheckCircle2,
  Clock,
  XCircle,
  Truck
} from "lucide-react";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";

dayjs.extend(isBetween);

const SalesPage = () => {
  const [activeTab, setActiveTab] = useState<"standard" | "guest">("standard");
  const [searchTerm, setSearchTerm] = useState("");
  const [paymentFilter, setPaymentFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("all"); // all, today, week, month
  const [sortBy, setSortBy] = useState<{ field: string; direction: "asc" | "desc" }>({
    field: "createdAt",
    direction: "desc",
  });

  const { data: standardOrders, isLoading: loadingStandard } = useGetAllOrdersQuery();
  const { data: guestOrders, isLoading: loadingGuest } = useGetGeustOrderQuery();

  const toggleSort = (field: string) => {
    setSortBy(prev => ({
      field,
      direction: prev.field === field && prev.direction === "desc" ? "asc" : "desc"
    }));
  };

  const processedOrders = useMemo(() => {
    const orders = activeTab === "standard" ? standardOrders || [] : guestOrders || [];
    
    let result = orders.filter((order: any) => {
      const searchStr = searchTerm.toLowerCase();
      const customerName = (order.customerInfo?.name || order.name || "").toLowerCase();
      const orderId = order._id.toString().toLowerCase();
      
      const matchesSearch = customerName.includes(searchStr) || orderId.includes(searchStr);
      
      // Payment Method Filter (only for standard orders as guest orders are always whatsapp/cash)
      const matchesPayment = paymentFilter === "all" || (order.paymentMethod === paymentFilter);
      
      // Date Filter
      let matchesDate = true;
      const now = dayjs();
      if (dateFilter === "today") {
        matchesDate = dayjs(order.createdAt).isSame(now, 'day');
      } else if (dateFilter === "week") {
        matchesDate = dayjs(order.createdAt).isAfter(now.subtract(7, 'day'));
      } else if (dateFilter === "month") {
        matchesDate = dayjs(order.createdAt).isAfter(now.subtract(30, 'day'));
      }

      return matchesSearch && matchesPayment && matchesDate;
    });

    // Sorting
    result = [...result].sort((a: any, b: any) => {
      let aField = sortBy.field;
      let bField = sortBy.field;

      // Normalize price fields
      if (activeTab === "standard") {
        if (aField === "amount") aField = "total";
        if (bField === "amount") bField = "total";
      } else {
        if (aField === "amount") aField = "finalPrice";
        if (bField === "amount") bField = "finalPrice";
      }

      let aValue = a[aField] || a["total"] || a["finalPrice"];
      let bValue = b[bField] || b["total"] || b["finalPrice"];

      // Handle nested fields if needed (e.g. paymentMethod)
      if (sortBy.field === "paymentMethod") {
        aValue = aValue || "cash";
        bValue = bValue || "cash";
      }

      if (sortBy.direction === "asc") {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    return result;
  }, [activeTab, standardOrders, guestOrders, searchTerm, paymentFilter, dateFilter, sortBy]);

  const stats = useMemo(() => {
    const totalSales = processedOrders.reduce((acc: number, order: any) => acc + (order.total || order.finalPrice || 0), 0);
    const orderCount = processedOrders.length;
    const avgOrder = orderCount > 0 ? totalSales / orderCount : 0;
    
    return {
      totalSales,
      orderCount,
      avgOrder
    };
  }, [processedOrders]);

  if (loadingStandard || loadingGuest) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="bg-gray-50 dark:bg-[#121212] min-h-screen pb-20">
      <Breadcrumb title="تقارير المبيعات" pages={["لوحة التحكم", "المبيعات"]} />
      
      <div className="max-w-[1170px] mx-auto px-4 sm:px-7.5 xl:px-0 mt-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white dark:bg-[#1e1e1e] p-6 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm flex items-center gap-5">
            <div className="w-14 h-14 rounded-2xl bg-emerald-50 dark:bg-emerald-900/20 flex items-center justify-center text-emerald-600">
              <DollarSign className="h-7 w-7" />
            </div>
            <div>
              <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">إجمالي المبيعات</p>
              <h3 className="text-2xl font-bold dark:text-white mt-1">{stats.totalSales.toLocaleString()} ج.م</h3>
            </div>
          </div>
          
          <div className="bg-white dark:bg-[#1e1e1e] p-6 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm flex items-center gap-5">
            <div className="w-14 h-14 rounded-2xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-600">
              <ShoppingCart className="h-7 w-7" />
            </div>
            <div>
              <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">عدد الطلبات</p>
              <h3 className="text-2xl font-bold dark:text-white mt-1">{stats.orderCount} طلب</h3>
            </div>
          </div>

          <div className="bg-white dark:bg-[#1e1e1e] p-6 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm flex items-center gap-5">
            <div className="w-14 h-14 rounded-2xl bg-purple-50 dark:bg-purple-900/20 flex items-center justify-center text-purple-600">
              <TrendingUp className="h-7 w-7" />
            </div>
            <div>
              <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">متوسط قيمة الطلب</p>
              <h3 className="text-2xl font-bold dark:text-white mt-1">{stats.avgOrder.toFixed(2)} ج.م</h3>
            </div>
          </div>
        </div>

        {/* Filters Row */}
        <div className="bg-white dark:bg-[#1e1e1e] p-6 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm mb-6">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            <div className="flex-1 w-full relative">
              <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input 
                type="text" 
                placeholder="البحث برقم الطلب أو اسم العميل..."
                className="w-full pr-12 pl-4 py-3 rounded-xl border border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-[#121212] outline-none focus:ring-2 focus:ring-blue-500 transition-all text-right"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
              <div className="flex items-center gap-2 bg-gray-50 dark:bg-[#121212] px-4 py-3 rounded-xl border border-gray-100 dark:border-gray-800">
                <Calendar className="h-5 w-5 text-gray-400" />
                <select 
                  className="bg-transparent outline-none text-right font-medium dark:text-white cursor-pointer"
                  value={dateFilter}
                  onChange={(e) => setDateFilter(e.target.value)}
                >
                  <option value="all">كل الأوقات</option>
                  <option value="today">اليوم</option>
                  <option value="week">آخر ٧ أيام</option>
                  <option value="month">آخر ٣٠ يوم</option>
                </select>
              </div>

              {activeTab === "standard" && (
                <div className="flex items-center gap-2 bg-gray-50 dark:bg-[#121212] px-4 py-3 rounded-xl border border-gray-100 dark:border-gray-800">
                  <CreditCard className="h-5 w-5 text-gray-400" />
                  <select 
                    className="bg-transparent outline-none text-right font-medium dark:text-white cursor-pointer"
                    value={paymentFilter}
                    onChange={(e) => setPaymentFilter(e.target.value)}
                  >
                    <option value="all">كل طرق الدفع</option>
                    <option value="cash">كاش</option>
                    <option value="card">بطاقة بانكية</option>
                    <option value="wallet">محفظة</option>
                    <option value="whatsapp">واتساب</option>
                  </select>
                </div>
              )}

              <div className="flex gap-2 p-1 bg-gray-50 dark:bg-[#121212] rounded-xl border border-gray-100 dark:border-gray-800">
                <button 
                  onClick={() => { setActiveTab("standard"); setPaymentFilter("all"); }}
                  className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === "standard" ? "bg-white dark:bg-[#1e1e1e] text-blue-600 shadow-sm" : "text-gray-500"}`}
                >
                  طلبات الموقع
                </button>
                <button 
                  onClick={() => { setActiveTab("guest"); setPaymentFilter("all"); }}
                  className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === "guest" ? "bg-white dark:bg-[#1e1e1e] text-blue-600 shadow-sm" : "text-gray-500"}`}
                >
                  طلبات الواتساب
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Sales Table */}
        <div className="bg-white dark:bg-[#1e1e1e] rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-right">
              <thead>
                <tr className="bg-gray-50 dark:bg-[#252525] border-b border-gray-200 dark:border-gray-800 text-gray-500 dark:text-gray-400">
                  <th className="px-6 py-4 font-bold text-sm">الطلب</th>
                  <th className="px-6 py-4 font-bold text-sm">العميل</th>
                  <th className="px-6 py-4 font-bold text-sm text-center">
                    <button onClick={() => toggleSort("createdAt")} className="flex items-center gap-2 mx-auto">
                      <ArrowUpDown className="h-4 w-4" />
                      التاريخ
                    </button>
                  </th>
                  <th className="px-6 py-4 font-bold text-sm text-center">
                    <button onClick={() => toggleSort("paymentMethod")} className="flex items-center gap-2 mx-auto">
                      <ArrowUpDown className="h-4 w-4" />
                      طريقة الدفع
                    </button>
                  </th>
                  <th className="px-6 py-4 font-bold text-sm">
                    <button onClick={() => toggleSort("amount")} className="flex items-center gap-2 mr-auto ml-0">
                      <ArrowUpDown className="h-4 w-4" />
                      المبلغ
                    </button>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {processedOrders.length > 0 ? (
                  processedOrders.map((order: any) => (
                    <tr key={order._id} className="hover:bg-gray-50/50 dark:hover:bg-white/5 transition-colors">
                      <td className="px-6 py-4">
                        <div className="font-bold text-dark dark:text-white">
                          #{order._id.toString().slice(-6).toUpperCase()}
                        </div>
                        <div className="text-xs text-gray-400 mt-0.5">
                          {activeTab === "standard" ? "طلب موقع" : "طلب واتساب"}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-bold text-dark dark:text-white">
                          {order.customerInfo?.name || order.name}
                        </div>
                        <div className="text-xs text-gray-500">
                          {order.customerInfo?.phone || order.phone}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="text-sm font-medium dark:text-gray-300">
                          {dayjs(order.createdAt).format("YYYY/MM/DD")}
                        </div>
                        <div className="text-xs text-gray-400">
                          {dayjs(order.createdAt).format("HH:mm")}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
                          order.paymentMethod === "card" ? "bg-blue-50 text-blue-600 dark:bg-blue-900/20" :
                          order.paymentMethod === "wallet" ? "bg-purple-50 text-purple-600 dark:bg-purple-900/20" :
                          "bg-amber-50 text-amber-600 dark:bg-amber-900/20"
                        }`}>
                          <CreditCard className="h-3 w-3" />
                          {order.paymentMethod === "card" ? "بطاقة بانكية" :
                           order.paymentMethod === "wallet" ? "محفظة" :
                           order.paymentMethod === "whatsapp" ? "واتساب" : "كاش"}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-bold text-dark dark:text-white mr-auto text-left">
                          {(order.total || order.finalPrice || 0).toLocaleString()} ج.م
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="px-6 py-20 text-center">
                      <div className="flex flex-col items-center gap-3 text-gray-400">
                        <Package className="h-12 w-12 opacity-20" />
                        <p className="font-medium text-lg">لا توجد مبيعات تطابق بحثك</p>
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

export default SalesPage;
