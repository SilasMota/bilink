
import CreatePost from "../../components/createpost/CreatePost";
import DefaultPage from "../../components/defaultpage/DfaultPage";
import PostList from "../../components/postlist/PostList";
import "./home.scss";

const Home = () => {
    return (
        <div className="home">            
            <DefaultPage>            
                <div className="content">                
                    <CreatePost />
                    <PostList />
                </div>
            </DefaultPage>
        </div>
    );
}

export default Home;