import {
    PersonAddOutlined,
    PersonRemoveOutlined
} from "@mui/icons-material";

import { useNavigate } from "react-router-dom";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { useDispatch, useSelector } from 'react-redux';
import { setFollowing } from "../../state";
import FlexBetween from './FlexBetween';
import UserAvatar from './UserAvatar';

const Following = ({ followingId, name, subtitle, userprofilePhotoUrl}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { username } = useSelector((state) => state.user);
    const token = useSelector((state) => state.token);
    const followings = useSelector((state) => state.user.followings);

    
    
    const { palette } = useTheme();
    const { light, dark } = palette.primary;
    const { main, medium } = palette.neutral;

    const isFollowing = followings.find((person) => person._id === followingId);

    const updateFollowing = async() => {
        const response = await fetch(
         `http://localhost:3001/u/${username}/${followingId}`,
         {
            method: "PATCH",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-type": "application/json"
            }
         }
        );

        const data = await response.json();

        dispatch(setFollowing({ followings: data }))

        return (
            <FlexBetween>
                <FlexBetween gap="1rem">
                    <UserAvatar image={userprofilePhotoUrl} size="55px"/>
                    <Box 
                     onClick={() => {
                        navigate(`/profile/${followingId}`);
                        navigate(0);
                     }}
                    >
                      <Typography
                        color={main}
                        variant="h5"
                        fontWeight="500"
                        sx={{
                            "&:hover":{
                                color: palette.primary.light,
                                cursor: "pointer"
                            }
                        }}
                      >
                        {name}
                      </Typography>  

                      <Typography color={medium} fontSize="0.75rem">
                        {subtitle}
                      </Typography>    
                    </Box>
                </FlexBetween>

                <IconButton 
                    onClick={() => updateFollowing()}
                    sx={{ backgroundColor: light, p: "0.6rem"}}
                >
                  {
                    isFollowing ? (
                        <PersonRemoveOutlined sx={{ color: dark}}/>
                    ) : (
                        <PersonAddOutlined sx={{ color: dark}}  />
                    )
                  }
                </IconButton>
            </FlexBetween>
        )
    }


}

export default Following