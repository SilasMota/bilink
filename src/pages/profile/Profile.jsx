import "./profile.scss";
import DefaultPage from "../../components/defaultpage/DfaultPage";
import PostList from "../../components/postlist/PostList";

const Profile = () => {
    return (
        <div className="profile">

            <DefaultPage>
                <div className="content">
                    <div className="userCard">
                        <img src="https://thispersondoesnotexist.com/" className="avatar" alt="" />
                        <div className="userInfo">
                            <div className="name">John Doe</div>
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