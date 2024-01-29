import { Link } from "react-router-dom";
import { CogSolid, HomeSolid, UserSolid, WindowCloseSolid } from "../../assets/PixelIcons";
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

                    <Link to="/profile">
                        <li>
                            <UserSolid width='20' height='20' />
                            <span> Profile</span>
                        </li>
                    </Link>
                    <Link to="/account">
                        <li>
                            <CogSolid width='20' height='20'/>
                            <span>Account</span>
                        </li>
                    </Link>
                    <Link to="/login">
                        <li>
                            <WindowCloseSolid width='20' height='20'/> 
                            <span>Logout</span>
                        </li>
                    </Link>
                </ul>
            </div>
        </div>
    );
}

export default SideBar;