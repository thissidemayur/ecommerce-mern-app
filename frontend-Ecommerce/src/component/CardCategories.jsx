import React from 'react';
import { Link } from 'react-router';

function CategoryCard({ categoryCardDetail }) {
  const { slug, productImg, title, btnText,  } = categoryCardDetail;

  return (
    <section className="rounded-lg overflow-hidden w-full flex flex-col h-full">
      <Link to={`${slug}`}>
        <div className="relative aspect-w-1 aspect-h-1">
          <img
            src={productImg}
            alt={title}
            className="w-full h-full object-cover"
          />
        </div>
      </Link>
      <div className="p-4 flex flex-col justify-end">
        <h2 className="text-2xl font-bold mb-1">{title || 'Untitled'}</h2>
       
        <Link
          to={`${slug}`}
          className="w-full border border-black bg-white px-5 py-2 hover:bg-black hover:text-white font-semibold text-sm text-center transition-colors duration-200"
        >
          {btnText || 'Shop Now'}
        </Link>
      </div>
    </section>
  );
}

export default CategoryCard;