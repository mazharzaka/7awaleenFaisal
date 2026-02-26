"use client";
import React from "react";
import { Check, Package, Truck, Store, ShoppingBag, XCircle, RotateCcw, Clock, CheckCheck, Clock1, CircleCheckBig } from "lucide-react";

export type OrderStatus = 
  | "placed" 
  | "confirmed" 
  | "preparing" 
  | "out_for_delivery" 
  | "delivered" 
  | "cancelled" 
  | "refunded";

interface Step {
  id: OrderStatus;
  label: string;
  icon: React.ReactNode;
  description: string;
  color: string;
}

const steps: Step[] = [
  { 
    id: "placed", 
    label: "تم الطلب", 
    icon: <ShoppingBag size={20} />, 
    description: "تلقينا طلبك بنجاح",
    color: "blue"
  },
  { 
    id: "confirmed", 
    label: "تم التأكيد", 
    icon: <Check size={20} />, 
    description: "تم مراجعة الطلب وتأكيده من قبل المتجر",
    color: "blue"
  },
  { 
    id: "preparing", 
    label: "جاري التجهيز", 
    icon: <Store size={20} />, 
    description: "نقوم الآن بتحضير طلبك",
    color: "orange"
  },
  { 
    id: "out_for_delivery", 
    label: "خارج للتوصيل", 
    icon: <Truck size={20} />, 
    description: "طلبك في الطريق إليك",
    color: "orange"
  },
  { 
    id: "delivered", 
    label: "تم التوصيل", 
    icon: <Package size={20} />, 
    description: "استمتع بمنتجاتك!",
    color: "green"
  },
];

const cancelledStep: Step = {
  id: "cancelled",
  label: "ملغي",
  icon: <XCircle size={20} />,
  description: "تم إلغاء هذا الطلب",
  color: "red"
};

const refundedStep: Step = {
  id: "refunded",
  label: "مسترجع",
  icon: <RotateCcw size={20} />,
  description: "تم استرداد هذا الطلب",
  color: "gray"
};

interface TimelineStepperProps {
  currentStatus: OrderStatus;
}

const TimelineStepper: React.FC<TimelineStepperProps> = ({ currentStatus }) => {
  const isCancelled = currentStatus === "cancelled";
  const isRefunded = currentStatus === "refunded";

  const getStepIndex = (status: OrderStatus) => {
    return steps.findIndex((step) => step.id === status);
  };

  const currentIndex = getStepIndex(currentStatus);
console.log(currentIndex) 
  if (isCancelled || isRefunded) {
    const specialStep = isCancelled ? cancelledStep : refundedStep;
    return (
      <div className={`flex items-center gap-6 p-6 rounded-2xl ${isCancelled ? 'bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/20' : 'bg-gray-50 dark:bg-gray-700/20 border border-gray-100 dark:border-gray-700'}`}>
        <div className={`w-14 h-14 rounded-full ${isCancelled ? 'bg-red-500 shadow-red-200' : 'bg-gray-500 shadow-gray-200'} shadow-lg text-white flex items-center justify-center animate-pulse`}>
          {specialStep.icon}
        </div>
        <div>
          <h4 className={`font-bold text-lg ${isCancelled ? 'text-red-700' : 'text-gray-700'} dark:text-inherit`}>{specialStep.label}</h4>
          <p className={`text-sm ${isCancelled ? 'text-red-600' : 'text-gray-600'} dark:text-gray-400 opacity-80`}>{specialStep.description}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative pl-2">
      <div className="space-y-12">
        {steps.map((step, index) => {
          const isCompleted = index < currentIndex;
          const isActive = index === currentIndex;
          const isPending = index > currentIndex;
          // Color logic based on requirements
          const getColorClass = () => {
            if (isCompleted) return "bg-green-500 border-green-500 text-white";
            if (isActive) {
              if (step.color === "blue") return "bg-blue-600 border-blue-600 text-white shadow-blue-200";
              if (step.color === "orange") return "bg-orange-500 border-orange-500 text-white shadow-orange-200";
              if (step.color === "green") return "bg-green-500 border-green-500 text-white shadow-green-200";
            }
            return "bg-white border-gray-200 text-gray-400 dark:bg-gray-800 dark:border-gray-700";
          };

          const getTextColorClass = () => {
            if (isCompleted) return "text-green-600";
            if (isActive) {
              if (step.color === "blue") return "text-blue-600";
              if (step.color === "orange") return "text-orange-600";
              if (step.color === "green") return "text-green-600";
            }
            return "text-gray-400";
          };
          const getIcon=()=>{
            if(isCompleted){
              console.log(isCompleted)  
               step.icon= <CircleCheckBig size={30} color="green"/>
            }
            else if(isActive){
              console.log(isActive)
               step.icon= <Clock size={30} color="blue"/>
            }
            else{ return step.icon}
          }
getIcon()
          return (
            <div key={step.id} className="relative flex gap-6">
              {/* Line Connector */}
              {index !== steps.length - 1 && (
                <div 
                  className={`absolute top-10 right-5 -mr-[1px] w-[2px] h-[calc(100%+8px)] transition-colors duration-500 ${
                    isCompleted ? "bg-green-500" : "bg-gray-100 dark:bg-gray-700"
                  }`}
                />
              )}

              {/* Icon Node */}
              <div
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 transition-all duration-300 z-10 shadow-sm ${getColorClass()} ${isActive ? 'scale-110 shadow-lg' : ''}`}
              >
                {  step.icon}
              </div>

              {/* Content */}
              <div className="flex flex-col pt-1">
                <div className="flex items-center gap-2">
                  <span className={`text-base font-bold transition-colors duration-300 ${getTextColorClass()}`}>
                    {step.label}
                  </span>
                  {isActive && (
                    <span className="flex items-center gap-1 text-[10px] bg-blue-50 dark:bg-blue-900/30 text-blue-600 px-2 py-0.5 rounded-full animate-pulse capitalize">
                      <Clock1 size={10} />
                      قيد التنفيذ
                    </span>
                  )}
                </div>
                <span className={`text-sm mt-1 transition-colors duration-300 ${isActive ? 'text-gray-700 dark:text-gray-200' : 'text-gray-400'}`}>
                  {step.description}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TimelineStepper;

