"use client";
import React, { use, useEffect, useRef, useState } from "react";
import Breadcrumb from "../Common/Breadcrumb";
import Image from "next/image";
import Newsletter from "../Common/Newsletter";
import { usePreviewSlider } from "@/app/context/PreviewSliderContext";
import { useGetproductQuery } from "@/redux/features/Api.slice";
import { useParams } from "next/navigation";
import Error from "../Error";
import { useBuyNowContext } from "@/app/context/BuyNowContext";

const ShopDetails = ({ width = 300, height = 400 }) => {
  const { id } = useParams<{ id: string }>();
  const { openBuyNow } = useBuyNowContext();

  const { openPreviewModal } = usePreviewSlider();
  const [previewImg, setPreviewImg] = useState("");

  const { data: product, isLoading, error } = useGetproductQuery(id);
  useEffect(() => {
    if (
      isLoading ||
      !product ||
      !Array.isArray(product.imageURL) ||
      product.imageURL.length === 0
    ) {
      return;
    }

    const imgSrc = product.imageURL[previewImg] ?? product.imageURL[0];

    setPreviewImg(imgSrc);
  }, [product, isLoading]);
  const imgRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [show, setShow] = useState(false);

  const handleMove = (e: React.MouseEvent) => {
    const rect = imgRef.current!.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setPos({ x, y });
  };

  // pass the product here when you get the real data.
  const handlePreviewSlider = () => {
    openPreviewModal();
  };
  const handleAddToCart = () => {
    openBuyNow(id);
  };
  if (isLoading) {
    return (
      <div className="w-full max-w-[1100px] rounded-xl shadow-3 flex justify-center items-center bg-white  dark:bg-[#121212]   p-7.5 relative modal-content">
        <div className="h-16 w-16 animate-spin rounded-full border-4 border-solid border-blue border-t-transparent"></div>
      </div>
    );
  }
  if (error) {
    return <Error />;
  }

  return (
    <>
      <Breadcrumb title={"Shop Details"} pages={["shop details"]} />

      {product?.name === "" ? (
        "Please add product"
      ) : (
        <>
          <section className="overflow-hidden relative pb-20 pt-5 lg:pt-20 xl:pt-28">
            <div className="max-w-[1170px] md:flex-row flex-col  gap-7.5 xl:gap-17.5 flex w-full mx-auto px-4 sm:px-8 xl:px-0">
              <div className="flex flex-col  gap-7.5 xl:gap-17.5">
                <div
                  className="lg:max-w-[570px] w-full"
                  ref={imgRef}
                  onMouseEnter={() => setShow(true)}
                  onMouseLeave={() => setShow(false)}
                  onMouseMove={handleMove}
                  style={{ width, height }}
                >
                  <div
                    ref={imgRef}
                    onMouseEnter={() => setShow(true)}
                    onMouseLeave={() => setShow(false)}
                    onMouseMove={handleMove}
                    style={{ width, height }}
                    className=" relative lg:min-h-[400px] lg:min-w-[450px] w-[50%] rounded-lg shadow-1 bg-gray-2 p-4 sm:p-7.5  flex items-center justify-center"
                  >
                    <div>
                      <button
                        onClick={handlePreviewSlider}
                        aria-label="button for zoom"
                        className="gallery__Image w-11 h-11 rounded-[5px] bg-gray-1 shadow-1 flex items-center justify-center ease-out duration-200  text-dark dark:text-[#8b8b8b] dark:text-[#E0E0E0]  hover:text-blue absolute top-4 lg:top-6 right-4 lg:right-6 z-50"
                      >
                        <svg
                          className="fill-current"
                          width="22"
                          height="22"
                          viewBox="0 0 22 22"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M9.11493 1.14581L9.16665 1.14581C9.54634 1.14581 9.85415 1.45362 9.85415 1.83331C9.85415 2.21301 9.54634 2.52081 9.16665 2.52081C7.41873 2.52081 6.17695 2.52227 5.23492 2.64893C4.31268 2.77292 3.78133 3.00545 3.39339 3.39339C3.00545 3.78133 2.77292 4.31268 2.64893 5.23492C2.52227 6.17695 2.52081 7.41873 2.52081 9.16665C2.52081 9.54634 2.21301 9.85415 1.83331 9.85415C1.45362 9.85415 1.14581 9.54634 1.14581 9.16665L1.14581 9.11493C1.1458 7.43032 1.14579 6.09599 1.28619 5.05171C1.43068 3.97699 1.73512 3.10712 2.42112 2.42112C3.10712 1.73512 3.97699 1.43068 5.05171 1.28619C6.09599 1.14579 7.43032 1.1458 9.11493 1.14581ZM16.765 2.64893C15.823 2.52227 14.5812 2.52081 12.8333 2.52081C12.4536 2.52081 12.1458 2.21301 12.1458 1.83331C12.1458 1.45362 12.4536 1.14581 12.8333 1.14581L12.885 1.14581C14.5696 1.1458 15.904 1.14579 16.9483 1.28619C18.023 1.43068 18.8928 1.73512 19.5788 2.42112C20.2648 3.10712 20.5693 3.97699 20.7138 5.05171C20.8542 6.09599 20.8542 7.43032 20.8541 9.11494V9.16665C20.8541 9.54634 20.5463 9.85415 20.1666 9.85415C19.787 9.85415 19.4791 9.54634 19.4791 9.16665C19.4791 7.41873 19.4777 6.17695 19.351 5.23492C19.227 4.31268 18.9945 3.78133 18.6066 3.39339C18.2186 3.00545 17.6873 2.77292 16.765 2.64893ZM1.83331 12.1458C2.21301 12.1458 2.52081 12.4536 2.52081 12.8333C2.52081 14.5812 2.52227 15.823 2.64893 16.765C2.77292 17.6873 3.00545 18.2186 3.39339 18.6066C3.78133 18.9945 4.31268 19.227 5.23492 19.351C6.17695 19.4777 7.41873 19.4791 9.16665 19.4791C9.54634 19.4791 9.85415 19.787 9.85415 20.1666C9.85415 20.5463 9.54634 20.8541 9.16665 20.8541H9.11494C7.43032 20.8542 6.09599 20.8542 5.05171 20.7138C3.97699 20.5693 3.10712 20.2648 2.42112 19.5788C1.73512 18.8928 1.43068 18.023 1.28619 16.9483C1.14579 15.904 1.1458 14.5696 1.14581 12.885L1.14581 12.8333C1.14581 12.4536 1.45362 12.1458 1.83331 12.1458ZM20.1666 12.1458C20.5463 12.1458 20.8541 12.4536 20.8541 12.8333V12.885C20.8542 14.5696 20.8542 15.904 20.7138 16.9483C20.5693 18.023 20.2648 18.8928 19.5788 19.5788C18.8928 20.2648 18.023 20.5693 16.9483 20.7138C15.904 20.8542 14.5696 20.8542 12.885 20.8541H12.8333C12.4536 20.8541 12.1458 20.5463 12.1458 20.1666C12.1458 19.787 12.4536 19.4791 12.8333 19.4791C14.5812 19.4791 15.823 19.4777 16.765 19.351C17.6873 19.227 18.2186 18.9945 18.6066 18.6066C18.9945 18.2186 19.227 17.6873 19.351 16.765C19.4777 15.823 19.4791 14.5812 19.4791 12.8333C19.4791 12.4536 19.787 12.1458 20.1666 12.1458Z"
                            fill=""
                          />
                        </svg>
                      </button>
                    </div>
                    <Image src={previewImg} alt={product?.name} fill />
                    {show && (
                      <div
                        className="absolute border-2 border-blue-500 bg-blue-300/30 pointer-events-none"
                        style={{
                          width: 100,
                          height: 100,
                          top: pos.y - 50,
                          left: pos.x - 50,
                        }}
                      />
                    )}
                  </div>

                  {/* Zoom Preview */}
                  {show && (
                    <div
                      className="absolute inset-20 pointer-events-none rounded"
                      style={{
                        width: 400,
                        height: 400,
                        backgroundImage: `url(${previewImg})`,
                        backgroundRepeat: "no-repeat",
                        backgroundSize: `${width * 2}px ${height * 2}px`,
                        backgroundPosition: `-${pos.x * 2}px -${pos.y * 2}px`,
                      }}
                    />
                  )}
                </div>

                {/* ?  &apos;border-blue &apos; :  &apos;border-transparent&apos; */}
                <div className="flex flex-wrap sm:flex-nowrap gap-4.5 mt-6">
                  {product?.imageURL.map((item, key) => (
                    <button
                      onClick={() => setPreviewImg(item)}
                      key={key}
                      className={`flex items-center justify-center w-15 sm:w-25 h-15 sm:h-25 overflow-hidden rounded-lg bg-gray-2 shadow-1 ease-out duration-200 border-2 hover:border-blue ${
                        item === previewImg
                          ? "border-blue"
                          : "border-transparent"
                      }`}
                    >
                      <Image
                        width={50}
                        height={50}
                        src={item}
                        alt="thumbnail"
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* <!-- product content --> */}
              <div className="max-w-[539px] w-full">
                <div className="flex items-center justify-between mb-3">
                  <h2 className="font-semibold text-xl sm:text-2xl xl:text-custom-3  text-dark dark:text-[#8b8b8b] dark:text-[#E0E0E0] ">
                    {product?.name}
                  </h2>
                  {product?.sale && (
                    <div className="inline-flex font-medium text-custom-sm text-white bg-red-dark rounded py-0.5 px-2.5">
                      {product?.sale} OFF
                    </div>
                  )}
                </div>

                <h3 className="font-medium text-custom-1 gap-5 flex mb-4.5">
                  <span className="text-sm sm:text-base  text-dark dark:text-[#8b8b8b] dark:text-[#E0E0E0] ">
                    Price: EGP{product?.finalPrice.toLocaleString("en-US")}
                  </span>
                  {product?.sale ? (
                    <div className="text-red-dark ">
                      خصم يصل الي {product?.sale}%
                    </div>
                  ) : null}
                </h3>
                <p className="h-80 overflow-auto">{product?.desc}</p>

                {/* <ul className="flex flex-col gap-2">
                    <li className="flex items-center gap-2.5">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M13.3589 8.35863C13.603 8.11455 13.603 7.71882 13.3589 7.47475C13.1149 7.23067 12.7191 7.23067 12.4751 7.47475L8.75033 11.1995L7.5256 9.97474C7.28152 9.73067 6.8858 9.73067 6.64172 9.97474C6.39764 10.2188 6.39764 10.6146 6.64172 10.8586L8.30838 12.5253C8.55246 12.7694 8.94819 12.7694 9.19227 12.5253L13.3589 8.35863Z"
                          fill="#3C50E0"
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M10.0003 1.04169C5.05277 1.04169 1.04199 5.05247 1.04199 10C1.04199 14.9476 5.05277 18.9584 10.0003 18.9584C14.9479 18.9584 18.9587 14.9476 18.9587 10C18.9587 5.05247 14.9479 1.04169 10.0003 1.04169ZM2.29199 10C2.29199 5.74283 5.74313 2.29169 10.0003 2.29169C14.2575 2.29169 17.7087 5.74283 17.7087 10C17.7087 14.2572 14.2575 17.7084 10.0003 17.7084C5.74313 17.7084 2.29199 14.2572 2.29199 10Z"
                          fill="#3C50E0"
                        />
                      </svg>
                      Free delivery available
                    </li>

                    <li className="flex items-center gap-2.5">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M13.3589 8.35863C13.603 8.11455 13.603 7.71882 13.3589 7.47475C13.1149 7.23067 12.7191 7.23067 12.4751 7.47475L8.75033 11.1995L7.5256 9.97474C7.28152 9.73067 6.8858 9.73067 6.64172 9.97474C6.39764 10.2188 6.39764 10.6146 6.64172 10.8586L8.30838 12.5253C8.55246 12.7694 8.94819 12.7694 9.19227 12.5253L13.3589 8.35863Z"
                          fill="#3C50E0"
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M10.0003 1.04169C5.05277 1.04169 1.04199 5.05247 1.04199 10C1.04199 14.9476 5.05277 18.9584 10.0003 18.9584C14.9479 18.9584 18.9587 14.9476 18.9587 10C18.9587 5.05247 14.9479 1.04169 10.0003 1.04169ZM2.29199 10C2.29199 5.74283 5.74313 2.29169 10.0003 2.29169C14.2575 2.29169 17.7087 5.74283 17.7087 10C17.7087 14.2572 14.2575 17.7084 10.0003 17.7084C5.74313 17.7084 2.29199 14.2572 2.29199 10Z"
                          fill="#3C50E0"
                        />
                      </svg>
                      Sales 30% Off Use Code: PROMO30
                    </li>
                  </ul> */}

                <form onSubmit={(e) => e.preventDefault()}>
                  {/* <div className="flex flex-col gap-4.5 border-y border-gray-3 mt-7.5 mb-9 py-9">
                      <div className="flex items-center gap-4">
                        <div className="min-w-[65px]">
                          <h4 className="font-medium  text-dark dark:text-[#8b8b8b] dark:text-[#E0E0E0] ">
                            Color:
                          </h4>
                        </div>

                        <div className="flex items-center gap-2.5">
                          {colors.map((color, key) => (
                            <label
                              key={key}
                              htmlFor={color}
                              className="cursor-pointer select-none flex items-center"
                            >
                              <div className="relative">
                                <input
                                  type="radio"
                                  name="color"
                                  id={color}
                                  className="sr-only"
                                  onChange={() => setActiveColor(color)}
                                />
                                <div
                                  className={`flex items-center justify-center w-5.5 h-5.5 rounded-full ${
                                    activeColor === color && "border"
                                  }`}
                                  style={{ borderColor: `${color}` }}
                                >
                                  <span
                                    className="block w-3 h-3 rounded-full"
                                    style={{ backgroundColor: `${color}` }}
                                  ></span>
                                </div>
                              </div>
                            </label>
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="min-w-[65px]">
                          <h4 className="font-medium  text-dark dark:text-[#8b8b8b] dark:text-[#E0E0E0] ">
                            Storage:
                          </h4>
                        </div>

                        <div className="flex items-center gap-4">
                          {storages.map((item, key) => (
                            <label
                              key={key}
                              htmlFor={item.id}
                              className="flex cursor-pointer select-none items-center"
                            >
                              <div className="relative">
                                <input
                                  type="checkbox"
                                  name="storage"
                                  id={item.id}
                                  className="sr-only"
                                  onChange={() => setStorage(item.id)}
                                />

                                <div
                                  className={`mr-2 flex h-4 w-4 items-center justify-center rounded border ${
                                    storage === item.id
                                      ? "border-blue bg-blue"
                                      : "border-gray-4"
                                  } `}
                                >
                                  <span
                                    className={
                                      storage === item.id
                                        ? "opacity-100"
                                        : "opacity-0"
                                    }
                                  >
                                    <svg
                                      width="24"
                                      height="24"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <rect
                                        x="4"
                                        y="4.00006"
                                        width="16"
                                        height="16"
                                        rx="4"
                                        fill="#3C50E0"
                                      />
                                      <path
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M16.3103 9.25104C16.471 9.41178 16.5612 9.62978 16.5612 9.85707C16.5612 10.0844 16.471 10.3024 16.3103 10.4631L12.0243 14.7491C11.8635 14.9098 11.6455 15.0001 11.4182 15.0001C11.191 15.0001 10.973 14.9098 10.8122 14.7491L8.24062 12.1775C8.08448 12.0158 7.99808 11.7993 8.00003 11.5745C8.00199 11.3498 8.09214 11.1348 8.25107 10.9759C8.41 10.8169 8.62499 10.7268 8.84975 10.7248C9.0745 10.7229 9.29103 10.8093 9.4527 10.9654L11.4182 12.931L15.0982 9.25104C15.2589 9.09034 15.4769 9.00006 15.7042 9.00006C15.9315 9.00006 16.1495 9.09034 16.3103 9.25104Z"
                                        fill="white"
                                      />
                                    </svg>
                                  </span>
                                </div>
                              </div>
                              {item.title}
                            </label>
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="min-w-[65px]">
                          <h4 className="font-medium  text-dark dark:text-[#8b8b8b] dark:text-[#E0E0E0] ">
                            Type:
                          </h4>
                        </div>

                        <div className="flex items-center gap-4">
                          {types.map((item, key) => (
                            <label
                              key={key}
                              htmlFor={item.id}
                              className="flex cursor-pointer select-none items-center"
                            >
                              <div className="relative">
                                <input
                                  type="checkbox"
                                  name="storage"
                                  id={item.id}
                                  className="sr-only"
                                  onChange={() => setType(item.id)}
                                />

                                <div
                                  className={`mr-2 flex h-4 w-4 items-center justify-center rounded border ${
                                    type === item.id
                                      ? "border-blue bg-blue"
                                      : "border-gray-4"
                                  } `}
                                >
                                  <span
                                    className={
                                      type === item.id
                                        ? "opacity-100"
                                        : "opacity-0"
                                    }
                                  >
                                    <svg
                                      width="24"
                                      height="24"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <rect
                                        x="4"
                                        y="4.00006"
                                        width="16"
                                        height="16"
                                        rx="4"
                                        fill="#3C50E0"
                                      />
                                      <path
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M16.3103 9.25104C16.471 9.41178 16.5612 9.62978 16.5612 9.85707C16.5612 10.0844 16.471 10.3024 16.3103 10.4631L12.0243 14.7491C11.8635 14.9098 11.6455 15.0001 11.4182 15.0001C11.191 15.0001 10.973 14.9098 10.8122 14.7491L8.24062 12.1775C8.08448 12.0158 7.99808 11.7993 8.00003 11.5745C8.00199 11.3498 8.09214 11.1348 8.25107 10.9759C8.41 10.8169 8.62499 10.7268 8.84975 10.7248C9.0745 10.7229 9.29103 10.8093 9.4527 10.9654L11.4182 12.931L15.0982 9.25104C15.2589 9.09034 15.4769 9.00006 15.7042 9.00006C15.9315 9.00006 16.1495 9.09034 16.3103 9.25104Z"
                                        fill="white"
                                      />
                                    </svg>
                                  </span>
                                </div>
                              </div>
                              {item.title}
                            </label>
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="min-w-[65px]">
                          <h4 className="font-medium  text-dark dark:text-[#8b8b8b] dark:text-[#E0E0E0] ">
                            Sim:
                          </h4>
                        </div>

                        <div className="flex items-center gap-4">
                          {sims.map((item, key) => (
                            <label
                              key={key}
                              htmlFor={item.id}
                              className="flex cursor-pointer select-none items-center"
                            >
                              <div className="relative">
                                <input
                                  type="checkbox"
                                  name="storage"
                                  id={item.id}
                                  className="sr-only"
                                  onChange={() => setSim(item.id)}
                                />

                                <div
                                  className={`mr-2 flex h-4 w-4 items-center justify-center rounded border ${
                                    sim === item.id
                                      ? "border-blue bg-blue"
                                      : "border-gray-4"
                                  } `}
                                >
                                  <span
                                    className={
                                      sim === item.id
                                        ? "opacity-100"
                                        : "opacity-0"
                                    }
                                  >
                                    <svg
                                      width="24"
                                      height="24"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <rect
                                        x="4"
                                        y="4.00006"
                                        width="16"
                                        height="16"
                                        rx="4"
                                        fill="#3C50E0"
                                      />
                                      <path
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M16.3103 9.25104C16.471 9.41178 16.5612 9.62978 16.5612 9.85707C16.5612 10.0844 16.471 10.3024 16.3103 10.4631L12.0243 14.7491C11.8635 14.9098 11.6455 15.0001 11.4182 15.0001C11.191 15.0001 10.973 14.9098 10.8122 14.7491L8.24062 12.1775C8.08448 12.0158 7.99808 11.7993 8.00003 11.5745C8.00199 11.3498 8.09214 11.1348 8.25107 10.9759C8.41 10.8169 8.62499 10.7268 8.84975 10.7248C9.0745 10.7229 9.29103 10.8093 9.4527 10.9654L11.4182 12.931L15.0982 9.25104C15.2589 9.09034 15.4769 9.00006 15.7042 9.00006C15.9315 9.00006 16.1495 9.09034 16.3103 9.25104Z"
                                        fill="white"
                                      />
                                    </svg>
                                  </span>
                                </div>
                              </div>
                              {item.title}
                            </label>
                          ))}
                        </div>
                      </div>
                    </div> */}

                  <div className="flex flex-wrap items-center gap-4.5">
                    <button
                      onClick={() => handleAddToCart()}
                      className={`inline-flex font-medium text-white bg-blue py-3 px-7 rounded-md ease-out duration-200 hover:bg-blue-dark
                  `}
                    >
                      اشتري الان
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </section>

          <Newsletter />
        </>
      )}
    </>
  );
};

export default ShopDetails;
