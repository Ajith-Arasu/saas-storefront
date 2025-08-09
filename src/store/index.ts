import authReducer from './slices/authSlice';
import cartReducer from './slices/cartSlice';
import { configureStore } from '@reduxjs/toolkit';
import orderReducer from './slices/orderSlice';
import productReducer from './slices/productSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productReducer,
    cart: cartReducer,
    orders: orderReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
