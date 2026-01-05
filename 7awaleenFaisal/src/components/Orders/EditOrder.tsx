import { useGeustOrderstatusMutation } from "@/redux/features/Api.slice";
import React, { useState } from "react";
import toast from "react-hot-toast";

const EditOrder = ({ order, toggleModal, id }: any) => {
  const [orderstatus] = useGeustOrderstatusMutation();
  const [currentStatus, setCurrentStatus] = useState(order?.status);
  const handleChanege = (e: any) => {
    setCurrentStatus(e.target.value);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!currentStatus) {
      toast.error("Please select a status");
      return;
    }
    try {
      const ordersta = await orderstatus({
        orderId: order._id,
        status: currentStatus,
      });
      toast.success("الدنيا تمام ");
      console.log(currentStatus);
      console.log(ordersta);
    } catch {
      toast.error("حصل مشكله ");
    }

    toggleModal(false);
  };

  return (
    <div className="w-full px-10">
      <p className="pb-2 font-medium  text-dark dark:text-[#8b8b8b] dark:text-[#E0E0E0] ">
        Order Status
      </p>
      <div className="w-full">
        <select
          className="w-full rounded-[10px] border border-gray-3 bg-gray-1  text-dark dark:text-[#8b8b8b] dark:text-[#E0E0E0]  py-3.5 px-5 text-custom-sm"
          name="status"
          id="status"
          required
          onChange={handleChanege}
        >
          <option value="new">جديد</option>
          <option value="contacted">تم التواصل</option>
          <option value="done">تم التنفيذ</option>
          <option value="rejected">مرفوض</option>
        </select>

        <button
          className="mt-5 w-full rounded-[10px] border border-blue-1 bg-blue-1 text-white py-3.5 px-5 text-custom-sm bg-blue"
          onClick={handleSubmit}
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default EditOrder;
