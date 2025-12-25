// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyARcXpTMP3Fkn0tuDmyVcRmycZLZ-C_bUU",
  authDomain: "facebook-clone-9dad9.firebaseapp.com",
  projectId: "facebook-clone-9dad9",
  storageBucket: "facebook-clone-9dad9.firebasestorage.app",
  messagingSenderId: "442299254748",
  appId: "1:442299254748:web:cf54088f85b4334a41b119",
  databaseURL: "https://facebook-clone-9dad9-default-rtdb.firebaseio.com/"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// firebase store (database)

const db = getFirestore(app);
const rtdb = getDatabase(app);
export {
    app,
    auth,
    db,
    rtdb,
}