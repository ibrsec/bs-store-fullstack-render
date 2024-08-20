import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    username:"",
    user_id:"",
    token:"",
    checkLoopTime:null,
    isAdmin:false,
    loading:false,
    error:false,

}



const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{
        fetchStartAuth : state=>{
            state.loading = true;
            state.error = false;
        },
        fetchFailAuth : state=>{
            state.loading = false;
            state.error = true;
        },
        fetchSuccessAuth : (state,{payload})=>{
            state.loading = false;
            state.username = payload?.user_email;
            state.token = payload?.accessToken;
            state.user_id = payload?.user_id;
            state.isAdmin = payload?.isAdmin;
        },
        fetchSuccessWithoutPayloadAuth : (state,{payload})=>{
            state.loading = false;
        },
        fetchLogoutAuth : (state,{payload})=>{
            state.loading = false;
            state.username = "";
            state.token = "";
            state.user_id = "";
            state.isAdmin = false;
            state.checkLoopTime = null;

        },
        fetchCurrentSuccessAuth : (state,{payload} )=>{
            state.loading = false;
            state.checkLoopTime = payload.time;
        },
        fetchCurrentFailAuth : (state )=>{
            state.loading = false;
            state.error = true;
            state.checkLoopTime = null;
        }
    }
})


export const {fetchStartAuth,fetchFailAuth,fetchSuccessAuth,fetchSuccessWithoutPayloadAuth,fetchLogoutAuth,fetchCurrentSuccessAuth,fetchCurrentFailAuth,} = authSlice.actions;
export default authSlice.reducer;