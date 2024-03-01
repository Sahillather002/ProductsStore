import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
const ProductDetailsCrousel = ({ images }) => {
  return (
    <div className="text-white text-5 w-full max-w-[1360px] mx-auto sticky top-[50px]">
      <Carousel
        autoPlay={true}
        infiniteLoop={true}
        showStatus={false}
        thumbWidth={80}
        className="productCarousel"
      >
        {images?.map((item) => (
          <img key={item.id} src={item.attributes.url} alt="" />
        ))}
      </Carousel>
    </div>
  );
};

export default ProductDetailsCrousel;
