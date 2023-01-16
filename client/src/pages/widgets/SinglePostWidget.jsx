import { useState } from "react";

import { useDispatch, useSelector } from 'react-redux';
import { setPost} from "../../state";

import { fToNow } from "../../utils/formatDate";

import {
  ChatBubbleOutlineOutlined,
    FavoriteBorderOutlined,
    FavoriteOutlined,
    ShareOutlined
} from "@mui/icons-material";


import {
    IconButton,
    Typography,
    useTheme
} from "@mui/material";

import FlexBetween from "../../components/CustomStyledComponents/FlexBetween";
import Following from "../../components/Following";
import LikeBox from "../../components/LikeBox"


import WidgetWrapper from "../../components/CustomStyledComponents/WidgetWrapper";
import CommentBox from "../../components/Comment/Comment";




import { useEffect } from "react";



const SinglePostWidget = ({
  postId,
  postUserId,
  postAuthorUsername,
  location,
  caption,
  postImageUrls,
  userProfilePhoto,
  likes,
  createdAt,
  commentCount,
}) => {
  const [isComments, setIsComments] = useState(false)
  const [likeData, setLikeData] = useState(null)
  const [isLongCaption, setIsLongCaption] = useState(false);

  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);


  const { username } = useSelector((state) => state.user)
  
  const isLiked = Boolean(likes[username]);
  const likeCount = Object.keys(likes).length;

  const isAuthor = postAuthorUsername === username

  
  const { palette } = useTheme();
  const {  dark } = palette.primary;
  const { main, medium} = palette.neutral;


  const serverUrl =  process.env.REACT_APP_ENV === "Development" ? "http://localhost:3001/" : process.env.REACT_APP_SERVER_URL 


  const addRemoveLike  = async() => {
    const response = await fetch( serverUrl + `p/${postId}/likes`,{
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ username  })
    })

    getLikes();
    const updatedPost = await response.json();
    dispatch(setPost({ post: updatedPost}));

  }

  const getLikes = async() => {

    const response = await fetch( serverUrl + `p/${postId}/likes`,{
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
    })

    if(response.ok){
      const likeData = await response.json()
      setLikeData(likeData)
    }


  }

  const handleCommentToggle = () =>{
     setIsComments(!isComments)
  }

  const handleCaptionToggle = () => {
     setIsLongCaption(!isLongCaption)
  }

  useEffect(() => {
    getLikes();
  },[])


  return (
    <WidgetWrapper m="0 0 2rem 0">

     
        <Following 
            followingId={postUserId} 
            name={postAuthorUsername} 
            subtitle={location} 
            userProfilePhotoUrl={userProfilePhoto}
            isAuthor={isAuthor}
        />

        {/* post caption  */}
        <Typography color={main} sx={{ mt: "1rem"}}>
              {caption.length > 100 ? isLongCaption ? caption : `${caption.substring(0, 100)}...` : caption}
        </Typography>

        { caption.length > 100 ?  (
        <Typography 
        onClick={handleCaptionToggle}
        sx={{
          cursor: 'pointer',
          "&:hover":{
             color: palette.light
          }
        }} color={medium}>
            {isLongCaption ? 'View less' : 'view More'}
        </Typography>
        ) : null}
      
      {postImageUrls.length ? (
        <div style={{ display: "flex" , justifyContent: "center", alignItems:"center"}}>
          <img src={postImageUrls[0].url} alt={postImageUrls[0].filename} style={{
            borderRadius: "0.75rem",
            marginTop: "0.75rem",
            height: '100%',
            width: '100%'
          }}/>
        </div>
      ) : null}

      <FlexBetween mt="0.25rem">
              <FlexBetween gap="1rem">
                <FlexBetween gap="0.3rem">
                  <IconButton onClick={addRemoveLike}>
                    {isLiked ? (
                      <FavoriteOutlined sx={{ color: dark }} />
                    ) : (
                      <FavoriteBorderOutlined />
                    )}
                  </IconButton>
                  <Typography>{likeCount}</Typography>
                </FlexBetween>

                <FlexBetween gap="0.3rem">
                  <IconButton onClick={() => setIsComments(!isComments)}>
                    <ChatBubbleOutlineOutlined />
                  </IconButton>
                  <Typography>{commentCount}</Typography>
                </FlexBetween>
              </FlexBetween>

              <IconButton>
                <ShareOutlined />
              </IconButton>
      </FlexBetween>

      {/* Liked By  */}
        {likeData && (<LikeBox likes={likeData} likeCount={likeCount}/>)}



        
      { commentCount ? (
                    <Typography 
                    onClick={handleCommentToggle}
                    sx={{
                    cursor: 'pointer',
                    mb:"1rem",
                    "&:hover":{
                        color: palette.background.light
                    }
                    }} color={medium}>
                        {!isComments ? `View ${commentCount > 1 ? "all"  + " " + commentCount + " " + "comments" : commentCount + " " + "comment"}` : 'Hide comments'}
                    </Typography>
      ): null}


          
                
    <Typography
        fontWeight="200"
        fontSize="0.79rem"
        marginBottom="1rem"
      >Posted {fToNow(createdAt)}</Typography>


      
      { isComments && (<CommentBox postId={postId} commentCount={commentCount}/>)}
        
    </WidgetWrapper>
  )
}

export default SinglePostWidget
