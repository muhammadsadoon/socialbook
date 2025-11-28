import { SendSignUpFormHandlerType } from "@/utils/types/components-props";
import { SET_AUTH_STATE } from "../../reducers/auth-reducer/auth-reducer";
import { app, db } from "@/utils/firebase";
import { collection, addDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
const dispatchSignUpState = (payload: SendSignUpFormHandlerType) => {
    return async (dispatch: Function) => {
        try {
            const auth = getAuth(app)
            const createUser = await createUserWithEmailAndPassword(auth,payload.email,payload.password)
            const docRef = await addDoc(collection(db, "Users"), payload);
            console.log("Document written with ID: ", docRef.id);
            console.log("user sign up", createUser);
            dispatch({
                type: SET_AUTH_STATE,
                payload: payload,
            });
        } catch (err: any) {
            dispatch({
                type: SET_AUTH_STATE,
                payload: { ...payload, error: err },
            });
        }
    };
};

export default dispatchSignUpState;