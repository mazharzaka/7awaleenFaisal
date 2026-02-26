"use client";

import React, { useEffect, useState } from "react";
import Breadcrumb from "../Common/Breadcrumb";
import CustomSelect from "../Header/CustomSelect";
import {
  useAddProdectMutation,
  useAddstoreMutation,
  useGetcategoriesQuery,
  useGetsubcategoriesQuery,
} from "@/redux/features/Api.slice";
import toast from "react-hot-toast";

const AddStores = () => {
  const [addstore] = useAddstoreMutation();
  const [addProdect] = useAddProdectMutation();
  const { data: categories, isLoading } = useGetcategoriesQuery();
  const [sub, setsub] = useState("mobile_devices");
  const {
    data: subcategories,
    isLoading: subload,
    error,
  } = useGetsubcategoriesQuery(sub);
  const [selectedOption, setSelectedOption] = useState({
    label: "إضافة متجر",
    value: "1",
  });
  const [display, setDisplay] = useState(false);
  const [data, setData] = useState<any>({
    productImage: null,
    name: "",
    desc: "",
    price: "",
    finalPrice: "",
    stock: "",
    category: "",
    storeId: "",
  });
  useEffect(() => {
    setData({
      ...data,
      subCategory: subcategories ? subcategories[0].value : "",
    });
    console.log(data);
  }, [sub]);

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
        toast.error("حدث خطأ أثناء إضافة المتجر، يرجى المحاولة مرة أخرى.");
        setDisplay(false);
      } else {
        e.currentTarget?.reset();
        setDisplay(false);
        toast.success("تم إضافة المتجر بنجاح!");
      }
    } catch (err) {
      console.log("Error:", err);
      toast.error("حدث خطأ غير متوقع.");
    }
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setDisplay(true);
    let sale = 100 - (data.finalPrice / data.price) * 100;
    if (sale < 1) {
      sale = 0;
    }
    try {
      const formData = new FormData();
      if (data.productImage) {
        for (let i = 0; i < data.productImage.length; i++) {
          formData.append("productImage", data.productImage[i]);
        }
      }
      formData.append("name", data.name);
      formData.append("desc", data.desc);
      formData.append("price", data.price);
      formData.append("sale", sale.toString());
      formData.append("stock", data.stock);
      formData.append("category", data.category);
      formData.append("subCategory", data.subCategory);
      formData.append("storeId", data.storeId);

      const res = await addProdect(formData);
      console.log(res);

      if (res.error) {
        toast.error("حدث خطأ أثناء إضافة المنتج.");
        setDisplay(false);
      } else {
        setDisplay(false);
        toast.success("تم إضافة المنتج بنجاح!");
      }
    } catch (err) {
      console.log("Error:", err);
      toast.error("حدث خطأ غير متوقع.");
    }
  };

  const options = [
    { label: "إضافة متجر", value: "1" },
    { label: "إضافة منتج", value: "2" },
  ];
  return (
    <>
      <Breadcrumb title={"إضافة متجر ومنتج"} pages={["إضافة متجر ومنتج"]} />

      <section className="overflow-hidden py-20 bg-[#F4F7FF] dark:bg-black/90">
        <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
          <div className="flex flex-col lg:flex-row gap-5 sm:gap-8 mb-8 justify-center">
            <div className="w-full max-w-md">
              <CustomSelect
                onChange={(option) => {
                  setSelectedOption(option);
                }}
                options={options}
                width="100%"
              />
            </div>
          </div>
          
          <div className="flex flex-col xl:flex-row gap-7.5 justify-center">
            <div className="w-full max-w-[800px] bg-white dark:bg-dark-2 rounded-2xl shadow-premium p-6 sm:p-10 xl:p-12 border border-gray-200 dark:border-white/10">
              <h2 className="text-2xl font-bold mb-8 text-dark dark:text-white text-center">
                {selectedOption.value === "1" ? "تفاصيل المتجر الجديد" : "تفاصيل المنتج الجديد"}
              </h2>

              {selectedOption.value === "1" ? (
                <form onSubmit={onSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="w-full">
                      <label htmlFor="name" className="block mb-2.5 font-medium text-dark dark:text-white">
                        اسم المتجر <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        required
                        placeholder="أدخل اسم المتجر"
                        className="w-full rounded-xl border border-gray-300 bg-white py-3 px-5 text-dark outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10 dark:border-white/10 dark:bg-white/5 dark:text-white"
                      />
                    </div>

                    <div className="w-full">
                      <label htmlFor="category" className="block mb-2.5 font-medium text-dark dark:text-white">
                        نوع المتجر <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="category"
                        id="category"
                        required
                        placeholder="مثال: ملابس، إلكترونيات"
                        className="w-full rounded-xl border border-gray-300 bg-white py-3 px-5 text-dark outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10 dark:border-white/10 dark:bg-white/5 dark:text-white"
                      />
                    </div>
                  </div>

                  <div className="w-full">
                    <label htmlFor="address" className="block mb-2.5 font-medium text-dark dark:text-white">
                      العنوان
                    </label>
                    <input
                      type="text"
                      name="address"
                      id="address"
                      placeholder="العنوان التفصيلي للمتجر"
                      className="w-full rounded-xl border border-gray-300 bg-white py-3 px-5 text-dark outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10 dark:border-white/10 dark:bg-white/5 dark:text-white"
                    />
                  </div>

                  <div className="w-full">
                    <label className="block mb-2.5 font-medium text-dark dark:text-white">
                      شعار المتجر (Logo)
                    </label>
                    <div className="relative group">
                      <input
                        className="w-full cursor-pointer rounded-xl border border-dashed border-gray-400 bg-gray-50 py-10 px-5 text-center text-sm transition hover:bg-gray-100 dark:border-white/20 dark:bg-white/5 dark:hover:bg-white/10"
                        id="storeImage"
                        name="storeImage"
                        type="file"
                        accept="image/*"
                      />
                      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center space-y-2">
                        <svg className="h-8 w-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span className="text-gray-500">انقر أو اسحب الشعار هنا</span>
                      </div>
                    </div>
                    <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                      يفضل أن يكون الشعار بخلفية شفافة وبمقاسات مربعة للعرض في شريط الشعارات.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="w-full">
                      <label htmlFor="phone" className="block mb-2.5 font-medium text-dark dark:text-white">
                        رقم الهاتف
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        id="phone"
                        placeholder="رقم التواصل (واتساب)"
                        className="w-full rounded-xl border border-gray-300 bg-white py-3 px-5 text-dark outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10 dark:border-white/10 dark:bg-white/5 dark:text-white"
                      />
                    </div>
                    <div className="w-full">
                      <label htmlFor="rateview" className="block mb-2.5 font-medium text-dark dark:text-white">
                        التقييم الأولي
                      </label>
                      <input
                        type="number"
                        name="rateview"
                        id="rateview"
                        min="1"
                        max="5"
                        placeholder="من 1 إلى 5"
                        className="w-full rounded-xl border border-gray-300 bg-white py-3 px-5 text-dark outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10 dark:border-white/10 dark:bg-white/5 dark:text-white"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={display}
                    className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-blue py-4 px-10 font-bold text-white transition hover:bg-blue-dark active:scale-95 disabled:opacity-70"
                  >
                    {display ? (
                      <>
                        <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                        جاري الإضافة...
                      </>
                    ) : (
                      "حفظ وإضافة المتجر"
                    )}
                  </button>
                </form>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="w-full">
                    <label htmlFor="storeId" className="block mb-2.5 font-medium text-dark dark:text-white">
                      المتجر المرتبط <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="storeId"
                      name="storeId"
                      onChange={(e) =>
                        setData({ ...data, storeId: e.target.value })
                      }
                      placeholder="أدخل معرف المتجر لربط المنتج به"
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
                      required
                      onChange={(e) =>
                        setData({ ...data, name: e.target.value })
                      }
                      placeholder="أدخل اسم المنتج"
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
                      required
                      onChange={(e) =>
                        setData({ ...data, desc: e.target.value })
                      }
                      placeholder="اكتب وصفاً جذاباً للمنتج ومواصفاته"
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
                        required
                        onChange={(e) =>
                          setData({ ...data, price: e.target.value })
                        }
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
                        required
                        onChange={(e) =>
                          setData({ ...data, finalPrice: e.target.value })
                        }
                        placeholder="أتركه مساوياً للسعر الأصلي إذا لا يوجد خصم"
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
                      onChange={(e) =>
                        setData({ ...data, stock: e.target.value })
                      }
                      placeholder="أدخل الكمية المتاحة"
                      className="w-full rounded-xl border border-gray-300 bg-white py-3 px-5 text-dark outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10 dark:border-white/10 dark:bg-white/5 dark:text-white"
                    />
                  </div>

                  <div className="w-full">
                    <label className="block mb-2.5 font-medium text-dark dark:text-white">
                      صور المنتج <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="file"
                      name="productImage"
                      required
                      onChange={(e) =>
                        setData({ ...data, productImage: e.target.files })
                      }
                      multiple
                      className="w-full cursor-pointer rounded-xl border border-gray-300 bg-white py-3 px-5 text-dark outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10 dark:border-white/10 dark:bg-white/5 dark:text-white"
                    />
                    <p className="mt-2 text-xs text-gray-500">يمكنك اختيار أكثر من صورة للمنتج.</p>
                  </div>

                  <button
                    type="submit"
                    disabled={display}
                    className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-blue py-4 px-10 font-bold text-white transition hover:bg-blue-dark active:scale-95 disabled:opacity-70"
                  >
                    {display ? (
                      <>
                        <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                        جاري الإضافة...
                      </>
                    ) : (
                      "حفظ وإضافة المنتج"
                    )}
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
