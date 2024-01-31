import { doc, setDoc } from "firebase/firestore";
import { db, storage } from "../config/firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";


export const setUser = async (user) => {
    try {
        setDoc(doc(db, "users", user.uid), user);

    } catch (e) {
        console.error("Error adding document: ", e);
        window.alert(e);
    };
}

export const setUserImg = (file, user) => {
    const imagesRef = ref(storage, 'images/profiles/' + user.uid);

    const uploadTask = uploadBytesResumable(imagesRef, file);
    uploadTask.on('state_changed',
        (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
                case 'paused':
                    console.log('Upload is paused');
                    break;
                case 'running':
                    console.log('Upload is running');
                    break;
                default:
                    break;
            }
        },
        (error) => {
            // Handle unsuccessful uploads
        },
        () => {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                console.log(user);
                console.log('File available at', downloadURL);
                return downloadURL;
            });
        }
    );
}