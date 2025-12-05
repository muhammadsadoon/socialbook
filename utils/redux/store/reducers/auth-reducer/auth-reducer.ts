import initialStateAuthReducer from "@/utils/types/redux-type";
import { createSlice } from "@reduxjs/toolkit";

const initialState: initialStateAuthReducer = {
    isAuthentication: null
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
        }
    }
});

export const { SET_AUTH_STATE, LOG_OUT_AUTH_STATE } = authSlice.actions;
export default authSlice.reducer;