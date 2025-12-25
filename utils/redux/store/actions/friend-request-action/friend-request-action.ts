import { db } from "@/utils/firebase";
import { addDoc, collection, doc, getDocs, query, updateDoc, where } from "firebase/firestore";


const getAllFriendFromFB = () => {
    return async () => {
        try {

            const data = await getDocs(collection(db, "Users"));

            const temp: any[] = [];
            data.forEach(data => {

                let obj = {
                    name: (data.data())?.payload?.name,
                    uid: (data.data())?.uid,
                    avatar: (data.data())?.payload?.photoUrl ?? [],
                    friendrequest: (data.data())?.payload?.photoUrl
                }
                temp.push(obj);
            })

            return temp;
        } catch ({ message }: any) {
            return message;
        }
    }
}

const sendFriendRequestToFB = (UserID: any, admin: any) => {
    return async () => {
        console.log("request send", UserID,admin);

        // get user Doc Id...
        const Users = collection(db, "Users");

        const q = query(Users, where("payload.email", "==", admin?.payload?.email));
        const querySnapshot = await getDocs(q);
        let temp: any = null;
        querySnapshot.forEach((doc) => {
            temp = { docId: doc.id, data: doc.data() };
        });

        // set Data Request in FB...
        if (temp) {
            try {
                if (!temp?.data?.requests?.includes(UserID)) {
                    let { password, ...remainProp } = UserID;
                    temp?.data?.requests?.push(remainProp);
                    const docRef = doc(db, "Users", temp?.docId);
                    await updateDoc(docRef, temp?.data);
                }
            } catch (err) {
                return `Some thing Wents Worng while setting Docs..${err}`;
            }


        }


    }
}

const acceptRequestFormFB = () => {
    return () => {
        console.log("request accepted!");
    }
}
const reqectRequestFormFB = () => {
    return () => {
        console.log("request Rejected!");
    }
}

export {
    getAllFriendFromFB,
    sendFriendRequestToFB,
    acceptRequestFormFB,
    reqectRequestFormFB
}