import { useNavigate } from "react-router";
import { Google } from "../../assets/PixelIcons";
import TopBar from "../../components/topbar/TopBar";
import { auth, googleProvider } from "../../config/firebase";
import { signInWithPopup, signInWithEmailAndPassword } from "firebase/auth";
import "./login.scss";
import { createUser } from "../../controller/userController";
import { useState } from "react";

const Login = () => {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password,setPassword] = useState("");

    const handleGoogleLogin = () => {
        signInWithPopup(auth, googleProvider)
            .then((result) => {
                // The signed-in user info.
                const user = result.user;
                createUser(user);
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
        .then((userCredential) => {
            // Signed in 
            // const user = userCredential.user;
            navigate('/');
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
