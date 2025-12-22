import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    requests: []
}

const friendRequestSlice = createSlice({
    name: "Friend-request",
    initialState,
    reducers: {}
})

export const {} = friendRequestSlice.actions;
export default friendRequestSlice