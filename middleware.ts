import { NextResponse } from "next/server";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from "./utils/firebase";
const middlewareResponse = async () => {
    // onAuthStateChanged(getAuth(app), (user) => {
    //     if(user?.uid){
    //         console.log("user: ",user);
    //     }else{
    //         console.log("user are not avaiable");
    //     }
    // });
    // return NextResponse.json({
    //     user:"dfsdf"
    // })
    return NextResponse.next();
}

export default middlewareResponse;