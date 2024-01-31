import "./userform.scss";
import { useState } from "react";
import { UploadSolid } from "../../assets/PixelIcons";
import { auth } from "../../config/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router";

const UserForm = () => {

    const [file, setFile] = useState("");
    const [user, setUser] = useState({});
    const [confirmPassword, setConfirmPassword] = useState("");
    const navigate = useNavigate();

    const handleUserInfo = (e) => {
        e.preventDefault();
        if (user.password !== confirmPassword) {
            window.alert("Passwords don't match!");
        } else {
            createUserWithEmailAndPassword(auth, user.email, user.password)
                .then((userCredential) => {
                    // Signed in 
                    // const user = userCredential.user;
                    navigate("/");
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.log(errorCode);
                    console.log(errorMessage);
                    window.alert(errorMessage);
                });
        }
    }

    return (
        <div className="formContainer">
            <div className="avatar">
                <img src={
                    file ? URL.createObjectURL(file) : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                } alt="" />
                <div className="postfile" >
                    <label htmlFor="file" className="fileInput"><UploadSolid width='25' height='25' /></label>
                    <input type="file" id="file" onChange={(e) => setFile(e.target.files[0])} style={{ display: "none" }} />
                </div>
            </div>
            <form onSubmit={handleUserInfo}>
                <div className="formItem">
                    <label>Name</label >
                    <input type="text" required onChange={(e) => setUser({ ...user, name: e.target.value })}></input>
                </div>
                <div className="formItem">
                    <label>Email</label>
                    <input type="email" required onChange={(e) => setUser({ ...user, email: e.target.value })}></input>
                </div>
                <div className="formItem">
                    <label>Description</label>
                    <input type="text" onChange={(e) => setUser({ ...user, description: e.target.value })}></input>
                </div>
                <div className="formItem">
                    <label>Password</label>
                    <input type="password" required onChange={(e) => setUser({ ...user, password: e.target.value })}></input>
                </div>
                <div className="formItem">
                    <label>Confim Password</label>
                    <input type="password" required onChange={(e) => setConfirmPassword(e.target.value)}></input>
                </div>

                <button type="submit" className="submitButton">Submit</button>

            </form>
        </div>
    );
}

export default UserForm;