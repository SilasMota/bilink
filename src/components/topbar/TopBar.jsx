import { useSelector } from "react-redux";
import { Search } from "../../assets/PixelIcons";
import "./topbar.scss"
import { Link } from "react-router-dom";

const TopBar = () => {

    const currentUser = useSelector((state) => state.user.value);

    return (
        <div className="topBar">
            <Link to="/">
                <div className="logo">bilink</div>
            </Link>

                {
                    currentUser &&
                        <div className="searchBar">
                            <input type="text" placeholder="Search..." />
                            <button><Search width='20' height='20'/></button>
                        </div>
                }
                 
                {
                    currentUser &&                    
                        <div className="userInfo">                  
                            <img src={currentUser?.imgUrl || currentUser?.photoURL || "./profile-pic.jpg"} className="avatar" alt="" />
                        </div>
                    
                }

        </div>
    );
}

export default TopBar;