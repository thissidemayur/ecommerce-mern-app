import React from 'react';
import { useParams, Link } from 'react-router';
import { useGetOrderByIdQuery } from '../store/ApiOrderFetch.js';
import Bill from '../component/Bill.jsx';

function OrderConfirmation() {
  const { orderId } = useParams();
  const { data, error, isLoading } = useGetOrderByIdQuery(orderId);

  const order = data?.data;
  console.log("order: ", order);


  return (
    <main className="container mx-auto px-4 py-8 max-w-7xl">
      {isLoading ? (
        <p className="text-center py-10 text-gray-600 text-lg">Loading order...</p>
      ) : error ? (
        <p className="text-center py-10 text-red-500 text-lg">
          Error loading order: {error?.data?.message || error.message}
        </p>
      ) : !order ? (
        <p className="text-center py-10 text-gray-600 text-lg">Order not found</p>
      ) : (
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Order Confirmation</h1>
          <p className="text-lg text-gray-600 mb-4">
            Thank you for your order! Your order ID is <strong>{order._id}</strong>.
          </p>
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Order Details</h2>
            {order.orderedItemList.map((item, index) => (
              <div key={index} className="flex items-center gap-4 p-4 border-b border-gray-200">
                <img
                  src={item.productId?.productImg?.[0]?.url || '/fallback-image.jpg'}
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded-md"
                />
                <div>
                  <h3 className="text-lg font-semibold">{item.name}</h3>
                  <p className="text-gray-600">Size: {item.size}</p>
                  <p className="text-gray-600">Quantity: {item.quantity}</p>
                  <p className="text-gray-600">₹{item.price.toLocaleString()}</p>
                </div>
              </div>
            ))}
          </section>
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Shipping Address</h2>
            <p className="text-gray-600">
              {order.deliveryAddress.address}, {order.deliveryAddress.city}, {order.deliveryAddress.state}{' '}
              {order.deliveryAddress.pincode}, {order.deliveryAddress.country}
            </p>
            <p className="text-gray-600">Phone: {order.deliveryAddress.deliveredMobileNum}</p>
          </section>
          <Bill
            items={order.orderedItemList.map((item) => ({
              // name: item.name,
              price: item.price,
              quantity: item.quantity ?? 1,
              // size: item.size,
              productId: item.productId,
            }))}
          />
          <section className="mt-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Payment Details</h2>
            <p className="text-gray-600">Method: {order.paymentMethod}</p>
            <p className="text-gray-600">Status: {order.paymentStatus}</p>
          </section>
          <div className="mt-8 flex justify-center">
            <Link
              to="/"
              className="bg-black text-white px-6 py-3 rounded-lg font-semibold hover:bg-zinc-700 transition-all"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      )}
    </main>
  );
}

export default OrderConfirmation;