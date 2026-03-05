import React from 'react';

interface WaitingOrderCardProps {
  order: {
    id: string;
    name: string;
    area: string;
  };
}

const WaitingOrderCard: React.FC<WaitingOrderCardProps> = ({ order }) => {
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm flex justify-between items-center transition-all hover:border-blue-200 cursor-pointer">
      <div className="flex flex-col gap-1">
        <h4 className="font-bold text-gray-800">{order.name}</h4>
        <span className="text-sm text-gray-400">{order.area}</span>
      </div>
      <div>
        <span className="bg-gray-100 text-gray-600 text-xs px-3 py-1.5 rounded-full font-medium">
          في الانتظار
        </span>
      </div>
    </div>
  );
};

export default WaitingOrderCard;
