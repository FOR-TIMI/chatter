import { useEffect, useState } from "react";
import { useDispatch, useSelector} from "react-redux";
import { Skeleton, Box } from "@mui/material";
import { setPosts } from "../../state";


import FlexBetween from "../../components/CustomStyledComponents/FlexBetween";
import SinglePostWidget from './SinglePostWidget';
import WidgetWrapper from "../../components/CustomStyledComponents/WidgetWrapper";
import UserAvatar from "../../components/CustomStyledComponents/UserAvatar";

const PostsWidget = ({ username, isProfile = false}) => {
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(true);
    const posts = useSelector((state) => state.posts);
    const token = useSelector((state) => state.token);

    const serverUrl = process.env.REACT_APP_SERVER_URL || "https://nameless-basin-36851.herokuapp.com/" || "http://localhost:3001/"

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
        return  Array.from(new Array(3)).map((el,index) => (
            <WidgetWrapper marginBottom="2rem" key={index}>

            {/* Following skeleton  */}
                <FlexBetween>
                    <FlexBetween gap="1rem">
                        <UserAvatar isLoading={true} size="55px" />

                        <Box>
                            <Skeleton width="150px" height={25} style={{ marginBottom: "0.25rem" }} />
                            <Skeleton width="75px" height={20} />
                        </Box>
                    </FlexBetween>
                    
                    <FlexBetween>
                        <Skeleton variant="circle" width={30} height={30} style={{ padding: "0.6rem", borderRadius: "50%" }} />
                    </FlexBetween>     
            </FlexBetween>

            <Skeleton width="100%" height={20} style={{ marginTop: "1rem" }} />
            <Skeleton width="50%" height={20} />

            <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                <Skeleton variant="rect" width="100%" height="25rem" style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }} />
            </div>

            <FlexBetween mt="0.25rem">
                <FlexBetween gap="1rem">
                    <FlexBetween gap="0.3rem">
                        <Skeleton variant="circle" width={24} height={24} style={{  borderRadius: "50%" }} />
                    </FlexBetween>

                    <FlexBetween gap="0.3rem">
                        <Skeleton variant="circle" width={24} height={24} style={{  borderRadius: "50%" }} />
                    </FlexBetween>
                </FlexBetween>

                <Skeleton variant="circle" width={24} height={24} style={{  borderRadius: "50%" }} />
            </FlexBetween>
                   
           </WidgetWrapper>
        )   
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