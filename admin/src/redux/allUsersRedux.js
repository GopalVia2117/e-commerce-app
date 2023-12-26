import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import { request } from "../requestMethods";


const initialState = {
    fetching: false,
    users: [],
    error: ''
}



export const fetchUsers = createAsyncThunk("allUsers/fetchUsers", async (token) => {
        const {data} = await request.get("users", {
            headers: {
                token: token
        }});
        console.log(data);
        return data;
});

const allUsersSlice = createSlice({
    name: "allUsers",
    initialState: initialState,
    reducers: {
        
    }, 
    extraReducers: (builder) => {
        builder.addCase(fetchUsers.pending, state => {
            state.fetching = true;
        })
        builder.addCase(fetchUsers.fulfilled, (state, action) => {
            state.fetching = false;
            state.users = action.payload
        })
        builder.addCase(fetchUsers.rejected, (state, action) => {
            state.fetching = false;
            state.error = action.error.message
        })
    }
});

// export const {fetchUsersSuccess} = allUsersSlice.actions;
export default allUsersSlice.reducer;





