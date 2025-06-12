import React, { useState, useEffect } from "react";
import { X, Mail } from 'lucide-react';
const PromotionalComponents = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 3,
    hours: 12,
    minutes: 30,
    seconds: 0
  });

  const [showPopup, setShowPopup] = useState(false);
  const [email, setEmail] = useState("");
  const [showStickyBar, setShowStickyBar] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPopup(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const countdown = setInterval(() => {
      if (timeLeft.seconds > 0) {
        setTimeLeft({ ...timeLeft, seconds: timeLeft.seconds - 1 });
      } else if (timeLeft.minutes > 0) {
        setTimeLeft({
          ...timeLeft,
          minutes: timeLeft.minutes - 1,
          seconds: 59
        });
      } else if (timeLeft.hours > 0) {
        setTimeLeft({
          ...timeLeft,
          hours: timeLeft.hours - 1,
          minutes: 59,
          seconds: 59
        });
      } else if (timeLeft.days > 0) {
        setTimeLeft({
          ...timeLeft,
          days: timeLeft.days - 1,
          hours: 23,
          minutes: 59,
          seconds: 59
        });
      }
    }, 1000);

    return () => clearInterval(countdown);
  }, [timeLeft]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle email submission logic here
    setShowPopup(false);
  };

  return (
    <div className="font-sans relative">
      {/* Bold Discount Banner */}
      <div className="bg-gradient-to-r from-red-600 to-yellow-500 text-white py-4 md:py-6 px-4">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
          <div className="text-center md:text-left mb-4 md:mb-0">
            <h2 className="text-2xl md:text-4xl font-bold mb-2">MEGA SALE! Up to 50% Off</h2>
            <p className="text-sm md:text-base">Limited time offer on all premium collections</p>
          </div>
          <button className="bg-white text-red-600 px-8 py-3 rounded-full font-bold hover:bg-gray-100 transform hover:scale-105 transition duration-200">
            Shop Now
          </button>
        </div>
      </div>

      {/* Time-Limited Offer Countdown */}
      <div className="bg-red-500 text-white py-8 px-4">
        <div className="container mx-auto text-center">
          <h3 className="text-xl md:text-2xl font-bold mb-6">Flash Sale Ends In:</h3>
          <div className="flex justify-center space-x-4 md:space-x-8">
            <div className="flex flex-col items-center">
              <span className="text-3xl md:text-5xl font-bold">{timeLeft.days}</span>
              <span className="text-sm md:text-base">Days</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-3xl md:text-5xl font-bold">{timeLeft.hours}</span>
              <span className="text-sm md:text-base">Hours</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-3xl md:text-5xl font-bold">{timeLeft.minutes}</span>
              <span className="text-sm md:text-base">Minutes</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-3xl md:text-5xl font-bold">{timeLeft.seconds}</span>
              <span className="text-sm md:text-base">Seconds</span>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Bar */}
      {showStickyBar && (
        <div className="sticky bottom-0 left-0 right-0 bg-black bg-opacity-90 text-white py-3 px-4 flex items-center justify-between">
          <p className="text-sm md:text-base">🎉 Get 10% off your first order!</p>
          <button
            onClick={() => setShowStickyBar(false)}
            className="text-white hover:text-gray-300"
          >
            <X className="text-xl" />
          </button>
        </div>
      )}

      {/* Coupon Pop-up */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full relative animate-fade-in-up">
            <button
              onClick={() => setShowPopup(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <X className="text-xl" />
            </button>
            <div className="text-center">
              <Mail className="text-4xl text-red-500 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2">Save 10% Today!</h3>
              <p className="text-gray-600 mb-6">Subscribe to our newsletter and get 10% off your first order</p>
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  required
                />
                <button
                  type="submit"
                  className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition duration-200"
                >
                  Get My 10% Off
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PromotionalComponents;