import React from 'react';
import { MapPin, Phone, Map, Check } from 'lucide-react';

const CurrentOrderCard = () => {
  return (
    <div className="bg-white rounded-xl border border-[#00baeb] shadow-sm overflow-hidden relative">
      
      {/* Top badges */}
      <div className="flex justify-between items-start p-4 pb-0">
        <span className="text-gray-400 text-xs">منذ 15 دقيقة</span>
        <div className="bg-[#e6f7ff] text-[#00baeb] text-sm font-bold px-3 py-1 rounded-bl-xl rounded-tr-md -mt-4 -mr-4 border-b border-l border-[#00baeb]/20">
          طلب #9842
        </div>
      </div>

      <div className="p-5 pt-2">
        <h3 className="text-xl font-bold text-gray-900 mb-4">أحمد علي</h3>
        
        <div className="flex flex-col gap-3 mb-5">
          <div className="flex items-start gap-3">
            <MapPin className="w-5 h-5 text-red-500 shrink-0 mt-0.5" fill="#fee2e2" />
            <span className="text-gray-600 text-sm leading-relaxed">شارع العشرين، متفرع من فيصل، عمارة 5، الدور الثالث</span>
          </div>
          <div className="flex items-center gap-3">
            <Phone className="w-5 h-5 text-red-500 shrink-0" fill="#fee2e2" />
            <a href="tel:010XXXXXXX" className="text-[#006bd6] font-bold text-lg" dir="ltr">010XXXXXXX</a>
          </div>
        </div>

        {/* Collection Amount Box */}
        <div className="bg-red-50 rounded-lg p-3 flex justify-center items-center gap-2 mb-6 border border-red-100">
          <span className="text-gray-800 font-semibold">التحصيل المطلوب:</span>
          <span className="text-red-500 font-bold text-lg">450 جنيه</span>
          <span className="text-xl">💰</span>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button className="flex-1 bg-green-500 hover:bg-green-600 outline-none text-white py-3 rounded-lg font-bold flex items-center justify-center gap-2 transition-colors shadow-sm">
            تم التسليم
            <Check className="w-5 h-5" />
          </button>
          <button className="flex-1 bg-[#003060] hover:bg-[#002040] outline-none text-white py-3 rounded-lg font-bold flex items-center justify-center gap-2 transition-colors shadow-sm">
            الخريطة
            <Map className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CurrentOrderCard;
