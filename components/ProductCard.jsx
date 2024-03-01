import React from "react";
import Link from "next/link";
import Image from "next/image";

import { getDiscountedPrice } from "../utils/helper";

const ProductCard = ({ data }) => {
  const products = data?.attributes;

  return (
    <Link
      href={`/product/${products?.slug}`}
      className="transform overflow-hidden bg-blend-darken duration-200 hover:scale-105 cursor-pointer"
    >
      <Image
        width={500}
        height={500}
        className="w-full"
        src={products?.thumbnail?.data?.attributes?.url || "/product-1.webp"}
        alt="prodcut image"
      />
      <div className="p-4">
        <h2 className="text-lg ">{products?.name || "Name"}</h2>
        <div className="flex items-start">
          <p className="mr-2 text-lg font-semibold">&#8377;{products?.price}</p>
          {products?.originalPrice && (
            <>
              <p className="text-base font-medium line-through">
                &#8377;{products?.originalPrice}
              </p>
              <p className="ml-auto text-base font-medium text-green-400">
                {getDiscountedPrice(products?.originalPrice, products.price)}%
                off
              </p>
            </>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
