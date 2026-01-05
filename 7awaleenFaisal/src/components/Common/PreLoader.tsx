import React from "react";

const PreLoader = () => {
  return (
    <div className="flex w-52 flex-col gap-4">
      <div className="h-32 w-full rounded-lg bg-gray-2 animate-pulse"></div>
      <div className="h-4 w-28 rounded bg-gray-2 animate-pulse"></div>
      <div className="h-4 w-full rounded bg-gray-2 animate-pulse"></div>
      <div className="h-4 w-full rounded bg-gray-2 animate-pulse"></div>
    </div>
  );
};

export default PreLoader;
