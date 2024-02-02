import { useEffect, useState } from "react";
import PostCard from "../postcard/PostCard";
import "./postlist.scss";
import { db } from "../../config/firebase";
import { getDocs, query, collection, orderBy } from "firebase/firestore";
import { useSelector } from "react-redux";

const PostList = (props) => {

    const [postList, setPostList] = useState([]);
    const currentUser = useSelector((state) => state.user.value);
    const filter = useSelector((state) => state.filter.value);

    const generalFilter = (post) => {
        return post.postText.toUpperCase().includes(filter.toUpperCase()) || post.userName.toUpperCase().includes(filter.toUpperCase());
    }

    useEffect(() => {
        const fetchPosts = async () => {
            let list = [];
            try {
                const q = query(collection(db, "posts"), orderBy("postDate", "desc"));
                const querySnapshot = await getDocs(q);
                querySnapshot.forEach(async (doc) => {
                    if(props.type === "user" && doc.data().uid != currentUser.uid){
                        return;
                    }

                    if(filter && (!generalFilter(doc.data()))){
                        return;
                    }

                    list.push({ ...doc.data(), id: doc.id, });
                });

                setPostList(list);

            } catch (err) {
                alert(err.message)
            }
        };
        fetchPosts();
    }, [filter]);

    return (
        <div className="postList">
            {
                postList.map((post) => (
                    <PostCard post={post} key={post.id} />
                ))
            }


        </div>
    );
}

export default PostList;