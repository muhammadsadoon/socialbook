import { db } from "@/utils/firebase";
import { addDoc, collection, doc, getDoc, getDocs, updateDoc } from "firebase/firestore";
import { SET_ALL_POST_BY_FB } from "../../reducers/post-reducer/post-reducer";



const dispatchPostAction = (payload: any) => {
    return async () => {
        try {
            // check is user are valid!
            const data: any = [];
            const getUserInfo: any = await getDocs(collection(db, "Users"));
            getUserInfo.forEach((doc: any) => {
                data.push(doc.data());
            });
            const getUserFilter = data?.find((e: any) => { return e?.uid == payload?.uid });
            delete getUserFilter?.payload?.password;
            if (getUserFilter) {
                const schemePost = {
                    ...payload,
                    ...getUserFilter.payload,
                    comments: [],
                    likes: [],
                    createdDate: new Date().getTime().toString(),
                    uid: getUserFilter?.uid,
                }
                const docRef = await addDoc(collection(db, "posts"), schemePost);
                console.log("Document written with ID: ", docRef.id);
            }
        } catch (err) {
            console.log(err)
        }
    }
}

const commetsSendHandler = (payload: any) => {
    return async () => {
        try {
            if ((payload?.comment).trim()) {
                const docSnap: any = await getDocs(collection(db, "posts"));
                let getDataFromSnap: any = {};

                // get data from fireStore
                docSnap.forEach((data: any) => {
                    if (data.data()?.createdDate == payload?.post?.createdDate) {
                        getDataFromSnap.docId = data.id;
                        getDataFromSnap.data = data.data();
                    }
                });

                console.log(payload);

                const docRef = doc(db, "posts", getDataFromSnap.docId);

                // Always ensure comments is an array
                const currentComments = (getDataFromSnap?.data?.comments)
                    ? [...getDataFromSnap.data.comments]
                    : [];

                // Unique key
                const newCommentKey = `comment_${Date.now()}`;

                const newComment = {
                    id: newCommentKey,
                    text: payload.comment ?? "",
                    userID: payload?.post?.uid ?? "",
                    timestamp: Date.now(),
                    userName: payload?.post?.name ?? "",
                };

                currentComments.push(newComment);

                await updateDoc(docRef, {
                    comments: currentComments
                });
            } else throw "plase fill the input first";

        } catch (err) {
            throw err
        }
    }
}


// handle likes section in FB (database)
const toggleLikeSendHandler = (payload: any) => {
    return async () => {
        console.log("payload: ", payload);
        const docSnap: any = await getDocs(collection(db, "posts"));
        let getDataFromSnap: any = {};

        // get data from fireStore 
        docSnap.forEach((data: any) => {
            if ((data.data())?.uid == payload?.post?.uid) {
                getDataFromSnap.data = data.data();
                getDataFromSnap.docId = data.id;
            };
        })

        const docRef = doc(db, "posts", getDataFromSnap.docId);
        if (getDataFromSnap?.data?.likes.includes(payload.userID)) {
            getDataFromSnap?.data?.likes.splice(getDataFromSnap?.data?.likes?.indexOf(payload.userID), 1);
            await updateDoc(docRef, {
                likes: getDataFromSnap.data.likes
            })
        } else {
            getDataFromSnap?.data?.likes.push(payload.userID);
            await updateDoc(docRef, {
                likes: getDataFromSnap.data.likes
            })
        }
    }
}

const getAllPostFromFB = () => {
    return async (dispatch: any) => {
        try {
            const data = await getDocs(collection(db, "posts"));
            let temp: any[] = [];
            data.forEach((item) => temp.push(item.data()));
            dispatch(SET_ALL_POST_BY_FB(temp));
        } catch (err) {
            throw `Something went worng while fetching data ${err}`;
        }
    }
}
export {
    dispatchPostAction,
    commetsSendHandler,
    toggleLikeSendHandler,
    getAllPostFromFB
}