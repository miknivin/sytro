import { createSlice } from "@reduxjs/toolkit";

const productsSlice = createSlice({
  name: "products",
  initialState: {
    items: [], 
  },
  reducers: {
    setProducts: (state, action) => {
      state.items = [...state.items, ...action.payload];
    },
    resetProducts: (state) => {
      state.items = []; 
    },
  },
});

export const { setProducts, resetProducts } = productsSlice.actions;
export default productsSlice.reducer;
