
import { useState, useEffect } from "react"
import { v4 as uuidv4 } from 'uuid';


/**======MUI============= */
import {
    InputBase,
    IconButton,
    Box,
    useTheme,
    Tooltip,
    CircularProgress,
    Typography,
    Divider
} from "@mui/material"


import {
    Telegram
} from "@mui/icons-material"

import UserAvatar from "../CustomStyledComponents/UserAvatar"
import FlexBetween from "../CustomStyledComponents/FlexBetween";
import SingleComment from "./SingleComment";



import { useDispatch, useSelector } from "react-redux"

import { setPost } from "../../state"

const CommentBox = ({ postId, commentCount }) => {

 const serverUrl =  process.env.REACT_APP_ENV === "Development" ? "http://localhost:3001/" : process.env.REACT_APP_SERVER_URL 
 
 const [comments, setComments] = useState(null);
 const [commentBody, setCommentBody] = useState('');
 const [loading, setLoading] = useState(false);

 const dispatch = useDispatch();

 const { profilePhotoUrl, username, _id} = useSelector((state) => state.user)
 const token = useSelector((state) => state.token)

 const { palette } = useTheme();


 const handleChange = (e) => {
    setCommentBody(e.target.value)
 }
 
 const handleLikeClick = async(commentId) => {
    try{
        //Make API call to update the like state of the comment
        const response = await fetch( serverUrl + `p/${postId}/comments/${commentId}/likes`,{
            method: "PATCH",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json"
            },
            body: JSON.stringify({ username  })
          })
      
          const updatedComment = await response.json();
          //update the state of the comment 
          setComments(prevComments => {
            const newComments = [...prevComments];
            const index = newComments.findIndex(c => c._id === updatedComment._id);
            newComments[index] = updatedComment;
            return newComments;
          })
    } catch(err){
        console.error(err)
    }
 }

 const handleClick = async() => {
    setLoading(true);    
    try{
        const response = await fetch(serverUrl + `p/${postId}/comments`,{
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                userId: _id,
                username,
                postId,
                userProfilePhoto: profilePhotoUrl,
                commentBody
            })
        })
    
        if(response.ok){
            const { comments, post} = await response.json();

            setComments(comments);
            dispatch(setPost({ post })); //To update the state of the comment count on the post itselfßß
        } 
        
    } catch(err){
        console.error(err)
    }
    setCommentBody("")
    setLoading(false)
 }

 const getComments = async() => {
    if(commentCount > 0){
        setLoading(true);    
        try{
            const response = await fetch(
                serverUrl + `p/${postId}/comments`,{
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            })
        
            if(response.ok){
                const comments = await response.json();
                setComments(comments);
            }  
        } catch(err){
            console.error(err)
        }
        setCommentBody("")
        setLoading(false)
    } else {
        return;
    }
 }

 useEffect(() => {
    getComments()
 },[])
 


  return (
    <Box sx={{ 
        mt:'1rem',
        width: "100%",
        alignItems:'center'
        }}>

    <Box
        sx={{
            display: "flex",
            padding: "0.5rem 0.8rem",
            border: `1.5px solid ${palette.neutral.light}`,
            borderRadius: "2rem"
        }}
    >
            <UserAvatar image={profilePhotoUrl} size="32px"/>

            <FlexBetween sx={{
                p:'0.5rem 0 0.5rem 0.5rem',
                flexGrow: '1',
                justifyContent: "center",
                alignItems: "center",
                height: '35px',
            }}>
                <InputBase
                onChange={handleChange}
                value={commentBody}
                size="sm"
                placeholder="Leave a comment…"
                sx={{ flexGrow: 1, mr: 1}}
                />

                
                {commentBody.length ? (
                
                    <Tooltip title="Post">
                    <IconButton
                        onClick={handleClick}
                        sx={{ '&:hover': { color: palette.primary.dark} }}
                    >
                        <Telegram/> 
                    </IconButton>
                    </Tooltip>
                ): null}
            </FlexBetween>
    </Box>


    { loading && (
    <Box sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100px"
    }}>
        <CircularProgress/>
    </Box>
   )}

    { comments?.length ? comments.map((c,i) => (
      <SingleComment comment={c} onLikeClick={handleLikeClick} key={uuidv4()}/>
    )) : null
    }
</Box>
  )
}

export default CommentBox