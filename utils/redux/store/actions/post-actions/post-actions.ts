import { auth, db } from "@/utils/firebase";
import { PayloadAction } from "@reduxjs/toolkit";
import { onAuthStateChanged } from "firebase/auth";
import { addDoc, collection, getDocs } from "firebase/firestore";


const dispatchPostAction = (payload: any) => {
    return async () => {
        try {
            // check is user are valid!
            const data: any = [];
            const getUserInfo: any = await getDocs(collection(db, "Users"));
            getUserInfo.forEach((doc: any) => {
                data.push(doc.data());
            });
            const getUserFilter = data?.find((e: any) => { return e?.uid ==  payload?.uid});
            if (getUserFilter) {
                const schemePost = {
                    ...payload,
                    comments: {},
                    likes: false,
                    userInfo: getUserFilter,
                }
                const docRef = await addDoc(collection(db, "posts"), schemePost);
                console.log("Document written with ID: ", docRef.id);
            }
        } catch (err) {
            console.log(err)
        }
    }
}

export {
    dispatchPostAction,
}