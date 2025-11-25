import initialStateAuthReducer from "@/utils/types/redux-type";
import { createSlice } from "@reduxjs/toolkit";

const initialState: initialStateAuthReducer = {
    uid: "",
    email: "",
    token: ""
}


const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        SET_AUTH_STATE: (state, action) => {
            const { payload } = action;
            state = payload;
        }
    }
});

export const { SET_AUTH_STATE } = authSlice.actions;
export default authSlice.reducer;