import { createSlice } from "@reduxjs/toolkit";

function safeParseUser() {
  const stored = localStorage.getItem("user");
  if (!stored || stored === "undefined") return null;
  try {
    return JSON.parse(stored);
  } catch (e) {
    console.error("Error parsing user from localStorage:", e);
    return null;
  }
}


const initialState = {
    user: safeParseUser(),
    loading:false
}

const profileSlice = createSlice({
    name:"profile",
    initialState: initialState,
    reducers: {
        setUser(state, value){
            state.user= value.payload;
        },
        updateProfilePic(state,value){
            console.log(value);
            state.user.image=value.payload;
        },
        updateProfileInfo(state,value){
            // console.log("Before",state.user)
            state.user={
                ...state.user,
                ...value.payload
            }
            console.log("hi")
            localStorage.setItem("user", JSON.stringify(state.user))
            // localStorage.setItem("user", JSON.stringify(res.data.user))

            console.log("Done")
        }
    } 
})
export const {setUser, updateProfilePic,updateProfileInfo} = profileSlice.actions;
export default profileSlice.reducer