import { combineReducers } from "redux";
import reducer from "./auth-reducer/auth-reducer";

const rootReducers = combineReducers({
    authStates : reducer,
})

export default rootReducers;