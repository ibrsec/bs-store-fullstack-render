import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    categories:[],
    loading:false,
    error:false,

}



const categorySlice = createSlice({
    name:"category",
    initialState,
    reducers:{
        fetchStartCategory : state=>{
            state.loading = true;
            state.error = false;
        },
        fetchFailCategory : state=>{
            state.loading = false;
            state.error = true;
        },
        fetchSuccessCategory : (state,{payload})=>{
            state.loading = false;
            state.categories = payload?.result;
        },
        fetchSuccessWithoutPayloadCategory : (state)=>{
            state.loading = false;
        },
        fetchLogoutCategory : (state,{payload})=>{
            state.categories = [];
        },
    }
})


export const {fetchStartCategory,fetchFailCategory,fetchSuccessCategory,fetchSuccessWithoutPayloadCategory,fetchLogoutCategory} = categorySlice.actions;
export default categorySlice.reducer;