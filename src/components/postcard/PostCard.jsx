import { useState } from "react";
import { Thumbsup, Comments, CommentDots, ThumbsupSolid, CommentsSolid, TrashAltSolid } from "../../assets/PixelIcons";
import "./postcard.scss";
import { useSelector } from "react-redux";
import { ref, deleteObject } from "firebase/storage";
import { doc, deleteDoc } from "firebase/firestore";
import { db, storage } from "../../config/firebase"


const PostCard = ({ post }) => {

    const [commentsOn, setCommentsOn] = useState(false);
    const [postLiked, setPostLiked] = useState(false);

    const currentUser = useSelector((state) => state.user.value);

    const deleteUser = async () => {
        await deleteDoc(doc(db, "posts", post.id));
    }

    const handleDelete = async () => {
        if (post.imgUrl) {
            const desertRef = ref(storage, 'images/posts/' + post.id);
            deleteObject(desertRef).then(async () => {
                await deleteUser(post)
                window.location.reload(false);
            }).catch((error) => {
                console.log(error);
            });
        } else {
            await deleteUser(post);
            window.location.reload(false);
        }
    }

    function transformJsonDate(jsonDate) {

        if (!jsonDate)
            return;

        var dateObject = new Date(jsonDate);

        var day = dateObject.getDate();
        var month = dateObject.getMonth() + 1;
        var year = dateObject.getFullYear();

        day = (day < 10) ? '0' + day : day;
        month = (month < 10) ? '0' + month : month;

        var formattedDate = day + '/' + month + '/' + year;

        return formattedDate;
    }

    return (
        <div>
            <div className="postCard">
                <div className="postHeader">
                    <div className="userInfo">
                        <img src={post?.userImg || "./profile-pic.jpg"} className="avatar" alt="" />
                        <p className="userName">{post?.userName}</p>
                    </div>
                    {
                        (currentUser.uid === post?.uid) &&
                        <button className="deleteButton" onClick={handleDelete}> <TrashAltSolid width='30' height='30' /></button>
                    }
                </div>
                <div className="postDate">{transformJsonDate(post?.postDate)}</div>
                <div className="postContent">
                    <p className="postText">{post?.postText}</p>
                    <img className="postImg" src={post?.imgUrl} alt=""></img>
                </div>
                <div className="postFooter">

                    <div className="likes">
                        <button onClick={() => setPostLiked(!postLiked)}>
                            {!postLiked ?
                                <Thumbsup width='30' height='30' className="buttonIcon" />
                                :
                                <ThumbsupSolid width='30' height='30' className="buttonIcon" />
                            }
                        </button>
                        <span className="amount">43</span>
                    </div>

                    <span className="comments" onClick={() => setCommentsOn(!commentsOn)}>
                        <button>
                            {!commentsOn ?
                                <Comments width='30' height='30' className="buttonIcon" />
                                :
                                <CommentsSolid width='30' height='30' className="buttonIcon" />
                            }
                        </button>
                        <span className="amount">2</span>
                    </span>
                </div>

            </div>

            {commentsOn &&
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