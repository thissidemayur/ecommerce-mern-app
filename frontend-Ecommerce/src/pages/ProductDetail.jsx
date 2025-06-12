import { useEffect, useState } from 'react';
import { Star, CheckCircle, Truck, RefreshCcw } from 'lucide-react';
import { useNavigate, useParams } from 'react-router';
import { useDispatch } from 'react-redux';
import { useGetSingleProductQuery, useGetSubCategoriesWithGenderQuery } from '../store/ApiProductFetch.js';

import CardSimilarProduct from '../component/CardSimilarProduct.jsx';
import { clearSelectedProduct, setSelectedProduct } from '../store/orderSlice.js';
import { addToCart } from '../store/cartSlice.js';

function Product() {
  const { productId } = useParams();
  const [selectedTab, setSelectedTab] = useState('description');
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [hoveredImage, setHoveredImage] = useState(null);
  const { data: getCurrentProduct, error, isSuccess, isFetching, isLoading } = useGetSingleProductQuery(productId);

  const {
    data: similarProduct,
    error: similarProductError,
    isFetching: similarProductFetching,
    isLoading: similarProductIsFetching,
  } = useGetSubCategoriesWithGenderQuery(
    { gender: getCurrentProduct?.data.gender, category: getCurrentProduct?.data.categories },
    { skip: !getCurrentProduct?.data }// 👈 Only fetch if currentProduct is loaded
  );

  const currentProduct = getCurrentProduct?.data;
  const similarProductData = similarProduct?.data;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleBuyNow = () => {
    if (!selectedSize) return alert("please select a size!")

    const productDetail = {
      productId: currentProduct._id,
      productName: currentProduct.productName,
      productImg: currentProduct.productImg,
      price: currentProduct.variants.find((v) => v.size === selectedSize)?.price || currentProduct.variants[0].price,
      size: selectedSize,
      quantity: 1,
    }

    dispatch(setSelectedProduct(productDetail))
    navigate('/checkout')
  }

  const handleAddToCart = () => {
    if (!selectedSize) return alert("please select size!");

    const productDetail = {
      productId: currentProduct._id,
      productName: currentProduct.productName,
      productImg: currentProduct.productImg,
      price: currentProduct.variants.find(v => v.size === selectedSize)?.price || currentProduct.variants[0].price,
      size: selectedSize,
      quantity: 1,
    }

    dispatch(addToCart(productDetail))
    alert(`${currentProduct.productName} added to cart successfully`)
  }

  useEffect(() => {
    dispatch(clearSelectedProduct())
  }, [dispatch])


  return (
    <main className="container mx-auto px-4 py-8 max-w-7xl">
      {isLoading || isFetching ? (
        <p className="text-center py-10 text-gray-600 text-lg">Loading product...</p>
      ) : error ? (
        <p className="text-center py-10 text-red-500 text-lg">
          Error loading product: {error?.data?.message || error.message}
        </p>
      ) : !currentProduct ? (
        <p className="text-center py-10 text-gray-600 text-lg">Product not found</p>
      ) : (
        <>
          <article className="md:flex md:items-start md:gap-8 mb-12">
            <section className="flex flex-col items-center gap-4 md:w-1/2">
              <figure className="w-full max-w-[450px] h-[450px] rounded-lg overflow-hidden shadow-lg">
                <img
                  src={
                    currentProduct?.productImg?.[hoveredImage !== null ? hoveredImage : selectedImage]?.url ||
                    '/fallback-image.jpg'
                  }
                  alt={currentProduct?.productName}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </figure>
              <aside className="flex gap-2 overflow-x-auto">
                {currentProduct?.productImg?.slice(0, 4).map((img, index) => (
                  <figure
                    key={index}
                    className={`w-18 h-18 rounded-md overflow-hidden cursor-pointer border-2 transition-transform duration-200 ${selectedImage === index ? 'border-blue-500' : 'border-transparent'
                      } hover:scale-110`}
                    onClick={() => setSelectedImage(index)}
                    onMouseEnter={() => setHoveredImage(index)}
                    onMouseLeave={() => setHoveredImage(null)}
                  >
                    <img
                      src={img?.url || '/fallback-image.jpg'}
                      alt={`${currentProduct?.productName} thumbnail ${index}`}
                      className="w-full h-full object-cover"
                    />
                  </figure>
                ))}
              </aside>
            </section>

            <section className="md:w-1/2 mt-8 md:mt-0">
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <header>
                  <h1 className="text-3xl font-bold text-gray-800">{currentProduct?.productName || 'Product Name'}</h1>
                </header>

                {/* rating start */}
                <section className="flex items-center gap-2 mt-3">
                  {Array(5)
                    .fill()
                    .map((_, i) => (
                      <Star
                        key={i}
                        fill={i < (currentProduct?.rating || 5) ? 'yellow' : 'none'}
                        color="yellow"
                        size={20}
                      />
                    ))}
                  <p className="text-gray-600">({currentProduct?.reviews || 122})</p>
                </section>
                {/* rating end */}

                <section className="mt-4">
                  <p className="text-4xl font-semibold text-gray-900">
                    ₹{currentProduct?.variants.find((v) => v.size === selectedSize)?.price || currentProduct?.variants[0]?.price || 'N/A'}
                  </p>
                  {currentProduct?.originalPrice && (
                    <p className="text-lg text-gray-500 line-through mt-1">
                      ₹{currentProduct?.originalPrice}
                    </p>
                  )}
                </section>

                <section className="text-gray-600 mt-4 leading-relaxed">
                  <p>{currentProduct?.aboutProduct || 'No description available'}</p>
                </section>

                <section className="mt-6">
                  <h3 className="text-lg font-medium text-gray-800 mb-2">Select Size:</h3>
                  <div className="flex gap-3">
                    {currentProduct?.variants?.length > 0 ? (
                      currentProduct.variants.map((variant, index) => (
                        <button
                          key={index}
                          className={`w-12 h-12 rounded-md text-center text-sm font-medium transition-colors cursor-pointer ${selectedSize === variant.size
                            ? 'bg-zinc-400 text-white'
                            : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                            }`}
                          onClick={() => setSelectedSize(variant.size)}
                        >
                          {variant?.size || 'N/A'}
                        </button>
                      ))
                    ) : (
                      <p className="text-gray-600">No sizes available</p>
                    )}
                  </div>
                </section>

                <section className="flex gap-4 mt-8">
                  <button
                    onClick={handleAddToCart}
                    className="flex-1 border border-black text-black py-3 rounded-lg text-center text-sm font-semibold hover:scale-105 hover:bg-black hover:text-white transition-all cursor-pointer"
                  >
                    Add to Cart
                  </button>
                  <button
                    onClick={handleBuyNow}
                    className="flex-1 bg-black text-white py-3 rounded-lg text-center text-sm font-semibold hover:scale-105 hover:bg-zinc-700 transition-all cursor-pointer"
                  >
                    Buy Now
                  </button>
                </section>

                <section className="mt-6 text-gray-600 text-sm">
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <RefreshCcw size={16} />
                      Easy return and exchange policy within 7 days
                    </li>
                    <li className="flex items-center gap-2">
                      <Truck size={16} />
                      Cash on delivery available
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle size={16} />
                      Free shipping on orders above ₹999
                    </li>
                  </ul>
                </section>
              </div>
            </section>
          </article>

          <section className="my-12">
            <div className="max-w-4xl mx-auto">
              <div className="flex border-b border-gray-200">
                <button
                  className={`px-6 py-3 text-sm font-medium ${selectedTab === 'description'
                    ? 'border-b-2 border-blue-500 text-blue-500'
                    : 'text-gray-600 hover:text-blue-500'
                    }`}
                  onClick={() => setSelectedTab('description')}
                >
                  Description
                </button>
                <button
                  className={`px-6 py-3 text-sm font-medium ${selectedTab === 'productDetail'
                    ? 'border-b-2 border-blue-500 text-blue-500'
                    : 'text-gray-600 hover:text-blue-500'
                    }`}
                  onClick={() => setSelectedTab('productDetail')}
                >
                  Product Details
                </button>
              </div>
              <div className="mt-4 p-6 bg-white rounded-lg shadow-md">
                {selectedTab === 'description' ? (
                  <p className="text-gray-600 leading-relaxed">
                    {currentProduct?.description || 'No description available'}
                  </p>
                ) : (
                  <ul className="text-gray-600 space-y-2">
                    <li>Material: {currentProduct?.material || 'N/A'}</li>
                    <li>
                      Available Sizes:{' '}
                      {currentProduct?.variants?.length > 0
                        ? currentProduct.variants.map((v, i) => (
                          <span key={i}>{v.size || 'N/A'}, </span>
                        ))
                        : 'N/A'}
                    </li>
                    <li>Fit: {currentProduct?.fit || 'N/A'}</li>
                    <li>
                      Colors:{' '}
                      {currentProduct?.variants?.length > 0
                        ? currentProduct.variants.map((v, i) => (
                          <span key={i}>{v.color || 'N/A'}, </span>
                        ))
                        : 'N/A'}
                    </li>
                    <li>
                      Stock:{' '}
                      {currentProduct?.variants?.length > 0
                        ? currentProduct.variants.map((v, i) => (
                          <span key={i}>{v.stock || 'N/A'}, </span>
                        ))
                        : 'N/A'}
                    </li>
                  </ul>
                )}
              </div>
            </div>
          </section>

          <section className="my-12">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Similar Products</h2>
              {similarProductIsFetching || similarProductFetching ? (
                <p className="text-center text-gray-600">Loading similar products...</p>
              ) : similarProductError ? (
                <p className="text-center text-red-500">
                  Error fetching similar products: {similarProductError?.data?.message || similarProductError.message}
                </p>
              ) : Array.isArray(similarProductData) && similarProductData.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                  {similarProductData
                    .filter((singleProduct) => singleProduct._id !== getCurrentProduct?.data._id)
                    .slice(0, 3)
                    .map((singleProduct) => (
                      <CardSimilarProduct
                        product={singleProduct}
                        slugForSimilarProduct={`/categories/${getCurrentProduct?.data.gender}/${getCurrentProduct?.data.categories}/${singleProduct.slug}`}
                        key={singleProduct._id}
                      />
                    ))}
                </div>
              ) : (
                <p className="text-center text-gray-600">No similar products found</p>
              )}
            </div>
          </section>
        </>
      )}
    </main>
  );
}

export default Product;