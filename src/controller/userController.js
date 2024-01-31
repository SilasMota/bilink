import { doc, setDoc } from "firebase/firestore";
import { db } from "../config/firebase";

export const createUser = async (user) => {
    setDoc(doc(db, "users", user.uid), {
        name: user.displayName,
        email: user.email,
        imgUrl: user.photoURL
    })
        .then((docRef) => {
            // console.log("Document written with ID: ", docRef.id);
        })
        .catch((e) => {
            console.error("Error adding document: ", e);
            window.alert(e);
        });
}