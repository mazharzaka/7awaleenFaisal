"use client";
import React from "react";
import Image from "next/image";
import { IProductDocument } from "@/types/product";
import Link from "next/link";
import { useAppDispatch } from "@/redux/store";
import { addItemToCart } from "@/redux/features/cart-slice";
import { useAddToBackendCartMutation } from "@/redux/features/Api.slice";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import toast from "react-hot-toast";

const ProductItem = ({ item }: { item: IProductDocument }) => {
  const dispatch = useAppDispatch();
  const { token } = useSelector((state: RootState) => state.auth);
  const [addToBackendCart] = useAddToBackendCartMutation();

  const handleAddToCart = async () => {
    const cartItem = {
      id: item.id || item._id,
      title: item.name,
      price: item.price || 0,
      discountedPrice: item.finalPrice || item.price || 0,
      quantity: 1,
      imgs: {
        thumbnails: item.imageURL || [],
        previews: item.imageURL || [],
      },
    };

    // Add item to local cart (optimistic)
    dispatch(addItemToCart(cartItem));

    // If authenticated, sync with backend
    if (token) {
      try {
        await addToBackendCart({
          productId: cartItem.id,
          quantity: cartItem.quantity,
          price: cartItem.price,
          discountedPrice: cartItem.discountedPrice
        }).unwrap();
      } catch (err) {
        console.error("Failed to add to backend cart:", err);
        // We could revert the local update here if we wanted strong consistency
      }
    }

    // Show success toast
    toast.success("تمت الإضافة إلى السلة", {
      duration: 2000,
      position: "top-center",
    });
  };

  return (
    <div className="group">
      <div className="relative overflow-hidden flex items-center justify-center h-64 rounded-lg bg-[#F6F7FB] dark:bg-[#282828] min-h-[270px] mb-4">
        <Image
          src={item.imageURL?.[0] || "/images/default-product.png"}
          alt={item.name || "Product"}
          fill
          className="object-contain"
        />

        {/* Sale Badge */}
        {item.sale && item.sale > 0 && (
          <div className="absolute top-3 left-3 bg-red-dark text-white text-xs font-bold px-2 py-1 rounded-md shadow-md">
            {Math.floor(item.sale)}% خصم
          </div>
        )}

        {/* Hover Actions */}
        <div className="absolute left-0 bottom-0 translate-y-full w-full flex items-center justify-center gap-2.5 pb-5 ease-linear duration-200 group-hover:translate-y-0">
          <Link
            href={`/shop-details/${item.id || item._id}`}
            className="flex items-center justify-center w-9 h-9 rounded-[5px] shadow-1 ease-out duration-200 text-dark dark:text-[#E0E0E0] bg-white dark:bg-[#121212] hover:text-blue"
            aria-label="View product details"
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
                d="M8.00016 5.5C6.61945 5.5 5.50016 6.61929 5.50016 8C5.50016 9.38071 6.61945 10.5 8.00016 10.5C9.38087 10.5 10.5002 9.38071 10.5002 8C10.5002 6.61929 9.38087 5.5 8.00016 5.5ZM6.50016 8C6.50016 7.17157 7.17174 6.5 8.00016 6.5C8.82859 6.5 9.50016 7.17157 9.50016 8C9.50016 8.82842 8.82859 9.5 8.00016 9.5C7.17174 9.5 6.50016 8.82842 6.50016 8Z"
                fill=""
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M8.00016 2.16666C4.99074 2.16666 2.96369 3.96946 1.78721 5.49791L1.76599 5.52546C1.49992 5.87102 1.25487 6.18928 1.08862 6.5656C0.910592 6.96858 0.833496 7.40779 0.833496 8C0.833496 8.5922 0.910592 9.03142 1.08862 9.4344C1.25487 9.81072 1.49992 10.129 1.76599 10.4745L1.78721 10.5021C2.96369 12.0305 4.99074 13.8333 8.00016 13.8333C11.0096 13.8333 13.0366 12.0305 14.2131 10.5021L14.2343 10.4745C14.5004 10.129 14.7455 9.81072 14.9117 9.4344C15.0897 9.03142 15.1668 8.5922 15.1668 8C15.1668 7.40779 15.0897 6.96858 14.9117 6.5656C14.7455 6.18927 14.5004 5.87101 14.2343 5.52545L14.2131 5.49791C13.0366 3.96946 11.0096 2.16666 8.00016 2.16666ZM2.57964 6.10786C3.66592 4.69661 5.43374 3.16666 8.00016 3.16666C10.5666 3.16666 12.3344 4.69661 13.4207 6.10786C13.7131 6.48772 13.8843 6.7147 13.997 6.9697C14.1023 7.20801 14.1668 7.49929 14.1668 8C14.1668 8.50071 14.1023 8.79199 13.997 9.0303C13.8843 9.28529 13.7131 9.51227 13.4207 9.89213C12.3344 11.3034 10.5666 12.8333 8.00016 12.8333C5.43374 12.8333 3.66592 11.3034 2.57964 9.89213C2.28725 9.51227 2.11599 9.28529 2.00334 9.0303C1.89805 8.79199 1.8335 8.50071 1.8335 8C1.8335 7.49929 1.89805 7.20801 2.00334 6.9697C2.11599 6.7147 2.28725 6.48772 2.57964 6.10786Z"
                fill=""
              />
            </svg>
          </Link>

          <button
            onClick={handleAddToCart}
            className="inline-flex items-center gap-2 font-medium text-custom-sm py-[7px] px-5 rounded-[5px] bg-blue text-white ease-out duration-200 hover:bg-blue-dark"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5.33333 14.6667C5.97333 14.6667 6.5 14.14 6.5 13.5C6.5 12.86 5.97333 12.3333 5.33333 12.3333C4.69333 12.3333 4.16667 12.86 4.16667 13.5C4.16667 14.14 4.69333 14.6667 5.33333 14.6667ZM12.3333 14.6667C12.9733 14.6667 13.5 14.14 13.5 13.5C13.5 12.86 12.9733 12.3333 12.3333 12.3333C11.6933 12.3333 11.1667 12.86 11.1667 13.5C11.1667 14.14 11.6933 14.6667 12.3333 14.6667Z"
                fill="white"
              />
              <path
                d="M5.33333 11.1667H12.3333C13.0667 11.1667 13.7133 10.6933 13.9533 10.0133L15.86 4.78004C15.94 4.58004 15.7267 4.33337 15.52 4.33337H3.66L3.24 2.80004C3.14667 2.36671 2.76 2.00004 2.32 2.00004H1.16667C0.706667 2.00004 0.333333 2.37337 0.333333 2.83337C0.333333 3.29337 0.706667 3.66671 1.16667 3.66671H2.32L4.6 12.46C4.26667 12.9067 4.16667 13.5267 4.42 14.06C4.67333 14.6 5.24 14.9667 5.86 14.9667H13.5C13.96 14.9667 14.3333 14.5934 14.3333 14.1334C14.3333 13.6734 13.96 13.3 13.5 13.3H5.86L5.33333 11.1667Z"
                fill="white"
              />
            </svg>
            أضف للسلة
          </button>
        </div>
      </div>

      <div className="flex items-center gap-2.5 mb-2">
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <Image
              key={i}
              src="/images/icons/icon-star.svg"
              alt="star icon"
              width={14}
              height={14}
            />
          ))}
        </div>
        <p className="text-custom-sm">(0)</p>
      </div>

      <h3 className="font-medium text-dark dark:text-[#E0E0E0] ease-out duration-200 hover:text-blue mb-1.5">
        <Link href={`/shop-details/${item.id || item._id}`}>
          {item.name.length > 60 ? item.name.substring(0, 60) + "..." : item.name}
        </Link>
      </h3>

      <span className="flex items-center gap-2 font-medium text-lg">
        <span className="text-dark dark:text-[#E0E0E0]">
          <span className="text-xs">EGP</span> {item.finalPrice?.toLocaleString("en-US") || item.price?.toLocaleString("en-US")}
        </span>
        {item.sale && item.sale > 0 && (
          <span className="text-gray-400 line-through text-xs">
            <span className="text-xs">EGP</span> {item.price?.toLocaleString("en-US")}
          </span>
        )}
      </span>
    </div>
  );
};

export default ProductItem;
