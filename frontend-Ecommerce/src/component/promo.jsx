import { useState, useEffect } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import {womenSports ,sports}  from '../assets/index.js';

const PromoSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [timeLeft, setTimeLeft] = useState({});

  const promotions = [
    {
      title: "Summer Collection 2024",
      description: "Up to 50% off on selected items",
      discount: 50,
      validUntil: "2024-06-30",
      image: womenSports,
      ctaLink: "/summer-collection"
    },
    {
      title: "New Arrivals",
      description: "Exclusive Designer Collection",
      discount: 30,
      validUntil: "2024-05-15",
      image: sports,
      ctaLink: "/new-arrivals"
    },
    {
      title: "Spring Essentials",
      description: "Fresh Styles for the Season",
      discount: 40,
      validUntil: "2024-04-30",
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8",
      ctaLink: "/spring-collection"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % promotions.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = new Date(promotions[currentSlide].validUntil) - new Date();
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      }
    };

    const timer = setInterval(calculateTimeLeft, 1000);
    calculateTimeLeft();

    return () => clearInterval(timer);
  }, [currentSlide]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % promotions.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + promotions.length) % promotions.length);
  };

  return (
    <div className="relative w-full h-[600px] overflow-hidden">
      {promotions.map((promo, index) => (
        <div
          key={index}
          className={`absolute w-full h-full transition-transform duration-500 ease-in-out ${index === currentSlide ? "translate-x-0" : "translate-x-full"}`}
          style={{ transform: `translateX(${(index - currentSlide) * 100}%)` }}
        >
          <div className="relative w-full h-full">
            <img
              src={promo.image}
              alt={promo.title}
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
              <div className="text-center px-4">
                <h2 className="text-4xl md:text-6xl font-bold text-white mb-4 transform transition-all duration-300 hover:scale-105">
                  {promo.title}
                </h2>
                <p className="text-xl md:text-2xl text-white mb-6">{promo.description}</p>
                <div className="flex justify-center gap-4 mb-8">
                  <div className="bg-white bg-opacity-20 rounded-lg p-4">
                    <span className="text-2xl font-bold text-white">{timeLeft.days}</span>
                    <p className="text-white">Days</p>
                  </div>
                  <div className="bg-white bg-opacity-20 rounded-lg p-4">
                    <span className="text-2xl font-bold text-white">{timeLeft.hours}</span>
                    <p className="text-white">Hours</p>
                  </div>
                  <div className="bg-white bg-opacity-20 rounded-lg p-4">
                    <span className="text-2xl font-bold text-white">{timeLeft.minutes}</span>
                    <p className="text-white">Minutes</p>
                  </div>
                  <div className="bg-white bg-opacity-20 rounded-lg p-4">
                    <span className="text-2xl font-bold text-white">{timeLeft.seconds}</span>
                    <p className="text-white">Seconds</p>
                  </div>
                </div>
                <button className="bg-white text-black px-8 py-3 rounded-full text-lg font-semibold transform transition-all duration-300 hover:scale-105 hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50">
                  Shop Now
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 p-2 rounded-full hover:bg-opacity-75 focus:outline-none"
        aria-label="Previous slide"
      >
        <ArrowLeft size={24} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 p-2 rounded-full hover:bg-opacity-75 focus:outline-none"
        aria-label="Next slide"
      >
        <ArrowRight size={24} />
      </button>
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {promotions.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full ${currentSlide === index ? "bg-white" : "bg-white bg-opacity-50"}`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default PromoSection;