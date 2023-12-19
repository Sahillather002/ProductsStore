import { useTheme } from "next-themes";
import React from "react";
import { RiDeleteBin6Line } from "react-icons/ri";

const CartItems = () => {
  const { theme } = useTheme();

  let textColor = theme === "dark" ? "text-white/[0.5]" : "text-black/[0.5]";
  return (
    <div
      className={`${textColor} flex py-5 gap-3 md:gap-5  shadow-lg px-4 my-2 rounded-lg border-blue-500`}
    >
      {/* image */}
      <div className="moving-border shrink-0 aspect-square w-[50px] md:w-[120px]">
        <img src="product-1.webp"></img>
      </div>

      <div className="w-full flex flex-col">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="text-lg md:text-2xl font-semibold ">
            Jordan Retro 6 G
          </div>

          <div className="text-sm md:text-md font-medium block md:hidden ">
            Men's Golf Shoes
          </div>

          <div className="text-sm md:text-md font-bold mt-2 ">
            MRP : &#8377; 13 823.23
          </div>
        </div>

        <div className="text-md font-medium hidden md:block">
          Men's Golf Shoes
        </div>

        <div className="flex items-center justify-between mt-4 ">
          <div className="flex items-center gap-2 md:gap-10 text-sm md:text-md">
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
          <RiDeleteBin6Line
            className={`cursor-pointer ${
              theme === "light" ? "hover:text-black" : "hover:text-white"
            } text-[16px] md:text-[20px] `}
          />
        </div>
      </div>
    </div>
  );
};

export default CartItems;
