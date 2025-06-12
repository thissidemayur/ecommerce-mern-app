import React from 'react';
import ProductCarousel from './ProductCarousel';

function ProductCarouselWrapper({ title, btnText, courselDetail }) {
  return (
    <section className="flex flex-col items-center px-4 sm:px-6 lg:px-12 w-full">
      {/* Heading */}
      <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-center mt-6 sm:mt-10 mb-4 sm:mb-6">
        {title}
      </h1>

      {/* Carousel */}
      <div className="w-full">
        <ProductCarousel productDetail={courselDetail} />
      </div>

      {/* Button */}
      <button
        className="border border-black bg-white px-5 py-2 sm:px-6 sm:py-3 hover:bg-black hover:text-white font-semibold text-sm sm:text-base mt-6 mb-8 transition-colors duration-200"
      >
        {btnText}
      </button>
    </section>
  );
}

export default ProductCarouselWrapper;
