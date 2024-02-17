import Link from "next/link";
import React from "react";
import { BsChevronDown } from "react-icons/bs";
const data = [
  { id: 1, name: "Home", url: "/" },
  { id: 2, name: "About", url: "/about" },
  { id: 3, name: "Categories", subMenu: true },
  { id: 4, name: "Contact", url: "/contact" },
];

const subMenuData = [
  { id: 1, name: "Jordan", doc_count: 11 },
  { id: 2, name: "Sneakers", doc_count: 8 },
  { id: 3, name: "Running shoes", doc_count: 64 },
  { id: 4, name: "Football shoes", doc_count: 107 },
];
const MenuMobile = ({
  showCatMenu,
  setShowCatMenu,
  setMobileMenu,
  categories,
}) => {
  return (
    <ul
      className={`flex flex-col md:hidden font-bold absolute top-[60px] left-0 w-full h-[calc(100vh-50px)] bg-white border-t text-black`}
    >
      {data.map((item) => {
        return (
          <React.Fragment key={item.id}>
            {!!item?.subMenu ? (
              <li
                className="cursor-pointer py-4 px-5 border-b flex flex-col relative"
                onClick={() => setShowCatMenu(!showCatMenu)}
              >
                <div className="flex justify-between items-center">
                  {item.name}
                  <BsChevronDown />
                </div>
                {showCatMenu && (
                  <ul className="bg-black/[0.05] -mx-5 mt-4 -mb-4">
                    {categories?.map(({ attributes: category, id }) => {
                      return (
                        <Link key={id} href={`/category/${category.slug}`}>
                          <li className="py-4 px-8 border-t flex justify-between">
                            {category.name}

                            <span className="opacity-50 text-sm">
                              {`(${category?.products?.data?.length})`}
                            </span>
                          </li>
                        </Link>
                      );
                    })}
                  </ul>
                )}
              </li>
            ) : (
              <Link
                href={item?.url ? item.url : "/"}
                onClick={() => setMobileMenu(false)}
              >
                <li className="py-4 px-5 border-b flex hover:bg-black/[0.5]">
                  {item.name}
                </li>
              </Link>
            )}
          </React.Fragment>
        );
      })}
    </ul>
  );
};

export default MenuMobile;
