"use client";

import React, { useState, useEffect } from "react";
import DriverStatusToggle from "@/components/Delivery/DriverStatusToggle";
import DashboardTabs from "@/components/Delivery/DashboardTabs";
import QuickStatsBar from "@/components/Delivery/QuickStatsBar";
import OrderCard, { OrderProps } from "@/components/Delivery/OrderCard";
import Breadcrumb from "@/components/Common/Breadcrumb";
import BottomNavigation from "@/components/Delivery/BottomNavigation";
import EmptyState from "@/components/UI/EmptyState";

// Extending OrderProps for the frontend mock state
// Note: In real scenarios, these will be populated from GET /api/delivery/orders
const MOCK_AVAILABLE_ORDERS: OrderProps[] = [
  {
    id: "10283",
    timeElapsed: "Just now",
    pickupArea: "Nasr City Store",
    dropoffArea: "Heliopolis",
    distanceKm: 4.2,
    earnings: 45,
    status: "pending",
  },
  {
    id: "10284",
    timeElapsed: "5 min ago",
    pickupArea: "Maadi Fresh Food",
    dropoffArea: "Zamalek",
    distanceKm: 12.5,
    earnings: 120,
    status: "pending",
  },
];

const MOCK_ACTIVE_ORDERS: OrderProps[] = [
  {
    id: "88219",
    timeElapsed: "15 min ago",
    pickupArea: "Downtown Pizzeria",
    dropoffArea: "Garden City",
    distanceKm: 2.1,
    earnings: 30,
    status: "accepted",
  },
];

import { useSelector, useDispatch } from "react-redux";
import { setCredentials } from "@/redux/features/Auth.slice";
import toast from "react-hot-toast";

