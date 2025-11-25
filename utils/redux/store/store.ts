import { configureStore } from "@reduxjs/toolkit";
import rootReducers from "./reducers/reducers";

const store = configureStore({
    reducer:rootReducers
})

export default store;