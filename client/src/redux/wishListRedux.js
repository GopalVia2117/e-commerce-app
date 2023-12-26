import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { userRequest } from "../requestMethods";


const initialState = {
    products: {}
}

export const fetchWishList = createAsyncThunk("wishList/fetchItems", async(id) =>{
    const {data} = await userRequest.get("/wishlist" + id);
    console.log(data);
    return data;
});

const wishListSlice = createSlice({
    name: 'WishList',
    initialState: initialState,
    reducers: {
        addItem: (state, action) => {
            state.products = action.payload
        }
    },
    extraReducers: (builder) => {
        // builder.addCase(fetchUsers.pending, state => {
        //     state.fetching = true;
        // })
        builder.addCase(fetchWishList.fulfilled, (state, action) => {
           state.products = action.payload
        })
        // builder.addCase(fetchUsers.rejected, (state, action) => {
        //     state.fetching = false;
        //     state.error = action.error.message
        // })
    }
});

export default wishListSlice.reducer;