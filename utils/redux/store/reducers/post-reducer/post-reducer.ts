import { createSlice } from "@reduxjs/toolkit";

const initialState: {
    posts: null | any
} = {
    posts: null
};

const postReducerSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {
        SET_ALL_POST_BY_FB : (state,action) => {
            state.posts = action.payload;
        },
    }

})

export const { SET_ALL_POST_BY_FB } = postReducerSlice.actions;
export default postReducerSlice;