import { useState } from "react";
import { ImageSolid } from "../../assets/PixelIcons";
import "./createpost.scss";

const CreatePost = () => {
    const [file, setFile] = useState("");

    return (
        <div className="createPost">
            <div className="top">
                <textarea className="postText" placeholder="What are you thinking about?" />
                {file &&
                    <img className="postImg" src={
                        file && URL.createObjectURL(file)
                    } alt="" />
                }
            </div>

            <div className="postFooter">
                <div className="postfile" >
                    <label htmlFor="file" className="file"><ImageSolid width='36' height='36' /></label>
                    <input type="file" id="file" onChange={(e) => setFile(e.target.files[0])} style={{ display: "none" }} />
                </div>
                <button className="postButton" >Post</button>
            </div>
        </div>
    );
}

export default CreatePost;