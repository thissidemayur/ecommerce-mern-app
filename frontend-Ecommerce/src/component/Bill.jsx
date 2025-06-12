import React from 'react';

function Bill({ items = [], className = '' }) {
  

  const subtotal = items.reduce((sum,item) => sum + item.quantity * item.price,0)
  // free shipping at order 599 or more than it
  const shippingCharge = subtotal===0? 0 : subtotal>599 ? 0 : 300
  const packingCharge = subtotal===0 ? 0 : 100
  const tax = Math.round(subtotal * 0.05); // 5% tax
  const discount = subtotal > 2000 ? 200 : 0; // Example discount
  const total = subtotal + shippingCharge + packingCharge + tax - discount;


  return (
    <section className={`w-full flex md:justify-end justify-center items-start md:my-10 my-5 ${className}`}>
      <div className="flex justify-end flex-col text-sm md:text-base font-semibold w-full">
        <h2 className="text-xl md:text-3xl font-medium text-center mb-5">Cart Total</h2>
        <ul className="w-full">
          <li className="flex justify-between items-center px-2">
            <span className="text-gray-700 mb-2">Subtotal</span> ₹{subtotal.toLocaleString()}
          </li>
          <li className="border-b border-gray-300"></li>
          <li className="flex justify-between items-center px-2">
            <span className="text-gray-700 mb-2">Shipping Charge</span> ₹{shippingCharge.toLocaleString()}
          </li>
          <li className="border-b border-gray-300"></li>
          <li className="flex justify-between items-center px-2">
            <span className="text-gray-700 mb-2">Packing Charge</span> ₹{packingCharge.toLocaleString()}
          </li>
          <li className="border-b border-gray-300"></li>
          <li className="flex justify-between items-center px-2">
            <span className="text-gray-700 mb-2">Tax</span> ₹{tax.toLocaleString()}
          </li>
          <li className="border-b border-gray-300"></li>
          <li className="flex justify-between items-center px-2">
            <span className="text-gray-700 mb-2">Discount Amount</span> ₹{discount.toLocaleString()}
          </li>
          <li className="border-b border-gray-300"></li>
          <li className="flex justify-between items-center px-2">
            <span className="text-gray-700 mb-2">Pay Amount</span> ₹{total.toLocaleString()}
          </li>
        </ul>
      </div>
    </section>
  );
}

export default Bill;
