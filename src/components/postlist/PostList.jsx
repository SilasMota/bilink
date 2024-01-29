import PostCard from "../postcard/PostCard";
import "./postlist.scss";

const PostList = () => {
    return ( 
        <div className="postList">
            <PostCard/>
            <PostCard/>
        </div>
     );
}
 
export default PostList;