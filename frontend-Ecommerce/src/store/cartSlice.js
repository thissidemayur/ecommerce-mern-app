import { createSlice } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";

const initialState = {
  items: [], // [{ productId, productName, price, size, quantity, productImg }]
};

console.log(initialState.items);
const cartSlice = createSlice({
  name: "cartSlice",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { productImg, price, productName, size, productId, quantity } =
        action.payload;
      const existingItem = state.items?.find(
        (find) => find.productId === productId && find.size === size
      );
      if (existingItem) existingItem.quantity += quantity;
      else {
        state.items?.push({
          productId,
          productName,
          quantity,
          size,
          price,
          productImg,
        });
      }
      console.log("Updated Cart Items:", state.items); // Check updated items
    },

    updateQuantity: (state, action) => {
      const { productId, size, quantity } = action.payload;
      const item = state.items?.find(
        (item) => item.productId === productId && item.size === size
      );
      if (item && quantity >= 0) {
        item.quantity = quantity;
        if (item.quantity == 0) {
          return cartSlice.caseReducers.removeFromCart(state, {
            payload: { productId, size },
          });
        }
      }
    },

    removeFromCart: (state, action) => {
      const { productId, size } = action.payload;
      state.items = state.items.filter(
        (item) => !(item.productId === productId && item.size === size)
      );
    },

    clearCart: (state) => {
      state.items = [];
    },
  },
});

const persistConfig = {
  key: "cart",
  storage,
};

export const persistedCartReducer = persistReducer(
  persistConfig,
  cartSlice.reducer
);
export const { addToCart, updateQuantity, removeFromCart, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;

/*
In Redux Toolkit, caseReducers is typically used for accessing the individual reducers (like addToCart, removeFromCart, etc.)

Action: It's the object that describes the event (like adding a product to the cart).

Payload: It’s the actual data or details associated with that event.

Why payload: It’s a standard convention in Redux and helps to separate the event type (type) from the data (payload).

 Why Use payload?

In Redux, actions are dispatched when something happens in the UI (like a user clicking "Add to Cart"). Each action is an object that is passed to the reducer. The payload is the data part of the action, which can vary based on the action type.

*/
