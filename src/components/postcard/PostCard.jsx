import { useState, useEffect } from "react";
import { Thumbsup, Comments, CommentDots, ThumbsupSolid, CommentsSolid, TrashAltSolid } from "../../assets/PixelIcons";
import "./postcard.scss";
import { useSelector } from "react-redux";
import { ref, deleteObject } from "firebase/storage";
import { addDoc, collection, getDocs, query, where, deleteDoc, doc } from "firebase/firestore";
import { db, storage } from "../../config/firebase"


const PostCard = ({ post }) => {

    const currentUser = useSelector((state) => state.user.value);
    const [commentsOn, setCommentsOn] = useState(false);

    const [likes, setLikes] = useState([]);
    const hasLiked = likes?.find((like) => like.uid === currentUser.uid);
    const likeRef = collection(db, "likes");
    const likesDoc = query(likeRef, where("postId", "==", post.id));

    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState();
    const commentsRef = collection(db, "comments");
    const commentsDoc = query(commentsRef, where("postId", "==", post.id));

    const deletePost = async () => {
        await deleteDoc(doc(db, "posts", post.id));
    }

    const handleDelete = async () => {

        const commentToDeleteQuery = query(
            commentsRef,
            where("postId","==",post.id)
        );
        const commentToDeleteData = await getDocs(commentToDeleteQuery);
        commentToDeleteData.docs.forEach(async comment => {
            await deleteDoc(doc(db,"comments", comment.id));
        });
        

        const likeToDeleteQuery = query(
            likeRef,
            where("postId","==",post.id)
        );
        const likeToDeleteData = await getDocs(likeToDeleteQuery);
        likeToDeleteData.docs.forEach(async like => {
            await deleteDoc(doc(db,"likes", like.id));
        });

        if (post.imgUrl) {
            const desertRef = ref(storage, 'images/posts/' + post.id);
            deleteObject(desertRef).then(async () => {
                await deletePost(post)
                window.location.reload(false);
            }).catch((error) => {
                console.log(error);
            });
        } else {
            await deletePost(post);
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

    const addLike = async () => {
        await addDoc(likeRef, { uid: currentUser?.uid, postId: post.id });
        getLikes();
    }

    const removeLike = async () => {
        try {
            const commentToDeleteQuery = query(
                likeRef,
                where("postId", "==", post.id),
                where("uid", "==", currentUser?.uid)
            );
            const commentToDeleteData = await getDocs(commentToDeleteQuery);
            const commentToDelete = doc(db, "likes", commentToDeleteData.docs[0].id);
            await deleteDoc(commentToDelete);
            getLikes();
        } catch (err) {
            console.log(err);
        }
    }

    const getLikes = async () => {
        const querySnapshot = await getDocs(likesDoc);
        const list = [];
        querySnapshot.forEach(async (doc) => {
            list.push(doc.data());
        });
        setLikes(list);
    }

    const addComment = async () => {
        if (!newComment) {
            return;
        }

        const comment = {
            commentText: newComment,
            postId: post.id,
            uid: currentUser.uid,
            userImg: currentUser.imgUrl || currentUser.photoURL || "",
            userName: currentUser.name
        };
        await addDoc(commentsRef, comment);
        getComments();
        document.getElementById('commentInput').value = '';
    }

    const removeComment = async (comment) => {
        try {
            const commentToDelete = doc(db, "comments", comment.id);
            await deleteDoc(commentToDelete);
            getComments();
        } catch (err) {
            console.log(err);
        }
    }

    const getComments = async () => {
        const querySnapshot = await getDocs(commentsDoc);
        const list = [];
        querySnapshot.forEach(async (doc) => {
            list.push({...doc.data(), id: doc.id});
        });

        setComments(list);
    }


    useEffect((() => {
        getLikes();
        getComments();
    }),[]);

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
                        <button onClick={!hasLiked ? addLike : removeLike}>
                            {!hasLiked ?
                                <Thumbsup width='30' height='30' className="buttonIcon" />
                                :
                                <ThumbsupSolid width='30' height='30' className="buttonIcon" />
                            }
                        </button>
                        <span className="amount">{likes?.length > 0 ? likes?.length : ""}</span>
                    </div>

                    <span className="comments" onClick={() => setCommentsOn(!commentsOn)}>
                        <button>
                            {!commentsOn ?
                                <Comments width='30' height='30' className="buttonIcon" />
                                :
                                <CommentsSolid width='30' height='30' className="buttonIcon" />
                            }
                        </button>
                        <span className="amount">{comments?.length > 0 ? comments?.length : ""}</span>
                    </span>
                </div>

            </div>

            {commentsOn &&
                <div className="commentSection">
                    <div className="top">
                        <input className="commentInput" id="commentInput" onChange={(e) => setNewComment(e.target.value)} placeholder="Make a Comment" type="text" />
                        <button className="innputButton" onClick={() => addComment()}><CommentDots width="30" height="30" /></button>

                    </div>
                    <div className="comments">
                        {comments &&
                            comments.map((comment) => (
                                <div className="comment" key={comment.id}>
                                    <div className="commentHeader">
                                        <div className="userInfo">
                                            <img src={comment.userImg || "./profile-pic.jpg"} className="avatar" alt="" />
                                            <p className="userName">{comment.userName}</p>
                                        </div>
                                        {
                                            (currentUser.uid === comment?.uid || post.uid === currentUser?.uid) &&
                                            <button className="deleteButton" onClick={() => removeComment(comment)}> <TrashAltSolid width='20' height='20' /></button>
                                        }
                                    </div>
                                    <div className="commentText">
                                        <p>{comment.commentText}</p>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            }
        </div>

    );
}

export default PostCard;