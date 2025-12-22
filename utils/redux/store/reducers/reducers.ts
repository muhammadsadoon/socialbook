import { combineReducers } from "redux";
import reducer from "./auth-reducer/auth-reducer";
import postReducerSlice from "./post-reducer/post-reducer";
import friendRequestSlice from "./friend-request-reducer/friend-request-reducer";

const rootReducers = combineReducers({
    authStates : reducer,
    postStates: postReducerSlice.reducer,
    friendRequestState : friendRequestSlice.reducer
})

export default rootReducers;