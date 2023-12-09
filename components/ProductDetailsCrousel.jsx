import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
const ProductDetailsCrousel = () => {
  return (
    <div className="text-white text-5 w-full max-w-[1360px] mx-auto sticky top-[50px]">
      <Carousel
        autoPlay={true}
        infiniteLoop={true}
        showStatus={false}
        thumbWidth={80}
        className="productCarousel"
      >
        <img src="/p1.png"></img>
        <img src="/p2.png"></img>
        <img src="/p3.png"></img>
        <img src="/p4.png"></img>
        <img src="/p5.png"></img>
        <img src="/p6.png"></img>
        <img src="/p7.png"></img>
      </Carousel>
    </div>
  );
};

export default ProductDetailsCrousel;
