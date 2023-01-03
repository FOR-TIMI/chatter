import { useEffect } from "react";
import { useDispatch, useSelector} from "react-redux";
import { setPosts } from "../../state";
import SinglePostWidget from './SinglePostWidget';

const PostsWidget = ({ username, isProfile = false}) => {
    const dispatch = useDispatch();
    const posts = useSelector((state) => state.posts);
    const token = useSelector((state) => state.token);

    const getPosts = async () => {
        const response = await fetch("https://nameless-basin-36851.herokuapp.com/p", {
            method: "GET",
            headers: { Authorization: `Bearer ${token}`}
        });
        const data = await response.json();

        dispatch(setPosts({ posts: data }));
    }


    const getUserPosts = async() => {
        const response = await fetch(`https://nameless-basin-36851.herokuapp.com/u/${username}/posts`, {
            method: "GET",
            headers: { Authorization: `Bearer ${token}`}
       });

       const data = await response.json();
       dispatch(setPosts({ posts: data}))
    }

    useEffect(() => {
        if(isProfile){
            getUserPosts();
        } else{
            getPosts();
        }
    },[]);

    return (
       <>
        {
           posts.length &&  posts.map(({
            _id,
            userId,
            username,
            location,
            caption,
            postImageUrls,
            userProfilePhoto,
            likes,
            comments
        }) => (
            <SinglePostWidget
            key={_id}
            postId={_id}
            postUserId={userId}
            postAuthorUsername={username}
            location={location}
            caption={caption}
            postImageUrls={postImageUrls}
            userProfilePhoto={userProfilePhoto}
            likes={likes}
            comments={comments}
            />
        )
        
        )
        }
       </>
    )
}

export default PostsWidget;