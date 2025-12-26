"use client";
import React from "react";
import Image from "next/image";
import { useGetFilteredProductsQuery } from "@/redux/features/Api.slice";
import Error from "@/components/Error";
import SingleItem from "../BestSeller/SingleItem";

const Downto500 = () => {
  const {
    data: products,
    error,
    isLoading,
  } = useGetFilteredProductsQuery({
    maxPrice: "500",
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <Error />;
  }

  return (
    <section className="overflow-hidden">
      <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
        {/* <!-- section title --> */}
        <div className="mb-10 flex items-center justify-between">
          <div>
            <span className="flex items-center gap-2.5 font-medium  text-dark dark:text-[#8b8b8b] dark:text-[#E0E0E0]  mb-1.5">
              <Image
                src="/images/icons/icon-07.svg"
                alt="icon"
                width={17}
                height={17}
              />
              أقل من 500 جنيه
            </span>
            <h2 className="font-semibold text-xl xl:text-heading-5  text-dark dark:text-[#8b8b8b] dark:text-[#E0E0E0] ">
              منتجات بأسعار مناسبة
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7.5">
          {/* <!-- منتجاتنا item --> */}
          {products?.products?.map((item, key) => (
            <SingleItem item={item} key={key} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Downto500;
