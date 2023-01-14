import {
    Box,
    Divider,
    Typography,
    useTheme
} from "@mui/material"

import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import FlexBetween from "../CustomStyledComponents/FlexBetween";
import UserAvatar from "../CustomStyledComponents/UserAvatar";
import { width } from "@mui/system";

const SingleComment = ({ comment }) => {

    const {
        userId,
        username,
        postId,
        userProfilePhoto,
        commentBody
    } = comment

    const { palette } = useTheme();
  return (
      <FlexBetween sx={{
        mt: "1.5rem"
      }}>
         <UserAvatar image={userProfilePhoto} size="32px"/>
         
         <Box
            sx={{
                ml: '1rem',
                borderRadius: "1rem",
                backgroundColor: palette.neutral.light,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexGrow: 1,
                padding: "0.5rem 0.5rem 0.5rem 1rem"
            }}
         >
           <Typography>
                {commentBody}
           </Typography>
           <IconButton>
                <MoreVertIcon />
            </IconButton>
         </Box>
      </FlexBetween>
  )
}

export default SingleComment