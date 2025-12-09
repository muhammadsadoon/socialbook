import { combineReducers } from "redux";
import reducer from "./auth-reducer/auth-reducer";
import postReducerSlice from "./post-reducer/post-reducer";

const rootReducers = combineReducers({
    authStates : reducer,
    postStates: postReducerSlice.reducer,
})

export default rootReducers;