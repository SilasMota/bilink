import { Link, useNavigate } from "react-router-dom";
import { CogSolid, Github, HomeSolid, UserSolid, WindowCloseSolid } from "../../assets/PixelIcons";
import { auth } from "../../config/firebase";
import { signOut } from "firebase/auth";
import "./sidebar.scss";

const SideBar = () => {
    const navigate = useNavigate(); 
    const handleLogout = () => {
        signOut(auth).then(() => {
            navigate("/login");
          }).catch((error) => {
            console.log(error);
          });
    }

    return (
        <div className="sideBar">
            <div className="menu">
                <ul>
                    <Link to="/">
                        <li>
                            <HomeSolid width='20' height='20' />
                            <span> Home</span>
                        </li>
                    </Link>

                    <hr />

                    <Link to="/profile">
                        <li>
                            <UserSolid width='20' height='20' />
                            <span> Profile</span>
                        </li>
                    </Link>


                    <Link to="/account">
                        <li>
                            <CogSolid width='20' height='20' />
                            <span>Account</span>
                        </li>
                    </Link>
                    <hr />
                    <a href="https://github.com/SilasMota/" target="_blank" rel="noreferrer">
                        <li>
                            <Github width='20' height='20' />
                            <span>Source</span>
                        </li>
                    </a>
                    <hr></hr>
                        <li onClick={handleLogout}>
                            <WindowCloseSolid width='20' height='20' />
                            <span>Logout</span>
                        </li>
                </ul>
            </div>
        </div>
    );
}

export default SideBar;