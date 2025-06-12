// src/components/UpdateProductForm.jsx
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useGetSingleProductQuery, useUpdateProductMutation } from '../store/ApiProductFetch';

export default function UpdateProductForm({ productId }) {
  const { register, formState: { errors }, handleSubmit, setValue, reset } = useForm({ mode: 'onBlur' });
  const [images, setImages] = useState([]);
  const [variants, setVariants] = useState([{ size: '', color: '', price: '', stock: '' }]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { data: fetchedProduct, isLoading: getProductLoading, error: getProductError } = useGetSingleProductQuery(productId);
  const [updateProduct, { error: productUpdateError, isLoading: productUpdateLoading, isSuccess }] = useUpdateProductMutation();

  useEffect(() => {
    const fetchedProductData = fetchedProduct?.data;
    if (fetchedProductData) {
      setValue('productName', fetchedProductData.productName);
      setValue('aboutProduct', fetchedProductData.aboutProduct || '');
      setValue('description', fetchedProductData.description);
      setValue('categories', fetchedProductData.categories);
      setValue('discountedPrice', fetchedProductData.discountedPrice || '');
      setValue('discountPrice', fetchedProductData.discountPrice || '');
      setValue('brand', fetchedProductData.brand || '');
      setValue('material', fetchedProductData.material || '');
      setValue('gender', fetchedProductData.gender);
      setValue('isFeatured', fetchedProductData.isFeatured || false);
      setValue('isNewProduct', fetchedProductData.isNewProduct || false);
      setVariants(fetchedProductData.variants?.length > 0 ? fetchedProductData.variants : [{ size: '', color: '', price: '', stock: '' }]);
    }
  }, [fetchedProduct, setValue]);

  const removeVariant = (index) => {
    setVariants(variants.filter((_, idx) => idx !== index));
  };

  const addVariant = () => {
    setVariants([...variants, { size: '', color: '', price: '', stock: '' }]);
  };

  const handleVariantChange = (index, e) => {
    const { name, value } = e.target;
    const updatedVariants = variants.map((variant, i) =>
      i === index ? { ...variant, [name]: value } : variant
    );
    setVariants(updatedVariants);
  };

  const onSubmit = async (userData) => {
    if (isSubmitting) return;

    if (variants.length === 0) {
      alert('At least one variant is required.');
      return;
    }
    const invalidVariant = variants.some(
      (v) => !v.size || !v.color || !v.price || !v.stock || Number(v.price) < 0 || Number(v.stock) < 0
    );
    if (invalidVariant) {
      alert('Please fill all variant fields with valid values (price and stock must be non-negative).');
      return;
    }

    setIsSubmitting(true);
    const formData = new FormData();
    Object.keys(userData).forEach((key) => {
      formData.append(key, userData[key]);
    });
    images.forEach((singlePic) => {
      formData.append('productImg', singlePic);
    });
    formData.append('variants', JSON.stringify(variants));

    // Debug FormData
    for (let [key, value] of formData.entries()) {
      console.log(`FormData: ${key} = ${value}`);
    }

    try {
      const response = await updateProduct({ id: productId, data: formData }).unwrap();
      console.log("Response updated product: ",response)
      if (response.success) {
        alert('Product updated successfully!');
        // reset();
        setImages([]);
        setVariants([{ size: '', color: '', price: '', stock: '' }]);
      } else {
        throw new Error('Invalid response from server');
      }
    } catch (error) {
      console.error('Update error:', error);
      alert(`Failed to update product: ${error?.data?.message || error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (getProductLoading) return <div className="text-center p-4 text-gray-700">Loading...</div>;
  if (getProductError) return <div className="text-red-600 p-4">Error: {getProductError?.data?.message || 'Failed to fetch product'}</div>;

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-8 space-y-6 animate-fade-in"
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Update Product</h2>

        {/* Product Name */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Product Name</label>
          <input
            {...register('productName', {
              required: 'Product name is required',
              minLength: { value: 3, message: 'Product name must be at least 3 characters' },
            })}
            placeholder="Enter product name"
            className="w-full p-3 border rounded-md focus:ring-2 focus:ring-black focus:outline-none transition-all duration-300"
          />
          {errors.productName && <p className="text-red-600 text-sm">{errors.productName.message}</p>}
        </div>

        {/* About Product */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">About Product</label>
          <input
            {...register('aboutProduct')}
            placeholder="Brief about the product"
            className="w-full p-3 border rounded-md focus:ring-2 focus:ring-black focus:outline-none transition-all duration-300"
          />
        </div>

        {/* Description */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            {...register('description', {
              required: 'Description is required',
              minLength: { value: 10, message: 'Description must be at least 10 characters' },
            })}
            placeholder="Detailed product description"
            className="w-full p-3 border rounded-md focus:ring-2 focus:ring-black focus:outline-none transition-all duration-300 resize-y"
            rows="4"
          />
          {errors.description && <p className="text-red-600 text-sm">{errors.description.message}</p>}
        </div>

        {/* Category */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Category</label>
          <input
            {...register('categories', { required: 'Category is required' })}
            placeholder="Enter category (e.g., Clothing)"
            className="w-full p-3 border rounded-md focus:ring-2 focus:ring-black focus:outline-none transition-all duration-300"
          />
          {errors.categories && <p className="text-red-600 text-sm">{errors.categories.message}</p>}
        </div>

        {/* Pricing */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Discounted Price (₹)</label>
            <input
              {...register('discountedPrice', {
                valueAsNumber: true,
                min: { value: 0, message: 'Price must be non-negative' },
              })}
              type="number"
              placeholder="Enter discounted price"
              className="w-full p-3 border rounded-md focus:ring-2 focus:ring-black focus:outline-none transition-all duration-300"
            />
            {errors.discountedPrice && <p className="text-red-600 text-sm">{errors.discountedPrice.message}</p>}
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Discount (%)</label>
            <input
              {...register('discountPrice', {
                valueAsNumber: true,
                min: { value: 0, message: 'Discount must be non-negative' },
                max: { value: 100, message: 'Discount cannot exceed 100%' },
              })}
              type="number"
              placeholder="Enter discount percentage"
              className="w-full p-3 border rounded-md focus:ring-2 focus:ring-black focus:outline-none transition-all duration-300"
            />
            {errors.discountPrice && <p className="text-red-600 text-sm">{errors.discountPrice.message}</p>}
          </div>
        </div>

        {/* Brand and Material */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Brand</label>
            <input
              {...register('brand')}
              placeholder="Enter brand name"
              className="w-full p-3 border rounded-md focus:ring-2 focus:ring-black focus:outline-none transition-all duration-300"
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Material</label>
            <input
              {...register('material')}
              placeholder="Enter material"
              className="w-full p-3 border rounded-md focus:ring-2 focus:ring-black focus:outline-none transition-all duration-300"
            />
          </div>
        </div>

        {/* Gender */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Gender</label>
          <select
            {...register('gender', { required: 'Gender is required' })}
            className="w-full p-3 border rounded-md focus:ring-2 focus:ring-black focus:outline-none transition-all duration-300"
          >
            <option value="">Select Gender</option>
            <option value="men">Men</option>
            <option value="women">Women</option>
            <option value="unisex">Unisex</option>
          </select>
          {errors.gender && <p className="text-red-600 text-sm">{errors.gender.message}</p>}
        </div>

        {/* Checkboxes */}
        <div className="flex space-x-6">
          <label className="flex items-center space-x-2">
            <input
              {...register('isFeatured')}
              type="checkbox"
              className="h-4 w-4 text-blue-600 focus:ring-black border-gray-300 rounded"
            />
            <span className="text-sm text-gray-700">Is Featured?</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              {...register('isNewProduct')}
              type="checkbox"
              className="h-4 w-4 text-blue-600 focus:ring-black border-gray-300 rounded"
            />
            <span className="text-sm text-gray-700">Is New Product?</span>
          </label>
        </div>

        {/* Variants */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Product Variants</label>
            <p className="text-sm text-gray-500">Add size, color, price, and stock combinations.</p>
          </div>
          {variants.map((variant, index) => (
            <div
              key={index}
              className="grid grid-cols-1 md:grid-cols-5 gap-4 bg-gray-50 p-4 rounded-md shadow-sm animate-slide-in"
            >
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Size</label>
                <input
                  type="text"
                  name="size"
                  placeholder="e.g., M"
                  value={variant.size}
                  onChange={(e) => handleVariantChange(index, e)}
                  className="w-full p-3 border rounded-md focus:ring-2 focus:ring-black focus:outline-none transition-all duration-300"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Color</label>
                <input
                  type="text"
                  name="color"
                  placeholder="e.g., Red"
                  value={variant.color}
                  onChange={(e) => handleVariantChange(index, e)}
                  className="w-full p-3 border rounded-md focus:ring-2 focus:ring-black focus:outline-none transition-all duration-300"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Price (₹)</label>
                <input
                  type="number"
                  name="price"
                  placeholder="e.g., 599"
                  value={variant.price}
                  onChange={(e) => handleVariantChange(index, e)}
                  className="w-full p-3 border rounded-md focus:ring-2 focus:ring-black focus:outline-none transition-all duration-300"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Stock</label>
                <input
                  type="number"
                  name="stock"
                  placeholder="e.g., 25"
                  value={variant.stock}
                  onChange={(e) => handleVariantChange(index, e)}
                  className="w-full p-3 border rounded-md focus:ring-2 focus:ring-black focus:outline-none transition-all duration-300"
                />
              </div>
              {index > 0 && (
                <div className="flex items-end">
                  <button
                    type="button"
                    onClick={() => removeVariant(index)}
                    className="text-red-600 hover:text-red-800 text-sm font-medium transition-colors duration-200"
                  >
                    Remove
                  </button>
                </div>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={addVariant}
            className="text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors duration-200"
          >
            + Add Another Variant
          </button>
        </div>

        <div className="space-y-2">
  <label className="block text-sm font-medium text-gray-700">Current Images</label>
  <div className="grid grid-cols-3 gap-4">
    {fetchedProduct?.data?.productImg?.map((img) => (
      <img key={img.productImg_id} src={img.url} alt="Product" className="w-full h-24 object-cover rounded-md" />
    ))}
  </div>
</div>

        {/* Image Upload */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Upload Images (max 6)</label>
          <input
            type="file"
            accept="image/*"
            multiple
            {...register('images', {
              validate: {
                maxFiles: (files) => !files || files.length <= 6 || 'Maximum 6 images allowed',
                fileType: (files) =>
                  !files || Array.from(files).every((file) => file.type.startsWith('image/')) || 'Only image files are allowed',
              },
            })}
            onChange={(e) => setImages(e.target.files ? Array.from(e.target.files) : [])}
            className="w-full p-3 border rounded-md focus:ring-2 focus:ring-black focus:outline-none transition-all duration-300"
          />
          <p className="text-sm text-gray-500">{images.length} image(s) selected</p>
          {errors.images && <p className="text-red-600 text-sm">{errors.images.message}</p>}
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={getProductLoading || productUpdateLoading || isSubmitting}
            className={`px-6 py-3 bg-black text-white font-medium rounded-sm focus:outline-none focus:ring-2 focus:ring-black transition-all duration-300 ${
              getProductLoading || productUpdateLoading || isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-zinc-900 hover:scale-105'
            }`}
          >
            {productUpdateLoading || isSubmitting ? 'Updating...' : 'Update Product'}
          </button>
        </div>
      </form>
      {productUpdateError && (
        <p className="bg-red-600 text-white p-5 mt-4 rounded-md">
          {productUpdateError?.data?.message || 'Update failed'}
        </p>
      )}
    </div>
  );
}