import TopBar from "../../components/topbar/TopBar";
import UserForm from "../../components/userform/UserForm";
import "./signin.scss";

const SingIn = () => {
    return ( 
        <div className="signin">
            <TopBar/>
            <UserForm/>
        </div>
     );
}
 
export default SingIn;