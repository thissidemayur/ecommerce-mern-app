import CategoryCard from './CardCategories';

function ProductCategories({ categories, sectionTitle = "", className }) {
  return (
    <section className={`container  bg-white w-full mt-5${className}`}>
      <div className="container mx-auto px-4 w-full mb-12">
        <h1 className='md:text-3xl sm:text-2xl text-2xl font-semibold px-4 text-center mb-4'>{sectionTitle}</h1>
        <div className="  gap-6 w-full items-stretch grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {categories && Array.isArray(categories) ? (
            categories.map((product, index) => {

              return (
                <CategoryCard
                  key={index}
                  categoryCardDetail={product}
                />
              )
            })
          ) : (
            <p className="text-black text-center">No categories available.</p>
          )}
        </div>
      </div>
    </section>
  );
}

export default ProductCategories;