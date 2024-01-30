import { Link } from "react-router-dom";
import { CogSolid, Github, HomeSolid, UserSolid, WindowCloseSolid } from "../../assets/PixelIcons";
import "./sidebar.scss";

const SideBar = () => {
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
                    <Link to="/login">
                        <li>
                            <WindowCloseSolid width='20' height='20' />
                            <span>Logout</span>
                        </li>
                    </Link>
                </ul>
            </div>
        </div>
    );
}

export default SideBar;