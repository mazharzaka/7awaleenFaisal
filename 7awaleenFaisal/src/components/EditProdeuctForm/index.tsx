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
    finalPrice: "",
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
    product?.category && setsub(product?.category);
  }, [product]);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setDisplay(true);
    console.log(123545);
    
    let sale = 100 - (data.finalPrice / data.price) * 100;

    try {
      const formData = new FormData();
      if (data.productImage) {
        data.productImage.forEach((file) =>
          formData.append("productImage", file),
        );
      }

      formData.append("name", data.name);
      formData.append("desc", data.desc);
      formData.append("price", String(data.price));
      formData.append("sale", String(sale));
      formData.append("stock", String(data.stock));
      formData.append("category", data.category || "");
      formData.append("subCategory", data.subCategory || "");
      formData.append("storeId", data.storeId || "");

      const res = await EditProduct({ id, formData }).unwrap();
      console.log(res);

      setDisplay(false);
      toast.success("تم تحديث المنتج بنجاح!");
    } catch (err) {
      console.log("Error:", err);
      setDisplay(false);
      toast.error("حدث خطأ أثناء تحديث المنتج.");
    }
  };

  if (productLoading) {
    return (
      <div className="w-full max-w-[1100px] mx-auto min-h-[400px] rounded-xl shadow-3 flex justify-center items-center bg-white dark:bg-dark-2 p-7.5">
        <div className="h-16 w-16 animate-spin rounded-full border-4 border-solid border-blue border-t-transparent"></div>
      </div>
    );
  }
  if (error) {
    return <Error />;
  }
  return (
    <>
      <Breadcrumb title={"تعديل المنتج"} pages={["تعديل المنتج"]} />
      <section className="overflow-hidden bg-[#F4F7FF] dark:bg-black/90 py-20">
        <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
          <div className="flex flex-col xl:flex-row gap-7.5 justify-center">
            <div className="w-full max-w-[800px] bg-white dark:bg-dark-2 rounded-2xl shadow-premium p-6 sm:p-10 xl:p-12 border border-gray-200 dark:border-white/10">
              <h2 className="text-2xl font-bold mb-8 text-dark dark:text-white text-center">
                تعديل بيانات المنتج
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="w-full">
                  <label htmlFor="storeId" className="block mb-2.5 font-medium text-dark dark:text-white">
                    المتجر المرتبط <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="storeId"
                    name="storeId"
                    value={data?.storeId}
                    onChange={(e) =>
                      setData({ ...data, storeId: e.target.value })
                    }
                    placeholder="أدخل معرف المتجر"
                    className="w-full rounded-xl border border-gray-300 bg-white py-3 px-5 text-dark outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10 dark:border-white/10 dark:bg-white/5 dark:text-white"
                  />
                </div>

                <div className="w-full">
                  <label htmlFor="name" className="block mb-2.5 font-medium text-dark dark:text-white">
                    اسم المنتج <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={data?.name}
                    required
                    onChange={(e) => setData({ ...data, name: e.target.value })}
                    placeholder="أدخل اسم المنتج الجديد"
                    className="w-full rounded-xl border border-gray-300 bg-white py-3 px-5 text-dark outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10 dark:border-white/10 dark:bg-white/5 dark:text-white"
                  />
                </div>

                <div className="w-full">
                  <label htmlFor="desc" className="block mb-2.5 font-medium text-dark dark:text-white">
                    وصف المنتج <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="desc"
                    rows={4}
                    value={data?.desc}
                    required
                    onChange={(e) => setData({ ...data, desc: e.target.value })}
                    placeholder="اكتب وصفاً جديداً للمنتج"
                    className="w-full rounded-xl border border-gray-300 bg-white py-3 px-5 text-dark outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10 dark:border-white/10 dark:bg-white/5 dark:text-white"
                  ></textarea>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="w-full">
                    <label htmlFor="price" className="block mb-2.5 font-medium text-dark dark:text-white">
                      السعر الأصلي <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      name="price"
                      value={data?.price}
                      required
                      onChange={(e) => setData({ ...data, price: e.target.value })}
                      placeholder="0.00"
                      className="w-full rounded-xl border border-gray-300 bg-white py-3 px-5 text-dark outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10 dark:border-white/10 dark:bg-white/5 dark:text-white"
                    />
                  </div>
                  <div className="w-full">
                    <label htmlFor="finalPrice" className="block mb-2.5 font-medium text-dark dark:text-white">
                      السعر بعد الخصم <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      name="finalPrice"
                      onChange={(e) =>
                        setData({ ...data, finalPrice: e.target.value })
                      }
                      value={data?.finalPrice}
                      required
                      placeholder="السعر النهائي للبيع"
                      className="w-full rounded-xl border border-gray-300 bg-white py-3 px-5 text-dark outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10 dark:border-white/10 dark:bg-white/5 dark:text-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="w-full">
                    <label className="block mb-2.5 font-medium text-dark dark:text-white">
                      الفئة الرئيسية <span className="text-red-500">*</span>
                    </label>
                    {categories && (
                      <CustomSelect
                        onChange={(option) => {
                          setsub(option.value);
                          setData({ ...data, category: option.value });
                        }}
                        options={categories}
                        width="100%"
                      />
                    )}
                  </div>
                  <div className="w-full">
                    <label className="block mb-2.5 font-medium text-dark dark:text-white">
                      الفئة الفرعية <span className="text-red-500">*</span>
                    </label>
                    {subcategories && (
                      <CustomSelect
                        onChange={(option) => {
                          setData({ ...data, subCategory: option.value });
                        }}
                        options={subcategories}
                        width="100%"
                      />
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-3 py-2">
                  <input
                    type="checkbox"
                    id="Isadvertising"
                    name="Isadvertising"
                    checked={data?.Isadvertising}
                    onChange={(e) =>
                      setData({ ...data, Isadvertising: e.target.checked })
                    }
                    className="h-5 w-5 rounded border-gray-300 text-blue focus:ring-blue"
                  />
                  <label htmlFor="Isadvertising" className="font-medium text-dark dark:text-white cursor-pointer transition hover:text-blue">
                    ترويج هذا المنتج في الصفحة الرئيسية
                  </label>
                </div>

                <div className="w-full">
                  <label htmlFor="stock" className="block mb-2.5 font-medium text-dark dark:text-white">
                    المخزون المتوفر
                  </label>
                  <input
                    type="number"
                    name="stock"
                    value={data?.stock}
                    onChange={(e) => setData({ ...data, stock: e.target.value })}
                    placeholder="أدخل الكمية المتاحة"
                    className="w-full rounded-xl border border-gray-300 bg-white py-3 px-5 text-dark outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10 dark:border-white/10 dark:bg-white/5 dark:text-white"
                  />
                </div>

                <div className="w-full">
                  <label className="block mb-2.5 font-medium text-dark dark:text-white">
                    تحديث صور المنتج (اختياري)
                  </label>
                  <input
                    type="file"
                    name="productImage"
                    onChange={(e) =>
                      setData({ ...data, productImage: e.target.files })
                    }
                    multiple
                    className="w-full cursor-pointer rounded-xl border border-gray-300 bg-white py-3 px-5 text-dark outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10 dark:border-white/10 dark:bg-white/5 dark:text-white"
                  />
                  <p className="mt-2 text-xs text-gray-500">اختر صوراً جديدة فقط إذا كنت ترغب في استبدال الصور الحالية.</p>
                </div>

                <button
                  type="submit"
                  disabled={display}
                  className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-blue py-4 px-10 font-bold text-white transition hover:bg-blue-dark active:scale-95 disabled:opacity-70"
                >
                  {display ? (
                    <>
                      <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                      جاري التحديث...
                    </>
                  ) : (
                    "تحديث بيانات المنتج"
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};


export default EditProdeuctForm;
