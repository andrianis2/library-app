
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CartState {
  selectedItemIds: number[];
}

const initialState: CartState = {
  selectedItemIds: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    toggleCartItem: (state, action: PayloadAction<number>) => {
      const id = action.payload;

      if (state.selectedItemIds.includes(id)) {
        state.selectedItemIds = state.selectedItemIds.filter(
          (itemId) => itemId !== id
        );
      } else {
        state.selectedItemIds.push(id);
      }
    },

    selectAllCartItems: (state, action: PayloadAction<number[]>) => {
      state.selectedItemIds = action.payload;
    },

    clearSelectedCartItems: (state) => {
      state.selectedItemIds = [];
    },
  },
});

export const {
  toggleCartItem,
  selectAllCartItems,
  clearSelectedCartItems,
} = cartSlice.actions;

export default cartSlice.reducer;
