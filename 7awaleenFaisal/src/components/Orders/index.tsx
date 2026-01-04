"use client";
import React, { useEffect, useState } from "react";
import SingleOrder from "./SingleOrder";
import ordersData from "./ordersData";
import Breadcrumb from "../Common/Breadcrumb";
import { useGetGeustOrderQuery } from "@/redux/features/Api.slice";
import Error from "../Error";
import PreLoader from "../Common/PreLoader";

const Orders = () => {
  const [orders, setOrders] = useState<any>([]);
  const { data, error, isLoading } = useGetGeustOrderQuery();

  if (error) {
    return <Error />;
  }
  return (
    <>
      <Breadcrumb title={"Orders"} pages={["Orders"]} />
      <section className="overflow-hidden py-20 px-4 sm:px-8 xl:px-10 bg-light min-h-[calc(100vh-350px)] border-gray-1 border-gray-100">
        <div className="w-full overflow-x-auto">
          {isLoading ? (
            <PreLoader />
          ) : (
            <div className="min-w-[770px]">
              {/* <!-- order item --> */}
              {ordersData.length > 0 && (
                <div className="items-center justify-between py-4.5 px-7.5 hidden md:flex ">
                  <div className="min-w-[111px]">
                    <p className="text-custom-sm  text-dark dark:text-[#8b8b8b] dark:text-[#E0E0E0] ">
                      Order
                    </p>
                  </div>
                  <div className="min-w-[175px]">
                    <p className="text-custom-sm  text-dark dark:text-[#8b8b8b] dark:text-[#E0E0E0] ">
                      Date
                    </p>
                  </div>
                  <div className="min-w-[175px]">
                    <p className="text-custom-sm  text-dark dark:text-[#8b8b8b] dark:text-[#E0E0E0] ">
                      Price
                    </p>
                  </div>
                  <div className="min-w-[175px]">
                    <p className="text-custom-sm  text-dark dark:text-[#8b8b8b] dark:text-[#E0E0E0] ">
                      qty
                    </p>
                  </div>
                  <div className="min-w-[175px]">
                    <p className="text-custom-sm  text-dark dark:text-[#8b8b8b] dark:text-[#E0E0E0] ">
                      finalPrice
                    </p>
                  </div>

                  <div className="min-w-[213px]">
                    <p className="text-custom-sm  text-dark dark:text-[#8b8b8b] dark:text-[#E0E0E0] ">
                      Name
                    </p>
                  </div>

                  <div className="min-w-[113px]">
                    <p className="text-custom-sm  text-dark dark:text-[#8b8b8b] dark:text-[#E0E0E0] ">
                      Phone
                    </p>
                  </div>

                  <div className="min-w-[113px]">
                    <p className="text-custom-sm  text-dark dark:text-[#8b8b8b] dark:text-[#E0E0E0] ">
                      status
                    </p>
                  </div>
                </div>
              )}
              {data.length > 0 ? (
                data.map((orderItem, key) => (
                  <SingleOrder
                    key={key}
                    orderItem={orderItem}
                    smallView={false}
                  />
                ))
              ) : (
                <p className="py-9.5 px-4 sm:px-7.5 xl:px-10">
                  You don&apos;t have any orders!
                </p>
              )}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Orders;
