import { useEffect, useState } from "react";
import { useDispatch, useSelector} from "react-redux";
import { setPosts } from "../../state";



import SinglePostWidget from './SinglePostWidget';

import SinglePostSkeleton from "../../components/Skeletons/SinglePostSkeleton";

const PostsWidget = ({ username, isProfile = false}) => {
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(true);
    const posts = useSelector((state) => state.posts);
    const token = useSelector((state) => state.token);

    const serverUrl =  "http://localhost:3001/" || "https://nameless-basin-36851.herokuapp.com/" || process.env.REACT_APP_SERVER_URL 

    const getPosts = async () => {
        const response = await fetch( serverUrl + "p", {
            method: "GET",
            headers: { Authorization: `Bearer ${token}`}
        });
        const data = await response.json();

        dispatch(setPosts({ posts: data }));
       setIsLoading(false)
    }


    const getUserPosts = async() => {
        const response = await fetch( serverUrl + `u/${username}/posts`, {
            method: "GET",
            headers: { Authorization: `Bearer ${token}`}
       });

       const data = await response.json();
       dispatch(setPosts({ posts: data}))
       setIsLoading(false)
    }

    useEffect(() => {
        if(isProfile){
            getUserPosts();
        } else{
            getPosts();
        }
    },[]);

    if(isLoading){
        return  Array.from(new Array(3)).map((el,index) => (<SinglePostSkeleton key={index}/>)   
      )
    } 

    return (
       <>
        {
         posts?.map(({
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