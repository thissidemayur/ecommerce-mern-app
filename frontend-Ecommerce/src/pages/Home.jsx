import React from 'react';
import ProductCarousel from '../component/ProductCarousel';
import ProductCarouselWrapper from '../component/ProductCarouselWrapper';
import DiscountPopup from '../component/discountPopup';
import PromoSection from '../component/promo';
import PromotionalComponents from '../component/discountSale';
import {

  women,
  style,
  pair,
  men,
  men1
} from '../assets/index.js';

function Home() {
  let recentlyAddedProduct = [];

  return (
    <main className="w-full mx-auto">
      {/* Promo Section */}
      <div className="flex justify-center w-full"><PromoSection /></div>

      {/* Women Sports Section */}
      <section className="flex flex-col items-start px-4 md:px-6 lg:px-8 w-full md:max-w-7xl md:mx-auto md:my-10 my-5">
        <figure className="w-full max-w-full mx-auto">
          <img
            src={men}
            alt="Women Sports"
            className="w-full h-auto object-cover"
            sizes="(min-width: 1372px) 1322px, (min-width: 992px) 95vw, (min-width: 768px) 96vw, 97vw"
          />
        </figure>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-start mt-5 md:mt-10">
          Soft, shiny, and made to impress
        </h1>
        <p className="text-lg md:text-xl lg:text-2xl font-medium text-start mt-2">
          Confidence comes naturally.
        </p>
        <div className="my-2 md:my-4 flex flex-col md:flex-row gap-2">
          <button className="hover:bg-black font-semibold hover:text-white p-2 md:p-3 border border-black rounded-sm text-sm md:text-base">
            SHOP MEN's CASUAL CLOTHES
          </button>
          <button className="bg-black font-semibold text-white hover:bg-zinc-800 p-2 md:p-3 rounded-sm text-sm md:text-base">
            SHOP WOMEN's CASUAL CLOTHES
          </button>
        </div>
      </section>

      {/* Recently Added Products */}
      <ProductCarouselWrapper
        title={"Recently Added Products Just for You"}
        btnText={"SHOP LATEST PRODUCT"}
        courselDetail={recentlyAddedProduct}
      />

      {/* Matching Sets Section */}
      <section className="flex flex-col items-start px-4 md:px-6 lg:px-8 w-full md:max-w-7xl md:mx-auto md:my-10 my-5">
        <figure className="w-full max-w-full mx-auto">
          <img
            src={women}
            alt="Matching Sets"
            className="w-full h-auto object-cover"
            sizes="(min-width: 1372px) 1322px, (min-width: 992px) 95vw, (min-width: 768px) 96vw, 97vw"
          />
        </figure>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-start mt-5 md:mt-10">
          The perfect match.
        </h1>
        <p className="text-xl md:text-2xl lg:text-3xl font-bold text-start mt-2">
          Stylish, comfortable, and made to move.
        </p>
        <div className="my-2 md:my-4">
          <button className="hover:bg-black font-semibold hover:text-white p-2 md:p-3 border border-black rounded-sm text-sm md:text-base">
            SHOP MATCHING SETS
          </button>
        </div>
      </section>

      {/* Bestsellers */}
      <ProductCarouselWrapper
        title={"Loved by many, chosen by more — bestseller"}
        btnText={"SHOP BESTSELLERS"}
        courselDetail={recentlyAddedProduct}
      />

      {/* Promotional Components */}
      {/* <section className="flex justify-center items-center w-full">
        <PromotionalComponents />
      </section> */}

      {/* Two-Column Section (Men and Pair) */}
      <section className="w-full">
        <div className="lg:flex lg:justify-between md:px-6 lg:px-8 px-4 md:max-w-7xl md:mx-auto md:my-10 my-5">
          <section className="flex flex-col items-center md:items-start w-full lg:w-[48%] mb-5 lg:mb-0">
            <figure className="w-full max-w-[350px] md:max-w-[450px] mx-auto">
              <img
                src={men1}
                alt="Men Gym"
                className="w-full h-auto object-cover"
                sizes="(min-width: 1372px) 1322px, (min-width: 992px) 95vw, (min-width: 768px) 96vw, 97vw"
              />
            </figure>
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center md:text-start mt-4">
              Let your fire drive your workout.
            </h1>
            <p className="text-sm md:text-lg lg:text-xl text-center md:text-start mt-2">
              Confidence comes naturally.
            </p>
            <div className="my-2 md:my-4 flex flex-col md:flex-row gap-2 w-full">
              <button className="hover:bg-black font-semibold hover:text-white p-2 md:p-3 border border-black rounded-sm text-sm">
                SHOP GYM CLOTHES
              </button>
              <button className="bg-black font-semibold text-white hover:bg-zinc-800 p-2 md:p-3 rounded-sm">
                SHOP WOMEN's SHORTS
              </button>
            </div>
          </section>
          <section className="flex flex-col items-center md:items-start w-full lg:w-[48%] mt-5 lg:mt-0">
            <figure className="w-full max-w-[350px] md:max-w-[450px] mx-auto">
              <img
                src={pair}
                alt="Pair Gym"
                className="w-full h-auto object-cover"
                sizes="(min-width: 1372px) 1322px, (min-width: 992px) 95vw, (min-width: 768px) 96vw, 97vw"
              />
            </figure>
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center md:text-start mt-4">
              Turn your inner fire into power.
            </h1>
            <p className="text-sm md:text-lg lg:text-xl text-center md:text-start mt-2">
              Wear your confidence.
            </p>
            <div className="my-2 md:my-4 flex flex-col md:flex-row gap-2 w-full">
              <button className="hover:bg-black font-semibold hover:text-white p-2 md:p-3 border border-black rounded-sm text-sm">
                SHOP GYM CLOTHES
              </button>
              <button className="bg-black font-semibold text-white hover:bg-zinc-800 p-2 md:p-3 rounded-sm">
                SHOP MEN's SHORTS
              </button>
            </div>
          </section>
        </div>
      </section>

      {/* Popular Products */}
      <ProductCarouselWrapper
        title={"Check out popular product types"}
        btnText={"SHOP POPULAR PRODUCTS"}
        courselDetail={recentlyAddedProduct}
      />

      {/* Sports Wear Section */}
      <section className="flex flex-col items-start px-4 md:px-6 lg:px-8 w-full md:max-w-7xl md:mx-auto md:my-10 my-5">
        <figure className="w-full max-w-full mx-auto">
          <img
            src={style}
            alt="Sports Style"
            className="w-full h-auto object-cover"
            sizes="(min-width: 1372px) 1322px, (min-width: 992px) 95vw, (min-width: 768px) 96vw, 97vw"
          />
        </figure>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-start mt-5 md:mt-10">
          Play like the moment is yours.
        </h1>
        <p className="text-lg md:text-xl lg:text-2xl font-medium text-start mt-2">
          Silence your phone and step into pro mode—Smriti Mandhana’s game-day picks have you covered.
        </p>
        <div className="my-2 md:my-4 flex flex-col md:flex-row gap-2">
          <button className="hover:bg-black font-semibold hover:text-white p-2 md:p-3 border border-black rounded-sm text-sm md:text-base">
            SHOP MEN's SPORTS WEAR
          </button>
          <button className="bg-black font-semibold text-white hover:bg-zinc-800 p-2 md:p-3 rounded-sm text-sm md:text-base">
            SHOP WOMEN's SPORTS WEAR
          </button>
        </div>
      </section>

      {/* Policy Section */}
      <section className="flex flex-col md:flex-row justify-around items-center px-4 md:px-6 lg:px-8 mt-10 mb-20 w-full md:max-w-7xl md:mx-auto">
        <div className="flex justify-center items-center flex-col text-center mb-5 md:mb-0">
          <figure><svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-badge-indian-rupee"><path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" /><path d="M8 8h8" /><path d="M8 12h8" /><path d="m13 17-5-1h1a4 4 0 0 0 0-8" /></svg></figure>
          <h2 className="font-semibold text-lg md:text-xl">Easy Exchange Policy</h2>
          <h4 className="text-gray-600 text-sm md:text-base">We offer hassle free exchange policy</h4>
        </div>

        <div className="flex justify-center items-center flex-col text-center mb-5 md:mb-0">
          <figure><svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-badge-check"><path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" /><path d="m9 12 2 2 4-4" /></svg></figure>
          <h2 className="font-semibold text-lg md:text-xl">7 Days Return Policy</h2>
          <h4 className="text-gray-600 text-sm md:text-base">We provide 7 days free return policy</h4>
        </div>

        <div className="flex justify-center items-center flex-col text-center">
          <figure><svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-headset"><path d="M3 11h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-5Zm0 0a9 9 0 1 1 18 0m0 0v5a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3Z" /><path d="M21 16v2a4 4 0 0 1-4 4h-5" /></svg></figure>
          <h2 className="font-semibold text-lg md:text-xl">Best customer support</h2>
          <h4 className="text-gray-600 text-sm md:text-base">We provide 24/7 customer support</h4>
        </div>
      </section>

      {/* Discount Popup */}
      <section className="flex justify-center items-center w-full">
        <DiscountPopup content={"get 15% DISCOUNT with free delivery for new users"} />
      </section>
    </main>
  );
}

export default Home;