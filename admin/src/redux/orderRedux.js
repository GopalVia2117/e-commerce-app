import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import { request } from "../requestMethods";

const initialState = {
    fetching: false,
    orders: [],
    error: ''
}

export const fetchOrders = createAsyncThunk("allOrders/fetchOrders", async (token) => {
        const {data} = await request.get("orders", {
            headers: {
                token: token
        }});
        console.log(data);  
        return data;
});

const orderSlice = createSlice({
    name: "orders",
    initialState: initialState,
    reducers: {
        
    }, 
    extraReducers: (builder) => {
        builder.addCase(fetchOrders.pending, state => {
            state.fetching = true;
        })
        builder.addCase(fetchOrders.fulfilled, (state, action) => {
            state.fetching = false;
            state.orders = action.payload
        })
        builder.addCase(fetchOrders.rejected, (state, action) => {
            state.fetching = false;
            state.error = action.error.message
        })
    }
});

// export const {fetchOrdersSuccess} = allUsersSlice.actions;
export default orderSlice.reducer;





