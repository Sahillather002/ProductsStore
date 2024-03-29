import { useTheme } from "next-themes";

import HeroBanner from "../components/HeroBanner";
import ProductCard from "../components/ProductCard";
import Wrapper from "../components/Wrapper";
import fetchDataFromStrapi from "../utils/api";
import productsDemoData from "../demoData/product";

export default function Home({ products }) {
  const { theme } = useTheme();

  return (
    <div
      className={`${
        theme === "dark" ? "text-white/[0.5]" : "text-black/[0.5]"
      }`}
    >
      <HeroBanner />
      <Wrapper>
        {/* heading and paragaph start */}
        <div className="text-center max-w-[800px] mx-auto my-[50px] md:my-[80px]">
          <div className="text-[28px] md:text-[34px] mb-5 font-semibold leading-tight">
            Cushioning for Your Miles
          </div>
          <div className="text-md md:text-xl">
            A lightweight Nike ZoomX midsole is combined with increased stack
            heights to help provide cushioning during extended stretches of
            running.
          </div>
        </div>
        {/* heading and paragaph end */}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-14 px-5 md:px-0">
          {products?.data?.map((product) => (
            <ProductCard key={product.id} data={product} />
          ))}
        </div>
      </Wrapper>
    </div>
  );
}

export async function getStaticProps() {
  const products = await fetchDataFromStrapi("api/products?populate=*");
  return {
    props: { products: products || productsDemoData },
  };
}
