import { Search } from "../../assets/PixelIcons";
import "./topbar.scss"
import { Link } from "react-router-dom";
import { auth } from "../../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

const TopBar = () => {

    const [user] = useAuthState(auth);
    

    return (
        <div className="topBar">
            <Link to="/">
                <div className="logo">bilink</div>
            </Link>

                {
                    user &&
                        <div className="searchBar">
                            <input type="text" placeholder="Search..." />
                            <button><Search width='20' height='20'/></button>
                        </div>
                }
                 
                {
                    user &&                    
                        <div className="userInfo">                  
                            <img src={user?.photoURL || ""} className="avatar" alt="" />
                        </div>
                    
                }

        </div>
    );
}

export default TopBar;