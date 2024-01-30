
import DefaultPage from "../../components/defaultpage/DfaultPage";
import UserForm from "../../components/userform/UserForm";
import "./account.scss";

const Account = () => {

    

    return (
        <DefaultPage>
            <div className="content">
                <UserForm/>
            </div>
           
        </DefaultPage>
    );
}

export default Account;