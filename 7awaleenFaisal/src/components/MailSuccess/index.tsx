import React from "react";
import Breadcrumb from "../Common/Breadcrumb";
import Link from "next/link";

const EditProdeucts = () => {
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
                  Price
                </th>
                <th scope="col" className="px-6 py-3 font-medium">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-neutral-primary-soft border-b border-default">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-heading whitespace-nowrap"
                >
                  Apple MacBook Pro 17
                </th>
                <td className="px-6 py-4">Silver</td>
                <td className="px-6 py-4">Laptop</td>
                <td className="px-6 py-4">$2999</td>
                <td className="px-6 py-4 text-right">
                  <a
                    href="#"
                    className="font-medium text-fg-brand hover:underline"
                  >
                    Delete
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
};

export default EditProdeucts;
