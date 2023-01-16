import { useNavigate } from "react-router-dom";
// utils
import { formatTime } from '../../utils/formatDate'
import { fShortenNumber } from '../../utils/formatNumber';

import {
    Box,
    Checkbox,
    Typography,
    useTheme,
} from "@mui/material";

import {
 Favorite,
 FavoriteBorder,
} from '@mui/icons-material';


import FlexBetween from "../CustomStyledComponents/FlexBetween";
import UserAvatar from "../CustomStyledComponents/UserAvatar";
import { useSelector } from "react-redux";

const SingleComment = ({ comment, onLikeClick}) => {


    const {
        _id,
        createdAt,
        username,
        likes,
        userProfilePhoto,
        commentBody
    } = comment

    const { username:signedInUsername } = useSelector((state) => state.user);


    const isLiked = Boolean(likes[username]);
    const likeCount = Object.keys(likes).length;



    const { palette } = useTheme();
    const { medium } = palette.neutral;



    const navigate = useNavigate();

 

  return (
      <FlexBetween sx={{
        m: "0.7rem 3% 0 3%",        
        width: "100%",
      }}>
         <UserAvatar image={userProfilePhoto} size="32px"/>
        
         <Box
            sx={{
                borderRadius: "1rem",
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexGrow: 1,
                padding: "0.3rem 1.2rem 0.5rem 1rem"
            }}
         >
           <Box
            sx={{
              display: 'flex',
              flexDirection: 'column'
            }}
           >
             <Box sx={{ display: "flex"}}>
                <Typography
                    fontWeight={600}
                    mr="0.25rem"
                    color={palette.neutral.dark}
                    sx={{
                      cursor: 'pointer',
                    }}
                    onClick={() => navigate(`/profile${username === signedInUsername ? '' : '/' + username}`)}
                >
                  {username}
                </Typography>
                <Typography>
                      {commentBody}
                </Typography>
             </Box>

              <Box
                sx={{ display: "flex"}}
              >
                  <Typography mr={2} color={medium} fontSize="0.75rem">
                   {formatTime(createdAt)}
                  </Typography>
                  <Typography mr={2} color={medium} fontSize="0.75rem">
                    {fShortenNumber(likeCount) || 0} { likeCount !== 1 ? 'likes' : 'like'}
                  </Typography>
              </Box>
           </Box>

           <Checkbox 
               size="24"
              icon={<FavoriteBorder />} 
              checkedIcon={<Favorite />} 
              checked={isLiked}
              onChange={() => onLikeClick(_id)}
            />

           

         </Box>

         
      </FlexBetween>
  )
}

export default SingleComment