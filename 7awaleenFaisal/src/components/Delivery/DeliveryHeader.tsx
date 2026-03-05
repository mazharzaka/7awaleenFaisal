import React from 'react';
import Image from 'next/image';

const DeliveryHeader = () => {
  return (
    <div className="bg-[#003060] text-white rounded-b-[40px] pt-8 pb-10 px-6 shadow-md relative z-20">
      <div className="max-w-md mx-auto flex items-center justify-between">
        
        {/* Right side content (RTL so left side visually) */}
        <div className="flex flex-col gap-1 items-start">
          <h1 className="text-2xl font-bold font-sans">كابتن حوالين فيصل</h1>
          <div className="flex items-center gap-2 text-sm text-blue-100">
            أهلاً يا محمد، متاح للعمل
            <span className="w-2.5 h-2.5 bg-green-400 rounded-full shadow-[0_0_5px_rgba(7ade80,0.5)]"></span>
          </div>
        </div>

        {/* Left side Avatar (RTL so right side visually) */}
        <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center p-2 shadow-lg">
          <div className="w-full h-full relative">
            {/* Using a placeholder for the scooter logo */}
            <span className="text-2xl flex items-center justify-center w-full h-full">🛵</span>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default DeliveryHeader;