const DriverDashboardPage = () => {
  const { user, token } = useSelector((state: any) => state.auth);
  const dispatch = useDispatch();

  const [isOnline, setIsOnline] = useState(user?.isOnline || false);
  const [activeTab, setActiveTab] = useState<"available" | "active">("available");
  
  const [availableOrders, setAvailableOrders] = useState<OrderProps[]>([]);
  const [activeOrders, setActiveOrders] = useState<OrderProps[]>([]);
  const [loading, setLoading] = useState(true);

  // Helper to map backend order to frontend OrderProps
  const mapOrder = (order: any): OrderProps => ({
    id: order._id,
    timeElapsed: new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    pickupArea: order.storeId?.name || "Multiple Items",
    dropoffArea: order.customerInfo?.address || order.address || "Customer Location",
    distanceKm: 5.0, // Backend doesn't have distance yet, mocking it
    earnings: Math.round(order.total * 0.15), // Mock 15% commission as earnings
    status: order.status,
  });

  const fetchData = async () => {
    if (!token) return;
    setLoading(true);
    try {
      const route = activeTab === "available" ? "available" : "active";
      const response = await fetch(`http://localhost:5000/delivery/orders/${route}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await response.json();
      if (Array.isArray(data)) {
        const mapped = data.map(mapOrder);
        if (activeTab === "available") setAvailableOrders(mapped);
        else setActiveOrders(mapped);
      }
    } catch (error) {
      console.error("Fetch failed", error);
      toast.error("Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [activeTab, token]);

  const handleToggleStatus = async () => {
    if (!user?.isApproved) {
      toast.error("Account not approved yet.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/delivery/status-toggle", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}` 
        }
      });
      const data = await response.json();
      if (data.success) {
        setIsOnline(data.isOnline);
        toast.success(data.message);
        // Sync Redux
        dispatch(setCredentials({ 
          accessToken: token, 
          refreshToken: localStorage.getItem("refreshToken"),
          user: { ...user, isOnline: data.isOnline } 
        }));
      }
    } catch (error) {
      toast.error("Failed to toggle status");
    }
  };

  const handleAcceptOrder = async (id: string) => {
    try {
      const res = await fetch("http://localhost:5000/delivery/accept", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}` 
        },
        body: JSON.stringify({ orderId: id })
      });
      const data = await res.json();
      if (data.success) {
        toast.success("Order accepted!");
        fetchData();
        setActiveTab("active");
      } else {
        toast.error(data.error);
      }
    } catch (error) {
      toast.error("Failed to accept order");
    }
  };

  const handleRejectOrder = (id: string) => {
    setAvailableOrders((prev) => prev.filter((o) => o.id !== id));
  };

  const displayOrders = activeTab === "available" ? availableOrders : activeOrders;

  return (
    <>
      <Breadcrumb title="Driver Dashboard" pages={["Driver Dashboard"]} />

      <section className="pb-32 pt-10">
        <div className="container">
          <div className="mx-auto max-w-[600px] flex flex-col gap-6">
            
            {/* Header section with Toggle and minimal welcoming message */}
            <div className="flex items-center justify-between pb-2">
              <div>
                <h2 className="text-xl font-bold text-dark dark:text-white mb-1">
                  Welcome back, {user?.name}!
                </h2>
                <p className="text-sm text-body dark:text-gray-4">
                  {isOnline ? "You are receiving requests." : "Go online to start earning."}
                </p>
              </div>
              <DriverStatusToggle 
                isOnline={isOnline} 
                onToggle={handleToggleStatus} 
                disabled={!user?.isApproved}
              />
            </div>

            {/* Quick Stats Bar */}
            <QuickStatsBar earnings={150.50} completedJobs={4} currency="EGP" />

            {/* Tabs */}
            <div className="mt-2 sticky top-[80px] z-40 bg-white/80 dark:bg-dark/80 backdrop-blur-md pb-4 pt-2 -mx-4 px-4 sm:mx-0 sm:px-0">
              <DashboardTabs
                activeTab={activeTab}
                onTabChange={setActiveTab}
                availableCount={availableOrders.length}
                activeCount={activeOrders.length}
              />
            </div>

            {/* Main Content Area */}
            <div className="flex flex-col gap-4 min-h-[50vh]">
              {loading ? (
                <div className="flex items-center justify-center p-20">
                  <div className="w-8 h-8 border-4 border-blue border-t-transparent rounded-full animate-spin"></div>
                </div>
              ) : !isOnline && activeTab === "available" ? (
                <div className="flex flex-col items-center justify-center bg-gray-1 dark:bg-dark-2 rounded-2xl p-10 mt-4 border border-gray-2 dark:border-dark-3 text-center">
                  <div className="w-16 h-16 bg-gray-2 dark:bg-dark-3 rounded-full flex items-center justify-center mb-4 text-gray-4 dark:text-gray-5">
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-dark dark:text-white mb-2">You are Offline</h3>
                  <p className="text-sm text-body dark:text-gray-4 max-w-[250px]">
                    Go online to receive and accept new delivery requests from customers.
                  </p>
                  <button 
                    onClick={handleToggleStatus}
                    className="mt-6 px-6 py-2.5 bg-green rounded-full text-white font-medium hover:bg-green-dark transition-colors shadow-sm disabled:opacity-50"
                    disabled={!user?.isApproved}
                  >
                    Go Online Now
                  </button>
                </div>
              ) : (
                <>
                  {displayOrders.length > 0 ? (
                    <div className="flex flex-col gap-4 animate-fade-in">
                      {displayOrders.map((order) => (
                        <OrderCard
                          key={order.id}
                          order={order}
                          onAccept={activeTab === "available" ? handleAcceptOrder : undefined}
                          onReject={activeTab === "available" ? handleRejectOrder : undefined}
                        />
                      ))}
                    </div>
                  ) : (
                      <EmptyState
                        title={activeTab === "available" ? "No Available Orders" : "No Active Trips"}
                      />
                  )}
                </>
              )}
            </div>

          </div>
        </div>
      </section>

      <BottomNavigation />
    </>
  );
};

export default DriverDashboardPage;
