import { useState } from "react";
import { Thumbsup, Comments, CommentDots, ThumbsupSolid, CommentsSolid } from "../../assets/PixelIcons";
import "./postcard.scss";

const PostCard = () => {

    const [commentsOn, setCommentsOn] = useState(false);
    const [postLiked, setPostLiked] = useState(false);
    
    return (
        <div>
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
                        <button onClick={() => setPostLiked(!postLiked)}>
                            { !postLiked ?
                                <Thumbsup width='30' height='30' className="buttonIcon"/>
                                :
                                <ThumbsupSolid width='30' height='30' className="buttonIcon"/>
                            }
                        </button>
                        <span className="amount">43</span>
                    </div>

                    <span className="comments" onClick={() => setCommentsOn(!commentsOn)}>
                        <button>
                            {   !commentsOn ?
                                <Comments width='30' height='30' className="buttonIcon"/>
                                :
                                <CommentsSolid width='30' height='30' className="buttonIcon"/>
                            }                            
                        </button>
                        <span className="amount">2</span>
                    </span>
                </div>

            </div>

            { commentsOn &&
                <div className="commentSection">
                    <div className="top">
                        <input className="commentInput" placeholder="Make a Comment" type="text" />
                        <button className="innputButton"><CommentDots width="30" height="30" /></button>
                    </div>
                    <div className="comments">
                        <div className="comment">
                            <div className="userInfo">
                                <img src="https://thispersondoesnotexist.com/" className="avatar" alt="" />
                                <p className="userName">John Doe</p>
                            </div>
                            <div className="commentText">
                                <p>Fugiat do cillum consectetur duis irure duis tempor.</p>
                            </div>
                        </div>

                        <div className="comment">
                            <div className="userInfo">
                                <img src="https://thispersondoesnotexist.com/" className="avatar" alt="" />
                                <p className="userName">John Doe</p>
                            </div>
                            <div className="commentText">
                                <p>Fugiat do cillum consectetur duis irure duis tempor.</p>
                            </div>
                        </div>
                    </div>
                </div>

            }
        </div>

    );
}

export default PostCard;