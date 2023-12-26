import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    quantity: 0,
    total: 0,
  },
  reducers: {
    addProduct: (state, action) => {
      const productFoundIndex = state.products.findIndex(product => product._id === action.payload._id);
      if(productFoundIndex !== -1){
        state.products[productFoundIndex].quantity += 1;
        state.total +=  state.products[productFoundIndex].price;
      }
      else{
        state.quantity += 1;
        state.products.push(action.payload);
        state.total += action.payload.price * action.payload.quantity;
      }
    },

    removeProduct: (state, action) => {
      const id = action.payload.id;
      console.log(id);
      const productFoundIndex = state.products.findIndex(product => product._id === id);
      const removeProductPrice = state.products[productFoundIndex].price * state.products[productFoundIndex].quantity;
      const products = state.products.filter(product => product._id !== id);

      // console.log(products);
      state.quantity = products.length;
      // let total = 0;

      // products.reduce((acc, product) => {
      //   return acc + product.price * product.quantity;
      // }, 0);
      state.total = state.total - removeProductPrice;
      state.products = products
    },

    decrementProductQuantity: (state, action) => {
      const stateProducts = state.products;
      const productFoundIndex = stateProducts.findIndex(product => product._id === action.payload.id);
      console.log(productFoundIndex);
      if(productFoundIndex !== -1 && stateProducts[productFoundIndex].quantity > 1){
        stateProducts[productFoundIndex].quantity -=  1;
        state.total -=  stateProducts[productFoundIndex].price;
      }
    },

    incrementProductQuantity: (state, action) => {
      const stateProducts = state.products;
      const productFoundIndex = stateProducts.findIndex(product => product._id === action.payload.id);
      if(productFoundIndex !== -1){
        stateProducts[productFoundIndex].quantity += 1;
        state.total +=  stateProducts[productFoundIndex].price;
      }
    }
  },
});

export const { addProduct, removeProduct, incrementProductQuantity, decrementProductQuantity} = cartSlice.actions;
export default cartSlice.reducer;
