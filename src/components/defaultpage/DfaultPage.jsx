import SideBar from "../sidebar/SideBar";
import TopBar from "../topbar/TopBar";
import "./defaultpage.scss";

const DefaultPage = ({ children }) => {
    return ( 
        <div className="defaultPage">
            <TopBar/>
            <div className="bottom">
                <SideBar/>
                <div className="content">
                    
                    {children}
                </div>
            </div>
        </div>
     );
}
 
export default DefaultPage;