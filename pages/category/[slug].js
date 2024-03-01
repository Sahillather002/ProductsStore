import React, { useEffect, useState } from "react";
import useSWR from "swr";
import { useRouter } from "next/router";

import fetchDataFromStrapi from "../../utils/api";
import Wrapper from "../../components/Wrapper";
import ProductCard from "../../components/ProductCard";

const maxPageSize = 3;

const Category = ({ category, products, slug }) => {
  const [pageIndex, setPageIndex] = useState(1);

  const {
    data: pageData,
    error,
    isLoading,
  } = useSWR(
    `api/products?populate=*&[filters][categories][slug][$eq]=${slug}&pagination[page]=${pageIndex}&pagination[pageSize]=${maxPageSize}`,
    fetchDataFromStrapi,
    {
      fallbackData: products,
    }
  );
  const { query } = useRouter();
  useEffect(() => {
    setPageIndex(1);
  }, [query]);

  return (
    <div className="w-full md:py-20">
      <Wrapper>
        <div className="text-center max-w-[800px] mx-auto mt-8 md:mt-0">
          <div className="text-[28px] md:text-[34px] mb-5 font-semibold leading-tight">
            {category?.data?.[0]?.attributes?.name}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-14 px-5 md:px-0">
          {pageData?.data?.map((product) => (
            <ProductCard key={product.id} data={product} />
          ))}
        </div>
        {/* PAGINATION BUTTONS START */}
        {pageData?.meta?.pagination?.total > maxPageSize && (
          <div className="flex gap-3 items-center justify-center my-16 md:my-0">
            <button
              className={`rounded py-2 px-4 bg-black text-white disabled:bg-gray-200 disabled:text-gray-500`}
              disabled={pageIndex === 1}
              onClick={() => setPageIndex(pageIndex - 1)}
            >
              Previous
            </button>

            <span className="font-bold">{`${pageIndex} of ${pageData.meta.pagination.pageCount}`}</span>

            <button
              className={`rounded py-2 px-4 bg-black text-white disabled:bg-gray-200 disabled:text-gray-500`}
              disabled={pageIndex === pageData.meta.pagination.pageCount}
              onClick={() => setPageIndex(pageIndex + 1)}
            >
              Next
            </button>
          </div>
        )}
        {/* PAGINATION BUTTONS END */}
        {isLoading && (
          <div className="absolute top-0 left-0 w-full h-full bg-white/[0.5] flex flex-col gap-5 justify-center items-center">
            <img src="/logo.svg" alt="" width={150} />
            <span className="text-2xl font-medium">Loading...</span>
          </div>
        )}
      </Wrapper>
    </div>
  );
};

export default Category;

export async function getStaticPaths() {
  const categories = await fetchDataFromStrapi("api/categories?populate=*");
  const paths = categories?.data?.map((item) => ({
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
  const category = await fetchDataFromStrapi(
    `api/categories?filters[slug][$eq]=${slug}`
  );
  const products = await fetchDataFromStrapi(
    `api/products?populate=*&[filters][categories][slug][$eq]=${slug}&pagination[page]=1&pagination[pageSize]=${maxPageSize}`
  );

  return {
    props: {
      category,
      products,
      slug,
    },
  };
}
