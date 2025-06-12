
import ProductCarousel from '../component/ProductCarousel.jsx'
import PromoSection from '../component/promo.jsx';
import ProductCategories from '../component/ProductCategories';
import {
  menDressPant,
  menShoes,
  menJackets,
  menPoloShirts,
  menShort,
  menTennis,
  underbear,
  menSportsJacket,
  menJogger,
  menSweter,
  menTrouser,
  menShirt,
  menTshirt,
} from '../assets/categories/men/index.js'


function MenProductCategories() {

  const recentlyAddedProduct = [
    { image: menDressPant, title: "Bag buye", price: 5000 }, { image: menShoes, title: "Gadench", price: 2000 }, { image: menShoes, title: "Vadench", price: 800 }, { image: menTennis, title: "kate", price: 8000 }, { image: menShoes, title: "tate", price: 89000 }, { image: menShoes, title: "tate", price: 89000 },
    { image: menShort, title: "tate", price: 89000 }
  ]

  const menProdcutsImg = [
    menSportsJacket,
    menSweter,
    menShort,
    menPoloShirts,
    menTrouser,
    menJackets,
    menDressPant,
    menTshirt,
    underbear,
    menShirt,
    menJogger,
    menShoes,

  ]

  const menSubCategories = [
    'Athletic Jackets',
    'Sweater',
    'Short ',
    'Polo Shirt',
    'Trouser',
    'Coats & Jackets',
    'Bottomwear',
    'T-shirt',
    'UnderBear ',
    'Shirt',
    'Joggers',
    'Athletic jackets',
  ].map((title, index) => ({
    title,
    btnText: `SHOP ${title.toUpperCase()}`,
    productImg: menProdcutsImg[index], // You will manage images
    slug: `/categories/men/${title.toLowerCase().replace(/ & /g, '-').replace(/'/g, '').replace(/ /g, '-')}`,
  }));



  const sectionTitle = ["", , "", ""]

  return (
    <section className="bg-white">
      <div className=' w-full '><PromoSection /></div>
      <div className="container mx-auto px-4 py-1 w-full">
        <h1 className="text-3xl sm:text-4xl font-bold text-black text-center mb-12">
          Explore Men’s Collections
        </h1>

        <div>
          {/* <h1 className='md:text-3xl sm:text-xl text-lg md:font-semibold px-4 text-center'></h1> */}
          <div className='w-full mt-5'>
            <ProductCategories
              categories={menSubCategories.slice(0, 3)}
              sectionTitle="Unleash Your Active Side"
            />

          </div>
        </div>

        <ProductCarousel productDetail={recentlyAddedProduct} title="What's New" />


        <div>
          <h1>{sectionTitle[1]}</h1>
          <div className='w-full '>
            <ProductCategories
              categories={menSubCategories.slice(3, 6)}
              sectionTitle="Journey in Comfort"
            />

          </div>
        </div>


        <ProductCarousel productDetail={recentlyAddedProduct} title="Bestsellers" />

        <div>
          <div>
            <h1>{sectionTitle[2]}</h1>
            <div className='w-full'>
              <ProductCategories
                categories={menSubCategories.slice(6, 9)}
                sectionTitle="Elevate Every Look"
              />

            </div>
          </div>


          <ProductCarousel productDetail={recentlyAddedProduct} title="Align Shop" />

          <div>
            <h1>{sectionTitle[0]}</h1>
            <div className='w-full'>
              <ProductCategories
                categories={menSubCategories.slice(9, 12)}
                sectionTitle="Relax in Style"
              />

            </div>
          </div>


          <ProductCarousel productDetail={recentlyAddedProduct} />


        </div>

      </div>

    </section>
  );
}

export default MenProductCategories;