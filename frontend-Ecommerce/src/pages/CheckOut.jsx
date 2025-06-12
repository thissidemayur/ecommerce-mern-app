import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { useNewOrderMutation } from "../store/ApiOrderFetch.js";
import { clearSelectedProduct } from "../store/orderSlice.js";
import { clearCart } from "../store/cartSlice.js";
import Bill from "../component/Bill.jsx";
import { razorpay } from "../assets/index.js";
import { useRazorpayHandler } from "../utilis/razorpayUtils.js";

function CheckOut() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [deliveryMethod, setDeliveryMethod] = useState("razorpay");
  const [
    newOrder,
    { isLoading: isOrderLoading, error: orderError, isSucess: orderedSuccess },
  ] = useNewOrderMutation();

  const { triggerRazorpay } = useRazorpayHandler(); // Your custom hook



  const selectedProduct = useSelector(
    (state) => state.orderSlice.selectedProduct
  );
  const cartProduct = useSelector((state) => state.cartSlice.items);
  const items = selectedProduct ? [selectedProduct] : cartProduct;

  const orderedUser = useSelector((state) => state.authSlice.userDetail);
  if (!orderedUser.id) {
    return alert("Please login to place order");
  }

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryCharge = subtotal > 599 ? 0 : 300;
  const packageCharge = subtotal === 0 ? 0 : 100;
  const tax = Math.round(subtotal * 0.05);
  const discount = subtotal > 2000 ? 200 : 0;
  const total = deliveryCharge + packageCharge + tax + subtotal - discount;




  const onSubmit = async (data) => {
    if (items.length === 0) return alert("no items to checkout ");

    let paymentDetails = { method: deliveryMethod };

    if (deliveryMethod === 'razorpay') {
      try {
        const paymentRes = await triggerRazorpay({

          amount: data.amount,
          orderId: data.id,
          userEmail: data.deliveredEmail,
          userContact: data.phone,
          userName: data.firstName || "zsh mayur",
        })

        if (!paymentRes) return;

        paymentDetails = {
          method: "razorpay",
          ...paymentRes
        }

      } catch (error) {
        alert("Payment Failed");
        console.error("error while pay using razororpay: ", error)
        return;
      }
    } else if (deliveryMethod === 'cod') {
      paymentDetails.method = 'cod'

    }

    const orderDetail = {
      deliveryAddress: {
        address: data.street,
        pincode: data.pincode,
        city: data.city,
        state: data.state,
        landmark: data.landmark || "",
        deliveredMobileNum: data.phone,
        country: data.country,
        fullName: data.firstName || "",
        deliveredEmail: data.deliveredEmail || "",
      },
      totalAmount: subtotal,
      deliveryCharge,
      packageCharge,
      tax,
      discount,

      totalPayableAmount: total,

      orderedItemList: items.map((item) => ({
        name: item.productName,
        price: item.price,
        quantity: item.quantity,
        size: item.size,
        productId: item.productId,
      })),

      paymentMethod: paymentDetails.method,
      orderType: selectedProduct ? "buyNow" : "cart",
      orderedUser: orderedUser.id

    };


    try {
      const response = await newOrder(orderDetail).unwrap();
      if (response?.data) {
        dispatch(clearSelectedProduct());
        if (!selectedProduct) dispatch(clearCart());
        navigate(`/order-confirmation/${response?.data._id}`);
      }
    } catch (err) {
      alert(`Failed to place order: ${err?.data?.message || err.message}`);
    }
  };

  return (
    <main className="min-h-screen font-sans">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-gray-900 mb-10 tracking-tight font-sans">
          Checkout
        </h2>
        <div className="md:flex md:justify-between items-start md:gap-16 relative">
          <div className="md:w-1/2 mb-12 md:mb-0">
            <h3 className="text-2xl font-semibold text-gray-800 mb-8 font-sans">
              Shipping Information
            </h3>
            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
              <div className=" gap-6">
                <label
                  htmlFor="firstName"
                  className="block md:text-lg text-sm font-semibold text-gray-700 mb-1 font-sans"
                >
                  First Name
                </label>
                <input
                  id="firstName"
                  {...register("firstName", {
                    required: "First name is required",
                  })}
                  type="text"
                  placeholder="first Name"
                  className={`w-full p-2 border rounded-xl focus:ring-2 focus:ring-black transition-all duration-300 shadow-sm font-sans text-base ${errors.firstName ? "border-red-400" : "border-gray-300"
                    }`}
                />
                {errors.firstName && (
                  <p className="mt-2 md:text-lg text-sm text-red-500 font-sans">
                    {errors.firstName.message}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="deliveredEmail"
                  className="block md:text-lg text-sm font-semibold text-gray-700 mb-1 font-sans"
                >
                  Email Address
                </label>
                <input
                  id="deliveredEmail"
                  {...register("deliveredEmail", {
                    required: "Email is required",
                    pattern: {
                      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                      message: "Invalid email address",
                    },
                  })}
                  type="deliveredEmail"
                  placeholder="Email"
                  className={`w-full p-2 border rounded-xl focus:ring-2 focus:ring-black transition-all duration-300 shadow-sm font-sans text-base ${errors.deliveredEmail ? "border-red-400" : "border-gray-300"
                    }`}
                />
                {errors.deliveredEmail && (
                  <p className="mt-2 md:text-lg text-sm text-red-500 font-sans">
                    {errors.deliveredEmail.message}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="street"
                  className="block md:text-lg text-sm font-semibold text-gray-700 mb-1 font-sans"
                >
                  Street Address
                </label>
                <input
                  id="street"
                  {...register("street", { required: "Street is required" })}
                  type="text"
                  placeholder="Street"
                  className={`w-full p-2 border rounded-xl focus:ring-2 focus:ring-black transition-all duration-300 shadow-sm font-sans text-base ${errors.street ? "border-red-400" : "border-gray-300"
                    }`}
                />
                {errors.street && (
                  <p className="mt-2 md:text-lg text-sm text-red-500 font-sans">
                    {errors.street.message}
                  </p>
                )}
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="city"
                    className="block md:text-lg text-sm font-semibold text-gray-700 mb-1 font-sans"
                  >
                    City
                  </label>
                  <input
                    id="city"
                    {...register("city", { required: "City is required" })}
                    type="text"
                    placeholder="City"
                    className={`w-full p-2 border rounded-xl focus:ring-2 focus:ring-black transition-all duration-300 shadow-sm font-sans text-base ${errors.city ? "border-red-400" : "border-gray-300"
                      }`}
                  />
                  {errors.city && (
                    <p className="mt-2 md:text-lg text-sm text-red-500 font-sans">
                      {errors.city.message}
                    </p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="pincode"
                    className="block md:text-lg text-sm font-semibold text-gray-700 mb-1 font-sans"
                  >
                    Zip Code
                  </label>
                  <input
                    id="pincode"
                    {...register("pincode", {
                      required: "pin code is required",
                      pattern: {
                        value: /^[1-9][0-9]{5}$/,
                        message: "Invalid pin code",
                      },
                    })}
                    type="text"
                    placeholder="pin Code"
                    className={`w-full p-2 border rounded-xl focus:ring-2 focus:ring-black transition-all duration-300 shadow-sm font-sans text-base ${errors.zipCode ? "border-red-400" : "border-gray-300"
                      }`}
                  />
                  {errors.pincode && (
                    <p className="mt-2 md:text-lg text-sm text-red-500 font-sans">
                      {errors.pincode.message}
                    </p>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="state"
                    className="block md:text-lg text-sm font-semibold text-gray-700 mb-1 font-sans"
                  >
                    State
                  </label>
                  <input
                    id="state"
                    {...register("state", { required: "State is required" })}
                    type="text"
                    placeholder="State"
                    className={`w-full p-2 border rounded-xl focus:ring-2 focus:ring-black transition-all duration-300 shadow-sm font-sans text-base ${errors.state ? "border-red-400" : "border-gray-300"
                      }`}
                  />
                  {errors.state && (
                    <p className="mt-2 md:text-lg text-sm text-red-500 font-sans">
                      {errors.state.message}
                    </p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="country"
                    className="block md:text-lg text-sm font-semibold text-gray-700 mb-1 font-sans"
                  >
                    Country
                  </label>
                  <input
                    id="country"
                    {...register("country", {
                      required: "Country is required",
                    })}
                    type="text"
                    placeholder="Country"
                    className={`w-full p-2 border rounded-xl focus:ring-2 focus:ring-black transition-all duration-300 shadow-sm font-sans text-base ${errors.country ? "border-red-400" : "border-gray-300"
                      }`}
                  />
                  {errors.country && (
                    <p className="mt-2 md:text-lg text-sm text-red-500 font-sans">
                      {errors.country.message}
                    </p>
                  )}
                </div>
              </div>
              <div>
                <label
                  htmlFor="phone"
                  className="block md:text-lg text-sm font-semibold text-gray-700 mb-1 font-sans"
                >
                  Phone Number
                </label>
                <input
                  id="phone"
                  {...register("phone", {
                    required: "Phone number is required",
                    pattern: {
                      value: /^\+?[\d\s-]{10,}$/,
                      message: "Invalid phone number",
                    },
                  })}
                  type="tel"
                  placeholder="Phone number"
                  className={`w-full p-2 border rounded-xl focus:ring-2 focus:ring-black transition-all duration-300 shadow-sm font-sans text-base ${errors.phone ? "border-red-400" : "border-gray-300"
                    }`}
                />
                {errors.phone && (
                  <p className="mt-2 md:text-lg text-sm text-red-500 font-sans">
                    {errors.phone.message}
                  </p>
                )}
              </div>

              <div className="mt-6">
                <h3 className="text-xl font-semibold text-gray-900 tracking-tight font-sans">
                  Select Payment Method
                </h3>
                <div className="mt-2 flex justify-start gap-5">
                  <div
                    id="razorpay"
                    className={`transform hover:scale-105 transition-all duration-300 flex justify-center items-center cursor-pointer border rounded-xl p-2 bg-${deliveryMethod === "razorpay" ? "indigo-50" : "white"
                      } shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer ${deliveryMethod === "razorpay"
                        ? "border-2 border-black"
                        : "border-gray-200"
                      }`}
                    onClick={() => setDeliveryMethod("razorpay")}
                  >
                    <img src={razorpay} alt="razorpay" className="h-10" />
                  </div>
                  <div
                    id="cod"
                    className={`transform hover:scale-105 transition-all duration-300 cursor-pointer flex justify-center items-center border rounded-xl p-2 bg-${deliveryMethod === "cod" ? "indigo-50" : "white"
                      } shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer ${deliveryMethod === "cod"
                        ? "border-2 border-black"
                        : "border-gray-200"
                      }`}
                    onClick={() => setDeliveryMethod("cod")}
                  >
                    <span className="text-gray-900 font-semibold font-sans text-base">
                      Cash on Delivery
                    </span>
                  </div>
                </div>
              </div>
              <div className="mt-10 flex justify-end">
                <button
                  type="submit"
                  disabled={isOrderLoading}
                  className={`bg-black text-white px-10 py-4 rounded-xl font-semibold font-sans text-base hover:bg-zinc-900 transform hover:scale-105 transition-all duration-300 cursor-pointer shadow-md ${isOrderLoading ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                >
                  {isOrderLoading ? "Placing Order..." : "Place Order"}
                </button>
              </div>
            </form>
          </div>
          <div className="md:w-1/2 px-3 sticky top-0">
            <Bill items={items} />
          </div>
        </div>
        {orderError && (
          <p className="text-center text-red-500 mt-4">
            Error: {orderError?.data?.message || orderError.message}
          </p>
        )}
      </section>
    </main>
  );
}

export default CheckOut;
