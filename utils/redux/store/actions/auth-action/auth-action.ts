import { SET_AUTH_STATE } from "../../reducers/auth-reducer/auth-reducer";

const dispatchAuthState = (payload: any) => {
    return (dispatch: Function) => {
        dispatch({
            type:SET_AUTH_STATE,
            payload:payload
        })
    }
}

export default dispatchAuthState;