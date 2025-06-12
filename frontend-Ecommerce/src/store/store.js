import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  persistStore,
} from "redux-persist";
import { PersistGate } from "redux-persist/integration/react"; // used in componert(routing)

import { ApiUser } from "./ApiUserFetch.js";
import { ApiProductAuth } from "./ApiProductFetch.js";
import { ApiOrder } from "./ApiOrderFetch.js";
import authSlice, { persistedAuthReducer } from "./authSlice.js";
import { persistedOrderReducer } from "./orderSlice.js";
import { persistedCartReducer } from "./cartSlice.js";
import { ApiRazorpayPayment } from "./ApiPaymentFetch.js";

// create a store with persistant reducer
export const store = configureStore({
  reducer: {
    // rtk query
    [ApiUser.reducerPath]: ApiUser.reducer,
    [ApiProductAuth.reducerPath]: ApiProductAuth.reducer,
    [ApiOrder.reducerPath]: ApiOrder.reducer,
    [ApiRazorpayPayment.reducerPath]: ApiRazorpayPayment.reducer,

    //rtk  slice
    authSlice: persistedAuthReducer,
    orderSlice: persistedOrderReducer,
    cartSlice: persistedCartReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(
      ApiUser.middleware,
      ApiProductAuth.middleware,
      ApiOrder.middleware,
      ApiRazorpayPayment.middleware
    ), //Enables RTK Query’s async logic (fetching, caching, etc.)
});

setupListeners(store.dispatch); //Makes your app refresh data when internet comes back or tab is active

// create a persitor for persistance
export const persistor = persistStore(store);

// ======================= REDUX PERSIST SETUP =======================
// Redux-Persist allows us to save specific parts of Redux state to localStorage
// so that the data (like selectedProduct in orderSlice) is not lost on page refresh.
// Without this, all Redux state resets on browser refresh or tab close.
//
// 1. persistConfig: Defines what to persist and where (e.g., localStorage)
// 2. persistReducer: Wraps your reducer (here: orderedProductSlice) with persistence logic
// 3. serializableCheck.ignoreActions: Prevents Redux from warning about non-serializable
//    actions used internally by redux-persist (like REHYDRATE, FLUSH, etc.)
// 4. store: Combine persisted and normal reducers, and inject middlewares
// 5. PersistGate (in main.jsx): Delays rendering of app UI until state is rehydrated
//
// TL;DR: This setup helps store Redux state across refreshes, especially useful
// for e-commerce use cases like saving cart items or "Buy Now" product selections
// ==================================================================
