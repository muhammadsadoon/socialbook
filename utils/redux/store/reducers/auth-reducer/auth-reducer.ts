import initialStateAuthReducer from "@/utils/types/redux-type";
import { createSlice } from "@reduxjs/toolkit";

const initialState: initialStateAuthReducer = {
    isAuthentication: null,
    profileUser: null
}


const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        SET_AUTH_STATE: (state, action) => {
            state.isAuthentication = action.payload;
        },
        LOG_OUT_AUTH_STATE: (state) => {
            state.isAuthentication = null;
        },
        SET_PROFILE_USER: (state, action) => {
            state.profileUser = action.payload;
        }
    }
});

export const { SET_AUTH_STATE, LOG_OUT_AUTH_STATE, SET_PROFILE_USER } = authSlice.actions;
export default authSlice.reducer;