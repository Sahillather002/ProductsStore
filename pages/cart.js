import Image from "next/image";
import React from "react";
import Link from "next/link";
import { useTheme } from "next-themes";

import Wrapper from "../components/Wrapper";
import CartItems from "../components/CartItems";
const cart = () => {
  const { theme } = useTheme();
  return (
    <div className="w-full">
      <Wrapper>
        <div className="text-center py-4 max-w-[800px] mx-auto mt-10 md:mt-0 ">
          <div
            className={`text-5xl p-4 text-center font-bold from-slate-600   ${
              theme === "light" ? "via-black" : "to-slate-600"
            } bg-gradient-to-r bg-clip-text text-transparent`}
          >
            Shopping Cart
          </div>
        </div>
        <div className="flex flex-col lg:flex-row gap-12 py-10">
          <div className="flex-[2]">
            <div
              className={`text-2xl p-4 text-center font-bold ${
                theme === "dark" ? "to-slate-600" : "via-black"
              } from-slate-600 bg-gradient-to-r bg-clip-text text-transparent `}
            >
              Cart Items
            </div>
            <CartItems />
            <CartItems />
            <CartItems />
            <CartItems />
          </div>

          <div className="flex-[1] ">
            <div
              className={`text-2xl p-4 text-center font-bold from-slate-600 ${
                theme === "dark" ? "to-slate-600" : "via-black"
              } bg-gradient-to-r bg-clip-text text-transparent`}
            >
              Summary
            </div>
            <div
              className=" p-5 my-5 bg-gradient-to-r from-blue-200 to-cyan-200 rounded-xl
                        shadow-lg  transition-all duration-700 hover:scale-110  "
            >
              <div className="flex justify-between ">
                <div className="uppercase text-base md:text-lg font-medium text-black ">
                  Subtotal
                </div>
                <div className="text-base md:text-lg font-medium text-black ">
                  &#8377; 12 328.34
                </div>
              </div>
              <div className="text-sm md:text-base py-5 border-t-2 mt-5">
                This is the subtotal price of your order, including the duties
                and taxes, before any applicable discounts.
              </div>
            </div>
            <button
              className="w-full py-4 rounded-full bg-black text-white
                        text-lg font-medium transition-transform active:scale-95 mb-3 hover:opacity-95"
            >
              Checkout
            </button>
          </div>
        </div>

        <div
          className={`flex-[2] flex flex-col items-center pb-[50px] md:-mt-14 ${
            theme === "dark" ? "text-white/[0.5]" : "text-black/[0.5]"
          }`}
        >
          <Image
            src="/empty-cart.jpg"
            width={300}
            alt="empty cart"
            height={300}
            className="w-[300px] md:w-[400px] "
          />
          <span className="text-xl font-bold">Your cart is empty</span>
          <span className="text-center mt-4">
            Looks like you have not added anyting in your cart.
            <br />
            Go ahead and explore top categories.
          </span>
          <Link
            href="/"
            className="py-4 px-8 rounded-full bg-black text-white text-lg
                        font-medium transition-transform active:scale-95 mb-3 hover:opacity-90 mt-8"
          >
            Continue Shopping
          </Link>
        </div>
      </Wrapper>
    </div>
  );
};

export default cart;
