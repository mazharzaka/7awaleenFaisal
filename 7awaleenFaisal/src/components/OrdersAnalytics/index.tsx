"use client";

import React, { useState, useEffect } from "react";
import { 
  Download, 
  Calendar as CalendarIcon, 
  Filter, 
  ChevronDown, 
  ArrowUpRight, 
  ArrowDownRight,
  MoreHorizontal,
  Search,
  LayoutGrid,
  List,
  Eye,
  FileText,
  FileJson,
  X,
  RefreshCcw,
  CheckCircle2,
  Clock,
  AlertCircle,
  Truck,
  CreditCard,
  User,
  Package,
  Globe
} from "lucide-react";
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  PieChart, 
  Pie, 
  Cell 
} from "recharts";
import { motion, AnimatePresence } from "framer-motion";
import dayjs from "dayjs";
import Breadcrumb from "../Common/Breadcrumb";

import { 
  useGetDashboardStatsQuery 
} from "@/redux/features/Api.slice";

const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#ec4899"];

const OrdersAnalytics = () => {
  const [chartType, setChartType] = useState<"line" | "bar" | "area">("area");
  const [isFilterSidebarOpen, setIsFilterSidebarOpen] = useState(false);
  const [dateRange, setDateRange] = useState("7");
  const [paymentMethodFilter, setPaymentMethodFilter] = useState("all");

  const { data, isLoading } = useGetDashboardStatsQuery({
    days: dateRange === "Today" ? "today" : dateRange.split(" ")[0],
    paymentMethod: paymentMethodFilter
  });

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (data?.recentOrders) {
      setOrders(data.recentOrders);
    }
  }, [data]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value.toLowerCase();
    if (!term) {
      setOrders(data?.recentOrders || []);
      return;
    }
    const filtered = (data?.recentOrders || []).filter((o: any) => 
      o.id.toString().toLowerCase().includes(term) || 
      o.customer.toLowerCase().includes(term)
    );
    setOrders(filtered);
  };

  if (isLoading) {
    return <SkeletonLoader />;
  }

  // Map backend stats to KPI components
  const kpis = [
    { title: "Total Orders", value: data?.analytics?.total?.toString() || "0", change: "+0%", isUp: true, icon: Package, color: "blue" },
    { title: "Completed Orders", value: data?.analytics?.completed?.toString() || "0", change: "+0%", isUp: true, icon: CheckCircle2, color: "emerald" },
    { title: "Pending Orders", value: data?.analytics?.pending?.toString() || "0", change: "+0%", isUp: false, icon: Clock, color: "amber" },
    { title: "Cancelled Orders", value: data?.analytics?.cancelled?.toString() || "0", change: "+0%", isUp: false, icon: AlertCircle, color: "rose" },
  ];

  // Map status distribution for Pie Chart
  const statusDistribution = Object.entries(data?.statusDistribution || {}).map(([name, value]) => ({
    name,
    value: Math.round(((value as number) / (data?.analytics?.total || 1)) * 100),
    color: name === "delivered" || name === "done" ? "#10b981" : 
           name === "cancelled" || name === "rejected" ? "#ef4444" : "#f59e0b"
  }));

  // Map payment methods for Bar Chart
  const paymentDistribution = Object.entries(data?.paymentMethods || {}).map(([name, value]) => ({
    name,
    value: value as number
  }));

  // Map shipping methods for Bar Chart
  const shippingDistribution = Object.entries(data?.shippingMethods || {}).map(([name, value]) => ({
    name,
    value: value as number
  }));

  // Chart data
  const chartData = data?.performance?.map((p: any) => ({
    name: dayjs(p.name).format("MMM DD"),
    current: p.current,
    previous: 0 // Backend could support previous period in future
  })) || [];

  return (
    <>
      <Breadcrumb title={"Orders Analytics"} pages={["OrdersAnalytics"]} />

    <div className="min-h-screen bg-[#f8fafc] dark:bg-[#0f172a] p-4 md:p-8 transition-colors duration-300" dir="ltr">
      <div className="max-w-[1400px] mx-auto">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">Orders Analytics</h1>
            <p className="text-slate-500 dark:text-slate-400 mt-1">Track order performance and trends across all channels.</p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-1 shadow-sm">
              {["Today", "7 days", "30 days", "Custom"].map((range) => (
                <button
                  key={range}
                  onClick={() => setDateRange(range)}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${
                    dateRange.includes(range)
                      ? "bg-blue-dark text-white shadow-md shadow-blue-500/20"
                      : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900"
                  }`}
                >
                  {range}
                </button>
              ))}
            </div>
            
            <button
              onClick={() => setIsFilterSidebarOpen(true)}
              className="flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-700 dark:text-slate-300 font-semibold hover:bg-slate-50 dark:hover:bg-slate-700 transition-all shadow-sm"
            >
              <Filter className="w-4 h-4" />
              <span>Filters</span>
            </button>

            <div className="relative group">
              <button className="flex items-center gap-2 px-4 py-2.5 bg-blue-dark text-white rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20">
                <Download className="w-4 h-4" />
                <span>Export</span>
                <ChevronDown className="w-4 h-4" />
              </button>
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-100 dark:border-slate-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10 p-2">
                <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 rounded-lg">
                  <FileText className="w-4 h-4" /> CSV Format
                </button>
                <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 rounded-lg">
                  <FileJson className="w-4 h-4" /> JSON Format
                </button>
                <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 rounded-lg">
                  <Globe className="w-4 h-4" /> PDF Report
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* KPI Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {kpis.map((kpi, idx) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              key={kpi.title}
              className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-xl hover:shadow-blue-500/5 transition-all group"
            >
              <div className="flex justify-between items-start mb-4">
                <div className={`p-3 rounded-2xl bg-${kpi.color}-50 dark:bg-${kpi.color}-900/20 text-${kpi.color}-600 dark:text-${kpi.color}-400 group-hover:scale-110 transition-transform`}>
                  <kpi.icon className="w-6 h-6" />
                </div>
                <div className={`flex items-center gap-1 text-sm font-bold ${kpi.isUp ? "text-emerald-500" : "text-rose-500"}`}>
                  {kpi.isUp ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                  {kpi.change}
                </div>
              </div>
              <h3 className="text-slate-500 dark:text-slate-400 text-sm font-semibold">{kpi.title}</h3>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-2xl font-black text-slate-900 dark:text-white leading-tight">
                  <AnimatedNumber value={kpi.value} />
                </span>
                <span className="text-xs text-slate-400 font-medium">vs last month</span>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mb-8">
          {/* Main Chart Section */}
          <div className="xl:col-span-2 bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
              <div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">Order Performance</h2>
                <div className="flex items-center gap-3 mt-1">
                  <div className="flex items-center gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-blue-dark"></div>
                    <span className="text-xs font-semibold text-slate-500">Current Period</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-slate-300 dark:bg-slate-600"></div>
                    <span className="text-xs font-semibold text-slate-500">Previous Period</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center bg-slate-100 dark:bg-slate-900/50 p-1 rounded-xl">
                <button
                  onClick={() => setChartType("line")}
                  className={`p-2 rounded-lg transition-all ${chartType === "line" ? "bg-white dark:bg-slate-700 shadow-sm text-blue-600" : "text-slate-500"}`}
                >
                  <List className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setChartType("bar")}
                  className={`p-2 rounded-lg transition-all ${chartType === "bar" ? "bg-white dark:bg-slate-700 shadow-sm text-blue-600" : "text-slate-500"}`}
                >
                  <LayoutGrid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setChartType("area")}
                  className={`p-2 rounded-lg transition-all ${chartType === "area" ? "bg-white dark:bg-slate-700 shadow-sm text-blue-600" : "text-slate-500"}`}
                >
                  <RefreshCcw className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            <div className="h-[400px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                {chartType === "line" ? (
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94A3B8', fontSize: 12}} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{fill: '#94A3B8', fontSize: 12}} dx={-10} />
                    <Tooltip 
                      contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)', padding: '12px' }} 
                      cursor={{ stroke: '#3b82f6', strokeWidth: 2, strokeDasharray: '5 5' }}
                    />
                    <Line type="monotone" dataKey="current" stroke="#3b82f6" strokeWidth={4} dot={{ r: 4, fill: '#3b82f6', strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 8 }} />
                    <Line type="monotone" dataKey="previous" stroke="#CBD5E1" strokeWidth={2} strokeDasharray="5 5" dot={false} />
                  </LineChart>
                ) : chartType === "bar" ? (
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94A3B8', fontSize: 12}} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{fill: '#94A3B8', fontSize: 12}} dx={-10} />
                    <Tooltip contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }} />
                    <Bar dataKey="current" fill="#3b82f6" radius={[6, 6, 0, 0]} barSize={24} />
                    <Bar dataKey="previous" fill="#E2E8F0" radius={[6, 6, 0, 0]} barSize={24} />
                  </BarChart>
                ) : (
                  <AreaChart data={chartData}>
                    <defs>
                      <linearGradient id="colorCurrent" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" opacity={0.5} />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94A3B8', fontSize: 12}} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{fill: '#94A3B8', fontSize: 12}} dx={-10} />
                    <Tooltip contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }} />
                    <Area type="monotone" dataKey="current" stroke="#3b82f6" strokeWidth={4} fillOpacity={1} fill="url(#colorCurrent)" />
                    <Area type="monotone" dataKey="previous" stroke="#CBD5E1" strokeWidth={2} strokeDasharray="5 5" fill="none" />
                  </AreaChart>
                )}
              </ResponsiveContainer>
            </div>
          </div>

          {/* Pie Chart: Orders by Status */}
          <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-sm flex flex-col items-center">
            <div className="w-full flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">Orders by Status</h2>
              <button className="p-2 text-slate-400 hover:text-slate-600 transition-colors">
                <MoreHorizontal className="w-5 h-5" />
              </button>
            </div>
            <div className="h-[280px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={statusDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={8}
                    dataKey="value"
                  >
                    {statusDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }} 
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="w-full grid grid-cols-2 gap-4 mt-6">
              {statusDistribution.map((item) => (
                <div key={item.name} className="flex items-center gap-3">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }}></div>
                  <div className="flex flex-col">
                    <span className="text-xs font-semibold text-slate-500">{item.name}</span>
                    <span className="text-sm font-bold text-slate-900 dark:text-white">{item.value}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Secondary Bar Chart: Payment Methods */}
          <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Payment Methods</h2>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={paymentDistribution} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#E2E8F0" opacity={0.3} />
                  <XAxis type="number" hide />
                  <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} width={100} tick={{fill: '#64748B', fontWeight: 600, fontSize: 13}} />
                  <Tooltip contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }} />
                  <Bar dataKey="value" fill="#3b82f6" radius={[0, 8, 8, 0]} barSize={24}>
                    {paymentDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Secondary Bar Chart: Shipping Methods */}
          <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Shipping Methods</h2>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={shippingDistribution}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" opacity={0.3} />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748B', fontWeight: 600, fontSize: 13}} dy={10} />
                  <YAxis hide />
                  <Tooltip contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }} />
                  <Bar dataKey="value" fill="#3b82f6" radius={[8, 8, 0, 0]} barSize={50}>
                    {shippingDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[(index + 3) % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Recent Orders Table Section */}
        <div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-50 dark:border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">Recent Orders</h2>
              <p className="text-sm text-slate-500 mt-0.5">Summary of the last 5 transactions</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                <input 
                  type="text" 
                  placeholder="Search orders..."
                  onChange={handleSearch}
                  className="pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all w-full sm:w-64"
                />
              </div>
              <button className="text-blue-600 font-bold text-sm hover:underline">View All</button>
            </div>
          </div>
          <div className="overflow-x-auto text-left">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-50/50 dark:bg-slate-900/50 text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wider">
                  <th className="px-6 py-4">Order ID</th>
                  <th className="px-6 py-4">Customer</th>
                  <th className="px-6 py-4">Total Amount</th>
                  <th className="px-6 py-4">Payment Status</th>
                  <th className="px-6 py-4">Order Status</th>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 dark:divide-slate-700">
                {orders.length > 0 ? orders.map((order) => (
                  <tr key={order.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-900/30 transition-colors group">
                    <td className="px-6 py-4">
                      <span className="font-bold text-blue-600 dark:text-blue-400">{order.id}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 text-xs font-black">
                          {order.customer[0]}
                        </div>
                        <span className="font-semibold text-slate-900 dark:text-white">{order.customer}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-bold text-slate-900 dark:text-white">{order.total} ج.م</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${
                        order.payment === "Paid" ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400" :
                        "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
                      }`}>
                        {order.payment}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold ${
                        order.status === "Delivered" ? "bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400" :
                        order.status === "Processing" ? "bg-purple-50 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400" :
                        order.status === "Shipped" ? "bg-indigo-50 text-indigo-600 dark:bg-indigo-900/20 dark:text-indigo-400" :
                        "bg-rose-50 text-rose-600 dark:bg-rose-900/20 dark:text-rose-400"
                      }`}>
                        <div className={`w-1.5 h-1.5 rounded-full ${
                          order.status === "Delivered" ? "bg-blue-dark" :
                          order.status === "Processing" ? "bg-purple-600" :
                          order.status === "Shipped" ? "bg-indigo-600" :
                          "bg-rose-600"
                        }`}></div>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-500 dark:text-slate-400 font-medium text-sm">
                      {dayjs(order.date).format("MMM DD, YYYY")}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button className="p-2 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors group-hover:text-blue-600">
                        <Eye className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={7} className="px-6 py-20 text-center">
                      <div className="flex flex-col items-center justify-center gap-4">
                        <div className="w-16 h-16 rounded-full bg-slate-50 dark:bg-slate-900 flex items-center justify-center">
                          <Package className="w-8 h-8 text-slate-300" />
                        </div>
                        <div>
                          <p className="text-slate-900 dark:text-white font-bold">No orders found</p>
                          <p className="text-slate-500 text-sm">Try adjusting your search or filters</p>
                        </div>
                        <button 
                          onClick={() => setOrders(data?.recentOrders || [])}
                          className="px-4 py-2 text-sm font-bold text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                        >
                          Clear all search
                        </button>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="p-6 bg-slate-50/50 dark:bg-slate-900/50 flex items-center justify-center">
             <button className="flex items-center gap-2 group text-sm font-bold text-slate-500 hover:text-blue-600 transition-colors">
                Load more orders
                <ChevronDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
             </button>
          </div>
        </div>
      </div>

      {/* Filter Sidebar - AnimatePresence to handle mounting/unmounting */}
      <AnimatePresence>
        {isFilterSidebarOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsFilterSidebarOpen(false)}
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40"
            />
            <motion.div 
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 h-full w-full max-w-sm bg-white dark:bg-slate-800 shadow-2xl z-50 overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">Filters</h3>
                  <button 
                    onClick={() => setIsFilterSidebarOpen(false)}
                    className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-full transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-8">
                  <div>
                    <label className="block text-sm font-bold text-slate-900 dark:text-white mb-3">Order Status</label>
                    <div className="flex flex-wrap gap-2">
                      {["Pending", "Processing", "Shipped", "Delivered", "Cancelled"].map((status) => (
                        <button key={status} className="px-3 py-1.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-semibold text-slate-600 hover:bg-blue-50 hover:border-blue-200 transition-all">
                          {status}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-slate-900 dark:text-white mb-3">Payment Method</label>
                    <div className="space-y-2">
                       {["Credit Card", "PayPal", "Bank Transfer", "Cash on Delivery"].map((method) => (
                        <div key={method} className="flex items-center gap-3">
                          <input type="checkbox" id={method} className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
                          <label htmlFor={method} className="text-sm text-slate-600 dark:text-slate-400 font-medium">{method}</label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-slate-900 dark:text-white mb-3">Customer Type</label>
                    <select className="w-full p-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-sm outline-none">
                      <option>All Customers</option>
                      <option>New Customers</option>
                      <option>Returning Customers</option>
                      <option>VIP Members</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-slate-900 dark:text-white mb-3">Country</label>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                      <input type="text" placeholder="Search countries..." className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-sm outline-none" />
                    </div>
                  </div>
                </div>

                <div className="mt-12 flex gap-4">
                  <button 
                    onClick={() => setIsFilterSidebarOpen(false)}
                    className="flex-1 py-3 bg-blue-dark text-white font-bold rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20"
                  >
                    Apply Filters
                  </button>
                  <button 
                    onClick={() => {
                        setPaymentMethodFilter("all");
                        setDateRange("7");
                        setIsFilterSidebarOpen(false);
                    }}
                    className="px-6 py-3 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 font-bold rounded-xl hover:bg-slate-200 transition-all"
                  >
                    Reset
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
    </>
  );
};

// Helper Components
const AnimatedNumber = ({ value }: { value: string }) => {
  const numericValue = parseInt(value.replace(/,/g, ''));
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = numericValue;
    const duration = 1000;
    let startTimestamp: number | null = null;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const current = Math.floor(progress * (end - start) + start);
      setDisplayValue(current);
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [numericValue]);

  return <span>{displayValue.toLocaleString()}</span>;
}

const SkeletonLoader = () => (
  <div className="min-h-screen bg-[#f8fafc] dark:bg-[#0f172a] p-4 md:p-8 animate-pulse">
    <div className="max-w-[1400px] mx-auto">
      <div className="flex justify-between items-start mb-8">
        <div className="space-y-3">
          <div className="h-8 w-64 bg-slate-200 dark:bg-slate-800 rounded-lg"></div>
          <div className="h-4 w-96 bg-slate-100 dark:bg-slate-800/50 rounded-lg"></div>
        </div>
        <div className="h-12 w-48 bg-slate-200 dark:bg-slate-800 rounded-xl"></div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="h-32 bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700"></div>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 h-[500px] bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700"></div>
        <div className="h-[500px] bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700"></div>
      </div>
    </div>
  </div>
);

export default OrdersAnalytics;
