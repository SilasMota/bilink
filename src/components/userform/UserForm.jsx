import "./userform.scss";
import { useState } from "react";
import { UploadSolid } from "../../assets/PixelIcons";
import { auth } from "../../config/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { login, refresh } from "../../redux/userSlice";
import { setUser } from "../../controller/userController";
import { storage } from "../../config/firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const UserForm = () => {

    const [file, setFile] = useState("");

    const [confirmPassword, setConfirmPassword] = useState("");
    const navigate = useNavigate();

    const currentUser = useSelector((state) => state.user.value);
    const [newUser, setNewUser] = useState(currentUser || {});
    const dispatch = useDispatch();
    const [perc, setPerc] = useState(null);

    const handleUserInfo = async (e) => {
        e.preventDefault();
        if (!currentUser && newUser.password !== confirmPassword) {
            window.alert("Passwords don't match!");
            return;
        } else if (!currentUser) {
            createUserWithEmailAndPassword(auth, newUser.email, newUser.password)
                .then((userCredential) => {
                    setUser({ ...newUser, uid: userCredential.user.uid, password: null })
                        .then(() => {
                            if (file) {
                                setUserImg(file, { ...newUser, uid: userCredential.user.uid, password: null });
                            }
                            dispatch(login({ ...newUser, uid: userCredential.user.uid, password: null }));
                        });
                    navigate("/");
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.log(errorCode);
                    console.log(errorMessage);
                    window.alert(errorMessage);
                });
        } else {
            if (file) {
                await setUserImg(file, newUser);
            }
            // setUser(newUser);
            // dispatch(refresh(newUser));
            // navigate("/profile");
        }
    }

    const setUserImg = async (file, user) => {
        const imagesRef = ref(storage, 'images/profiles/' + user.uid);

        const uploadTask = uploadBytesResumable(imagesRef, file);
        uploadTask.on('state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setPerc(progress);
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
                    setUser({ ...user, imgUrl: downloadURL });
                    dispatch(refresh({ ...user, imgUrl: downloadURL }));
                    navigate("/profile");
                });
            }
        );
    }

    return (
        <div className="formContainer">
            <div className="avatar">
                <img src={
                    file ? URL.createObjectURL(file) : currentUser?.imgUrl || currentUser?.photoURL || "./profile-pic.jpg"
                } alt="" />
                <div className="postfile" >
                    <label htmlFor="file" className="fileInput"><UploadSolid width='25' height='25' /></label>
                    <input type="file" id="file" onChange={(e) => setFile(e.target.files[0])} style={{ display: "none" }} />
                </div>
            </div>
            <form onSubmit={handleUserInfo}>
                <div className="formItem">
                    <label>Name</label >
                    <input type="text" required={!currentUser} disabled={perc && perc<100} onChange={(e) => setNewUser({ ...newUser, name: e.target.value })} placeholder={currentUser?.name}></input>
                </div>
                {!currentUser &&
                    <div className="formItem">
                        <label>Email</label>
                        <input type="email" required disabled={perc && perc<100} onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}></input>
                    </div>
                }
                <div className="formItem">
                    <label>Description</label>
                    <input type="text" disabled={perc && perc<100} onChange={(e) => setNewUser({ ...newUser, description: e.target.value })} placeholder={currentUser?.description}></input>
                </div>
                {!currentUser &&
                    <div className="formItem">
                        <label>Password</label>
                        <input type="password" required disabled={perc && perc<100} onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}></input>
                    </div>
                }
                {!currentUser &&
                    <div className="formItem">
                        <label>Confirm Password</label>
                        <input type="password" required disabled={perc && perc<100} onChange={(e) => setConfirmPassword(e.target.value)}></input>
                    </div>
                }

                <button type="submit" className="submitButton" disabled={perc && perc<100} >Submit </button>

                {
                    (perc && perc<100) &&
                    <div className="progressBarContainer">
                        <div className="progressBar" style={{width:`${perc}%`, backgroundColor:"green", color:"white"}}>{parseInt(perc)}%</div>
                    </div>
                }

            </form>

            
        </div>

        
    );
}

export default UserForm;