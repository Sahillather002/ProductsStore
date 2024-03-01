import React, { useState } from "react";
import { useTheme } from "next-themes";

import { IoMdHeartEmpty } from "react-icons/io";
import { FaCartArrowDown } from "react-icons/fa";

import ReactMarkdown from "react-markdown";

import Wrapper from "../../components/Wrapper";
import ProductDetailsCrousel from "../../components/ProductDetailsCrousel";
import RelatedProducts from "../../components/RelatedProducts";
import fetchDataFromStrapi from "../../utils/api";
import { getDiscountedPrice } from "../../utils/helper";

const ProductDetails = ({ product, products }) => {
  const [selectedSize, setSelectedSize] = useState();
  const [showerror, setshowerror] = useState(false);

  const productData = product?.data?.[0]?.attributes;

  console.log(productData);
  const { theme } = useTheme();
  let textColor = theme === "dark" ? "text-white/[0.5]" : "text-black/[0.5]";
  return (
    <div className="md: py-20">
      <Wrapper>
        <div className={`flex flex-col lg:flex-row ${textColor}`}>
          <div className="w-full pr-16 md:w-auto flex-[1.5] lg: max-w-full mx-auto lg:mx-0">
            <ProductDetailsCrousel images={productData.image.data} />
          </div>
          <div className="flex-[1] py-3">
            <div className="text-[28px] font-semibold mb-2">
              {productData.name || "title"}
            </div>
            <div className="text-lg font-semibold mb-5">
              {productData.subTitle || "subtitle"}
            </div>

            <div className="flex items-center">
              <p className="mr-2 text-lg font-semibold">
                MRP : &#8377; {productData.price || "price"}
              </p>
              {productData.originalPrice && (
                <>
                  <p className="text-base font-medium line-through">
                    &#8377; {productData.originalPrice || "original price"}
                  </p>
                  <p className="ml-auto text-base font-medium text-green-500">
                    {getDiscountedPrice(
                      productData.originalPrice,
                      productData.price
                    )}{" "}
                    % off
                  </p>
                </>
              )}
            </div>

            <div className="text-md font-medium">incl. of taxes</div>
            <div className="text-md font-medium mb-20">
              {`(Also includes all applicable duties)`}
            </div>

            <div className="mb-10">
              <div className="flex justify-between mb-2">
                <div className="text-md font-semibold">Select Size</div>
                <div className="text-md font-medium">Select Guide</div>
              </div>

              <div id="sizesGrid" className="grid grid-cols-3 gap-2">
                {productData.size.data.map((item, index) => (
                  <div
                    key={`${item.size}_${index}`}
                    className={` border rounded-md text-center py-3 font-medium${
                      item.enabled
                        ? "hover:border-black cursor-pointer"
                        : "cursor-not-allowed bg-black/[0.1]"
                    }
                    ${
                      selectedSize === item.size
                        ? "border-black  bg-green-300"
                        : ""
                    }
                    `}
                    onClick={() => {
                      setSelectedSize(item.size);
                      setshowerror(false);
                    }}
                  >
                    {item.size}
                  </div>
                ))}
              </div>
              {/* Error Message */}
              {showerror && (
                <div className="text-red-600 mt-1">
                  Size selection is required
                </div>
              )}
            </div>
            <button
              className="w-full py-4 rounded-full bg-black text-white border border-black
                        text-lg font-medium transition-transform active:scale-95 flex
                        items-center justify-center mb-3 gap-2 hover:opacity-95"
              onClick={() => {
                if (!selectedSize) {
                  setshowerror(true);
                  document.getElementById("sizesGrid").scrollIntoView({
                    behavior: "smooth",
                    block: "center",
                  });
                }
              }}
            >
              Add to Cart
              <FaCartArrowDown size={20} />
            </button>
            <button
              className="w-full py-4 rounded-full border border-black
                        text-lg font-medium transition-transform active:scale-95 flex
                        items-center justify-center gap-2 hover:opacity-60"
            >
              Wishlist
              <IoMdHeartEmpty size={20} />
            </button>

            <div>
              <div className="text-lg font-bold mt-10 mb-5 text-center">
                Product Details
              </div>
              <div className="text-md mb-5">
                <div className="text-md mb-5">
                  {productData?.description.map((item, index) => (
                    <ReactMarkdown key={index}>
                      {item.children[0].text}
                    </ReactMarkdown>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <RelatedProducts products={products} />
      </Wrapper>
    </div>
  );
};

export default ProductDetails;

export async function getStaticPaths() {
  const products = await fetchDataFromStrapi("api/products?populate=*");
  const paths = products.data.map((item) => ({
    params: {
      slug: item.attributes.slug,
    },
  }));
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params: { slug } }) {
  const product = await fetchDataFromStrapi(
    `api/products?populate=*&filters[slug][$eq]=${slug}`
  );
  const products = await fetchDataFromStrapi(
    `api/products?populate=*&[filters][slug][&ne]=${slug}`
  );

  return {
    props: {
      product,
      products,
    },
  };
}
