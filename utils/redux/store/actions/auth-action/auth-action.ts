import { SendSignInFormHandlerType, SendSignInWithGoogleType, SendSignUpFormHandlerType } from "@/utils/types/components-props";
import { SET_AUTH_STATE, SET_PROFILE_USER } from "../../reducers/auth-reducer/auth-reducer";
import { app, auth, db } from "@/utils/firebase";
import { collection, addDoc, doc, getDocs, query, where } from "firebase/firestore";
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
            await addDoc(collection(db, "Users"), { payload, uid: createUser?.user?.uid, requests: [], friends: [] });
            const cookie = await createUser?.user?.getIdToken();
            setCookie("token", cookie);
            const dispatchUser = {
                ...payload,
                error: false,
                errorMessage: "",
            }
            dispatch(SET_AUTH_STATE(dispatchUser));

        } catch (err: any) {
            throw `Error: ${err.message}`;
        }
    };
};
const dispatchSignInWithGoogle = (payloadprop: SendSignInWithGoogleType) => {
    return async (dispatch: any) => {
        try {
            const auth = getAuth(app);
            const { uid, token, ...payload } = payloadprop;
            const q = query(collection(db, "Users"), where("payload.email", "==", payload.email));
            const querySnapshot = await getDocs(q);
            if (!querySnapshot) {
                await addDoc(collection(db, "Users"), { payload, uid: uid, requests: [], friends: [] });
                setCookie("token", token);
                const dispatchUser = {
                    ...payloadprop,
                    error: false,
                    errorMessage: "",
                }
                dispatch(SET_AUTH_STATE(dispatchUser));
            }
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

const findUserFromFB = (param: string) => {
    return async (dispatch: any) => {
        console.log("param: ", param.split("-").join(" "))
        const docRef = await getDocs(collection(db, "Users"));
        let userData: any = null;
        docRef.forEach((data) => {
            if ((data.data()).payload.name === param.split("-").join(" ")) {
                userData = data.data();
            }
        });
        if (!userData) throw new Error("User not found");
        dispatch(SET_PROFILE_USER(userData));
        return userData;
    }
}

const getAllUserFromFB = () => {
    return async () => {

        // in future jab friends list ready ho jay gi tu limited user show karna hy...
        let temp: any = [];
        const snapshort = await getDocs(collection(db, "Users"));
        snapshort.forEach((data) => temp.push({ docId: data.id, data: data.data() }));
        return temp;
    }
}
export {
    dispatchSignUpState,
    dispatchSignInState,
    dispatchLogOutState,
    findUserFromFB,
    dispatchSignInWithGoogle,
    getAllUserFromFB
};