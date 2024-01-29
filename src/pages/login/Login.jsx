import { Google } from "../../assets/PixelIcons";
import TopBar from "../../components/topbar/TopBar";
import "./login.scss";

const Login = () => {
    return (
        <div className="login">
            <TopBar />
            <div className="loginContainer">
                <form className="loginForm">
                    <div className="top">
                        <div className="formItem">
                            <label>Email</label>
                            <input type="email" required></input>
                        </div>
                        <div className="formItem">
                            <label>Password</label>
                            <input type="password" required></input>
                        </div>
                    </div>
                    <div className="bottom">
                        <a href="/signin" className="signIn">SingIn</a>
                        <button className="loginButton">Login</button>
                    </div>
                </form>

                <hr/>
                <div className="googleAuth">
                    <p>Enter with a Google account</p>
                    <button className="googleLogin"><Google width='20' height='20' />  Google </button>
                </div>
            </div>
        </div>
    );
}

export default Login;
