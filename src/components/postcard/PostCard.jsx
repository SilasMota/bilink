import {Thumbsup,Comments, CommentsSolid} from "../../assets/PixelIcons";
import "./postcard.scss";

const PostCard = () => {
    return ( 
        <div className="postCard">
            <div className="userInfo">
                <img src="https://thispersondoesnotexist.com/" className="avatar" alt="" />
                <p className="userName">John Doe</p>
            </div>
            <div className="postDate">21/01/2023</div>
            <div className="postContent">
                <p className="postText"> Nulla enim magna proident in est magna minim sunt. Pariatur consectetur tempor laboris eu. Duis incididunt nisi in cupidatat reprehenderit. Est reprehenderit tempor qui incididunt labore. Commodo ullamco consectetur et ullamco esse fugiat nisi.</p>
                <img className="postImg" src="https://hips.hearstapps.com/hmg-prod/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg?crop=0.752xw:1.00xh;0.175xw,0&resize=1200:*" alt=""></img>
            </div>
            <div className="postFooter">
                
                <div className="likes">
                    <button><Thumbsup width='30' height='30'/></button>
                    <span className="amount">21</span>
                </div>
                
                <span className="comments">
                    <button><Comments width='30' height='30'/></button>
                    <span className="amount">21</span>
                </span>
            </div>
        </div>
     );
}
 
export default PostCard;