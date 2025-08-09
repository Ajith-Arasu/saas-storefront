// src/store/slices/orderSlice.ts

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axios from "axios";

interface Order {
  id: string;
  items: any[];
  total: number;
  status: string;
}

interface OrderState {
  orders: Order[];
  loading: boolean;
  error: string | null;
}

const initialState: OrderState = {
  orders: [],
  loading: false,
  error: null,
};

export const placeOrder = createAsyncThunk(
  "order/placeOrder",
  async (orderData: any, thunkAPI) => {
    try {
      const res = await axios.post("/api/orders", orderData);
      return res.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || "Order failed");
    }
  }
);

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(placeOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(placeOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.orders.push(action.payload);
      })
      .addCase(placeOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default orderSlice.reducer;
