import { SendSignInFormHandlerType, SendSignUpFormHandlerType } from "@/utils/types/components-props";
import { SET_AUTH_STATE } from "../../reducers/auth-reducer/auth-reducer";
import { app, auth, db } from "@/utils/firebase";
import { collection, addDoc, doc, getDocs } from "firebase/firestore";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import toast from "react-hot-toast";
import { deleteCookie, setCookie } from "cookies-next";

const dispatchSignInState = (payload: SendSignInFormHandlerType) => {
    return async (dispatch: Function) => {
        try {
            const auth = getAuth(app)
            const signInUser = await signInWithEmailAndPassword(auth, payload.email, payload.password);
            const cookie = await signInUser.user?.getIdToken();
            setCookie("token", cookie);
            dispatch(SET_AUTH_STATE(payload));
        } catch (err: any) {
            throw err.message;
        }
    };
};
const dispatchSignUpState = (payload: SendSignUpFormHandlerType) => {
    return async (dispatch: any) => {
        try {
            const auth = getAuth(app);
            const createUser = await createUserWithEmailAndPassword(auth, payload.email, payload.password);
            await addDoc(collection(db, "Users"), { payload, uid: createUser?.user?.uid, requests: [] });
            const cookie = await createUser?.user?.getIdToken();
            setCookie("token", cookie);
            const dispatchUser = {
                ...payload,
                error: false,
                errorMessage: "",
            }
            dispatch(SET_AUTH_STATE(dispatchUser));

        } catch (err: any) {
            throw `Error: ${err}`;
        }
    };
};

const dispatchLogOutState = () => {
    return async (dispatch: any) => {
        console.log(dispatch)
        signOut(auth).then(() => {
            toast("Logout is Done");
            deleteCookie("token");
            window.location.reload();
        }).catch((error) => {
            toast(`something went worng while logout! ${error}`);
        });
    }
}

/**
 * this function is return as a promise to handle the states...
 */

const findUserFromFB = (param:string) => {
    return async () => {
        console.log("param: ",param.split("-").join(" "))
        const docRef = await getDocs(collection(db, "Users"));
        let isTrue = false
        docRef.forEach((data)=> {
            if((data.data()).payload.name === param.split("-").join(" ")) isTrue = true;
        });
        if(!isTrue) throw isTrue;
    }
}

export {
    dispatchSignUpState,
    dispatchSignInState,
    dispatchLogOutState,
    findUserFromFB
};