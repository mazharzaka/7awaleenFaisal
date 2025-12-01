"use client";

import React, { useEffect, useState } from "react";
import Breadcrumb from "../Common/Breadcrumb";
import CustomSelect from "../Header/CustomSelect";
import {
  useAddProdectMutation,
  useAddstoreMutation,
} from "@/redux/features/Api.slice";
import toast from "react-hot-toast";
import { set } from "mongoose";

const AddStores = () => {
  const [addstore] = useAddstoreMutation();
  const [addProdect] = useAddProdectMutation();
  const [selectedOption, setSelectedOption] = useState({
    label: "المحلات",
    value: "1",
  });
  const [display, setDisplay] = useState(false);
  const [data, setData] = useState<any>({
    productImage: null,
    name: "",
    desc: "",
    price: "",
    sale: "",
    stock: "",
    category: "",
    storeId: "",
  });

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setDisplay(true);
    try {
      const formdata = new FormData(e.currentTarget);
      console.log(formdata);

      const file = formdata.get("storeImage");

      formdata.delete("storeImage");

      const data = Object.fromEntries(formdata.entries());

      const fd = new FormData();
      fd.append("storeImage", file);

      for (const [key, value] of Object.entries(data)) {
        fd.append(key, value);
      }

      console.log(fd);
      const res = await addstore(fd);
      if (res.error) {
        toast.error("حصل خطأ يخول  حاول تاني 🖕 او قولي 🤬💥!");
      } else {
        e.currentTarget?.reset();
        setDisplay(false);
        toast.success("كده اتضاف يسطا ربنا يقويك 💪!");
      }
    } catch (err) {
      console.log("Error:", err);
      toast.error("حصل خطأ يخول  حاول تاني 🖕 او قولي 🤬💥!");
    }
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setDisplay(true);

    try {
      const formData = new FormData();
      for (let i = 0; i < data.productImage.length; i++) {
        formData.append("productImage", data.productImage[i]);
      }
      formData.append("name", data.name);
      formData.append("desc", data.desc);
      formData.append("price", data.price);
      formData.append("sale", data.sale);
      formData.append("stock", data.stock);
      formData.append("category", data.category);
      formData.append("storeId", data.storeId);
      console.log(data);
      const res = await addProdect(formData);
      console.log(res);

      if (res.error) {
        toast.error("حصل خطأ يخول  حاول تاني 🖕 او قولي 🤬💥!");
      } else {
        setDisplay(false);

        toast.success("كده اتضاف يسطا ربنا يقويك 💪!");
      }
    } catch (err) {
      console.log("Error:", err);
      toast.error("حصل خطأ يخول حاول تاني 🖕 او قولي 🤬💥!");
    }
  };

  const options = [
    { label: "المحلات", value: "1" },
    { label: "المنتجات", value: "2" },
  ];
  return (
    <>
      <Breadcrumb title={"add stores "} pages={["add stores"]} />

      <section className="overflow-hidden py-20 bg-gray-2">
        <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
          <div className="flex flex-col lg:flex-row gap-5 sm:gap-8 mb-5">
            <CustomSelect
              onChange={(option) => {
                setSelectedOption(option);
              }}
              options={options}
              width="100%"
            />
          </div>
          <div className="flex flex-col xl:flex-row gap-7.5">
            <div className="w-full bg-white  dark:bg-[#121212]   rounded-xl shadow-1 p-4 sm:p-7.5 xl:p-10">
              {selectedOption.value === "1" ? (
                <form onSubmit={onSubmit}>
                  <div className="flex flex-col lg:flex-row gap-5 sm:gap-8 mb-5">
                    <div className="w-full">
                      <label htmlFor="firstName" className="block mb-2.5">
                        الاسم <span className="text-red">*</span>
                      </label>

                      <input
                        type="text"
                        name="name"
                        id="name"
                        placeholder="الاسم المحل يخول عربي او انجليزي "
                        className="rounded-md border border-gray-3 bg-gray-1 placeholder: text-dark dark:text-[#8b8b8b] dark:text-[#E0E0E0] -5 w-full py-2.5 px-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-blue/20"
                      />
                    </div>

                    <div className="w-full">
                      <label htmlFor="category" className="block mb-2.5">
                        قسم <span className="text-red">*</span>
                      </label>

                      <input
                        type="text"
                        name="category"
                        id="category"
                        placeholder="النوع يسطا فوق حاول يبقا نفس الحاجه عشان الدتا بيز متشخرش "
                        className="rounded-md border border-gray-3 bg-gray-1 placeholder: text-dark dark:text-[#8b8b8b] dark:text-[#E0E0E0] -5 w-full py-2.5 px-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-blue/20"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col lg:flex-row gap-5 sm:gap-8 mb-5">
                    <div className="w-full">
                      <label htmlFor="address" className="block mb-2.5">
                        العنوان
                      </label>

                      <input
                        type="text"
                        name="address"
                        id="address"
                        placeholder="اكتب العنوان بحاجه مميزه عشان نعرف نوصله"
                        className="rounded-md border border-gray-3 bg-gray-1 placeholder: text-dark dark:text-[#8b8b8b] dark:text-[#E0E0E0] -5 w-full py-2.5 px-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-blue/20"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col lg:flex-row gap-5 sm:gap-8 mb-5">
                    <div className="w-full">
                      <label
                        className="block mb-2.5 text-sm font-medium text-heading"
                        htmlFor="file_input"
                      >
                        ارفع الصور
                      </label>
                      <input
                        className="cursor-pointer bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full shadow-xs placeholder:text-body"
                        aria-describedby="file_input_help"
                        id="storeImage"
                        name="storeImage"
                        type="file"
                      />
                      <p
                        className="mt-1 text-sm text-gray-500 dark:text-gray-300"
                        id="file_input_help"
                      >
                        صوره المنتج عدله بمقاس كويس عشان هيطلع ميتين امي
                        فالتعديل
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col lg:flex-row gap-5 sm:gap-8 mb-5">
                    <div className="w-full">
                      <label htmlFor="phone" className="block mb-2.5">
                        رقم هاتف
                      </label>

                      <input
                        type="text"
                        name="phone"
                        id="phone"
                        placeholder="اهم حاجه يبقي شغال افكرك ان حوار ده هيقشخني بعديدن لو عايزين نعمل otp"
                        className="rounded-md border border-gray-3 bg-gray-1 placeholder: text-dark dark:text-[#8b8b8b] dark:text-[#E0E0E0] -5 w-full py-2.5 px-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-blue/20"
                      />
                    </div>
                    <div className="w-full">
                      <label htmlFor="rateview" className="block mb-2.5">
                        تقييم
                      </label>

                      <input
                        type="number"
                        name="rateview"
                        id="rateview"
                        placeholder="من 1الي خمسه بالله عليك "
                        className="rounded-md border border-gray-3 bg-gray-1 placeholder: text-dark dark:text-[#8b8b8b] dark:text-[#E0E0E0] -5 w-full py-2.5 px-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-blue/20"
                      />
                    </div>
                  </div>
                  {/* 
                <div className="mb-7.5">
                  <label htmlFor="message" className="block mb-2.5">
                    Message
                  </label>

                  <textarea
                    name="message"
                    id="message"
                    rows={5}
                    placeholder="Type your message"
                    className="rounded-md border border-gray-3 bg-gray-1 placeholder: text-dark dark:text-[#8b8b8b] dark:text-[#E0E0E0] -5 w-full p-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-blue/20"
                  ></textarea>
                </div> */}
                  <button
                    type="submit"
                    disabled={display}
                    className="inline-flex font-medium w-full  justify-center text-white bg-blue py-3 px-7 rounded-md ease-out duration-200 hover:bg-blue-dark"
                  >
                    {display ? "Processing..." : "انقري ايتها العاهره"}
                  </button>
                </form>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Store ID */}
                  <div>
                    <label htmlFor="storeId" className="block mb-2">
                      ربط المحل <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="storeId"
                      name="storeId"
                      onChange={(e) =>
                        setData({ ...data, storeId: e.target.value })
                      }
                      placeholder="ده لو عايزين نربط المنتج بالمحل يغني فكك دلوقتي بعدين واقعد ساكت ياض يرامز عشان انا مبضون اصلا  "
                      className="w-full border rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-300"
                    />
                  </div>

                  {/* Name */}
                  <div>
                    <label htmlFor="name" className="block mb-2">
                      الاسم <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      onChange={(e) =>
                        setData({ ...data, name: e.target.value })
                      }
                      placeholder="الاسم المنتج  يخول عربي او انجليزي"
                      className="w-full border rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-300"
                    />
                  </div>

                  {/* Description */}
                  <div>
                    <label htmlFor="desc" className="block mb-2">
                      الوصف <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      name="desc"
                      rows={4}
                      onChange={(e) =>
                        setData({ ...data, desc: e.target.value })
                      }
                      placeholder="اكتب وصف للمحل"
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
                      onChange={(e) =>
                        setData({ ...data, price: e.target.value })
                      }
                      placeholder="ادخل السعر"
                      className="w-full border rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-300"
                    />
                  </div>

                  {/* Sale */}
                  <div>
                    <label htmlFor="sale" className="block mb-2">
                      خصم %
                    </label>
                    <input
                      type="number"
                      name="sale"
                      onChange={(e) =>
                        setData({ ...data, sale: e.target.value })
                      }
                      placeholder="0-100%"
                      className="w-full border rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-300"
                    />
                  </div>

                  {/* Category */}
                  <div>
                    <label htmlFor="category" className="block mb-2">
                      فئه <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="category"
                      onChange={(e) =>
                        setData({ ...data, category: e.target.value })
                      }
                      placeholder="ادخل النوع"
                      className="w-full border rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-300"
                    />
                  </div>

                  {/* Advertising */}
                  <div>
                    <label className="inline-flex items-center">
                      <input
                        type="checkbox"
                        name="Isadvertising"
                        onChange={(e) =>
                          setData({ ...data, Isadvertising: e.target.checked })
                        }
                        className="mr-2"
                      />
                      ترويج للمنتج
                    </label>
                  </div>

                  {/* Stock */}
                  <div>
                    <label htmlFor="stock" className="block mb-2">
                      Stock
                    </label>
                    <input
                      type="number"
                      name="stock"
                      onChange={(e) =>
                        setData({ ...data, stock: e.target.value })
                      }
                      placeholder="عدد المخزون"
                      className="w-full border rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-300"
                    />
                  </div>

                  {/* Image */}
                  <div>
                    <label htmlFor="imageURL" className="block mb-2">
                      ارفع الصور <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="file"
                      name="productImage"
                      onChange={(e) =>
                        setData({ ...data, productImage: e.target.files })
                      }
                      multiple
                      className="w-full border rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-300"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={display}
                    className="inline-flex font-medium w-full  justify-center text-white bg-blue py-3 px-7 rounded-md ease-out duration-200 hover:bg-blue-dark"
                  >
                    {display ? "Processing..." : "انقري ايتها العاهره"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AddStores;
