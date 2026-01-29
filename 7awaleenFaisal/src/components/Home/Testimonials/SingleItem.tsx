import React from "react";
import { Testimonial } from "@/types/testimonial";
import Image from "next/image";

const SingleItem = ({ testimonial }: { testimonial: Testimonial }) => {
  return (
    <div className="shadow-testimonial bg-white  dark:bg-[#121212] h-100   rounded-[10px] py-7.5 px-4 sm:px-8.5 m-1">
      {/* <div className="bg-[url('/images/ramaden/ramadanpattern.png')] pointer-events-none z-1 absolute bg-contain bg-no-repeat  h-127.5 w-full"></div> */}

      <Image
        src={testimonial?.authorImg}
        alt="test"
        className="w-full min- bg-cover rounded-3xl border-4 border-solid border-[#f2f3f8]"
        fill
      />
    </div>
  );
};

export default SingleItem;
