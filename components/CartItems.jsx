import React from "react";
import { RiDeleteBin6Line } from "react-icons/ri";

const CartItems = () => {
  return (
    <div className="flex py-5 gap-3 md:gap-5 border-b">
      {/* image */}
      <div className="shrink-0 aspect-square w-[50px] md:w-[120px] ">
        <img src="product-1.webp"></img>
      </div>

      <div className="w-full flex flex-col">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="text-lg md:text-2xl font-semibold text-black/[0.8] ">
            Jordan Retro 6 G
          </div>

          <div className="text-sm md:text-md font-medium text-black/[0.5] block md:hidden ">
            Men&apso;s Golf Shoes
          </div>

          <div className="text-sm md:text-md font-bold text-black/[0.5] mt-2 ">
            MRP : &#8377; 13 823.23
          </div>
        </div>

        <div className="text-md font-medium text-black/[0.5] hidden md:block">
          Men&apso;s Golf Shoes
        </div>

        <div className="flex items-center justify-between mt-4 ">
          <div className="flex items-center gap-2 md:gap-10 text-black text-sm md:text-md">
            <div className="flex items-center gap-1">
              <select className="hover:text-black">
                <option value={1}>Uk 5</option>
                <option value={1}>Uk 5</option>
                <option value={1}>Uk 5</option>
                <option value={1}>Uk 5</option>
                <option value={1}>Uk 5</option>
                <option value={1}>Uk 5</option>
              </select>
            </div>
            <div className="flex items-center gap-1">
              <select className="hover:text-black">
                <option value={1}>Uk 5</option>
                <option value={1}>Uk 5</option>
                <option value={1}>Uk 5</option>
                <option value={1}>Uk 5</option>
                <option value={1}>Uk 5</option>
                <option value={1}>Uk 5</option>
              </select>
            </div>
          </div>
          <RiDeleteBin6Line className=""/>
        </div>
      </div>
    </div>
  );
};

export default CartItems;
