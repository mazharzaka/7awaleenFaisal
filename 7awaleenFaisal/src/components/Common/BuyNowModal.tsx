import React, { useState } from "react";
import PreLoader from "./PreLoader";
import { useBuyNowContext } from "@/app/context/BuyNowContext";
import {
  useGetproductQuery,
  useGeustOrderMutation,
} from "@/redux/features/Api.slice";
import toast from "react-hot-toast";

function BuyNowModal() {
  const { closeBuyNow, isBuyNowOpen, id } = useBuyNowContext();
  const [quantity, setQuantity] = useState(1);

  const { data: product, isLoading, error } = useGetproductQuery(id);
  const [geustOrder] = useGeustOrderMutation();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget as HTMLFormElement;
    const formData = new FormData(form);
    const formObject: any = {};

    formData.forEach((value, key) => {
      if (typeof value === "string") {
        formObject[key] =
          !isNaN(Number(value)) && value.trim() !== "" ? Number(value) : value;
      } else {
        formObject[key] = value; // File
      }
    });

    try {
      const response = await geustOrder(formObject);
      response.error
        ? toast.error("حصل خطأ حاول مرة تانية يا بطل 😓")
        : toast.success("تم ارسال الطلب بنجاح 🎉");
      window.open(response.data.whatsappLink, "_blank");
    } catch (err) {
      console.error("Error submitting order:", err);
    }
    console.log(formObject);
  };
  return (
    <div
      className={`${
        isBuyNowOpen ? "z-99999" : "hidden"
      } fixed top-0 left-0 overflow-y-auto no-scrollbar w-full h-screen sm:py-20 xl:py-25 2xl:py-[230px] bg-dark/50 sm:px-8 px-4 py-5`}
    >
      <div className="flex items-center justify-center ">
        <div className="w-full max-w-[1100px]  rounded-xl shadow-3 bg-white  dark:bg-[#121212]   p-12.5 relative modal-content">
          <button
            onClick={() => {
              closeBuyNow();
            }}
            aria-label="button for close modal"
            className="absolute top-0 left-0 mb-1 sm:top-6 sm:left-6 flex items-center justify-center w-10 h-10 rounded-full ease-in duration-150 bg-meta text-body hover: dark:text-dark  "
          >
            <svg
              className="fill-current"
              width="26"
              height="26"
              viewBox="0 0 26 26"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M14.3108 13L19.2291 8.08167C19.5866 7.72417 19.5866 7.12833 19.2291 6.77083C19.0543 6.59895 18.8189 6.50262 18.5737 6.50262C18.3285 6.50262 18.0932 6.59895 17.9183 6.77083L13 11.6892L8.08164 6.77083C7.90679 6.59895 7.67142 6.50262 7.42623 6.50262C7.18104 6.50262 6.94566 6.59895 6.77081 6.77083C6.41331 7.12833 6.41331 7.72417 6.77081 8.08167L11.6891 13L6.77081 17.9183C6.41331 18.2758 6.41331 18.8717 6.77081 19.2292C7.12831 19.5867 7.72414 19.5867 8.08164 19.2292L13 14.3108L17.9183 19.2292C18.2758 19.5867 18.8716 19.5867 19.2291 19.2292C19.5866 18.8717 19.5866 18.2758 19.2291 17.9183L14.3108 13Z"
                fill=""
              />
            </svg>
          </button>

          <form onSubmit={handleSubmit} className="space-y-5  mb-1">
            {/* Name */}
            <div>
              <label htmlFor="name" className="block mb-2">
                الاسم <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                // onChange={(e) => setData({ ...data, name: e.target.value })}
                placeholder="اكتب اسمك "
                className="w-full border rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-300"
              />
            </div>
            <div className="flex flex-col lg:flex-row gap-5 sm:gap-8 mb-5">
              <div className="w-full">
                <label htmlFor="phone" className="block mb-2.5">
                  رقم الموبايل <span className="text-red-500">*</span>
                </label>

                <input
                  type="text"
                  name="phone"
                  id="phone"
                  placeholder="Phone Number"
                  className="rounded-md border border-gray-3  placeholder: text-dark dark:text-[#8b8b8b] dark:text-[#E0E0E0] -5 w-full py-2.5 px-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-blue/20"
                />
              </div>
              <div className="w-1/2">
                <label htmlFor="phone" className="block mb-2.5">
                  العدد <span className="text-red-500">*</span>
                </label>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                    aria-label="button for remove product"
                    type="button"
                    className="flex items-center justify-center w-10 h-10 rounded-[5px] bg-gray-2  text-dark dark:text-[#8b8b8b] dark:text-[#E0E0E0]  ease-out duration-200 hover:text-blue"
                    disabled={quantity < 0 && true}
                  >
                    <svg
                      className="fill-current"
                      width="16"
                      height="2"
                      viewBox="0 0 16 2"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M-8.548e-08 0.977778C-3.82707e-08 0.437766 0.437766 3.82707e-08 0.977778 8.548e-08L15.0222 1.31328e-06C15.5622 1.36049e-06 16 0.437767 16 0.977779C16 1.51779 15.5622 1.95556 15.0222 1.95556L0.977778 1.95556C0.437766 1.95556 -1.32689e-07 1.51779 -8.548e-08 0.977778Z"
                        fill=""
                      />
                    </svg>
                  </button>

                  <input
                    type="number"
                    name="quantity"
                    id="quantity"
                    value={quantity}
                    placeholder="quantity"
                    className="rounded-md border border-gray-3   placeholder: text-dark dark:text-[#8b8b8b] dark:text-[#E0E0E0] -5 w-full py-2.5 px-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-blue/20"
                  />

                  <button
                    onClick={() => quantity < 5 && setQuantity(quantity + 1)}
                    type="button"
                    aria-label="button for add product"
                    className="flex items-center justify-center w-10 h-10 rounded-[5px] bg-gray-2  text-dark dark:text-[#8b8b8b] dark:text-[#E0E0E0]  ease-out duration-200 hover:text-blue"
                  >
                    <svg
                      className="fill-current"
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M8.08889 0C8.6289 2.36047e-08 9.06667 0.437766 9.06667 0.977778L9.06667 15.0222C9.06667 15.5622 8.6289 16 8.08889 16C7.54888 16 7.11111 15.5622 7.11111 15.0222L7.11111 0.977778C7.11111 0.437766 7.54888 -2.36047e-08 8.08889 0Z"
                        fill=""
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M0 7.91111C4.72093e-08 7.3711 0.437766 6.93333 0.977778 6.93333L15.0222 6.93333C15.5622 6.93333 16 7.3711 16 7.91111C16 8.45112 15.5622 8.88889 15.0222 8.88889L0.977778 8.88889C0.437766 8.88889 -4.72093e-08 8.45112 0 7.91111Z"
                        fill=""
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            {/* Description */}
            <div>
              <label htmlFor="desc" className="block mb-2">
                العنوان <span className="text-red-500">*</span>
              </label>
              <textarea
                name="note"
                rows={4}
                // onChange={(e) => setData({ ...data, desc: e.target.value })}
                placeholder="اضف العنوان بالتفصيل "
                className="w-full border rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-300"
              ></textarea>
            </div>

            {/* Price */}
            <div>
              <label htmlFor="price" className="block mb-2">
                السعر <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="price"
                // onChange={(e) => setData({ ...data, price: e.target.value })}
                className="w-full border rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-300"
                value={product?.price}
              />
            </div>
            <div>
              <label htmlFor="price" className="block mb-2">
                اسم المنتج <span className="text-red-500">*</span>
              </label>
              <input
                // type="number"
                name="product"
                className="w-full border rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-300"
                // onChange={(e) => setData({ ...data, price: e.target.value })}
                value={product?.name}
              />
            </div>
            <div className="hidden">
              <label htmlFor="price" className="block mb-2">
                رقم المنتج <span className="text-red-500">*</span>
              </label>
              <input
                // type="number"
                name="productId"
                className="w-full border rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-300"
                // onChange={(e) => setData({ ...data, price: e.target.value })}
                value={product?.id}
              />
            </div>
            {/* Category */}

            <button
              type="submit"
              className="inline-flex font-medium w-full  justify-center text-white bg-blue py-3 px-7 rounded-md ease-out duration-200 hover:bg-blue-dark"
            >
              اشتري الان
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default BuyNowModal;
