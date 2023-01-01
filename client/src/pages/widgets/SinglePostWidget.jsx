import { useState } from "react";

import { useDispatch, useSelector } from 'react-redux';
import { setPost} from "../../state"

import {
  ChatBubbleOutlineOutlined,
    FavoriteBorderOutlined,
    FavoriteOutlined,
    ShareOutlined
} from "@mui/icons-material"

import {
    Box,
    Divider,
    IconButton,
    Typography,
    useTheme
} from "@mui/material";

import FlexBetween from "../../components/CustomStyledComponents/FlexBetween";
import Following from "../../components/CustomStyledComponents/Following";

import WidgetWrapper from "../../components/CustomStyledComponents/WidgetWrapper";


const SinglePostWidget = ({
  postId,
  postUserId,
  postAuthorUsername,
  location,
  caption,
  postImageUrls,
  userProfilePhoto,
  likes,
  comments
}) => {
  const [isComments, setIsComments] = useState(false)
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);

  const { username } = useSelector((state) => state.user)
  
  const isLiked = Boolean(likes[username]);
  const likeCount = Object.keys(likes).length;

  
  const { palette } = useTheme();
  const { light, dark } = palette.primary;
  const { main, medium } = palette.neutral;

  const addRemoveLike  = async() => {
    const response = await fetch(`http://localhost:3001/p/${postId}/likes`,{
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ username  })
    })

    const updatedPost = await response.json();
    dispatch(setPost({ post: updatedPost}));
  }

  return (
    <WidgetWrapper m="2rem 0">
      <Following  followingId={postUserId} name={postAuthorUsername} subtitle={location} userProfilePhotoUrl={userProfilePhoto}/>
      <Typography color={main} sx={{ mt: "1rem"}}>{caption}</Typography>
      {postImageUrls && (
        <img src={postImageUrls[0].url} alt={postImageUrls[0].filename} style={{
          borderRadius: "0.75rem",
          marginTop: "0.75rem"
        }}/>
      )}

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
                  <Typography>{comments.length}</Typography>
                </FlexBetween>
              </FlexBetween>

              <IconButton>
                <ShareOutlined />
              </IconButton>
            </FlexBetween>
            {isComments && (
              <Box mt="0.5rem">
                {comments.map((comment, i) => (
                  <Box key={`${comment}`}>
                    <Divider />
                    <Typography sx={{ color: main, m: "0.5rem 0", pl: "1rem" }}>
                      {comment}
                    </Typography>
                  </Box>
                ))}
                <Divider />
              </Box>
            )}
    </WidgetWrapper>
  )
}

export default SinglePostWidget