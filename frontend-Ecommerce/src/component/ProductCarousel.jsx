import React, { useState, useEffect, useRef } from 'react';



/*productDetail is Array of object and in object it has 3 key one for adding image other for heading and last for price 
that is {image , title , price}
productDetail = [{image, title,price } , {image, title,price }]
*/
function ProductCarousel({productDetail ,title}) {
  const [index, setIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 760);
  const scrollRef = useRef();

  // Detect screen size
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 760);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const itemsVisible = isMobile ? 2 : 4;
  const totalPages = Math.ceil(productDetail?.length / itemsVisible);

  const handleNext = () => {
    setIndex((prev) => (prev + 1) % totalPages);
  };

  const handlePrev = () => {
    setIndex((prev) => (prev - 1 + totalPages) % totalPages);
  };

  // Auto-slide on desktop only
  useEffect(() => {
    if (!isMobile) {
      const interval = setInterval(() => {
        handleNext();
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [isMobile]);

  // Track scroll position on mobile to update active dot
  useEffect(() => {
    if (isMobile && scrollRef.current) {
      const container = scrollRef.current;

      const handleScroll = () => {
        const scrollLeft = container.scrollLeft;
        const width = container.offsetWidth;
        const current = Math.round(scrollLeft / width * 2); // 2 items visible
        const maxIndex = totalPages - 1;
        setIndex(Math.min(current, maxIndex));
      };

      container.addEventListener('scroll', handleScroll);
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, [isMobile]);

  return (
    <div className="relative w-full overflow-hidden">
      <div className='text-4xl '>{title}</div>
      {/* Navigation buttons (desktop only) */}
      {!isMobile && (
        <>
          <button
            onClick={handlePrev}
            className="hidden md:flex absolute left-2 top-1/2 -translate-y-1/2 bg-black text-white px-3 py-1 rounded z-10"
          >
            Prev
          </button>
          <button
            onClick={handleNext}
            className="hidden md:flex absolute right-2 top-1/2 -translate-y-1/2 bg-black text-white px-3 py-1 rounded z-10"
          >
            Next
          </button>
        </>
      )}

      {/* Carousel productdetail */}
      {/* snap-x snap-mandatory --> make crousel scrolable as insta stories */}
      <div
        ref={scrollRef}
      
        className={`
          flex 
          transition-transform duration-300 ease-in-out
          ${isMobile ? 'overflow-x-auto scroll-smooth snap-x snap-mandatory' : 'overflow-hidden'} 
          scrollbar-hide
        `}
        style={{
          transform: isMobile
            ? 'none'
            : `translateX(-${index * (100 / itemsVisible)}%)`,
        }}
      >
        {productDetail?.map((product, idx) => (
          <div
            key={idx}
            className={`
              flex-shrink-0 px-2 
              w-1/2 md:w-1/4
              transition-transform duration-300
              group snap-start
            `}
          >
            <div className="overflow-hidden rounded-md">
              <img
                src={product.image}
                alt={`carousel-${product.image}`}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <h1 className='font-semibold text-lg px-1.5 md:px-3 mt-2'>{product.title}</h1>
            <h2 className='font-medium text-lg px-1.5 md:px-3 '>₹<span className='font-normal'>{product.price}</span></h2>
          </div>
        ))}
      </div>

      {/* Pagination Dots – Now visible on mobile too */}
      <div className="flex justify-center mt-4 gap-2">
        {Array.from({ length: totalPages }).map((_, i) => (
          <span
            key={i}
            onClick={() => {
              setIndex(i);
              if (isMobile && scrollRef.current) {
                scrollRef.current.scrollTo({
                  left: i * scrollRef.current.offsetWidth,
                  behavior: 'smooth',
                });
              }
            }}
            className={`h-3 w-3 rounded-full cursor-pointer transition-all duration-300
              ${i === index ? 'bg-black scale-110' : 'bg-gray-300 hover:bg-gray-400'}
            `}
          ></span>
        ))}
      </div>
    </div>
  );
}

export default ProductCarousel;
