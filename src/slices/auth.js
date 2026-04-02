import { createSlice } from "@reduxjs/toolkit";

const savedToken = localStorage.getItem("token");
const normalizedToken = savedToken ? savedToken.replace(/^\"|\"$/g, "") : null;

const initialState = {
    signupData: null,
    token: normalizedToken,
    loading: false
}

const authSlice = createSlice({
    name:"auth",
    initialState: initialState,
    reducers: {
        setSignupData(state, value){
            state.signupData= value.payload;
            console.log(state.signupData)
        },
        setToken(state, value){
            // console.log(value.payload)
            state.token= value.payload;
            // console.log(state.token)
        },
        setLoading(state, value){
            state.loading= value.payload;
        },
    } 
})
export const {setSignupData, setToken, setLoading} = authSlice.actions;
export default authSlice.reducer