
import { useState } from "react"


/**======MUI============= */
import {
    InputBase,
    IconButton,
    Box,
    useTheme,
    Tooltip
} from "@mui/material"


import {
    Telegram
} from "@mui/icons-material"

import UserAvatar from "../CustomStyledComponents/UserAvatar"
import FlexBetween from "../CustomStyledComponents/FlexBetween"



import { useSelector } from "react-redux"

const CommentBox = ({ handleClick }) => {

 const [commentBody, setCommentBody] = useState('');




 const handleChange = (e) => {
    setCommentBody(e.target.value)
 }
 
 const { profilePhotoUrl} = useSelector((state) => state.user)
 const { palette } = useTheme();




  return (
<Box sx={{ 
           mt:'1rem',
           p: '0.25rem 0.5rem', 
           width: "100%",
           display: 'flex', 
           alignItems:'center'
           }}>

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
  )
}

export default CommentBox