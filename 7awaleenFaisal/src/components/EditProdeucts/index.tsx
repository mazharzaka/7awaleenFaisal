"use client";
import React from "react";
import Breadcrumb from "../Common/Breadcrumb";
import {
  useAdvertiseingMutation,
  useDeleteProductMutation,
  useGetproductsQuery,
} from "@/redux/features/Api.slice";
import Error from "../Error";
import Image from "next/image";
import toast from "react-hot-toast";
import Link from "next/link";

const EditProdeucts = () => {
  const { data: products, error, isLoading } = useGetproductsQuery();
  const [deleteProduct] = useDeleteProductMutation();
  const [AdvertiseingProduct] = useAdvertiseingMutation();

  const handleDelete = (id) => {
    if (window.confirm("هل أنت متأكد من حذف هذا المنتج؟")) {
      try {
        deleteProduct({ id: id });
        toast.success("تم حذف المنتج بنجاح");
      } catch (err) {
        console.log(err);
        toast.error("حدث خطأ أثناء محاولة الحذف");
      }
    }
  };
  const handleAdvertise = async (id) => {
    try {
      const res = await AdvertiseingProduct({ id: id }).unwrap();
      console.log(res);

      toast.success("تم تحديث حالة ترويج المنتج");
    } catch (err) {
      console.log(err);
      toast.error("حدث خطأ أثناء تحديث حالة الترويج");
    }
  };

  if (error) {
    return <Error />;
  }
  if (isLoading) {
    return (
      <div className="w-full max-w-[1100px] mx-auto min-h-[400px] rounded-xl shadow-3 flex justify-center items-center bg-white dark:bg-dark-2 p-7.5">
        <div className="h-16 w-16 animate-spin rounded-full border-4 border-solid border-blue border-t-transparent"></div>
      </div>
    );
  }
  return (
    <>
      <Breadcrumb title={"إدارة المنتجات"} pages={["إدارة المنتجات"]} />
      <section className="overflow-hidden bg-[#F4F7FF] dark:bg-black/90 py-20 px-4">
        <div className="max-w-[1200px] mx-auto overflow-x-auto bg-white dark:bg-dark-2 shadow-premium rounded-2xl border border-gray-200 dark:border-white/10">
          <table className="w-full text-sm text-right">
            <thead className="text-xs uppercase bg-gray-50 dark:bg-white/5 border-b border-gray-200 dark:border-white/10 text-dark dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-4 font-bold">المعرف</th>
                <th scope="col" className="px-6 py-4 font-bold">اسم المنتج</th>
                <th scope="col" className="px-6 py-4 font-bold">الصورة</th>
                <th scope="col" className="px-6 py-4 font-bold">الفئة</th>
                <th scope="col" className="px-6 py-4 font-bold">الفئة الفرعية</th>
                <th scope="col" className="px-6 py-4 font-bold">الخصم</th>
                <th scope="col" className="px-6 py-4 font-bold">السعر</th>
                <th scope="col" className="px-6 py-4 font-bold text-center">الإجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-white/5">
              {products?.products.map((item, index) => (
                <tr
                  className="hover:bg-gray-50 dark:hover:bg-white/5 transition-colors"
                  key={index}
                >
                  <td className="px-6 py-4 font-medium text-gray-500 whitespace-nowrap">
                    {`#${item._id?.toString().slice(-8)}`}
                  </td>
                  <td className="px-6 py-4 font-bold text-dark dark:text-white">
                    {item.name.length > 50 ? item.name.substring(0, 50) + "..." : item.name}
                  </td>
                  <td className="px-6 py-4">
                    <div className="relative h-12 w-12 rounded-lg overflow-hidden border border-gray-200 dark:border-white/10 bg-gray-50">
                      <Image
                        src={item?.imageURL[0]}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-600 dark:text-gray-300">{item.category}</td>
                  <td className="px-6 py-4 text-gray-600 dark:text-gray-300">{item.subCategory}</td>
                  <td className="px-6 py-4">
                    {item.sale ? (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                        {item.sale}% خصم
                      </span>
                    ) : (
                      <span className="text-gray-400">لا يوجد</span>
                    )}
                  </td>
                  <td className="px-6 py-4 font-bold text-blue">
                    {item.price} ج.م
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-4">
                      <Link
                        className="text-yellow-600 hover:text-yellow-700 font-bold transition"
                        href={`/EditProdeuctForm/${item.id}`}
                      >
                        تعديل
                      </Link>
                      <button
                        className="text-blue-600 hover:text-blue-700 font-bold transition"
                        onClick={() => handleAdvertise(item.id)}
                      >
                        {item?.Isadvertising ? "إلغاء الترويج" : "ترويج"}
                      </button>
                      <button
                        className="text-red-500 hover:text-red-600 font-bold transition"
                        onClick={() => handleDelete(item?.id)}
                      >
                        حذف
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
};


export default EditProdeucts;
