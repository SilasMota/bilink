import { useState } from "react";
import { ImageSolid } from "../../assets/PixelIcons";
import "./createpost.scss";
import { addDoc, collection, setDoc, doc } from "firebase/firestore";
import { storage, db } from "../../config/firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useSelector } from "react-redux";

const CreatePost = () => {
    const [file, setFile] = useState(null);
    const [text, setText] = useState("");
    const [perc, setPerc] = useState(null);

    const currentUser = useSelector((state) => state.user.value);

    const addPost = async (post) => {
        try {
            const docRef = await addDoc(collection(db, "posts"), post);
            if (file) {
                const imagesRef = ref(storage, 'images/posts/' + docRef.id);

                const uploadTask = uploadBytesResumable(imagesRef, file);
                uploadTask.on('state_changed',
                    (snapshot)  =>  {
                        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                        setPerc(progress);
                        console.log('Upload is ' + progress + '% done');
                    },
                    (error) => {
                        console.log(error);
                    },
                    () => {
                        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                            setPost({ ...post, id: docRef.id, imgUrl: downloadURL }).then(
                                window.location.reload(false));                            
                        });
                    }
                );
            } else {
                window.location.reload(false);
            }

        } catch (e) {
            console.error("Error adding document: ", e);
            window.alert(e);
        };
    }

    const setPost = async (post) => {
        try {
            setDoc(doc(db, "posts", post.id), post);
        } catch (e) {
            console.error("Error adding document: ", e);
            window.alert(e);
        };
    }

    const handlePost = async () => {
        const post = {
            postText: text,
            userName: currentUser.name,
            userImg: currentUser.imgUrl || currentUser.photoURL || "",
            uid: currentUser.uid,
            postDate: new Date().toJSON()
        }
        if(text || file){
            await addPost(post);
        }
        
    }

    return (
        <div className="createPost">
            <div className="top">
                <textarea className="postText" disabled={perc && perc < 100} onChange={(e) => { setText(e.target.value) }} placeholder="What are you thinking about?" />
                {file &&
                    <img className="postImg" src={
                        file && URL.createObjectURL(file)
                    } alt="" />
                }
            </div>

            <div className="postFooter">
                <div className="postfile" >
                    <label htmlFor="file" className="file"><ImageSolid width='36' height='36' /></label>
                    <input type="file" disabled={perc && perc < 100} id="file" onChange={(e) => setFile(e.target.files[0])} style={{ display: "none" }} />
                </div>
                <button className="postButton" onClick={handlePost}>Post</button>
            </div>
        </div>
    );
}

export default CreatePost;