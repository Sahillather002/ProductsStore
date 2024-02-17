import React, { useEffect, useState } from "react";
import Wrapper from "./Wrapper";
import Link from "next/link";
import Menu from "./Menu";
import MenuMobile from "./MobileMenu";
import { IoMdHeartEmpty } from "react-icons/io";
import { BsCart } from "react-icons/bs";
import { BiMenuAltRight } from "react-icons/bi";
import { VscChromeClose } from "react-icons/vsc";
import { MdDarkMode } from "react-icons/md";
import { MdLightMode } from "react-icons/md";
import { CiLight } from "react-icons/ci";
import { CiDark } from "react-icons/ci";

import { useTheme } from "next-themes";
import fetchDataFromStrapi from "@/utils/api";
const Header = () => {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [showCatMenu, setShowCatMenu] = useState(false);
  const [show, setShow] = useState("translate-y-0");
  const [lastScrollY, setLastScrollY] = useState(0);
  const [categories, setCategories] = useState(null);

  const { theme, setTheme, systemTheme } = useTheme();

  const currentTheme = theme === "system" ? systemTheme : theme;

  const controlNavbar = () => {
    if (window.scrollY > 200) {
      if (window.scrollY > lastScrollY) {
        setShow("-translate-y-[80px]");
      } else {
        setShow("shadow-sm");
      }
    } else {
      setShow("translate-y-0");
    }
    setLastScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", controlNavbar);
    return () => {
      window.removeEventListener("scroll", controlNavbar);
    };
  }, [lastScrollY]);

  useEffect(() => {
    fetchCategories();
  }, []);
  const fetchCategories = async () => {
    const { data } = await fetchDataFromStrapi("api/categories?populate=*");
    setCategories(data);
  };
  return (
    <div
      className={`text-center bg-blue-50 w-full h-[50px] md: h-[80px] bg-blue-50 flex items-center
    justify-between z-20 sticky top-0 transition-transform duration-300 ${show}`}
    >
      <Wrapper className={`flex gap-10 p-4 justify-between`}>
        <div>
          <Link href="/">
            <img src="/logo.svg" className={`w-[40px] md: w-[80px]`}></img>
          </Link>
        </div>
        <Menu
          showCatMenu={showCatMenu}
          setShowCatMenu={setShowCatMenu}
          categories={categories}
        />
        {mobileMenu && (
          <MenuMobile
            showCatMenu={showCatMenu}
            setShowCatMenu={setShowCatMenu}
            setMobileMenu={setMobileMenu}
            categories={categories}
          />
        )}
      </Wrapper>
      <div className="flex items-center gap-2 text-black">
        <div
          className="w-8 md:w-12 h-8 md:h-12 rounded-full flex justify-center
        items-center hover:bg-black/[0.05] cursor-pointer relative"
        >
          <IoMdHeartEmpty className="text-[19px] md:text-[24px]" />
          <div
            className="h-[14px] md:h-[18]px min-w-[14px] md:min-w-[18px] rounded-full
          bg-red-600 absolute top-1 left-5 md:left-7 text-white text-[10px] md:text-[12px] 
          flex justify-center items-center p-[2px] md:px-[5px]"
          >
            400
          </div>
        </div>

        <Link href="/cart">
          <div
            className="w-8 md:w-12 h-8 md:h-12 rounded-full flex justify-center
        items-center hover:bg-black/[0.05] cursor-pointer relative"
          >
            <BsCart className="text-[15px] md:text-[20px]" />
            <div
              className="h-[14px] md:h-[18]px min-w-[14px] md:min-w-[18px] rounded-full
          bg-red-600 absolute top-1 left-5 md:left-7 text-white text-[10px] md:text-[12px] 
          flex justify-center items-center px-[2px] md:px-[5px]"
            >
              4
            </div>
          </div>
        </Link>

        {/* Themes for system */}
        {currentTheme === "dark" ? (
          <button
            className=""
            onClick={() => {
              setTheme("light");
            }}
          >
            {" "}
            <MdDarkMode
              color="#fde123"
              className="w-6 md:bg-slate-800 md:w-10 md:mr-4 h-6 md:h-8 rounded-full flex justify-center
            items-center hover:bg-black/[0.05] cursor-pointer relative"
            />
          </button>
        ) : (
          <button
            className=""
            onClick={() => {
              setTheme("dark");
            }}
          >
            <MdLightMode
              color="yellow"
              enableBackground={true}
              className="w-6 md:w-10 md:bg-red-400 md:mr-4 h-6 md:h-8 rounded-full flex justify-center
            items-center hover:bg-black/[0.05] cursor-pointer relative"
            ></MdLightMode>
          </button>
        )}

        {/* Mobile icon starting */}
        <div
          className="w-8 md:w-12 h-8 md:h-12 rounded-full flex md: hidden justify-center
        items-center hover:bg-black/[0.05] cursor-pointer relative"
        >
          {mobileMenu ? (
            <VscChromeClose
              className="text-[16px]"
              onClick={() => setMobileMenu(false)}
            />
          ) : (
            <BiMenuAltRight
              className="text-[20px]"
              onClick={() => setMobileMenu(true)}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
