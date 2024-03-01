import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import ProductCard from "./ProductCard";
import { useTheme } from "next-themes";

const RelatedProducts = ({ products }) => {
  const { theme } = useTheme();

  let textColor = theme === "dark" ? "text-white/[0.8]" : "text-black/[0.8]";
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1023, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 767, min: 0 },
      items: 1,
    },
  };
  return (
    <div className={`mt-[50px] md:mt-[100px] mb-[100px] md:mb-0 ${textColor}`}>
      <div className="text-2xl font-bold mb-5 ">You Might also like</div>

      <Carousel
        responsive={responsive}
        containerClass="-mx-[10px]  "
        itemClass=" px-[20px] "
      >
        {products?.data?.map((product) => (
          <ProductCard key={product.id} data={product} />
        ))}
        {products?.data?.length === 0 ? (
          <>
            <p> Don't have any related products</p>
          </>
        ) : (
          ``
        )}
      </Carousel>
    </div>
  );
};

export default RelatedProducts;
