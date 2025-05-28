import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  size: string;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  shippingAddress: {
    firstName: string;
    lastName: string;
    streetAddress: string;
    aptNumber: string;
    state: string;
    zip: string;
  } | null;
}

const initialState: CartState = {
  items: [],
  shippingAddress: null,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id && item.size === action.payload.size
      );
      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }
    },
    removeItem: (state, action: PayloadAction<{ id: string; size: string }>) => {
      state.items = state.items.filter(
        (item) => !(item.id === action.payload.id && item.size === action.payload.size)
      );
    },
    updateQuantity: (
      state,
      action: PayloadAction<{ id: string; size: string; quantity: number }>
    ) => {
      const item = state.items.find(
        (item) => item.id === action.payload.id && item.size === action.payload.size
      );
      if (item) {
        item.quantity = action.payload.quantity;
      }
    },
    setShippingAddress: (
      state,
      action: PayloadAction<CartState['shippingAddress']>
    ) => {
      state.shippingAddress = action.payload;
    },
    clearCart: (state) => {
      state.items = [];
      state.shippingAddress = null;
    },
  },
});

export const { addItem, removeItem, updateQuantity, setShippingAddress, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer; 