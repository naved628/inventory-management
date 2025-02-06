import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { fetchInventory } from "../utils/api";

export interface Product {
  value: string | number;
  id: number;
  name: string;
  price: string;
  quantity: number;
  category: string;
  disabled: boolean;
}

interface InventoryState {
  products: Product[];
}

const initialState: InventoryState = { products: [] };

export const fetchInventoryData = createAsyncThunk(
  "inventory/fetch",
  async () => {
    return await fetchInventory();
  }
);

const inventorySlice = createSlice({
  name: "inventory",
  initialState,
  reducers: {
    setInventory: (state, action: PayloadAction<Product[]>) => {
      state.products = action.payload;
    },

    editProduct: (state, action: PayloadAction<Product>) => {
      const index = state.products.findIndex(
        (p) => p.name === action.payload.name
      );
      if (index !== -1) {
        state.products[index] = action.payload;
      }
    },

    deleteProduct: (state, action: PayloadAction<string>) => {
      state.products = state.products.filter((p) => p.name !== action.payload);
    },

    // there is no id present inside that product because of that we are using name
    disableProduct: (state, action: PayloadAction<string>) => {
      const product = state.products.find((p) => p.name === action.payload);
      if (product) {
        product.disabled = !product.disabled;
      }
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchInventoryData.fulfilled, (state, action) => {
      state.products = action.payload;
    });
  },
});

export const { editProduct, deleteProduct, disableProduct } =
  inventorySlice.actions;
export default inventorySlice.reducer;
