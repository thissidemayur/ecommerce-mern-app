import React, { useEffect, useState } from 'react';
import ProductCard from '../component/CardProduct.jsx';
import DiscountPopup from '../component/discountPopup.jsx';
import { Minus, Plus, X } from 'lucide-react';
import { useGetFilteredProductsQuery } from '../store/ApiProductFetch.js';
import { useNavigate } from 'react-router';
// ---------------- Main Component ----------------
const ProductListingPage = ({
  category = '',
  gender,
  subCategory = '',
  title,
  discountText,
  apiQuerySubCategoriesWithGenderHook,
  apiQueryAllSubCategoriesHook
}) => {
  const navigate = useNavigate();

  // ------------- UI States -------------
  const [filterVisibility, setFilterVisibility] = useState({ type: true, size: true, sort: true }); // filter toggle visibility
  const [openDialog, setOpenDialog] = useState(false); // mobile filter toggle
  const [fetchedSubCategories, setFetchedSubCategories] = useState([]); // sub-categories from API
  const [fetchedProducts, setFetchedProducts] = useState([]); // default product list (before filters)
  const [isFilterApplied, setIsFilterApplied] = useState(false); // whether filters are active
  const [filterAppliedTrigger, setFilterAppliedTrigger] = useState(0); // used to force refetch on filter

  // ------------- Filter State -------------
  const [selectedSubCategories, setSelectedSubCategories] = useState(subCategory ? [subCategory] : []);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedSort, setSelectedSort] = useState('');
  const [priceRange, setPriceRange] = useState(5000);

  // Build query params based on selected filters
  const buildQueryParams = () => {
    const params = new URLSearchParams();
    if (gender) params.set("gender", gender);
    if (category) params.set("categories", category);
    if (selectedSubCategories.length) params.set("subCategories", selectedSubCategories.join(","));
    if (selectedSizes.length) params.set("size", selectedSizes.join(","));
    if (priceRange < 10000) params.set("price", priceRange);
    if (selectedSort) params.set("sort", selectedSort);
    return params.toString();
  };

  // Trigger filter apply — updates URL and triggers data refetch
  const handleApplyFilters = () => {
    const queryStr = buildQueryParams();
    navigate(`/categories/${gender}/${category}?${queryStr}`);
    setIsFilterApplied(true);
    setFilterAppliedTrigger(prev => prev + 1); // force re-run query
  };

  // ------------- API Calls -------------
  const { data: initialProductsData, isSuccess: productsSuccess, isLoading: productsLoading, error: productsError } =
    apiQuerySubCategoriesWithGenderHook({ gender, subCategory });

  const { data: subCategoriesData, isSuccess: subCategoriesSuccess } = apiQueryAllSubCategoriesHook(category);

  // Populate initial product and sub-category lists from API
  useEffect(() => {
    if (productsSuccess && initialProductsData?.data) {
      setFetchedProducts(initialProductsData.data);
    }
    if (category && subCategoriesSuccess && subCategoriesData?.data) {
      setFetchedSubCategories(subCategoriesData.data);
    }
  }, [productsSuccess, initialProductsData, subCategoriesSuccess, subCategoriesData]);


  // ------------- Reset filters and clear URL on mount -------------
  useEffect(() => {
    // Clear any URL query params
    const url = new URL(window.location);
    url.search = '';
    window.history.replaceState({}, '', url);

    // Reset all filters
    setSelectedSubCategories([]);
    setSelectedSizes([]);
    setPriceRange(5000);
    setSelectedSort('');
    setIsFilterApplied(false);
  }, []);


  // ------------- Filter UI Change Handlers -------------
  const handleSubCategoryChange = (subCat) => {
    setSelectedSubCategories(prev =>
      prev.includes(subCat) ? prev.filter(item => item !== subCat) : [...prev, subCat]
    );
    setIsFilterApplied(true);
  };

  const handleSizeChange = (size) => {
    setSelectedSizes(prev =>
      prev.includes(size) ? prev.filter(item => item !== size) : [...prev, size]
    );
    setIsFilterApplied(true);
  };

  const handleSortChange = (sort) => {
    setSelectedSort(sort);
    setIsFilterApplied(true);
  };

  const handlePriceChange = (e) => {
    setPriceRange(Number(e.target.value));
    setIsFilterApplied(true);
  };

  // ------------- Filtered Product API Call -------------
  // `_force` forces a refetch even with same query if trigger changes
  const queryData = {
    gender,
    categories: category,
    subCategories: selectedSubCategories.length ? selectedSubCategories.join(',') : undefined,
    size: selectedSizes.length ? selectedSizes.join(',') : undefined,
    price: priceRange < 10000 ? priceRange : undefined,
    sort: selectedSort || undefined,
    _force: filterAppliedTrigger
  };

  const { data: filteredProducts, isLoading: filteredLoading, error: filteredError } =
    useGetFilteredProductsQuery(queryData, {
      skip: !isFilterApplied || !category || !gender, // only run when filters are applied
      refetchOnMountOrArgChange: true,
      refetchOnReconnect: true,
      pollingInterval: 0
    });

  // ------------- Final Product List to Show -------------
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // If filters are applied and filtered products are returned
    if (isFilterApplied && filteredProducts?.products) {
      setProducts(filteredProducts.products);
    }

    // If no filters are applied, fallback to initially fetched products
    else if (!isFilterApplied && fetchedProducts?.length > 0) {
      setProducts(fetchedProducts);
    }
  }, [filteredProducts, isFilterApplied, fetchedProducts]);

  return (
    <main className="w-full mx-auto py-8">
      {(productsLoading || filteredLoading) && (
        <p className="text-center text-gray-600">Loading products...</p>
      )}
      {(productsError || filteredError) && (
        <p className="text-center text-red-500 text-3xl">
          {productsError?.data?.message || filteredError?.data?.message || 'Unknown error'}
        </p>
      )}

      <section className="md:flex md:justify-between relative">
        {/* Sidebar Filters */}
        <aside className="md:w-[30%] bg-white md:sticky md:top-0 md:min-h-screen px-10 py-8 hidden md:block shadow-xl">
          <p className="text-sm">Showing {products.length} results for: {title || subCategory || category}</p>
          <h1 className="text-2xl font-bold border-b pb-4 border-gray-600">{title || subCategory || category}</h1>

          <FilterSection title={`${category} Type`} visible={filterVisibility.type} onToggle={() =>
            setFilterVisibility(prev => ({ ...prev, type: !prev.type }))}>
            {fetchedSubCategories.map((item) => (
              <li key={item}>
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2"
                    checked={selectedSubCategories.includes(item)}
                    onChange={() => handleSubCategoryChange(item)} />
                  {item}
                </label>
              </li>
            ))}
          </FilterSection>

          {/* Price Filter */}
          <div className="my-5">
            <label className="block text-sm font-semibold">Price: ₹0 - ₹{priceRange.toLocaleString()}</label>
            <input type="range" min="0" max="10000" value={priceRange} onChange={handlePriceChange} className="w-full mt-2" />
          </div>

          {/* Size Filter */}
          <FilterSection
            title="Size"
            visible={filterVisibility.size}
            onToggle={() =>
              setFilterVisibility(prev => ({ ...prev, size: !prev.size }))
            }
          >
            <ul>
              {(category === 'shirt'
                ? ['SM', 'M', 'L', 'XL', 'XXL']
                : category === 'BOTTOMWEAR'
                  ? ['28', '30', '32', '34', '36', '40', '42']
                  : []
              ).map((option) => (
                <li key={option}>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="mr-2"
                      checked={selectedSizes.includes(option)}
                      onChange={() => handleSizeChange(option)}
                    />
                    {option}
                  </label>
                </li>
              ))}
            </ul>
          </FilterSection>


          {/* Sort Filter */}
          <FilterSection title="Sort" visible={filterVisibility.sort} onToggle={() =>
            setFilterVisibility(prev => ({ ...prev, sort: !prev.sort }))}>
            {[
              { label: 'Price: Low to High', value: 'asc' },
              { label: 'Price: High to Low', value: 'desc' },
              { label: 'Latest', value: 'latest' },
            ].map((option) => (
              <li key={option.value}>
                <label className="flex items-center">
                  <input type="radio" name="sort" className="mr-2"
                    checked={selectedSort === option.value}
                    onChange={() => handleSortChange(option.value)} />
                  {option.label}
                </label>
              </li>
            ))}
          </FilterSection>

          <button className="bg-black text-white px-4 py-2 rounded mt-4 hover:bg-zinc-500 hover:cursor-pointer"
            onClick={handleApplyFilters}>
            Apply Filters
          </button>
        </aside>

        {/* Products Grid */}
        <div className="flex flex-col w-full px-5">
          <div className="flex justify-center md:justify-end flex-col mb-4 w-full">
            <button className="md:hidden w-full my-5 border px-4 py-2 rounded-md hover:bg-black hover:text-white"
              onClick={() => setOpenDialog(!openDialog)}>
              Sort & Filter
            </button>

            {openDialog && (
              <FilterPanelMobile
                filterVisibility={filterVisibility}
                setFilterVisibility={setFilterVisibility}
                fetchedSubCategories={fetchedSubCategories}
                selectedSubCategories={selectedSubCategories}
                handleSubCategoryChange={handleSubCategoryChange}
                selectedSizes={selectedSizes}
                handleSizeChange={handleSizeChange}
                selectedSort={selectedSort}
                handleSortChange={handleSortChange}
                priceRange={priceRange}
                handlePriceChange={handlePriceChange}
                gender={gender}
                category={category}
                onClose={() => setOpenDialog(false)}
                setIsFilterApplied={setIsFilterApplied}
                setFilterAppliedTrigger={setFilterAppliedTrigger}
              />
            )}

            <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:w-[95%] w-full">
              {products.length > 0 ? (
                products.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))
              ) : (
                !productsLoading && !filteredLoading && (
                  <p className="text-center text-gray-500 col-span-full">No products found.</p>
                )
              )}
            </section>
          </div>
        </div>
      </section>

      {discountText && <DiscountPopup content={discountText} />}
    </main>
  );
};

