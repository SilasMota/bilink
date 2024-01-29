import "./topbar.scss"
import { Link } from "react-router-dom";

const TopBar = () => {
    return (
        <div className="topBar">
            <Link to="/">
                <div className="logo">bilink</div>
            </Link>

                <div className="searchBar">
                    <input type="text" placeholder="Search..." />
                    <button>Search</button>
                </div>

                <div className="userInfo">
                    <img src="https://thispersondoesnotexist.com/" className="avatar" alt="" />
                </div>
              


        </div>
    );
}

export default TopBar;