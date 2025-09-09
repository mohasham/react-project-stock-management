// src/store/cart/cart.reducer.js
import { createSlice } from '@reduxjs/toolkit';

const addCartItem = (cartItems, productToAdd) => {
  const existingCartItem = cartItems.find(
    item =>
      item.id === productToAdd.id &&
      item.selectedSize === productToAdd.selectedSize &&
      item.selectedColor === productToAdd.selectedColor
  );

  if (existingCartItem) {
    return cartItems.map(item =>
      item.id === productToAdd.id &&
      item.selectedSize === productToAdd.selectedSize &&
      item.selectedColor === productToAdd.selectedColor
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );
  }

  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const removeCartItem = (cartItems, cartItemToRemove) => {
  const existingCartItem = cartItems.find(
    item =>
      item.id === cartItemToRemove.id &&
      item.selectedSize === cartItemToRemove.selectedSize &&
      item.selectedColor === cartItemToRemove.selectedColor
  );

  if (existingCartItem.quantity === 1) {
    return cartItems.filter(
      item =>
        !(
          item.id === cartItemToRemove.id &&
          item.selectedSize === cartItemToRemove.selectedSize &&
          item.selectedColor === cartItemToRemove.selectedColor
        )
    );
  }

  return cartItems.map(item =>
    item.id === cartItemToRemove.id &&
    item.selectedSize === cartItemToRemove.selectedSize &&
    item.selectedColor === cartItemToRemove.selectedColor
      ? { ...item, quantity: item.quantity - 1 }
      : item
  );
};

const clearCartItem = (cartItems, cartItemToClear) =>
  cartItems.filter(
    item =>
      !(
        item.id === cartItemToClear.id &&
        item.selectedSize === cartItemToClear.selectedSize &&
        item.selectedColor === cartItemToClear.selectedColor
      )
  );

const CART_INITIAL_STATE = {
  isCartOpen: false,
  cartItems: []
};

const cartSlice = createSlice({
  name: 'cart',
  initialState: CART_INITIAL_STATE,
  reducers: {
    setIsCartOpen(state, action) {
      state.isCartOpen = action.payload;
    },
    addItemToCart(state, action) {
      state.cartItems = addCartItem(state.cartItems, action.payload);
    },
    removeItemFromCart(state, action) {
      state.cartItems = removeCartItem(state.cartItems, action.payload);
    },
    clearItemFromCart(state, action) {
      state.cartItems = clearCartItem(state.cartItems, action.payload);
    }
  }
});

export const {
  setIsCartOpen,
  addItemToCart,
  removeItemFromCart,
  clearItemFromCart
} = cartSlice.actions;

export const cartReducer = cartSlice.reducer;
