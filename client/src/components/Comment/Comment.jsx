
import { useState, useEffect } from "react"


/**======MUI============= */
import {
    InputBase,
    IconButton,
    Box,
    useTheme,
    Tooltip,
    CircularProgress
} from "@mui/material"


import {
    Telegram
} from "@mui/icons-material"

import UserAvatar from "../CustomStyledComponents/UserAvatar"
import FlexBetween from "../CustomStyledComponents/FlexBetween";
import SingleComment from "./SingleComment";



import { useSelector } from "react-redux"

const CommentBox = ({ postId }) => {

 const serverUrl =  process.env.REACT_APP_ENV === "Development" ? "http://localhost:3001/" : process.env.REACT_APP_SERVER_URL 
 
 const [comments, setComments] = useState(null);
 const [commentBody, setCommentBody] = useState('');
 const [loading, setLoading] = useState(false);

 const { profilePhotoUrl, username, _id} = useSelector((state) => state.user)
 const token = useSelector((state) => state.token)

 const { palette } = useTheme();


 const handleChange = (e) => {
    setCommentBody(e.target.value)
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
            const comments = await response.json();
            setComments(comments);
        }  
    } catch(err){
        console.error(err)
    }
    setCommentBody("")
    setLoading(false)
 }

 const getComments = async() => {
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
 }

 useEffect(() => {
    getComments()
 },[])
 


  return (
    <Box sx={{ 
        mt:'1rem',
        p: '0.25rem 0.5rem', 
        width: "100%",
        alignItems:'center'
        }}>

    <Box
        sx={{
            display: "flex"
        }}
    >
            <UserAvatar image={profilePhotoUrl} size="32px"/>

            <FlexBetween sx={{
                p:'0.5rem 0 0.5rem 0.5rem',
                flexGrow: '1',
                justifyContent: "center",
                alignItems: "center",
                height: '35px'
            }}>
                <InputBase
                onChange={handleChange}
                value={commentBody}
                size="sm"
                placeholder="Add a comment…"
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
      <SingleComment comment={c} key={c + i}/>
    )) : null}
    
</Box>
  )
}

export default CommentBox