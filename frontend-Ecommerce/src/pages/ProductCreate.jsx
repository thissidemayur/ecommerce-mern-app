// src/components/CreateProductForm.jsx
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useCreateProductMutation } from '../store/ApiProductFetch';

const CreateProductForm = () => {

  const { register, handleSubmit, reset ,} = useForm();
  const [images, setImages] = useState([]);

  const [variants, setVariants] = useState([
    { size: '', color: '', price: '', stock: '' },
  ]);

  const [tag, setTag] =  useState([])

  const handleVariantChange = (index, e) => {
    const { name, value } = e.target;
    const updatedVariants = [...variants];
    updatedVariants[index][name] = value;
    setVariants(updatedVariants);
  };

  const addVariant = () => {
    setVariants([...variants, { size: '', color: '', price: '', stock: '' }]);
  };


  const removeVariant = (index) => {
    setVariants(variants.filter((_, i) => i !== index));
  };

  // call redux query: 
  const [createProduct , {isLoading, error,isSuccess}] = useCreateProductMutation()

  const onSubmit = async (data) => {
    console.log("data: ",data)

    if (images.length === 0 || images.length > 6) {
      alert('Please upload between 1 to 6 images.');
      // console.log(data)
      return;
    }


    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      if ( key !== 'tag' && key !== 'variants')
        formData.append(key, data[key]);
        // console.log("Data and key: ",data ," ",key)
      
    });

    formData.append('tag',JSON.stringify(tag))
    formData.append('variants', JSON.stringify(variants));
    // console.log(JSON.stringify(variants))
    images.forEach((file) => formData.append('productImg', file));

    try {
      
    const responseProdutData =   await createProduct(formData).unwrap()
    if(responseProdutData?.data) {
      console.log("responseProductData: ",responseProdutData);

      reset();
      setImages([]);
      setVariants([{ size: '', color: '', price: '', stock: '' }]);

    }
    } catch (err) {
      console.error(err?.message);
      alert('Failed to create product');
      console.error("error: ",error)
    } 
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-8 space-y-6 animate-fade-in"
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Add Product</h2>

        {/* Product Name */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Product Name</label>
          <input
            {...register('productName',{
               required: [true ,"product name must be present"],
                maxLength: [16 , "maximum character be 15"] 
            })}
            placeholder="Enter product name"
            className="w-full p-3 border rounded-md focus:ring-2 focus:ring-black focus:outline-none transition-all duration-300"
            required
          />
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
            {...register('description')}
            placeholder="Detailed product description"
            className="w-full p-3 border rounded-md focus:ring-2 focus:ring-black focus:outline-none transition-all duration-300 resize-y"
            rows="4"
            required
          />
        </div>

        {/* Category */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Category</label>
          <input
            {...register('categories')}
            placeholder="Enter category (e.g., Clothing)"
            className="w-full p-3 border rounded-md focus:ring-2 focus:ring-black focus:outline-none transition-all duration-300"
            required
          />
        </div>

        {/*Sub Category */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Sub category</label>
          <input
            {...register('subCategories')}
            placeholder="Enter sub category (e.g., jogger, six pocket)"
            className="w-full p-3 border rounded-md focus:ring-2 focus:ring-black focus:outline-none transition-all duration-300"
            required
          />
        </div>
        

        {/*tags  */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Tags</label>
          <input
            {...register('tag')}
            placeholder="Enter tag (e.g.: casual , streetwear)"
            className="w-full p-3 border rounded-md focus:ring-2 focus:ring-black focus:outline-none transition-all duration-300"
            required
            onChange={(e) => setTag(e.target.value.split(',').map(t=>t.trim()))}
          />
        </div>

        {/* Pricing */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Discounted Price (₹)</label>
            <input
              {...register('discountedPrice')}
              type="number"
              placeholder="Enter discounted price"
              className="w-full p-3 border rounded-md focus:ring-2 focus:ring-black focus:outline-none transition-all duration-300"
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Discount (%)</label>
            <input
              {...register('discountPrice')}
              type="number"
              placeholder="Enter discount percentage"
              className="w-full p-3 border rounded-md focus:ring-2 focus:ring-black focus:outline-none transition-all duration-300"
            />
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
            {...register('gender')}
            className="w-full p-3 border rounded-md focus:ring-2 focus:ring-black focus:outline-none transition-all duration-300"
            required
          >
            <option value="">Select Gender</option>
            <option value="men">Men</option>
            <option value="women">Women</option>
            <option value="unisex">Unisex</option>
          </select>
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
                  value={variants.size}
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
                  value={variants.color}
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
                  value={variants.price}
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
                  value={variants.stock}
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

        {/* Image Upload */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Upload Images (max 6)</label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => setImages(Array.from(e.target.files))}
            className="w-full p-3 border rounded-md focus:ring-2 focus:ring-black focus:outline-none transition-all duration-300"
          />
          <p className="text-sm text-gray-500">{images.length} image(s) selected</p>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isLoading}
            className={`px-6 py-3 bg-black text-white  font-medium hover:bg-zinc-900 hover:scale-105  3000 rounded-sm focus:outline-none focus:ring-2 focus:ring-black transition-all duration-300 ${
              isLoading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isLoading ? 'Submitting...' : 'Create Product'}
          </button>
        </div>

      </form>
      {isSuccess && <p  className='bg-green-600 text-white p-5' >product sent successfully !</p>}
      {error && <p  className='bg-red-600 text-white p-5'>{error?.message}</p>}

    </div>
  );
};


export default CreateProductForm;