"use client";

import { useState } from "react";

const CategoryItem = ({ category, selected, onChange, setSelected }) => {
  const handleCategorySelect = (value: string) => {
    onChange(value);
    console.log(selected);

    setSelected(value);
  };
  return (
    <label
      className={`${
        selected ? "text-blue" : ""
      } group flex cursor-pointer items-center justify-between ease-out duration-200 hover:text-blue`}
    >
      {/* Radio Input */}
      <input
        type="radio"
        name={"category"}
        value={category.value}
        checked={selected === category.value}
        onChange={() => handleCategorySelect(category.value)}
        className="hidden"
      />

      <div className="flex items-center gap-2">
        {/* Radio Shape */}
        <div
          className={`flex items-center justify-center rounded-full w-4 h-4 border ${
            selected === category.value
              ? "border-blue bg-blue"
              : "bg-white dark:bg-[#121212] border-gray-3"
          }`}
        >
          <div
            className={`w-2 h-2 rounded-full bg-white transition ${
              selected === category.value ? "block" : "hidden"
            }`}
          />
        </div>

        <span>{category.label}</span>
      </div>

      <span
        className={`${
          selected === category.value ? "text-white bg-blue" : "bg-gray-2"
        } inline-flex rounded-[30px] text-custom-xs px-2 ease-out duration-200 group-hover:text-white group-hover:bg-blue`}
      >
        {category.products}
      </span>
    </label>
  );
};

const CategoryDropdown = ({ categories, onChange }) => {
  const [selected, setSelected] = useState("");

  const [toggleDropdown, setToggleDropdown] = useState(true);
  const handleCategorySelect = (value) => {
    onChange(value);
  };
  return (
    <div className="bg-white  dark:bg-[#121212]   shadow-1 rounded-lg">
      <div
        onClick={(e) => {
          e.preventDefault();
          setToggleDropdown(!toggleDropdown);
        }}
        className={`cursor-pointer flex items-center justify-between py-3 pl-6 pr-5.5 ${
          toggleDropdown && "shadow-filter"
        }`}
      >
        <p className=" text-dark dark:text-[#8b8b8b] dark:text-[#E0E0E0] ">
          Category
        </p>
        <button
          aria-label="button for category dropdown"
          className={` text-dark dark:text-[#8b8b8b] dark:text-[#E0E0E0]  ease-out duration-200 ${
            toggleDropdown && "rotate-180"
          }`}
        >
          <svg
            className="fill-current"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M4.43057 8.51192C4.70014 8.19743 5.17361 8.161 5.48811 8.43057L12 14.0122L18.5119 8.43057C18.8264 8.16101 19.2999 8.19743 19.5695 8.51192C19.839 8.82642 19.8026 9.29989 19.4881 9.56946L12.4881 15.5695C12.2072 15.8102 11.7928 15.8102 11.5119 15.5695L4.51192 9.56946C4.19743 9.29989 4.161 8.82641 4.43057 8.51192Z"
              fill=""
            />
          </svg>
        </button>
      </div>

      {/* dropdown && 'shadow-filter */}
      {/* <!-- dropdown menu --> */}
      <div
        className={`flex-col gap-3 py-6 pl-6 pr-5.5 ${
          toggleDropdown ? "flex" : "hidden"
        }`}
      >
        {categories?.map((category, key) => (
          <CategoryItem
            key={key}
            category={category}
            selected={selected}
            onChange={handleCategorySelect}
            setSelected={setSelected}
          />
        ))}
      </div>
    </div>
  );
};

export default CategoryDropdown;
