import toast from "react-hot-toast";
import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    totalItems : localStorage.getItem('totalItems') ? JSON.parse(localStorage.getItem('totalItems')) : 0
}

const cartSlice = createSlice({
    
    name : 'cart',
    initialState,
    reducers : {
        setTotalItems : (state,value) => {
            state.totalItems = value.payload
        },
        // addToCart
        // removeFromCart
        // clearCart
    }
});

export const {setTotalItems} = cartSlice.actions;
export default cartSlice.reducer;