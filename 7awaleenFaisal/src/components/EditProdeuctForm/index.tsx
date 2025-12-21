"use client";
import React, { useEffect, useState } from "react";
import Breadcrumb from "../Common/Breadcrumb";
import {
  useEditProductMutation,
  useGetcategoriesQuery,
  useGetproductQuery,
  useGetsubcategoriesQuery,
} from "@/redux/features/Api.slice";
import Error from "../Error";
import CustomSelect from "../Header/CustomSelect";
import { useRouter } from "next/router";
import { useParams } from "next/navigation";
import toast from "react-hot-toast";

const EditProdeuctForm = () => {
  const { id } = useParams<{ id: string }>();

  const [sub, setsub] = useState("mobile_devices");
  const { data: categories, isLoading } = useGetcategoriesQuery();
  const { data: product, isLoading: productLoading } = useGetproductQuery(id);
  const [EditProduct] = useEditProductMutation();

  const [display, setDisplay] = useState(false);

  const {
    data: subcategories,
    isLoading: subload,
    error,
  } = useGetsubcategoriesQuery(sub);
  const [data, setData] = useState<any>({
    productImage: null,
    name: "",
    desc: "",
    price: "",
    sale: "",
    stock: "",
    category: "mobile_devices",
    storeId: "",
  });
  useEffect(() => {
    setData({
      ...data,
      subCategory: subcategories ? subcategories[0].value : "",
    });
    console.log(data);
  }, [sub]);
  useEffect(() => {
    setData(product);
    console.log(product?.category);
    product?.category && setsub(product?.category);
  }, [product]);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setDisplay(true);

    try {
      const formData = new FormData();
      if (data.productImage) {
        data.productImage.forEach((file) =>
          formData.append("productImage", file)
        );
      }

      formData.append("name", data.name);
      formData.append("desc", data.desc);
      formData.append("price", String(data.price));
      formData.append("sale", String(data.sale));
      formData.append("stock", String(data.stock));
      formData.append("category", data.category || "");
      formData.append("subCategory", data.subCategory || "");
      formData.append("storeId", data.storeId || "");

      // للتحقق
      for (const [key, value] of formData.entries()) {
        console.log(key, value);
      }

      const res = await EditProduct({ id, formData }).unwrap();
      console.log(res);

      setDisplay(false);
      toast.success("كده اتضاف يسطا ربنا يقويك 💪!");
    } catch (err) {
      console.log("Error:", err);
      setDisplay(false);
      toast.error("حصل خطأ يخول حاول تاني 🖕 او قولي 🤬💥!");
    }
  };

  if (productLoading) {
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
      <Breadcrumb title={"EditProdeuctForm"} pages={["EditProdeuctForm"]} />
      <section className="overflow-hidden bg-white py-20 ">
        <div className="flex flex-col xl:flex-row gap-7.5">
          <div className="w-full bg-white  dark:bg-[#121212]   rounded-xl shadow-1 p-4 sm:p-7.5 xl:p-10">
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
                  value={data?.storeId}
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
                  value={data?.name}
                  onChange={(e) => setData({ ...data, name: e.target.value })}
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
                  value={data?.desc}
                  onChange={(e) => setData({ ...data, desc: e.target.value })}
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
                  value={data?.price}
                  onChange={(e) => setData({ ...data, price: e.target.value })}
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
                  value={data?.sale}
                  onChange={(e) => setData({ ...data, sale: e.target.value })}
                  placeholder="0-100%"
                  className="w-full border rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-300"
                />
              </div>

              {/* Category */}
              <div>
                <label htmlFor="category" className="block mb-2">
                  فئه <span className="text-red-500">*</span>
                </label>

                {categories && (
                  <CustomSelect
                    onChange={(option) => {
                      console.log(option);
                      setsub(option.value);

                      setData({ ...data, category: option.value });
                    }}
                    options={categories}
                    width="100%"
                  />
                )}
              </div>
              <div>
                <label htmlFor="category" className="block mb-2">
                  فئه الفرعيه <span className="text-red-500">*</span>
                </label>

                {subcategories && (
                  <CustomSelect
                    onChange={(option) => {
                      console.log(option);
                      setData({ ...data, subCategory: option.value });
                    }}
                    options={subcategories}
                    width="100%"
                  />
                )}
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
                    value={data?.Isadvertising}
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
                  value={data?.stock}
                  onChange={(e) => setData({ ...data, stock: e.target.value })}
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
                {display ? "Processing..." : "عدلي ايتها العاهره"}
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default EditProdeuctForm;
