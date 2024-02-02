import SideBar from "../sidebar/SideBar";
import TopBar from "../topbar/TopBar";
import "./defaultpage.scss";

const DefaultPage = (props) => {
    return ( 
        <div className="defaultPage">
            
            <TopBar/>
            <div className="bottom">
                <SideBar/>
                <div className="content">
                    {props.children}
                </div>
            </div>
        </div>
     );
}
 
export default DefaultPage;