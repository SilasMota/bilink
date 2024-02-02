import "./profile.scss";
import DefaultPage from "../../components/defaultpage/DfaultPage";
import PostList from "../../components/postlist/PostList";
import { useSelector } from "react-redux";

const Profile = () => {

    const currentUser = useSelector((state) => state.user.value);
    return (
        <div className="profile">

            <DefaultPage>
                <div className="content">
                    <div className="userCard">
                        {
                            currentUser &&
                            <img src={currentUser?.imgUrl || currentUser?.photoURL || "./profile-pic.jpg"} className="avatar" alt="" />
                        }
                        <div className="userInfo">
                            <div className="name">{currentUser?.name}</div>
                            <div className="description">{currentUser?.description}</div>
                        </div>
                    </div>
                    <PostList type="user" filter=""/>
                </div>
            </DefaultPage>
        </div>
    );
}

export default Profile;