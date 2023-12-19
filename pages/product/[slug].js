import React from "react";
import { IoMdHeartEmpty } from "react-icons/io";
import Wrapper from "@/components/Wrapper";
import ProductDetailsCrousel from "@/components/ProductDetailsCrousel";
import { FaCartArrowDown } from "react-icons/fa";
import RelatedProducts from "@/components/RelatedProducts";
import { useTheme } from "next-themes";
const ProductDetails = () => {
  const { theme } = useTheme();

  let textColor = theme === "dark" ? "text-white/[0.5]" : "text-black/[0.5]";
  return (
    <div className="md: py-20">
      <Wrapper>
        <div className={`flex flex-col lg:flex-row ${textColor}`}>
          <div className="w-full pr-16 md:w-auto flex-[1.5] lg: max-w-full mx-auto lg:mx-0">
            <ProductDetailsCrousel />
          </div>
          <div className="flex-[1] py-3">
            <div className="text-[28px] font-semibold mb-2">
              Jordan Retro 8 G
            </div>
            <div className="text-lg font-semibold mb-5">
              Men&apos;s Golf Shoes
            </div>
            <div className="text-lg font-semibold">MRP : &#8377; 13 456.30</div>
            <div className="text-md font-medium">incl. of taxes</div>
            <div className="text-md font-medium mb-20">
              {`(Also includes all applicable duties)`}
            </div>

            <div className="mb-10">
              <div className="flex justify-between mb-2">
                <div className="text-md font-semibold">Select Size</div>
                <div className="text-md font-medium">Select Guide</div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div
                  className="border rounded-md text-center py-3 font-medium
                                hover:border-black cursor-pointer"
                >
                  UK 6
                </div>
                <div
                  className="border rounded-md text-center py-3 font-medium
                                hover:border-black cursor-pointer"
                >
                  UK 6
                </div>
                <div
                  className="border rounded-md text-center py-3 font-medium
                                hover:border-black cursor-pointer"
                >
                  UK 6
                </div>
                <div
                  className="border rounded-md text-center py-3 font-medium
                                hover:border-black cursor-pointer"
                >
                  UK 6
                </div>
                <div
                  className="border rounded-md text-center py-3 font-medium
                                hover:border-black cursor-pointer"
                >
                  UK 6
                </div>
                <div
                  className="border rounded-md text-center py-3 font-medium
                                hover:border-black cursor-pointer"
                >
                  UK 6
                </div>
                <div
                  className="border rounded-md text-center py-3 font-medium
                                hover:border-black cursor-pointer"
                >
                  UK 6
                </div>
                <div
                  className="border rounded-md text-center py-3 font-medium
                                hover:border-black cursor-pointer"
                >
                  UK 6
                </div>
                <div
                  className="border rounded-md text-center py-3 font-medium
                                hover:border-black cursor-not-allowed bg-black/[0.1] opacity-60"
                >
                  UK 6
                </div>
              </div>
              {/* Error Message */}
              <div className="text-red-600 mt-1">
                Size selection is required
              </div>
            </div>
            <button
              className="w-full py-4 rounded-full bg-black text-white border border-black
                        text-lg font-medium transition-transform active:scale-95 flex
                        items-center justify-center mb-3 gap-2 hover:opacity-95"
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
                <p>
                  It is a long established fact that a reader will be distracted
                  by the readable content of a page when looking at its layout.
                  The point of using Lorem Ipsum is that it has a more-or-less
                  normal distribution of letters, as opposed to using 'Content
                  here, content here', making it look like readable English.
                  Many desktop publishing packages and web page editors now use
                  Lorem Ipsum as their default model text, and a search for
                  'lorem ipsum' will uncover many web sites still in their
                  infancy. Various versions have evolved over the years,
                  sometimes by accident, sometimes on purpose (injected humour
                  and the like).
                </p>
                <p>
                  It is a long established fact that a reader will be distracted
                  by the readable content of a page when looking at its layout.
                  The point of using Lorem Ipsum is that it has a more-or-less
                  normal distribution of letters, as opposed to using 'Content
                  here, content here', making it look like readable English.
                  Many desktop publishing packages and web page editors now use
                  Lorem Ipsum as their default model text, and a search for
                  'lorem ipsum' will uncover many web sites still in their
                  infancy. Various versions have evolved over the years,
                  sometimes by accident, sometimes on purpose (injected humour
                  and the like).
                </p>
              </div>
            </div>
          </div>
        </div>
        <RelatedProducts />
      </Wrapper>
    </div>
  );
};

export default ProductDetails;
