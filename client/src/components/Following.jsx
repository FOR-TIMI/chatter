import {
    PersonAddOutlined,
    PersonRemoveOutlined
} from "@mui/icons-material";

import { useNavigate } from "react-router-dom";
import { Box, IconButton, Typography, useTheme, Skeleton } from "@mui/material";
import { useDispatch, useSelector } from 'react-redux';
import { setFollowing } from "../state";
import FlexBetween from './CustomStyledComponents/FlexBetween';
import UserAvatar from './CustomStyledComponents/UserAvatar';

const Following = ({
  isLoading,
  followingId,
  name,
  subtitle,
  isAuthor,
  userProfilePhotoUrl}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { username } = useSelector((state) => state.user);
    const token = useSelector((state) => state.token);
    const followings = useSelector((state) => state.user.followings);

    
    const { palette } = useTheme();
    const { light, dark } = palette.primary;
    const { main, medium } = palette.neutral;


    const isFollowing = followings.find(person => person._id === followingId)

    const serverUrl = process.env.REACT_APP_SERVER_URL || "http://localhost:3001/"


    const updateFollowing = async() => {
        if(!isAuthor){
          const response = await fetch(
             serverUrl + `u/${username}/following`,
            {
               method: "PATCH",
               headers: {
                   Authorization: `Bearer ${token}`,
                   "Content-type": "application/json"
               },
               body: JSON.stringify({ followingId })
            }
           );
   
           const data = await response.json();
   
           dispatch(setFollowing({ followings: data }))
        }
    }

    if(isLoading){
      return (
        <FlexBetween>
          <FlexBetween gap="1rem">
              <UserAvatar isLoading={true} size="55px" />

              <Box>
                <Skeleton width="100%" height={25} style={{ marginBottom: "0.25rem" }} />
                <Skeleton width="100%" height={20} />
              </Box>
          </FlexBetween>
          
         <FlexBetween>
           <Skeleton variant="circle" width={24} height={24} style={{ backgroundColor: light, padding: "0.6rem" }} />
         </FlexBetween>
          
        </FlexBetween>

      )
    }

    return (
      <FlexBetween>
        <FlexBetween gap="1rem">
          <UserAvatar image={userProfilePhotoUrl} size="55px" />
          <Box
            onClick={() => {
              navigate(`/profile${name !== username ? '/' + name : ''}`);
              navigate(0);
            }}
          >
            <Typography
              color={main}
              variant="h5"
              fontWeight="500"
              sx={{
                "&:hover": {
                  color: palette.primary.light,
                  cursor: "pointer",
                },
              }}
            >
              {name}
            </Typography>
            <Typography color={medium} fontSize="0.75rem">
              {subtitle}
            </Typography>
          </Box>
        </FlexBetween>
         {!isAuthor && (
          <IconButton
          onClick={() => updateFollowing()}
          sx={{ backgroundColor: light , p: "0.6rem" }}
        >
          {isFollowing ? (
            <PersonRemoveOutlined sx={{ color: dark }} />
          ) : (
            <PersonAddOutlined sx={{ color: dark }} />
          )}
        </IconButton>
        )}
    </FlexBetween>
    )


}

export default Following