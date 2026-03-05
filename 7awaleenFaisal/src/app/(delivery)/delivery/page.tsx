import CurrentOrderCard from '@/components/Delivery/CurrentOrderCard';
import DeliveryHeader from '@/components/Delivery/DeliveryHeader';
import WaitingOrderCard from '@/components/Delivery/WaitingOrderCard';
import React from 'react';

export const metadata = {
  title: 'كابتن حوالين فيصل - لوحة التحكم',
  description: 'لوحة تحكم كابتن التوصيل',
};

const DUMMY_WAITING_ORDERS = [
  { id: '1', name: 'سارة محمود', area: 'المطبعة، الهرم' },
  { id: '2', name: 'محمود حسن', area: 'الطالبية، فيصل' },
];

export default function DeliveryDashboard() {
  return (
    <div className="w-full h-full flex flex-col font-sans">
      <DeliveryHeader />
      
      <div className="p-4 flex flex-col gap-6 -mt-4 relative z-10 w-full max-w-md mx-auto">
        <section>
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-gray-600 text-base font-semibold">الطلب الحالي بانتظار التوصيل</h2>
          </div>
          <CurrentOrderCard />
        </section>

        <section>
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-gray-600 text-base font-semibold">طلبات في الانتظار ({DUMMY_WAITING_ORDERS.length})</h2>
          </div>
          <div className="flex flex-col gap-3 pb-8">
            {DUMMY_WAITING_ORDERS.map((order) => (
              <WaitingOrderCard key={order.id} order={order} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
