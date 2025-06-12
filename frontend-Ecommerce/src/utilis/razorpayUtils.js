import {
  useNewCreateOrderUsingRazorpayMutation,
  useVerifyPaymentOfRazorpayMutation,
} from "../store/ApiPaymentFetch";

export const loadRazorpay = () => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

// ✅ Custom hook that uses RTK Query properly
export const useRazorpayHandler = (total) => {
  const [newCreateOrderUsingRazorpay] =
    useNewCreateOrderUsingRazorpayMutation();
  const [verifyPaymentOfRazorpay] = useVerifyPaymentOfRazorpayMutation();

  const triggerRazorpay = async ({ userEmail, userContact, userName }) => {
    const { id, amount } = await newCreateOrderUsingRazorpay({
      amount: total,
    }).unwrap();

    const isLoaded = await loadRazorpay();
    if (!isLoaded) {
      alert("Razorpay SDK failed to load");
      return null;
    }

    return new Promise((resolve, reject) => {
      const options = {
        key: import.meta.env.VITE_RAZORPAY_API_KEY,
        amount: amount * 100,
        currency: "INR",
        name: "Mayur Clothing",
        description: "Thank you for your order",
        order_id: id,
        handler: async function (response) {
          try {
            await verifyPaymentOfRazorpay({
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
            }).unwrap();
            resolve(response);
          } catch (error) {
            reject(error);
          }
        },
        prefill: {
          name: userName,
          email: userEmail,
          contact: userContact,
        },
      };

      const rzp = new Razorpay(options);
      rzp.open();
      rzp.on("payment.failed", reject);
    });
  };

  return { triggerRazorpay };
};
