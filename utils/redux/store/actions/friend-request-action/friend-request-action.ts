import { db, auth } from "@/utils/firebase";
import { collection, getDocs } from "firebase/firestore";


const getAllFriendFromFB = () => {
    return async () => {
        try {

            const data = await getDocs(collection(db, "Users"));
            
            const temp: any[] = [];
            data.forEach(data => {
                
                let obj = {
                    name: (data.data())?.payload?.name,
                    uid : (data.data())?.uid,
                    avatar: (data.data())?.payload?.photoUrl ?? [],
                    friendrequest: (data.data())?.payload?.photoUrl
                }
                temp.push(obj);
            })

            return temp;
        }catch({message}:any){
            return message;
        }
    }
}

export {
    getAllFriendFromFB,
}