// ---------------- Filter Section ----------------
const FilterSection = ({ title, visible, onToggle, children }) => (
  <div className="space-y-2 mt-6">
    <div className="flex justify-between items-center">
      <h2 className="text-lg font-semibold">{title}</h2>
      <button onClick={onToggle}>{visible ? <Minus /> : <Plus />}</button>
    </div>
    <ul className={`transition-all duration-300 ease-in-out ${visible ? 'opacity-100 max-h-96' : 'opacity-0 max-h-0 overflow-hidden'} ${title === 'Size' ? 'flex flex-wrap gap-2' : 'space-y-2 pl-2'}`}>
      {children}
    </ul>
  </div>
);

// ---------------- Mobile Filter Panel ----------------
const FilterPanelMobile = ({
  filterVisibility,
  setFilterVisibility,
  fetchedSubCategories,
  selectedSubCategories,
  handleSubCategoryChange,
  selectedSizes,
  handleSizeChange,
  selectedSort,
  handleSortChange,
  priceRange,
  handlePriceChange,
  gender,
  category,
  onClose,
  setIsFilterApplied,
  setFilterAppliedTrigger,
}) => {
  const navigate = useNavigate();

  const buildQueryParams = () => {
    const params = new URLSearchParams();
    if (selectedSubCategories.length) params.set("subCategories", selectedSubCategories.join(","));
    if (selectedSizes.length) params.set("size", selectedSizes.join(","));
    if (priceRange < 10000) params.set("price", priceRange);
    if (selectedSort) params.set("sort", selectedSort);
    return params.toString();
  };

  const handleApplyFilters = () => {
    const queryStr = buildQueryParams();
    navigate(`/categories/${gender}/${category}?${queryStr}`);

    setIsFilterApplied(true);
    setFilterAppliedTrigger(prev => prev + 1);
    onClose();
  };

  return (
    <div className="bg-white fixed inset-0 z-50 w-full h-screen p-5 overflow-y-auto md:hidden">
      <div className="flex justify-between items-center mb-6 font-bold text-xl">
        <span>Sort & Filter</span>
        <button onClick={onClose} className="text-red-600"><X /></button>
      </div>

      <FilterSection title="Type" visible={filterVisibility.type} onToggle={() =>
        setFilterVisibility(prev => ({ ...prev, type: !prev.type }))}>
        {fetchedSubCategories.map((item) => (
          <li key={item}>
            <label className="flex items-center">
              <input type="checkbox" className="mr-2"
                checked={selectedSubCategories.includes(item)}
                onChange={() => handleSubCategoryChange(item)} />
              {item}
            </label>
          </li>
        ))}
      </FilterSection>

      <div className="my-5">
        <label className="block text-sm font-semibold">Price: ₹0 - ₹{priceRange.toLocaleString()}</label>
        <input type="range" min="0" max="10000" value={priceRange} onChange={handlePriceChange} className="w-full mt-2" />
      </div>

      <FilterSection title="Size" visible={filterVisibility.size} onToggle={() =>
        setFilterVisibility(prev => ({ ...prev, size: !prev.size }))}>
        {(category === 'shirt'
          ? ['SM', 'M', 'L', 'XL', 'XXL']
          : category === 'BOTTOMWEAR'
            ? ['28', '30', '32', '34', '36', '40', '42']
            : []).map((option) => (
              <li key={option}>
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2"
                    checked={selectedSizes.includes(option)}
                    onChange={() => handleSizeChange(option)} />
                  {option}
                </label>
              </li>
            ))}
      </FilterSection>

      <FilterSection title="Sort" visible={filterVisibility.sort} onToggle={() =>
        setFilterVisibility(prev => ({ ...prev, sort: !prev.sort }))}>
        {[
          { label: 'Price: Low to High', value: 'asc' },
          { label: 'Price: High to Low', value: 'desc' },
          { label: 'Latest', value: 'latest' },
        ].map((option) => (
          <li key={option.value}>
            <label className="flex items-center">
              <input type="radio" name="sort" className="mr-2"
                checked={selectedSort === option.value}
                onChange={() => handleSortChange(option.value)} />
              {option.label}
            </label>
          </li>
        ))}
      </FilterSection>

      <button className="bg-black text-white px-4 py-2 rounded mt-4 hover:bg-zinc-700 hover:cursor-pointer"
        onClick={handleApplyFilters}>
        Apply Filters
      </button>
    </div>
  );
};

export default ProductListingPage;
