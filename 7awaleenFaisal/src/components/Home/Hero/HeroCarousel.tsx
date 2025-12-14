"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

// Import Swiper styles
import "swiper/css/pagination";
import "swiper/css";

import Image from "next/image";

const HeroCarousal = () => {
  return (
    <Swiper
      spaceBetween={30}
      centeredSlides={true}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      pagination={{
        clickable: true,
      }}
      modules={[Autoplay, Pagination]}
      className="hero-carousel w-full aspect-[16/9] sm:aspect-[4/3] lg:aspect-[16/9]"
    >
      <SwiperSlide>
        <div className="w-full aspect-[16/9] sm:aspect-[4/3] lg:aspect-[16/9] bg-[url('/images/hero/01b2d84a-c710-4a04-ab0a-ad0565c59ae7.jpg')] bg-cover bg-center ">
          {/* <div className="max-w-[394px] py-10 sm:py-15 lg:py-24.5 pl-4 sm:pl-7.5 lg:pl-12.5">
            <div className="flex items-center gap-4 mb-7.5 sm:mb-10">
              <span className="block font-semibold text-heading-3 sm:text-heading-1 text-blue">
                10%
              </span>
              <span className="block text-white font-bold text-sm sm:text-custom-1 sm:leading-[24px]">
                Sale
                <br />
                Off
              </span>
            </div>

            <h1 className="font-semibold  text-dark dark:text-[#8b8b8b] dark:text-[#E0E0E0]  text-xl sm:text-3xl mb-3">
              <a href="#">True Wireless Noise Cancelling Headphone</a>
            </h1>

            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi at
              ipsum at risus euismod lobortis in
            </p>

            <a
              href="#"
              className="inline-flex font-medium text-white text-custom-sm rounded-md bg-dark py-3 px-9 ease-out duration-200 hover:bg-blue mt-10"
            >
              Shop Now
            </a>
          </div> */}
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="w-full aspect-[16/9] sm:aspect-[4/3] lg:aspect-[16/9] bg-[url('/images/hero/Gemini_Generated_Image_q5h1xbq5h1xbq5h1.webp')] bg-cover bg-center ">
          {/* <div className="max-w-[394px] py-10 sm:py-15 lg:py-24.5 pl-4 sm:pl-7.5 lg:pl-12.5">
            <div className="flex items-center gap-4 mb-7.5 sm:mb-10">
              <span className="block font-semibold text-heading-3 sm:text-heading-1 text-blue">
                10%
              </span>
              <span className="block text-white font-bold text-sm sm:text-custom-1 sm:leading-[24px]">
                Sale
                <br />
                Off
              </span>
            </div>

            <h1 className="font-semibold  text-dark dark:text-[#8b8b8b] dark:text-[#E0E0E0]  text-xl sm:text-3xl mb-3">
              <a href="#">True Wireless Noise Cancelling Headphone</a>
            </h1>

            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi at
              ipsum at risus euismod lobortis in
            </p>

            <a
              href="#"
              className="inline-flex font-medium text-white text-custom-sm rounded-md bg-dark py-3 px-9 ease-out duration-200 hover:bg-blue mt-10"
            >
              Shop Now
            </a>
          </div> */}
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="w-full aspect-[16/9] sm:aspect-[4/3] lg:aspect-[16/9] bg-[url('/images/hero/7ede04cd-6c4c-4fdb-95f1-6b00486609f1.jpg')] bg-cover bg-center"></div>
      </SwiperSlide>
      <SwiperSlide>
        {" "}
        <div className="w-full aspect-[16/9] sm:aspect-[4/3] lg:aspect-[16/9] bg-[url('/images/hero/56a08085-0b41-4ce1-9a11-c357c90676ef.jpg')] bg-cover bg-center">
          {/* <div className="max-w-[394px] py-10 sm:py-15 lg:py-26 pl-4 sm:pl-7.5 lg:pl-12.5">
            <div className="flex items-center gap-4 mb-7.5 sm:mb-10">
              <span className="block font-semibold text-heading-3 sm:text-heading-1 text-blue">
                30%
              </span>
              <span className="block  text-dark dark:text-[#8b8b8b] dark:text-[#E0E0E0]  text-sm sm:text-custom-1 sm:leading-[24px]">
                Sale
                <br />
                Off
              </span>
            </div>

            <h1 className="font-semibold  text-dark dark:text-[#8b8b8b] dark:text-[#E0E0E0]  text-xl sm:text-3xl mb-3">
              <a href="#">True Wireless Noise Cancelling Headphone</a>
            </h1>

            <p>
              Lorem ipsum dolor sit, consectetur elit nunc suscipit non ipsum
              nec suscipit.
            </p>

            <a
              href="#"
              className="inline-flex font-medium text-white text-custom-sm rounded-md bg-dark py-3 px-9 ease-out duration-200 hover:bg-blue mt-10"
            >
              Shop Now
            </a>
          </div> */}

          {/* <div>
            <Image
              src="/images/hero/hero-01.png"
              alt="headphone"
              width={351}
              height={358}
            />
          </div> */}
        </div>
      </SwiperSlide>
    </Swiper>
  );
};

export default HeroCarousal;
