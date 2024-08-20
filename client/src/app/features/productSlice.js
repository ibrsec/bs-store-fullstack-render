import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    products:[],
    oneProduct:{},
    details: {},
    loading:false,
    error:false,

}



const productSlice = createSlice({
    name:"product",
    initialState,
    reducers:{
        fetchStartProduct : state=>{
            state.loading = true;
            state.error = false;
        },
        fetchFailProduct : state=>{
            state.loading = false;
            state.error = true;
        },
        fetchSuccessProduct : (state,{payload})=>{
            state.loading = false;
            state.products = payload?.result;
            state.details = payload?.details;
        },
        fetchSuccessOneProduct : (state,{payload})=>{
            state.loading = false;
            state.oneProduct = payload;
        },
        fetchSuccessWithoutPayloadProduct : (state)=>{
            state.loading = false;
        },
        fetchLogoutProduct : (state,{payload})=>{
            state.products = [];
            state.details = {};
            state.oneProduct = {};
        },
    }
})


export const {fetchStartProduct,fetchFailProduct,fetchSuccessProduct,fetchSuccessWithoutPayloadProduct,fetchLogoutProduct,fetchSuccessOneProduct} = productSlice.actions;
export default productSlice.reducer;