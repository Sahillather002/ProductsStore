import React from "react";
import Link from "next/link";
const ProductCard = () => {
  return (
    <Link
      href="/product"
      className="transform overflow-hidden bg-white duration-200 hover:scale-105 cursor-pointer"
    >
      <img className="w-full" src="/product-1.webp" alt="prodcut image" />
      <div className="p-4 text-black/[0.9]">
        <h2 className="text-lg ">Product name</h2>
        <div className="flex items-start">
          <p className="mr-2 text-lg font-semibold">$30</p>
          <p className="text-base font-medium line-through">$40</p>
          <p className="ml-auto text-base font-medium text-green-400">
            30% off
          </p>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
