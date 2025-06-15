import React from 'react';
import { ShoppingBag, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { updateQuantity, removeFromCart } from '../store/cartSlice.js';
import Bill from '../component/Bill.jsx';

function Cart() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cartSlice.items);
  console.log("cartItems: ", cartItems)
  const handleQuantityChange = (productId, size, quantity) => {
    dispatch(updateQuantity({ productId, size, quantity }));
  };

  const handleRemoveItem = (productId, size) => {
    dispatch(removeFromCart({ productId, size }));
  };

  const handleProceedToCheckout = () => {
    if (cartItems.length === 0) {
      alert('Your cart is empty!');
      return;
    }
    navigate('/checkout');
  };

  return (
    <main className="w-full container mx-auto px-4">
      <header className="mb-14 text-gray-700 font-medium text-3xl text-center mt-5">
        <h1>
          <span className="text-gray-500">My</span> Bag
          <ShoppingBag className="inline ml-2" />
        </h1>
      </header>
      <section className="w-full mx-auto md:flex md:justify-between md:items-start md:p-5 relative">
        <section className="flex flex-col md:w-[65%]">
          {cartItems?.length > 0 ? (
            cartItems.map((item) => (
              <div
                key={`${item.productId}-${item.size}`}
                className="flex items-center gap-4 p-4 border-b border-gray-200"
              >
                <img
                  src={item.productImg?.[0]?.url || '/fallback-image.jpg'}
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded-md"
                />
                <div className="flex-1">
                  <h3 className="text-lg font-semibold">{item.name}</h3>
                  <p className="text-gray-600">Size: {item.size}</p>
                  <p className="text-gray-600">₹{item.price.toLocaleString()}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => handleQuantityChange(item.productId, item.size, item.quantity - 1)}
                      className="px-2 py-1 border rounded"
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => handleQuantityChange(item.productId, item.size, item.quantity + 1)}
                      className="px-2 py-1 border rounded"
                    >
                      +
                    </button>
                  </div>
                </div>
                <button
                  onClick={() => handleRemoveItem(item.productId, item.size)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-600">Your cart is empty.</p>
          )}
        </section>

        <div className="md:sticky md:top-5 md:w-[30%] md:flex md:justify-end md:items-start items-center md:p-5 flex-col">
          <Bill items={cartItems} />
          <button
            type="button"
            className="ml-5 md:ml-0 bg-black text-white text-xs md:text-sm p-4 active:bg-gray-800 mb-10 hover:scale-105 transition-all duration-300 rounded-sm"
            onClick={handleProceedToCheckout}
          >
            PROCEED TO CHECKOUT
          </button>
        </div>
      </section>
    </main>
  );
}

export default Cart;