import "./profile.scss";
import DefaultPage from "../../components/defaultpage/DfaultPage";
import PostList from "../../components/postlist/PostList";
import { auth } from "../../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

const Profile = () => {

    const [user] = useAuthState(auth);
    return (
        <div className="profile">

            <DefaultPage>
                <div className="content">
                    <div className="userCard">
                        {
                            user &&
                            <img src={user?.photoURL || ""} className="avatar" alt="" />
                        }
                        <div className="userInfo">
                            <div className="name">{user?.displayName}</div>
                            <div className="description">Amet dolor qui sint adipisicing.</div>
                        </div>
                    </div>
                    <PostList />
                </div>
            </DefaultPage>
        </div>
    );
}

export default Profile;