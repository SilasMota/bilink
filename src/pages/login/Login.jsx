import { useNavigate } from "react-router";
import { Google } from "../../assets/PixelIcons";
import TopBar from "../../components/topbar/TopBar";
import { auth, googleProvider } from "../../config/firebase";
import { signInWithPopup, signInWithEmailAndPassword } from "firebase/auth";
import "./login.scss";
import { setUser } from "../../controller/userController";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../redux/userSlice";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../config/firebase";


const Login = () => {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();

    const handleGoogleLogin = () => {
        signInWithPopup(auth, googleProvider)
            .then(async (result) => {
                // The signed-in user info.
                const user = {
                    uid: result.user.uid,
                    name: result.user.displayName,
                    email: result.user.email,
                    photoURL: result.user.photoURL
                }
                const docRef = doc(db, "users", user.uid);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    setUser(user)
                    .then(() => {           
                        console.log(docSnap.data());   
                        dispatch(login(docSnap.data()));
                    });
                } else {
                    // docSnap.data() will be undefined in this case
                    console.log("Doc not found");  
                    dispatch(login(user));
                }
                
                navigate('/');

            }).catch((error) => {
                // Handle Errors here.
                console.log(error)
                window.alert(error.message);
                // ...
            });
    }

    const handleLogin = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
            .then( async (userCredential) => {
                const user = {
                    uid: userCredential.user.uid,
                    name: userCredential.user.displayName,
                    email: userCredential.user.email,
                    photoURL: userCredential.user.photoURL
                }

                const docRef = doc(db, "users", user.uid);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    dispatch(login(docSnap.data()));
                    navigate('/');
                  } 
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode);
                console.log(errorMessage);
                window.alert("Unable to Login");
            });
    }

    return (
        <div className="login">
            <TopBar />
            <div className="loginContainer">
                <form className="loginForm" onSubmit={handleLogin}>
                    <div className="top">
                        <div className="formItem">
                            <label>Email</label>
                            <input type="email" required onChange={(e) => setEmail(e.target.value)}></input>
                        </div>
                        <div className="formItem">
                            <label>Password</label>
                            <input type="password" required onChange={(e) => setPassword(e.target.value)}></input>
                        </div>
                    </div>
                    <div className="bottom">
                        <a href="/signin" className="signIn">SingIn</a>
                        <button className="loginButton" type="submit">Login</button>
                    </div>
                </form>

                <hr />
                <div className="googleAuth">
                    <p>Enter with a Google account</p>
                    <button className="googleLogin" onClick={handleGoogleLogin}><Google width='20' height='20' />  Google </button>
                </div>
            </div>
        </div>
    );
}

export default Login;
