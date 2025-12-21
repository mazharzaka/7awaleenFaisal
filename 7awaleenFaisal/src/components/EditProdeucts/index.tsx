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
    try {
      deleteProduct({ id: id });
      toast.success("ًwhat a bayroo كده ممكن نرجعه");
    } catch (err) {
      console.log(err);
      toast.error("خخخخخخخخخ مش هعرف احلها");
    }
  };
  const handleAdvertise = async (id) => {
    try {
      const res = await AdvertiseingProduct({ id: id }).unwrap();
      console.log(res);

      toast.success("تم ترويج او الغاء منا معرفش يلا انت اللي عارف");
    } catch (err) {
      console.log(err);
      toast.error("خخخخخخخخخ مش هعرف احلها");
    }
  };

  if (error) {
    return <Error />;
  }
  if (isLoading) {
    return (
      <div className="w-full max-w-[1100px] rounded-xl shadow-3 flex justify-center items-center bg-white  dark:bg-[#121212]   p-7.5 relative modal-content">
        <div className="h-16 w-16 animate-spin rounded-full border-4 border-solid border-blue border-t-transparent"></div>
      </div>
    );
  }
  return (
    <>
      <Breadcrumb title={"EditProdeucts"} pages={["EditProdeucts"]} />
      <section className="overflow-hidden bg-white ">
        <div className="relative overflow-x-auto  py-19 px-5 bg-neutral-primary-soft shadow-xs rounded-base border border-default">
          <table className="w-full text-sm text-left rtl:text-right bg-white">
            <thead className="text-sm text-body bg-neutral-secondary-medium border-b border-t border-default-medium">
              <tr>
                <th scope="col" className="px-6 py-3 font-medium">
                  Product name
                </th>
                <th scope="col" className="px-6 py-3 font-medium">
                  Color
                </th>
                <th scope="col" className="px-6 py-3 font-medium">
                  Category
                </th>
                <th scope="col" className="px-6 py-3 font-medium">
                  SubCategory
                </th>
                <th scope="col" className="px-6 py-3 font-medium">
                  Sale
                </th>
                <th scope="col" className="px-6 py-3 font-medium">
                  Price
                </th>
                <th scope="col" className="px-6 py-3 font-medium">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {products?.products.map((item, index) => (
                <tr
                  className="bg-neutral-primary-soft border-b border-default"
                  key={index}
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-heading whitespace-nowrap"
                  >
                    {item.name.substring(0, 60) + "..."}
                  </th>
                  <td className="px-6 py-4">
                    <Image
                      src={item?.imageURL[0]}
                      alt="pic"
                      width={100}
                      height={100}
                    />
                  </td>
                  <td className="px-6 py-4">{item.category}</td>
                  <td className="px-6 py-4">{item.subCategory}</td>
                  <td className="px-6 py-4 text-red-dark">
                    {item.sale ? item.sale + "%" : "لا يوجد sale "}
                  </td>

                  <td className="px-6 py-4">{item.price}</td>
                  <td className="px-6 py-4 text-right  gap-3 items-center">
                    <div
                      className="font-bold text-xl text-fg-brand hover:underline text-red-dark"
                      onClick={() => handleDelete(item?.id)}
                    >
                      Delete
                    </div>
                    <Link
                      className="font-bold text-xl  text-yellow-dark m-2 text-fg-brand hover:underline"
                      href={`/EditProdeuctForm/${item.id}`}
                    >
                      Edit
                    </Link>
                    <div
                      className="font-bold text-xl text-fg-brand hover:underline text-blue-dark"
                      onClick={() => handleAdvertise(item.id)}
                    >
                      {item?.Isadvertising ? "الغاء الترويج" : "ترويج"}
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
