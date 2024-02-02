import { useDispatch, useSelector } from "react-redux";
import { Search } from "../../assets/PixelIcons";
import "./topbar.scss"
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { clear, setFilter } from "../../redux/filterSlice";

const TopBar = () => {

    const currentUser = useSelector((state) => state.user.value);
    const [search, setSearch] = useState("");
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(clear());
    })

    return (
        <div className="topBar">
            <Link to="/">
                <div className="logo">bilink</div>
            </Link>

                {
                    currentUser &&
                        <div className="searchBar">
                            <input type="text" onChange={(e) => setSearch(e.target.value)} placeholder="Search..." />
                            <button onClick={() => dispatch(setFilter(search))}><Search width='20' height='20'/></button>
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