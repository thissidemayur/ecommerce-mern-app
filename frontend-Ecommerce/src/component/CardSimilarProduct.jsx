import React from 'react';
import { Link } from 'react-router';

function CardSimilarProduct({ product,slugForSimilarProduct }) {
  const {  productImg, title, btnText, productName } = product;
  const price = product.variants[0].price

  return (
    <section className="rounded-lg overflow-hidden w-full flex flex-col h-full">
      <Link to={`${slugForSimilarProduct}`}>
        <div className="relative aspect-w-1 aspect-h-1">
          <img
            src={productImg?.[0]?.url || '/fallback-image.jpg'}
            alt={title}
            className="w-full h-full object-cover transition-all hover:scale-110"
          />
        </div>
      </Link>
      <div className="p-4 flex flex-col justify-end">
        <h2 className="text-2xl font-bold mb-1">{productName || 'Untitled'}</h2>
        <h2 className="text-xl font-semibold mb-2">
          {price ? `₹${price.toLocaleString()}` : 'Price Not Available'}
        </h2>
        <Link
          to={`${slugForSimilarProduct}`}
          className="w-full border border-black bg-white px-5 py-2 hover:bg-black hover:text-white font-semibold text-sm text-center transition-colors duration-200"
        >
          {btnText || 'Shop Now'}
        </Link>
      </div>
    </section>
  );
}

export default CardSimilarProduct;