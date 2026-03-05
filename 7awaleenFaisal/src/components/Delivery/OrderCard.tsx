"use client";

import React from "react";
import { Clock, Store, MapPin, Navigation, Route } from "lucide-react";

export interface OrderProps {
  id: string;
  timeElapsed: string; // e.g., "5 min ago"
  pickupArea: string; // e.g., "Downtown Store"
  dropoffArea: string; // e.g., "Uptown Customer"
  distanceKm: number;
  earnings: number;
  currency?: string;
  status?: "pending" | "searching" | "accepted" | "picked_up" | "delivered";
}

interface OrderCardProps {
  order: OrderProps;
  onAccept?: (id: string) => void;
  onReject?: (id: string) => void;
}

const OrderCard: React.FC<OrderCardProps> = ({
  order,
  onAccept,
  onReject,
}) => {
  return (
    <div className="bg-white dark:bg-dark-2 rounded-2xl p-4 shadow-1 border border-gray-2 dark:border-dark-3 flex flex-col gap-4 relative overflow-hidden transition-all hover:shadow-2">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-2 dark:border-dark-3 pb-3">
        <h3 className="text-body dark:text-gray-4 text-sm font-semibold flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-blue"></span>
          Order #{order.id}
        </h3>
        <div className="flex items-center gap-1.5 bg-orange/10 dark:bg-orange/20 text-orange px-2.5 py-1 rounded-full text-xs font-medium">
          <Clock size={12} />
          {order.timeElapsed}
        </div>
      </div>

      {/* Body: Vertical Timeline */}
      <div className="flex flex-col gap-4 py-2">
        <div className="flex gap-3">
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 rounded-full bg-blue/10 dark:bg-blue/20 text-blue flex items-center justify-center z-10">
              <Store size={16} />
            </div>
            <div className="w-0.5 h-full min-h-[1.5rem] bg-gray-3 dark:bg-dark-3 my-1 border-dashed border-l-2 border-gray-3 dark:border-dark-3"></div>
          </div>
          <div className="flex flex-col justify-start">
            <span className="text-xs text-body dark:text-gray-5 uppercase font-medium">Pickup</span>
            <span className="text-dark dark:text-white font-semibold text-sm">
              {order.pickupArea}
            </span>
          </div>
        </div>

        <div className="flex gap-3">
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 rounded-full bg-green/10 dark:bg-green/20 text-green flex items-center justify-center z-10">
              <MapPin size={16} />
            </div>
          </div>
          <div className="flex flex-col justify-start">
            <span className="text-xs text-body dark:text-gray-5 uppercase font-medium">Drop-off</span>
            <span className="text-dark dark:text-white font-semibold text-sm">
              {order.dropoffArea}
            </span>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="flex items-center justify-between bg-gray-1 dark:bg-dark rounded-xl p-3 mt-1 border border-gray-2 dark:border-dark-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-white dark:bg-dark-2 flex items-center justify-center shadow-sm text-body dark:text-gray-4">
            <Route size={16} />
          </div>
          <div className="flex flex-col">
            <span className="text-xs text-body dark:text-gray-5">Total Distance</span>
            <span className="font-bold text-dark dark:text-white text-sm">
              {order.distanceKm} <span className="text-xs font-normal">km</span>
            </span>
          </div>
        </div>

        <div className="w-px h-8 bg-gray-3 dark:bg-dark-3"></div>

        <div className="flex items-center gap-2">
          <div className="flex flex-col items-end">
            <span className="text-xs text-body dark:text-gray-5">Earning</span>
            <span className="flex items-baseline gap-1 font-bold text-blue text-lg leading-none">
              {order.earnings}
              <span className="text-xs font-medium uppercase">{order.currency || "EGP"}</span>
            </span>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3 mt-1">
        {order.status === "pending" || !order.status || order.status === "searching" ? (
          <>
            {onReject && (
              <button
                onClick={() => onReject(order.id)}
                className="px-4 py-3 min-h-[48px] rounded-xl bg-gray-2 dark:bg-dark-3 text-dark dark:text-white font-semibold text-sm hover:bg-gray-3 dark:hover:bg-dark-4 transition-colors"
                aria-label={`Reject order ${order.id}`}
              >
                Reject
              </button>
            )}
            <button
              onClick={() => onAccept && onAccept(order.id)}
              className="flex-1 bg-blue min-h-[48px] text-white py-3 rounded-xl font-semibold text-sm shadow-sm hover:bg-blue-dark transition-colors flex items-center justify-center gap-2"
              aria-label={`Accept order ${order.id}`}
            >
              <Navigation size={18} />
              Accept Order
            </button>
          </>
        ) : (
          <button
            onClick={() => {}}
            className="flex-1 border-2 border-blue min-h-[48px] text-blue py-3 rounded-xl font-semibold text-sm shadow-sm hover:bg-blue/5 dark:hover:bg-blue/10 transition-colors flex items-center justify-center gap-2"
            aria-label={`View details for order ${order.id}`}
          >
            <Navigation size={18} />
            View Trip Details
          </button>
        )}
      </div>
    </div>
  );
};

export default OrderCard;
