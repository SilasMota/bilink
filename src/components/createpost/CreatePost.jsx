import { ImageSolid } from "../../assets/PixelIcons";
import "./createpost.scss";

const CreatePost = () => {
    return (
        <div className="createPost">
            <textarea className="postText" placeholder="What are you thinking about?" />
            <div className="postFooter">
                <div className="postfile" >
                    <label htmlFor="file" className="file"><ImageSolid width='36' height='36'/></label>
                    <input type="file" id="file" style={{ display: "none" }} />
                </div>
                <button className="postButton" >Post</button>
            </div>
        </div>
    );
}

export default CreatePost;